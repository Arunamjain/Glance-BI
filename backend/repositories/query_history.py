from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Dict, Any
from backend.models.query_history import QueryHistory
from backend.schemas.analytics import QueryPerformance

class QueryHistoryRepository:
    """
    SQLAlchemy Repository layer for QueryHistory logging and analytical operations.
    """
    def __init__(self, db_session: Session):
        self.db = db_session

    def create_log(self, perf: QueryPerformance, dataset_scale: int) -> QueryHistory:
        """
        Creates and stores a performance tracking record in the PostgreSQL database.
        """
        db_log = QueryHistory(
            query_hash=perf.query_hash,
            dataset_scale=dataset_scale,
            engine_type=perf.engine_type,
            compilation_ms=perf.compilation_time_ms,
            execution_ms=perf.execution_time_ms,
            bytes_processed=perf.bytes_processed,
            rows_returned=perf.rows_returned,
            cache_hit=perf.cache_hit,
            optimized_plan=perf.optimized_plan
        )
        self.db.add(db_log)
        self.db.commit()
        self.db.refresh(db_log)
        return db_log

    def get_recent_logs(self, limit: int = 50) -> List[QueryHistory]:
        """
        Retrieves the most recent query execution telemetry records.
        """
        return self.db.query(QueryHistory).order_by(desc(QueryHistory.executed_at)).limit(limit).all()

    def get_engine_metrics(self) -> Dict[str, Any]:
        """
        Aggregates system-wide average execution metrics over time.
        """
        stats = self.db.query(
            func.count(QueryHistory.id).label("total_queries"),
            func.avg(QueryHistory.execution_ms).label("avg_execution_ms"),
            func.avg(QueryHistory.compilation_ms).label("avg_compilation_ms"),
            func.sum(QueryHistory.bytes_processed).label("total_bytes")
        ).first()

        return {
            "total_queries": stats.total_queries or 0,
            "avg_execution_ms": round(stats.avg_execution_ms or 0.0, 2),
            "avg_compilation_ms": round(stats.avg_compilation_ms or 0.0, 2),
            "total_bytes_processed": stats.total_bytes or 0
        }
