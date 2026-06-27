import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.core.config import settings

# Detect if we are using SQLite or PostgreSQL
is_sqlite = settings.DATABASE_URL.startswith("sqlite")

# Configure engine with correct parameters depending on connection type
if is_sqlite:
    engine = create_engine(
        settings.DATABASE_URL, 
        connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(
        settings.DATABASE_URL,
        pool_size=10,
        max_overflow=20,
        pool_recycle=1800
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency for injecting db session in FastAPI routes"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
