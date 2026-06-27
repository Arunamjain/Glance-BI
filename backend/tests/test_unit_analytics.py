import unittest
import re
from backend.services.analytics_engine import (
    validate_column_identifier,
    validate_alias_identifier,
    AnalyticsEngineService
)
from backend.utils.optimizer import QueryOptimizer
from backend.schemas.analytics import (
    AnalyticsQuery,
    AggregationSpec,
    FilterCondition,
    OrderBySpec
)

class TestUnitAnalytics(unittest.TestCase):
    """
    Unit Tests focusing on Query validation guards, AST structure, and compilation estimators.
    """

    def test_column_identifier_validation(self):
        # Valid columns should return their name
        self.assertEqual(validate_column_identifier("timestamp"), "timestamp")
        self.assertEqual(validate_column_identifier("user_id"), "user_id")
        self.assertEqual(validate_column_identifier("revenue"), "revenue")

        # Invalid columns should throw ValueError to prevent SQL injection or schema leaks
        with self.assertRaises(ValueError):
            validate_column_identifier("password")
        with self.assertRaises(ValueError):
            validate_column_identifier("user_id; DROP TABLE query_history;")
        with self.assertRaises(ValueError):
            validate_column_identifier("1=1")

    def test_alias_identifier_validation(self):
        # Valid custom aliases (alphanumeric and underscore, must start with letter or underscore)
        self.assertEqual(validate_alias_identifier("total_revenue"), "total_revenue")
        self.assertEqual(validate_alias_identifier("avg_latency_2"), "avg_latency_2")
        self.assertEqual(validate_alias_identifier("_secret"), "_secret")

        # Invalid aliases with spaces, operators, semicolons, etc.
        with self.assertRaises(ValueError):
            validate_alias_identifier("total revenue")
        with self.assertRaises(ValueError):
            validate_alias_identifier("sum(revenue)")
        with self.assertRaises(ValueError):
            validate_alias_identifier("alias;--")

    def test_query_optimizer_projection_pushdown(self):
        # Build query AST requiring: user_id, status, revenue, and timestamp
        query = AnalyticsQuery(
            dataset_id="telemetry_events",
            engine="duckdb",
            aggregations=[
                AggregationSpec(column="revenue", function="sum", alias="total_rev")
            ],
            filters=[
                FilterCondition(column="status", operator="eq", value=200)
            ],
            group_by=["user_id"],
            order_by=[
                OrderBySpec(column="user_id", descending=True)
            ],
            date_column="timestamp",
            start_date="2026-06-01",
            end_date="2026-06-30"
        )

        required_cols = QueryOptimizer.get_required_columns(query)
        self.assertIn("revenue", required_cols)
        self.assertIn("status", required_cols)
        self.assertIn("user_id", required_cols)
        self.assertIn("timestamp", required_cols)
        self.assertEqual(len(required_cols), 4)

        # Confirm byte sizing calculation is sub-linear of full row size (projection pushdown)
        bytes_for_1m_rows = QueryOptimizer.calculate_bytes_processed(query, 1000000)
        # Sizing formula: Sum of COLUMN_SIZES for user_id(4), status(2), revenue(8), timestamp(8) = 22 bytes per row * 1M rows = 22,000,000 bytes
        self.assertEqual(bytes_for_1m_rows, 22000000)

    def test_query_optimizer_fallback_column(self):
        # Query with absolutely zero projection targets should fallback to 'user_id'
        empty_query = AnalyticsQuery()
        required_cols = QueryOptimizer.get_required_columns(empty_query)
        self.assertEqual(required_cols, {"user_id"})

    def test_query_optimizer_plan_explanation(self):
        query = AnalyticsQuery(
            dataset_id="telemetry_events",
            engine="duckdb",
            aggregations=[
                AggregationSpec(column="latency_ms", function="avg", alias="avg_latency")
            ],
            filters=[
                FilterCondition(column="status", operator="gt", value=300)
            ],
            date_column="timestamp",
            start_date="2026-06-15"
        )

        plan = QueryOptimizer.generate_plan_explanation(query)
        self.assertIn("[PHYSICAL PLAN OPTIMIZER]", plan)
        self.assertIn("PROJECTION PUSHDOWN", plan)
        self.assertIn("ZONE MAP INDEXING", plan)
        self.assertIn("StreamAggregation", plan)

if __name__ == "__main__":
    unittest.main()
