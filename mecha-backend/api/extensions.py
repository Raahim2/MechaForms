from fastapi import APIRouter, HTTPException
from db.mongodb import extensions_collection

router = APIRouter(prefix="/extensions", tags=["Extensions"])

@router.get("/list")
async def list_extensions():
    cursor = extensions_collection.find({})
    packs = []
    async for doc in cursor:
        packs.append({
            "id": doc["slug"], # we use a string slug like 'java-pro'
            "name": doc["name"],
            "author": doc["author"],
            "installs": doc["installs"],
            "category": doc["category"],
            "icon": doc["icon"],
            "color": doc["color"],
            "tagline": doc["tagline"]
        })
    return packs

@router.get("/details/{slug}")
async def get_extension_details(slug: str):
    doc = await extensions_collection.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Extension not found")
    
    return {
        "name": doc["name"],
        "version": doc["version"],
        "author": doc["author"],
        "reliability": doc["reliability"],
        "description": doc["description"],
        "manifest": doc["manifest"] # Array of triggers/outputs
    }