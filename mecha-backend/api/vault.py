from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from db.mongodb import shortcuts_collection , users_collection
from bson import ObjectId

router = APIRouter(prefix="/vault", tags=["Vault"])

# --- MODELS ---
class ShortcutCreate(BaseModel):
    user_email: str
    key: str
    val: str
    cat: str

class ShortcutResponse(BaseModel):
    id: str
    key: str
    val: str
    cat: str

class ActivateRequest(BaseModel):
    user_email: str
    extension_slug: str

# --- ROUTES ---

@router.post("/add")
async def add_shortcut(item: ShortcutCreate):
    # Check if this specific user already has this shortcut key
    existing = await shortcuts_collection.find_one({
        "user_email": item.user_email, 
        "key": item.key
    })
    
    if existing:
        raise HTTPException(status_code=400, detail=f"Shortcut @{item.key} already exists in your vault.")

    shortcut_data = item.model_dump()
    result = await shortcuts_collection.insert_one(shortcut_data)
    
    return {"status": "success", "id": str(result.inserted_id)}

@router.get("/list/{user_email}")
async def get_shortcuts(user_email: str):
    cursor = shortcuts_collection.find({"user_email": user_email})
    shortcuts = []
    async for doc in cursor:
        shortcuts.append({
            "id": str(doc["_id"]),
            "key": doc["key"],
            "val": doc["val"],
            "cat": doc["cat"]
        })
    return shortcuts

@router.delete("/delete/{shortcut_id}")
async def delete_shortcut(shortcut_id: str):
    try:
        result = await shortcuts_collection.delete_one({"_id": ObjectId(shortcut_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Shortcut not found")
        return {"status": "success", "message": "Node purged from vault"}
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID format")


@router.post("/activate-extension")
async def activate_extension(req: ActivateRequest):
    result = await users_collection.update_one(
        {"email": req.user_email},
        {"$addToSet": {"active_extensions": req.extension_slug}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {"status": "success", "message": f"Protocol {req.extension_slug} synchronized"}

@router.get("/active-extensions/{user_email}")
async def get_active_extensions(user_email: str):
    user = await users_collection.find_one({"email": user_email})
    if not user:
        return []
    return user.get("active_extensions", [])