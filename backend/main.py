import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings
from backend.core.database import engine, Base
from backend.routers import analytics
from backend.utils.data_generator import ensure_data_directory, generate_parquet_dataset
from backend.core.logging_config import logger
import threading

# 1. Automatic Database Migrations/Provisioning
try:
    # Build schema models directly in target Postgres or SQLite databases on startup
    Base.metadata.create_all(bind=engine)
    logger.info("Telemetry database schemas initialized successfully.")
except Exception as e:
    logger.error(f"Warning: Telemetry database engine initialization failed: {e}")


# 2. Instantiate FastAPI Application Core
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Vectorized OLAP Query Engine powered by FastAPI, DuckDB, Polars, and SQLAlchemy",
    version="1.0.0"
)

# 3. Dynamic CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Open for local dev environment visualizer connection
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Integrate API Routers
app.include_router(analytics.router, prefix=settings.API_V1_STR)

# 5. Startup Hook: Pre-seed database on separate thread
@app.on_event("startup")
def pre_seed_analytics_database():
    """
    Ensures directory structures and pre-builds a standard 1,000,000-row 
    analytical dataset asynchronously to keep startup fast.
    """
    ensure_data_directory()
    
    # Warm up default datasets in background thread
    def seed_task():
        try:
            generate_parquet_dataset("telemetry_1000000.parquet", 1000000)
            generate_parquet_dataset("telemetry_100000.parquet", 100000)
            logger.info("Background pre-seeding of analytical Parquet databases complete.")
        except Exception as e:
            logger.error(f"Background pre-seeding failed: {e}")

    thread = threading.Thread(target=seed_task)
    thread.start()

from fastapi.staticfiles import StaticFiles
import os

# Serve React static assets in production if they are built
dist_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "dist")
if os.path.exists(dist_path):
    app.mount("/", StaticFiles(directory=dist_path, html=True), name="static")
else:
    @app.get("/")
    def read_root():
        """Root health verification endpoint"""
        return {
            "status": "ONLINE",
            "engine": "Aperture High-Performance Analytics Core",
            "version": "1.0.0",
            "documentation": "/docs"
        }

if __name__ == "__main__":

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
