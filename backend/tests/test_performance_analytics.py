import unittest
import time
import threading
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.core.database import Base
from backend.services.analytics_engine import AnalyticsEngineService
from backend.schemas.analytics import AnalyticsQuery, AggregationSpec, FilterCondition

class TestPerformanceAnalytics(unittest.TestCase):
    """
    Performance and Concurrency Tests focusing on latency benchmarks, cache benefits,
    and multi-threaded query execution stability.
    """

    @classmethod
    def setUpClass(cls):
        # Configure test DB
        cls.engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
        cls.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls.engine)
        Base.metadata.create_all(bind=cls.engine)

    def setUp(self):
        self.db = self.SessionLocal()
        self.service = AnalyticsEngineService(self.db)

    def tearDown(self):
        self.db.close()

    def test_cache_hit_performance_multiplier(self):
        # Define identical analytical query to run twice
        query = AnalyticsQuery(
            dataset_id="perf_telemetry",
            engine="duckdb",
            aggregations=[
                AggregationSpec(column="revenue", function="sum", alias="gross_rev")
            ],
            filters=[
                FilterCondition(column="country", operator="eq", value="US")
            ]
        )

        # Cold Execution (First query, triggers full parquet scan and calculations)
        cold_start = time.time()
        res_cold = self.service.execute_query(query, dataset_scale=2000)
        cold_duration = (time.time() - cold_start) * 1000

        # Warm Execution (Second identical query, resolved directly from memory cache)
        warm_start = time.time()
        res_warm = self.service.execute_query(query, dataset_scale=2000)
        warm_duration = (time.time() - warm_start) * 1000

        # Performance assertions
        self.assertFalse(res_cold.performance.cache_hit)
        self.assertTrue(res_warm.performance.cache_hit)
        
        # Cache resolution should be significantly faster than raw execution
        self.assertTrue(res_warm.performance.execution_time_ms < res_cold.performance.execution_time_ms)
        self.assertTrue(warm_duration < cold_duration)
        print(f"  [PERF MEASUREMENT] Cold Exec: {cold_duration:.2f}ms | Cached Exec: {warm_duration:.2f}ms")

    def test_engine_performance_comparison(self):
        # Measure latency between DuckDB and Polars engines for identical aggregates
        query_duck = AnalyticsQuery(
            engine="duckdb",
            aggregations=[
                AggregationSpec(column="latency_ms", function="avg", alias="avg_lat")
            ]
        )
        query_polars = AnalyticsQuery(
            engine="polars",
            aggregations=[
                AggregationSpec(column="latency_ms", function="avg", alias="avg_lat")
            ]
        )

        # Execute DuckDB (Scale 5000 rows)
        start_duck = time.time()
        res_duck = self.service.execute_query(query_duck, dataset_scale=5000)
        dur_duck = (time.time() - start_duck) * 1000

        # Execute Polars (Scale 5000 rows)
        start_polars = time.time()
        res_polars = self.service.execute_query(query_polars, dataset_scale=5000)
        dur_polars = (time.time() - start_polars) * 1000

        print(f"  [ENGINE COMPARISON] DuckDB: {dur_duck:.2f}ms | Polars: {dur_polars:.2f}ms")
        self.assertEqual(res_duck.total_rows, res_polars.total_rows)

    def test_concurrent_query_execution_safety(self):
        # Verifies thread safety when running high-frequency concurrent analytical requests
        num_threads = 10
        threads = []
        errors = []

        def worker_task(thread_id: int):
            db_session = self.SessionLocal()
            try:
                srv = AnalyticsEngineService(db_session)
                q = AnalyticsQuery(
                    engine="duckdb",
                    filters=[
                        FilterCondition(column="status", operator="eq", value=200)
                    ]
                )
                # Execute query against small scale dataset
                res = srv.execute_query(q, dataset_scale=1000)
                if len(res.data) < 0:
                    errors.append(f"Thread-{thread_id}: Unexpected empty data")
            except Exception as e:
                errors.append(f"Thread-{thread_id} failed: {str(e)}")
            finally:
                db_session.close()

        for i in range(num_threads):
            t = threading.Thread(target=worker_task, args=(i,))
            threads.append(t)
            t.start()

        for t in threads:
            t.join()

        # Check for any concurrency exceptions or race conditions
        self.assertEqual(len(errors), 0, f"Concurrency errors encountered: {errors}")

if __name__ == "__main__":
    unittest.main()
