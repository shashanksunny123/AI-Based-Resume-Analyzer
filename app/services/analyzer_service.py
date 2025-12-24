def analyze_resume_vs_jd(resume_skills, jd_skills):
    resume_set = set(map(str.lower, resume_skills))
    jd_set = set(map(str.lower, jd_skills))

    matched = list(resume_set & jd_set)
    missing = list(jd_set - resume_set)

    score = int((len(matched) / len(jd_set)) * 100) if jd_set else 0

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }
