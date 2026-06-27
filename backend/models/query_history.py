from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from backend.core.database import Base

class QueryHistory(Base):
    """
    SQLAlchemy Table Model logging all analytical queries.
    Captures telemetry for active monitoring of query performance.
    """
    __tablename__ = "query_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    query_hash = Column(String, index=True, nullable=False)
    dataset_scale = Column(Integer, nullable=False)  # Total records analyzed
    engine_type = Column(String, nullable=False)     # 'DuckDB' or 'Polars'
    compilation_ms = Column(Float, nullable=False)   # Duration compiling AST/SQL
    execution_ms = Column(Float, nullable=False)     # Pure processing execution time
    bytes_processed = Column(Integer, nullable=False)# Read buffer bytes
    rows_returned = Column(Integer, nullable=False)  # Response count
    cache_hit = Column(Boolean, default=False)       # Cache vs Live execution
    optimized_plan = Column(String, nullable=True)    # Logical execution path logs
    executed_at = Column(DateTime, default=datetime.utcnow, index=True)
