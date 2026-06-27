import hashlib
import json
import time
from typing import Any, Dict, Optional
from backend.core.config import settings

class AnalyticalCache:
    """
    Deterministic Query Fingerprint cache implementing high-performance local memory 
    storage with standard Time-To-Live (TTL) verification.
    """
    def __init__(self, ttl: int = settings.CACHE_TTL_SECONDS):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self.ttl = ttl

    def _generate_fingerprint(self, query_payload: Dict[str, Any]) -> str:
        """
        Creates a SHA-256 cryptographic signature representing the query structure.
        """
        # Sort keys to ensure deterministic serialization regardless of key order
        serialized = json.dumps(query_payload, sort_keys=True, default=str)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def get(self, query_payload: Dict[str, Any]) -> Optional[Any]:
        """
        Retrieves cached result if available and TTL is valid.
        """
        fingerprint = self._generate_fingerprint(query_payload)
        cached = self._cache.get(fingerprint)
        
        if not cached:
            return None
            
        # Check if the record is stale (TTL check)
        if time.time() - cached["timestamp"] > self.ttl:
            # Clean up stale record
            del self._cache[fingerprint]
            return None
            
        return cached["value"]

    def set(self, query_payload: Dict[str, Any], value: Any) -> str:
        """
        Stores structured analytical result in memory bound by TTL parameters.
        Returns the SHA-256 query fingerprint signature.
        """
        fingerprint = self._generate_fingerprint(query_payload)
        self._cache[fingerprint] = {
            "value": value,
            "timestamp": time.time()
        }
        return fingerprint

    def clear(self) -> None:
        """Clears the analytical cache space"""
        self._cache.clear()

# Global Singleton representing Redis-Style caching in local space
query_cache = AnalyticalCache()
