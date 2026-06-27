# ==============================================================================
# APERTURE ANALYTICS PLATFORM - MULTI-STAGE PRODUCTION DOCKERFILE
# ==============================================================================

# --- Stage 1: Client-Side React Asset Compilation ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app

# Copy package descriptors for optimal cache layering
COPY package*.json ./
RUN npm ci

# Copy full workspace and compile static web assets
COPY . .
RUN npm run build

# --- Stage 2: Unified Production High-Performance Runtime ---
FROM python:3.11-slim AS production-runtime
WORKDIR /app

# Install system dependencies if required for duckdb or compilation steps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install python-pip dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy backend application source
COPY backend ./backend

# Copy compiled frontend assets from Stage 1 into parent directory
COPY --from=frontend-builder /app/dist ./dist

# Create storage directories for telemetry Parquet cache
RUN mkdir -p /app/data

# Expose target entrypoint ports
EXPOSE 8000

# Set production environment flags
ENV NODE_ENV=production
ENV DATA_DIR=/app/data
ENV DATABASE_URL=sqlite:////app/data/aperture_telemetry.db

# Command starting unified FastAPI web and assets router
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
