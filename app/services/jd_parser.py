import pdfplumber
from app.utils.skill_extractor import extract_skills
from app.utils.text_cleaner import clean_text

async def parse_jd(file):
    text = ""

    if file.filename.endswith(".pdf"):
        with pdfplumber.open(file.file) as pdf:
            text = "\n".join([
                page.extract_text() or "" for page in pdf.pages
            ])
    else:
        text = (await file.read()).decode("utf-8")

    text = clean_text(text)
    skills = extract_skills(text)

    return text, skills
