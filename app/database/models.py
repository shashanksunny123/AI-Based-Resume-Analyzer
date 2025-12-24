from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserRegister(BaseModel):
    """User registration schema

    Note: `email` is optional to allow users to sign up with username+password only.
    """
    username: str
    email: Optional[EmailStr] = None
    password: str


class UserLogin(BaseModel):
    """User login schema"""
    username: str
    password: str


class UserResponse(BaseModel):
    """User response schema"""
    id: Optional[str] = None
    username: str
    email: Optional[str] = None
    created_at: Optional[datetime] = None


class TokenResponse(BaseModel):
    """Token response schema"""
    access_token: str
    token_type: str
    user: UserResponse


class UserInDB(BaseModel):
    """User in database schema"""
    username: str
    email: str
    hashed_password: str
    created_at: datetime = None
    updated_at: datetime = None
