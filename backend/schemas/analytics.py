from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict, Literal
from datetime import datetime

# Enums defined via literals
FilterOperator = Literal["eq", "ne", "gt", "gte", "lt", "lte", "contains", "in"]
AggFunction = Literal["sum", "avg", "min", "max", "count", "stddev"]
EngineType = Literal["duckdb", "polars"]

class FilterCondition(BaseModel):
    column: str = Field(..., description="Target column to filter")
    operator: FilterOperator = Field(..., description="Comparison operator")
    value: Any = Field(..., description="Value(s) to evaluate against")

class AggregationSpec(BaseModel):
    column: str = Field(..., description="Target column to aggregate")
    function: AggFunction = Field(..., description="Mathematical aggregation function")
    alias: Optional[str] = Field(None, description="Output name alias")

class OrderBySpec(BaseModel):
    column: str = Field(..., description="Target column to sort")
    descending: bool = Field(False, description="Sort order direction")

class AnalyticsQuery(BaseModel):
    dataset_id: str = Field("telemetry_events", description="Dataset file/table target")
    engine: EngineType = Field("duckdb", description="Execution driver: duckdb or polars")
    aggregations: List[AggregationSpec] = Field(default=[], description="Desired calculations")
    filters: List[FilterCondition] = Field(default=[], description="Query filters")
    group_by: List[str] = Field(default=[], description="Columns to aggregate across")
    order_by: List[OrderBySpec] = Field(default=[], description="Sort specifications")
    page: int = Field(1, ge=1, description="Pagination index")
    page_size: int = Field(100, ge=1, le=10000, description="Row count per page")
    
    # Date Range shorthand configurations
    date_column: Optional[str] = Field(None, description="Timestamp column for temporal filter")
    start_date: Optional[str] = Field(None, description="Start range string, e.g., '2026-01-01'")
    end_date: Optional[str] = Field(None, description="End range string, e.g., '2026-12-31'")

class QueryPerformance(BaseModel):
    query_hash: str = Field(..., description="SHA-256 footprint of query AST")
    engine_type: str = Field(..., description="Database execution engine")
    compilation_time_ms: float = Field(..., description="Time preparing the query execution plan")
    execution_time_ms: float = Field(..., description="Time executing the engine pipeline")
    total_time_ms: float = Field(..., description="Total processing latency")
    bytes_processed: int = Field(..., description="Estimated size of read buffers")
    cache_hit: bool = Field(..., description="Cache resolution status")
    rows_returned: int = Field(..., description="Result count")
    optimized_plan: Optional[str] = Field(None, description="Engine compilation plan string")

class AnalyticsResponse(BaseModel):
    data: List[Dict[str, Any]] = Field(..., description="Tabular JSON key-value records")
    total_rows: int = Field(..., description="Total aggregate size before pagination")
    page: int = Field(..., description="Current page index")
    page_size: int = Field(..., description="Pagination chunk size")
    performance: QueryPerformance = Field(..., description="Performance profile metrics")

class KPIMetricsResponse(BaseModel):
    total_records: int = Field(..., description="Gross item count")
    active_users: int = Field(..., description="Distinct user/client counts")
    average_latency_ms: float = Field(..., description="Geometric mean of request time")
    error_rate: float = Field(..., description="Proportion of failed transaction events")
    growth_rate_mom: float = Field(..., description="Percentage month-over-month growth metric")
    performance: QueryPerformance = Field(..., description="Execution statistics metadata")
