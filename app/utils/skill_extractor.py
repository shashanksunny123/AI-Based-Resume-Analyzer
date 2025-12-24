SKILL_KEYWORDS = [
    "Python", "Java", "SQL", "React", "AWS", "Docker",
    "FastAPI", "Machine Learning", "NLP"
]

def extract_skills(text):
    found = []
    for skill in SKILL_KEYWORDS:
        if skill.lower() in text.lower():
            found.append(skill)
    return found
