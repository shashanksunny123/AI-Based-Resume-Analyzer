from fastapi import APIRouter, UploadFile
from app.services.jd_parser import parse_jd

router = APIRouter()

@router.post("/upload")
async def upload_jd(file: UploadFile):
    text, skills = await parse_jd(file)
    return {"jd_text": text, "jd_skills": skills}
