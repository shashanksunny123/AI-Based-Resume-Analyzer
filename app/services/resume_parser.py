import pdfplumber
from app.utils.skill_extractor import extract_skills

async def parse_resume(file):
    text = ""

    if file.filename.endswith(".pdf"):
        with pdfplumber.open(file.file) as pdf:
            text = "\n".join([page.extract_text() or "" for page in pdf.pages])

    # extract skills
    skills = extract_skills(text)

    return text, skills
