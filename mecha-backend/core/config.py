import os

class Settings:
    PROJECT_NAME: str = "Mecha Auth Engine"
    # Use your Atlas string here or as an Env Var
    MONGODB_URL: str = os.getenv("MONGODB_URL", "SECRET")
    DATABASE_NAME: str = "mecha_platform"

settings = Settings()