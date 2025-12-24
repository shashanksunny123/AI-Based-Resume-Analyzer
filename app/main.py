import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.api.v1.resume_routes import router as resume_router
from app.api.v1.auth_routes import router as auth_router
from app.database.connections import connect_to_db, disconnect_from_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage app lifecycle - connect/disconnect from DB"""
    await connect_to_db()
    yield
    await disconnect_from_db()


app = FastAPI(lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(resume_router, prefix="/api/v1/resume", tags=["resume"])


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
