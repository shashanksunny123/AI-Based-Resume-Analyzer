from fastapi import APIRouter
from app.services.analyzer_service import analyze_resume_vs_jd

router = APIRouter()

@router.post("/score")
async def get_score(payload: dict):
    resume_skills = payload["resume_skills"]
    jd_skills = payload["jd_skills"]

    return analyze_resume_vs_jd(resume_skills, jd_skills)
