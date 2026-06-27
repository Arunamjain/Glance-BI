# Aperture Analytical Column-Store Engine

A high-performance, real-time columnar analytics query engine built with **React**, **FastAPI**, **DuckDB**, and **Polars**. Aperture enables lightning-fast vectorized queries on multi-million row event telemetry datasets, featuring projection pushdown, zone map optimization, and SQL injection whitelisting.

---

## 🏗️ Technical Architecture & Design

Aperture's architecture decoupled into high-velocity layers to achieve maximum query execution speed:

```
                  ┌──────────────────────────────────────────────┐
                  │            React 19 / Vite Client            │
                  └──────┬────────────────────────────────┬──────┘
                         │                                │
            (Runs local simulation)              (Fetches engine metrics)
                         │                                │
                         ▼                                ▼
┌─────────────────────────────────────────┐     ┌─────────────────────────────────┐
│        Local Performance Estimator      │     │         FastAPI V1 Proxy        │
│    - Compilation Latency Modeling       │     │     - Schema validation guards  │
│    - Memory Consumption Calculations    │     │     - Fingerprint-based cache   │
└─────────────────────────────────────────┘     └────────────────┬────────────────┘
                                                                 │
                                                   (Delegates compiled query AST)
                                                                 │
                                                                 ▼
                                                ┌─────────────────────────────────┐
                                                │    AnalyticsEngineService       │
                                                │   - Whitelists column names     │
                                                │   - Pre-seeds telemetry Parquet │
                                                └────┬───────────────────────┬────┘
                                                     │                       │
                                          (DuckDB Vectorized SQL)    (Polars LazyFrames)
                                                     │                       │
                                                     ▼                       ▼
                                                ┌─────────┐             ┌─────────┐
                                                │ DuckDB  │             │ Polars  │
                                                │ Engine  │             │ Engine  │
                                                └─────────┘             └─────────┘
```

1. **Client-Side Platform (Vite + React 19 + Tailwind CSS v4)**: Fully modular view design featuring custom-styled cards, visual indicators, active charts (via Recharts), and real-time performance estimation hooks.
2. **Backend API Gateway (FastAPI)**: Handled by Uvicorn, implementing automatic DB provisioning, Pydantic data schemas, query optimization estimators, and analytical endpoints.
3. **Dual high-performance Engines**:
   - **DuckDB**: Executes columnar query operations (filters, group-bys, and aggregations) on Snappy-compressed Parquet files via a native vectorized C++ execution engine.
   - **Polars**: Executes query plans utilizing rust-powered, multithreaded, and lazy expression evaluation.
4. **Storage & Log Metadata Engine (SQLAlchemy + SQLite/PostgreSQL)**: Persists transactional query history and comparative analytical engine performance logs securely via a standard repository pattern.

---

## 🔒 Security Hardening

Aperture implements robust, multi-layered security protections:
- **Strict Identifier Whitelisting**: Standardizes column identifier lookups (`ALLOWED_COLUMNS`). Any reference not in the strict telemetry schema raises an HTTP 400 error.
- **Identifier Format Sanitization**: Rejects aliases or dataset names failing to match `^[a-zA-Z_][a-zA-Z0-9_]*$` alphanumeric expressions, precluding arbitrary SQL payload injections.
- **SQL Parametrization bindings**: Binds filter inputs safely into parameterized SQL arrays (`?` syntax in DuckDB), avoiding injection attacks on literal inputs.
- **Safety Denial-of-Service (DoS) Limits**: Restricts requested dataset sizes within 1,000 to 10,000,000 rows, preventing server resource starvation and memory exhaustion.

---

## 📈 Scalability & Optimization

The platform utilizes advanced OLAP optimizations:
- **Projection Pushdown (Column Pruning)**: Scans only the set of columns required to fulfill the query aggregations, group-by keys, filter predicates, and date bounds of the query, avoiding full table scans.
- **Zone Map Index Block Skipping**: Restricts date-column filters to specific Parquet metadata boundaries, skipping unrelated chunks (up to 33.3% parquet segments skipped).
- **Deterministic Fingerprint Cache**: Generates SHA-256 signatures representing the query AST to intercept redundant database calls and serve results in `<1ms`.

---

## 📂 Project Structure

```
.
├── .github/workflows/          # CI/CD Workflows
│   └── ci.yml                  # GitHub Actions pipeline
├── backend/                    # FastAPI Backend Service
│   ├── core/                   # Core Settings, Cache, and Logging
│   │   ├── cache.py            # SHA-256 fingerprint caching
│   │   ├── config.py           # Settings schema via Pydantic
│   │   ├── database.py         # SQLAlchemy connection pool setup
│   │   └── logging_config.py   # Structured StreamLogger
│   ├── models/                 # SQLAlchemy Entity Schema
│   ├── repositories/           # SQLAlchemy Repository Handlers
│   ├── routers/                # API Endpoints
│   ├── schemas/                # Pydantic Query and KPI Definitions
│   ├── services/               # Core Analytics Engine Service
│   ├── tests/                  # Backend Pytest verification suite
│   ├── utils/                  # Query AST and Data Generation
│   └── requirements.txt        # Backend dependencies
├── src/                        # React Frontend Source
│   ├── features/               # Modular Feature Components & Views
│   │   ├── market/             # Market & Competitor Analysis
│   │   ├── perf/               # Interactive Query Analytics Console
│   │   └── visualizer/         # Dataflow Architecture Visualizer
│   ├── shared/                 # Universal UI/UX Shared Layout Components
│   └── main.tsx                # Client app entrypoint
├── Dockerfile                  # Multi-Stage Optimized Docker Configuration
├── docker-compose.yml          # Container Orchestration Composer
├── package.json                # Frontend package dependencies & runners
└── vite.config.ts              # Vite server & proxy configs
```

---

## 🚀 Local Development

### 1. Prerequisites
Ensure you have the following installed locally:
- **Node.js (v18+)**
- **Python (3.10+)**

### 2. Run the Backend Service
Create and activate a Python virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```
Install backend dependencies:
```bash
pip install -r backend/requirements.txt
```
Launch the FastAPI development server:
```bash
python3 -m uvicorn backend.main:app --reload --port 8000
```

### 3. Run the Frontend Client
Install node dependencies:
```bash
npm install
```
Start the Vite development proxy server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Automated Testing Suite

Aperture includes a high-coverage test suite across the full-stack architecture.

### 1. Run Backend Tests
Run the Python pytest battery covering unit logic, database integrations, API endpoints, and engine concurrency checks:
```bash
npm run test:backend
```

### 2. Run Frontend Tests
Run the TypeScript tests checking UI filter techniques, analytical hooks, and user state flow machine models:
```bash
npm run test:client
```

### 3. Run All Tests
Run all test suites in a single command:
```bash
npm test
```

---

## 🐳 Docker Deployment

Deploy the entire full-stack application as a unified, optimized container via Docker:

### 1. Build and Run via Docker Compose
Simply run the following command in the root folder:
```bash
docker compose up --build
```
This command automatically:
1. Compiles all React client production assets.
2. Bundles the compiled assets into the Python container.
3. Serves the entire web console and FastAPI endpoints concurrently on [http://localhost:8000](http://localhost:8000).

### 2. Persistent Storage Volume
All generated telemetry datasets and query performance databases are persistently stored inside the `aperture_data` docker volume, preventing data losses during container reboots.
