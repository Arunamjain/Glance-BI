import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Aperture Analytics Engine"
    API_V1_STR: str = "/api/v1"
    
    # Database URL - default to a local SQLite database, override with Postgres URL
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./aperture_telemetry.db")
    
    # Caching
    CACHE_TTL_SECONDS: int = 120
    
    # Data Directories
    DATA_DIR: str = os.getenv("DATA_DIR", "./data")
    
    class Config:
        case_sensitive = True

settings = Settings()
