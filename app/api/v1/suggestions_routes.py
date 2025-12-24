from fastapi import APIRouter
from app.services.suggestions_service import generate_resume_suggestions

router = APIRouter()

@router.post("/resume")
async def resume_suggestions(payload: dict):
    resume_text = payload["resume_text"]
    jd_text = payload["jd_text"]

    return await generate_resume_suggestions(resume_text, jd_text)
