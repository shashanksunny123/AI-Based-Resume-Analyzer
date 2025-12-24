from fastapi import APIRouter, UploadFile, Form, HTTPException
from app.services.resume_parser import parse_resume
from app.utils.text_cleaner import clean_text
from app.utils.skill_extractor import extract_skills
from app.services.analyzer_service import analyze_resume_vs_jd
from app.services.suggestions_service import generate_resume_suggestions

router = APIRouter()


@router.post("/upload")
async def upload_resume(file: UploadFile):
    text, skills = await parse_resume(file)
    return {"text": text, "skills": skills}


@router.post("/analyze")
async def analyze_resume(file: UploadFile, jd_text: str = Form(...)):
    """Analyze uploaded resume PDF against job description text."""
    # Parse resume
    try:
        resume_text, resume_skills = await parse_resume(file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse resume: {e}")

    # Clean and extract JD skills
    jd_clean = clean_text(jd_text)
    jd_skills = extract_skills(jd_clean)

    # Basic analysis
    analysis = analyze_resume_vs_jd(resume_skills, jd_skills)

    # Try to get AI suggestions (non-blocking on failure)
    suggestions = None
    try:
        suggestions = await generate_resume_suggestions(resume_text, jd_text)
    except Exception as e:
        # Log and continue with analysis result
        print("Suggestions generation failed:", e)

    return {
        "analysis": analysis,
        "suggestions": suggestions,
        "resume_text": resume_text,
        "jd_text": jd_text,
    }
