from motor.motor_asyncio import AsyncIOMotorClient
from core.config import settings

client = AsyncIOMotorClient(settings.MONGODB_URL)
db = client[settings.DATABASE_NAME]
users_collection = db.get_collection("users")
shortcuts_collection = db.get_collection("shortcuts")
extensions_collection = db.get_collection("extensions")