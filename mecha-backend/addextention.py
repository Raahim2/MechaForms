
    
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
load_dotenv()   

MONGODB_URL = os.getenv("MONGODB_URL")

async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client["mecha_platform"]
    col = db["extensions"]

    ai_prompt_pack = {
        "slug": "ai-prompts-pro",
        "name": "AI Prompt Architect",
        "version": "v1.0.0",
        "author": "MechaLabs",
        "installs": "45.2k",
        "reliability": "100%",
        "category": "Productivity",
        "icon": "Sparkles", 
        "color": "from-purple-500/20",
        "tagline": "High-fidelity AI prompt templates.",
        "description": "A collection of 15 engineered prompts for the @ai command. Optimized for Gemini and GPT models to ensure high-quality, concise, and professional outputs every time.",
        "manifest": [
            # 1. Summarization
            {"trigger": "@sum", "output": "Summarize the following text into 3 concise bullet points: "},
            
            # 2. Professional Reply
            {"trigger": "@reply", "output": "Draft a professional and polite reply to this message, accepting the proposal: "},
            
            # 3. Polite Decline
            {"trigger": "@no", "output": "Draft a polite decline for this request, mentioning I don't have capacity right now: "},
            
            # 4. TL;DR
            {"trigger": "@tldr", "output": "Provide a one-sentence TL;DR of the following: "},
            
            # 5. Simplify (ELI5)
            {"trigger": "@easy", "output": "Explain the following concept like I am 5 years old: "},
            
            # 6. Action Items
            {"trigger": "@tasks", "output": "Extract all actionable tasks and deadlines from the following text: "},
            
            # 7. Tone Shifter (Professional)
            {"trigger": "@pro", "output": "Rewrite the following text to sound more professional, corporate, and polished: "},
            
            # 8. Tone Shifter (Friendly)
            {"trigger": "@chill", "output": "Rewrite the following text to sound casual, friendly, and approachable: "},
            
            # 9. Grammar Check (Deep)
            {"trigger": "@fixit", "output": "Fix all grammar, spelling, and punctuation errors in this text while maintaining tone: "},
            
            # 10. Expansion
            {"trigger": "@more", "output": "Expand on the following points to make them more descriptive and detailed: "},
            
            # 11. Shorten
            {"trigger": "@less", "output": "Make the following text as concise as possible without losing the core meaning: "},
            
            # 12. Email Subject Line
            {"trigger": "@subject", "output": "Generate 3 catchy and professional email subject lines for the following content: "},
            
            # 13. Translation (To English)
            {"trigger": "@en", "output": "Translate the following text into clear, fluent English: "},
            
            # 14. Code Explainer
            {"trigger": "@explain", "output": "Explain what this block of code does in simple terms: "},
            
            # 15. Key Takeaways
            {"trigger": "@key", "output": "Identify the top 3 most important insights from the following information: "}
        ]
    }

    await col.update_one(
        {"slug": ai_prompt_pack["slug"]},
        {"$set": ai_prompt_pack},
        upsert=True
    )
    
    print("------------------------------------------")
    print(f"  AI Prompt Architect ({len(ai_prompt_pack['manifest'])} Nodes) Seeded!")
    print("----------------------------------")
    
if __name__ == "__main__":
    asyncio.run(seed())