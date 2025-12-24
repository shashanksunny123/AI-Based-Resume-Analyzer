import os
from openai import OpenAI
from app.core.config import OPENAI_API_KEY

# Initialize OpenAI client using env var; if missing, client will still be created but calls may fail
openai_client = OpenAI(api_key=OPENAI_API_KEY or None)
