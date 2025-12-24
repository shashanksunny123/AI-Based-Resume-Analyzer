from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGODB_URL, DB_NAME

client = None
db = None


async def connect_to_db():
    """Connect to MongoDB"""
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DB_NAME]
    print(f"Connected to MongoDB: {DB_NAME}")


async def disconnect_from_db():
    """Disconnect from MongoDB"""
    global client
    if client:
        client.close()
        print("Disconnected from MongoDB")


def get_db():
    """Get database instance"""
    return db
