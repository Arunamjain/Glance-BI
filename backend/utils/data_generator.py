import os
import random
import time
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
from backend.core.config import settings
from backend.core.logging_config import logger

def ensure_data_directory():
    """Guarantees the target data directory exists on disk"""
    os.makedirs(settings.DATA_DIR, exist_ok=True)

def generate_parquet_dataset(filename: str = "telemetry_events.parquet", rows: int = 100000) -> str:
    """
    Generates a high-fidelity columnar Parquet database of events.
    Uses vectorized NumPy builders for massive execution speed.
    """
    ensure_data_directory()
    filepath = os.path.join(settings.DATA_DIR, filename)

    # If file exists and matches or exceeds requested size, reuse it to save disk IO
    if os.path.exists(filepath):
        try:
            import polars as pl
            metadata_size = pl.scan_parquet(filepath).select(pl.len()).collect().item()
            if metadata_size >= rows:
                return filepath
        except Exception:
            pass

    logger.info(f"Generating optimized Parquet dataset with {rows} rows at {filepath}...")
    start_time = time.time()

    # Seed for deterministic simulation parameters
    np.random.seed(42)

    # Temporal range generation
    start_date = datetime.now() - timedelta(days=30)
    timestamps = np.array([start_date + timedelta(seconds=int(x)) for x in np.random.randint(0, 30*24*3600, size=rows)])

    # Country & device distributions
    countries = np.random.choice(
        ["US", "GB", "DE", "FR", "JP", "IN", "BR", "CA", "AU"], 
        size=rows, 
        p=[0.30, 0.15, 0.10, 0.08, 0.12, 0.15, 0.05, 0.03, 0.02]
    )
    devices = np.random.choice(
        ["Desktop", "Mobile", "Tablet"], 
        size=rows, 
        p=[0.45, 0.45, 0.10]
    )
    event_types = np.random.choice(
        ["page_view", "click", "search", "purchase", "api_request"], 
        size=rows, 
        p=[0.40, 0.30, 0.15, 0.05, 0.10]
    )

    # Status codes (skewed heavily towards 200 SUCCESS)
    statuses = np.random.choice(
        [200, 301, 400, 404, 500], 
        size=rows, 
        p=[0.92, 0.03, 0.02, 0.02, 0.01]
    )

    # Latencies in milliseconds (log-normal distribution)
    latency_ms = np.random.lognormal(mean=4.2, sigma=0.8, size=rows).round(2)
    # Adjust latencies higher for errors
    latency_ms[statuses >= 500] *= 3.5

    # Revenue column, non-zero only for purchase events
    revenue = np.zeros(rows)
    purchases = (event_types == "purchase")
    revenue[purchases] = np.random.exponential(scale=45.0, size=np.sum(purchases)).round(2)

    user_ids = np.random.randint(1000, 50000, size=rows)

    df = pd.DataFrame({
        "timestamp": timestamps,
        "user_id": user_ids,
        "country": countries,
        "device": devices,
        "event_type": event_types,
        "latency_ms": latency_ms,
        "status": statuses,
        "revenue": revenue
    })

    # Sort on timestamps to enable optimized range filters and zone maps
    df = df.sort_values("timestamp").reset_index(drop=True)

    # Write out as highly compressed Snappy Parquet columns
    df.to_parquet(filepath, compression="snappy", index=False)
    
    elapsed = time.time() - start_time
    logger.info(f"Generated {rows} rows in {elapsed:.2f} seconds. File size: {os.path.getsize(filepath) / (1024*1024):.2f} MB")
    
    return filepath
