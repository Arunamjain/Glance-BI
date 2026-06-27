import unittest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.core.database import Base
from backend.repositories.query_history import QueryHistoryRepository
from backend.schemas.analytics import QueryPerformance

class TestIntegrationAnalytics(unittest.TestCase):
    """
    Integration Tests verifying SQL Database Interactions using an in-memory isolated SQLite backend.
    """

    @classmethod
    def setUpClass(cls):
        # Configure a private, independent, high-speed SQLite in-memory engine
        cls.engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
        cls.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls.engine)
        
        # Initialize the fresh test database schemas
        Base.metadata.create_all(bind=cls.engine)

    def setUp(self):
        # Initialize session for each test run to guarantee isolation
        self.db = self.SessionLocal()
        self.repo = QueryHistoryRepository(self.db)

    def tearDown(self):
        self.db.query(Base.metadata.tables["query_history"]).delete()
        self.db.commit()
        self.db.close()

    def test_repository_create_and_retrieve_log(self):
        # Create a mock query performance schema instance
        perf = QueryPerformance(
            query_hash="sha256_mocked_hash_value_12345",
            engine_type="duckdb",
            compilation_time_ms=12.45,
            execution_time_ms=45.80,
            total_time_ms=58.25,
            bytes_processed=1048576,
            cache_hit=False,
            rows_returned=25,
            optimized_plan="SCAN PARQUET FILE"
        )

        # Write log via Repository
        log_entry = self.repo.create_log(perf, dataset_scale=1000000)
        self.assertIsNotNone(log_entry.id)
        self.assertEqual(log_entry.query_hash, "sha256_mocked_hash_value_12345")
        self.assertEqual(log_entry.dataset_scale, 1000000)
        self.assertEqual(log_entry.engine_type, "duckdb")
        self.assertEqual(log_entry.compilation_ms, 12.45)
        self.assertEqual(log_entry.execution_ms, 45.80)
        self.assertEqual(log_entry.bytes_processed, 1048576)
        self.assertEqual(log_entry.rows_returned, 25)
        self.assertFalse(log_entry.cache_hit)
        self.assertEqual(log_entry.optimized_plan, "SCAN PARQUET FILE")

        # Verify entry can be retrieved from database
        recent = self.repo.get_recent_logs(limit=10)
        self.assertEqual(len(recent), 1)
        self.assertEqual(recent[0].query_hash, "sha256_mocked_hash_value_12345")

    def test_repository_metric_aggregations(self):
        # Write multiple log entries to test aggregation averages
        p1 = QueryPerformance(
            query_hash="hash_1", engine_type="duckdb",
            compilation_time_ms=10.0, execution_time_ms=20.0, total_time_ms=30.0,
            bytes_processed=1000, cache_hit=False, rows_returned=10,
            optimized_plan="PLAN_1"
        )
        p2 = QueryPerformance(
            query_hash="hash_2", engine_type="polars",
            compilation_time_ms=15.0, execution_time_ms=30.0, total_time_ms=45.0,
            bytes_processed=2000, cache_hit=True, rows_returned=20,
            optimized_plan="PLAN_2"
        )

        self.repo.create_log(p1, dataset_scale=500000)
        self.repo.create_log(p2, dataset_scale=1000000)

        # Aggregate metrics
        stats = self.repo.get_engine_metrics()
        self.assertEqual(stats["total_queries"], 2)
        # Average compilation: (10 + 15) / 2 = 12.5 ms
        self.assertEqual(stats["avg_compilation_ms"], 12.5)
        # Average execution: (20 + 30) / 2 = 25.0 ms
        self.assertEqual(stats["avg_execution_ms"], 25.0)
        # Total bytes processed: 1000 + 2000 = 3000
        self.assertEqual(stats["total_bytes_processed"], 3000)

    def test_get_recent_logs_pagination_and_sorting(self):
        # Insert 3 logs to check sorting order
        for i in range(3):
            perf = QueryPerformance(
                query_hash=f"hash_sorted_{i}", engine_type="duckdb",
                compilation_time_ms=5.0, execution_time_ms=10.0, total_time_ms=15.0,
                bytes_processed=500, cache_hit=False, rows_returned=50,
                optimized_plan="PLAN"
            )
            self.repo.create_log(perf, dataset_scale=100000)

        recent = self.repo.get_recent_logs(limit=2)
        # Limit boundary assertion
        self.assertEqual(len(recent), 2)
        # Verify desc order sorting (latest inserted first)
        self.assertEqual(recent[0].query_hash, "hash_sorted_2")
        self.assertEqual(recent[1].query_hash, "hash_sorted_1")

if __name__ == "__main__":
    unittest.main()
