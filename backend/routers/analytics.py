from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
from backend.core.database import get_db
from backend.schemas.analytics import AnalyticsQuery, AnalyticsResponse, KPIMetricsResponse
from backend.services.analytics_engine import AnalyticsEngineService
from backend.repositories.query_history import QueryHistoryRepository

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.post("/query", response_model=AnalyticsResponse)
def run_analytics_query(
    query: AnalyticsQuery, 
    dataset_scale: int = Query(1000000, alias="scale", description="Dataset scale (rows)"),
    db: Session = Depends(get_db)
):
    """
    Runs a structured analytical query using the optimized DuckDB/Polars engine.
    Supports filters, groupings, sorting, pagination, and caches results dynamically.
    """
    try:
        engine_service = AnalyticsEngineService(db)
        return engine_service.execute_query(query, dataset_scale)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analytics Engine compilation error: {str(e)}")

@router.get("/kpis", response_model=KPIMetricsResponse)
def get_analytical_kpis(
    dataset_scale: int = Query(1000000, alias="scale", description="Dataset scale (rows)"),
    db: Session = Depends(get_db)
):
    """
    Computes real-time analytical KPIs (gross volume, active users, latency distribution).
    """
    try:
        engine_service = AnalyticsEngineService(db)
        return engine_service.get_kpi_calculations(dataset_scale)
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"KPI Calculation failure: {str(e)}")

@router.get("/history")
def get_query_execution_history(
    limit: int = Query(25, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Retrieves previous engine query performance telemetry records logged in the database.
    """
    try:
        repo = QueryHistoryRepository(db)
        logs = repo.get_recent_logs(limit)
        stats = repo.get_engine_metrics()
        
        return {
            "queries": [
                {
                    "id": log.id,
                    "query_hash": log.query_hash,
                    "dataset_scale": log.dataset_scale,
                    "engine_type": log.engine_type,
                    "compilation_time_ms": log.compilation_ms,
                    "execution_time_ms": log.execution_ms,
                    "bytes_processed": log.bytes_processed,
                    "rows_returned": log.rows_returned,
                    "cache_hit": log.cache_hit,
                    "executed_at": log.executed_at
                }
                for log in logs
            ],
            "metrics_overview": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"History telemetry lookup failed: {str(e)}")

@router.get("/metadata")
def get_dataset_metadata(
    dataset_scale: int = Query(1000000, alias="scale")
):
    """
    Exposes high-level metadata statistics and raw schemas about the telemetry Parquet target.
    """
    try:
        import polars as pl
        from backend.services.analytics_engine import AnalyticsEngineService
        
        # Warm dataset
        filepath = "/tmp/metadata_temp.parquet" # simple target path
        engine_service = AnalyticsEngineService(None)
        filepath = engine_service._prepare_dataset(dataset_scale)
        
        # Pull schema descriptors from Parquet file headers lazily
        lf = pl.scan_parquet(filepath)
        schema_dict = {name: str(dtype) for name, dtype in lf.schema.items()}
        
        return {
            "dataset_id": f"telemetry_{dataset_scale}",
            "file_format": "Parquet (Snappy Compressed Columnar Layout)",
            "row_count": dataset_scale,
            "columns": [
                {"name": name, "type": str_type, "indexed": name == "timestamp"}
                for name, str_type in schema_dict.items()
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metadata parsing failure: {str(e)}")
