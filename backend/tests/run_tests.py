import unittest
import sys
import time

# Import tests directly to verify module path resolution
from backend.tests.test_unit_analytics import TestUnitAnalytics
from backend.tests.test_integration_analytics import TestIntegrationAnalytics
from backend.tests.test_api_analytics import TestAPIAnalytics
from backend.tests.test_performance_analytics import TestPerformanceAnalytics

def run_all_backend_tests():
    """
    Unified Test Runner compiling and executing all test modules, 
    measuring latency, and formatting results.
    """
    print("\n" + "="*60)
    print("    APERTURE ANALYTICAL COLUMN-STORE ENGINE: BACKEND TEST SUITE")
    print("="*60)
    
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Load all individual suites
    suite.addTests(loader.loadTestsFromTestCase(TestUnitAnalytics))
    suite.addTests(loader.loadTestsFromTestCase(TestIntegrationAnalytics))
    suite.addTests(loader.loadTestsFromTestCase(TestAPIAnalytics))
    suite.addTests(loader.loadTestsFromTestCase(TestPerformanceAnalytics))
    
    # Track execution timings
    start_time = time.time()
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    duration = time.time() - start_time
    
    print("\n" + "="*60)
    print("                      TEST EXECUTION SUMMARY                  ")
    print("="*60)
    print(f"  ● Tests Executed : {result.testsRun}")
    print(f"  ● Successful     : {result.testsRun - len(result.errors) - len(result.failures)}")
    print(f"  ● Failures       : {len(result.failures)}")
    print(f"  ● Errors         : {len(result.errors)}")
    print(f"  ● Total Duration : {duration:.2f} seconds")
    print("="*60)
    
    if not result.wasSuccessful():
        print("\n  ❌ STATE: SOME TESTS FAILED")
        sys.exit(1)
    else:
        print("\n  ✔ STATE: ALL TESTS PASSED SUCCESSFULLY!")
        sys.exit(0)

if __name__ == "__main__":
    run_all_backend_tests()
