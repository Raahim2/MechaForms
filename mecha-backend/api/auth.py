from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from db.mongodb import users_collection
from core.security import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["Identity"])

# --- SCHEMAS ---
class UserSignup(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- ROUTES ---

@router.post("/signup")
async def signup(user: UserSignup):
    # Check duplicate email
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Identity already registered")
    
    # Hash and store
    user_data = user.model_dump()
    user_data["password"] = hash_password(user.password)
    
    result = await users_collection.insert_one(user_data)
    return {"status": "success", "user_id": str(result.inserted_id)}

@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return {
        "status": "success",
        "user": {
            "username": db_user["username"],
            "email": db_user["email"]
        }
    }