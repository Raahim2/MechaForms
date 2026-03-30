from fastapi import APIRouter, HTTPException
from db.mongodb import users_collection
from pydantic import EmailStr

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/{email}")
async def get_user(email: EmailStr):
    # Find the user by email
    db_user = await users_collection.find_one({"email": email})
    
    if not db_user:
        raise HTTPException(
            status_code=404, 
            detail="User not found"
        )
    
    # Return the data structure the extension expects
    return {
        "username": db_user.get("username"),
        "email": db_user.get("email"),
        # Ensure we return an empty list if the field doesn't exist yet
        "active_extensions": db_user.get("active_extensions", [])
    }