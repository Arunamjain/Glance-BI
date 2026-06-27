import unittest
from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.core.database import Base
from backend.routers.analytics import (
    run_analytics_query,
    get_analytical_kpis,
    get_query_execution_history,
    get_dataset_metadata
)
from backend.schemas.analytics import AnalyticsQuery, AggregationSpec, FilterCondition

class TestAPIAnalytics(unittest.TestCase):
    """
    API Route Integration Tests verifying correct request parsing, HTTP response structures,
    and input parameter sanitization constraints.
    """

    @classmethod
    def setUpClass(cls):
        # High speed in-memory database to represent injected db session
        cls.engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
        cls.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls.engine)
        Base.metadata.create_all(bind=cls.engine)

    def setUp(self):
        self.db = self.SessionLocal()

    def tearDown(self):
        self.db.query(Base.metadata.tables["query_history"]).delete()
        self.db.commit()
        self.db.close()

    def test_api_run_analytics_query_success(self):
        # Construct standard query (scale = 1000 for rapid test execution)
        query = AnalyticsQuery(
            dataset_id="telemetry_events",
            engine="duckdb",
            aggregations=[
                AggregationSpec(column="latency_ms", function="avg", alias="avg_lat")
            ],
            filters=[
                FilterCondition(column="status", operator="eq", value=200)
            ],
            group_by=["country"]
        )

        response = run_analytics_query(query=query, dataset_scale=1000, db=self.db)
        
        # Verify response layout complies with AnalyticsResponse schema
        self.assertEqual(response.page, 1)
        self.assertEqual(response.page_size, 100)
        self.assertIsNotNone(response.data)
        self.assertTrue(len(response.data) >= 0)
        self.assertIsNotNone(response.performance)
        self.assertEqual(response.performance.engine_type, "duckdb")
        self.assertFalse(response.performance.cache_hit)

    def test_api_query_validation_bounds(self):
        # Query requesting scale that is too large (exceeding maximum 10,000,000 safety threshold)
        query = AnalyticsQuery(engine="duckdb")
        
        # Scale too large -> Expected 400 Bad Request
        with self.assertRaises(HTTPException) as ctx:
            run_analytics_query(query=query, dataset_scale=50000000, db=self.db)
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("Dataset scale must be between", ctx.exception.detail)

        # Scale too small -> Expected 400 Bad Request
        with self.assertRaises(HTTPException) as ctx:
            run_analytics_query(query=query, dataset_scale=100, db=self.db)
        self.assertEqual(ctx.exception.status_code, 400)
        self.assertIn("Dataset scale must be between", ctx.exception.detail)

    def test_api_get_analytical_kpis(self):
        # Request kpi metrics (scale = 1000 for speed)
        response = get_analytical_kpis(dataset_scale=1000, db=self.db)
        
        # Assertions on response structure and content boundaries
        self.assertIsNotNone(response.total_records)
        self.assertEqual(response.total_records, 1000)
        self.assertIsNotNone(response.active_users)
        self.assertIsNotNone(response.average_latency_ms)
        self.assertIsNotNone(response.error_rate)
        self.assertIsNotNone(response.performance)

    def test_api_get_query_execution_history(self):
        # Populate DB with 1 transaction
        query_ast = AnalyticsQuery(engine="duckdb")
        run_analytics_query(query=query_ast, dataset_scale=1000, db=self.db)

        # Retrieve history via router
        history = get_query_execution_history(limit=10, db=self.db)
        self.assertIn("queries", history)
        self.assertIn("metrics_overview", history)
        self.assertEqual(len(history["queries"]), 1)
        self.assertEqual(history["metrics_overview"]["total_queries"], 1)

    def test_api_get_dataset_metadata(self):
        metadata = get_dataset_metadata(dataset_scale=1000)
        self.assertEqual(metadata["dataset_id"], "telemetry_1000")
        self.assertEqual(metadata["row_count"], 1000)
        self.assertIn("columns", metadata)
        
        # Check column definitions
        cols = {col["name"]: col["type"] for col in metadata["columns"]}
        self.assertIn("user_id", cols)
        self.assertIn("latency_ms", cols)
        self.assertIn("status", cols)

if __name__ == "__main__":
    unittest.main()
