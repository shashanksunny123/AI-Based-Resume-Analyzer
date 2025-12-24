from app.core.openai_client import openai_client

async def generate_resume_suggestions(resume_text, jd_text):
    prompt = f"""
You are an ATS Resume Expert.
Compare the resume and job description below.

RESUME:
{resume_text}

JD:
{jd_text}

TASKS:
1. Rewrite the resume summary to match the JD.
2. Suggest improvements for experience bullet points.
3. List missing skills that should be added.
4. Return the output in JSON:

{{
  "summary": "",
  "experience_improvements": [],
  "missing_skills": []
}}
"""

    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.to_dict()["content"]
