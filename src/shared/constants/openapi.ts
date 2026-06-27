export interface APIEndpoint {
  id: string;
  category: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  summary: string;
  description: string;
  headers: { name: string; required: boolean; type: string; description: string; example: string }[];
  queryParams?: { name: string; required: boolean; type: string; description: string; example?: string }[];
  requestBody?: string; // formatted JSON representation
  validationRules?: string[];
  responseSuccess: string; // formatted JSON
  responseError: string; // RFC 7807 JSON representation
  curlExample: string;
}

export const apiCategories = [
  { id: 'auth', name: 'Authentication' },
  { id: 'dashboards', name: 'Dashboards' },
  { id: 'charts', name: 'Charts & Tiles' },
  { id: 'visualizations', name: 'Visualization Templates' },
  { id: 'query', name: 'OLAP Query Engine' },
  { id: 'exports', name: 'Asynchronous Exports' },
  { id: 'users', name: 'User Management' },
  { id: 'roles', name: 'RBAC Roles & Policies' },
  { id: 'settings', name: 'Workspace Settings' },
  { id: 'webhooks', name: 'Webhook Subscriptions' },
  { id: 'scheduler', name: 'Ingest Scheduler' },
  { id: 'notifications', name: 'Notification Alerts' },
];

export const errorSchemaExample = `{
  "type": "https://aperture.sh/errors/unprocessable-entity",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The request body failed structural schema validation constraints.",
  "instance": "/api/v1/dashboards",
  "code": "VAL_001",
  "timestamp": "2026-06-27T08:06:41Z",
  "invalid_params": [
    {
      "name": "name",
      "reason": "Workspace dashboard name must be between 3 and 100 characters."
    },
    {
      "name": "config.layout",
      "reason": "Layout configuration must define valid width and height values."
    }
  ]
}`;

export const apiEndpoints: APIEndpoint[] = [
  {
    id: 'auth-login',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/login',
    summary: 'Authenticate Session',
    description: 'Exchange client credentials or corporate passport keys for an encrypted JWT session bearer payload. Sets secure HttpOnly cookie.',
    headers: [
      { name: 'Content-Type', required: true, type: 'string', description: 'Request format descriptor', example: 'application/json' },
      { name: 'X-Correlation-ID', required: false, type: 'string', description: 'Tracing identifier UUID', example: 'f39281a1-9b42-45e0-b605-7264a9388df2' }
    ],
    requestBody: `{
  "email": "analyst.amanda@company.com",
  "password": "pA$$w0rd_complex_992",
  "mfa_token": "492102"
}`,
    validationRules: [
      'email: Required, valid RFC 5322 address layout, max length 255.',
      'password: Required, minimum 12 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special symbol.',
      'mfa_token: Optional, 6-digit numeric string for accounts with 2FA enabled.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "token_type": "Bearer",
    "user": {
      "id": "usr_94f28a9c",
      "email": "analyst.amanda@company.com",
      "name": "Amanda Vance",
      "role": "analyst",
      "workspace_id": "ws_aperture_devs"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Invalid Credentials",
  "status": 401,
  "detail": "The provided email or password does not match any registered workspace account.",
  "instance": "/api/v1/auth/login",
  "code": "AUTH_002",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -H "X-Correlation-ID: f39281a1-9b42-45e0-b605-7264a9388df2" \\
  -d '{
    "email": "analyst.amanda@company.com",
    "password": "pA$$w0rd_complex_992",
    "mfa_token": "492102"
  }'`
  },
  {
    id: 'auth-logout',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/logout',
    summary: 'Revoke JWT Session',
    description: 'Blacklists active JWT token and invalidates workspace cookies to gracefully end the user session.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'X-Correlation-ID', required: false, type: 'string', description: 'Tracing identifier UUID', example: 'f39281a1-9b42-45e0-b605-7264a9388df2' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "Session invalidated successfully."
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Unauthenticated Request",
  "status": 401,
  "detail": "The Authorization bearer token is missing, expired, or invalid.",
  "instance": "/api/v1/auth/logout",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/auth/logout \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "X-Correlation-ID: f39281a1-9b42-45e0-b605-7264a9388df2"`
  },
  {
    id: 'auth-refresh',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/refresh',
    summary: 'Rotate Refresh Token',
    description: 'Submits an active refresh token to obtain a fresh access token (JWT Rotation pattern to enforce security boundaries).',
    headers: [
      { name: 'Content-Type', required: true, type: 'string', description: 'Request format descriptor', example: 'application/json' }
    ],
    requestBody: `{
  "refresh_token": "ref_932f8a1a9f02c48e8a9bc0"
}`,
    validationRules: [
      'refresh_token: Required, string, valid active cryptographically secure token UUID.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfOTRmMjhhOWMi...",
    "refresh_token": "ref_48d2fa910d32cb8491cda2",
    "expires_in": 3600
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/forbidden",
  "title": "Token Rotation Denied",
  "status": 403,
  "detail": "The submitted refresh token is invalid or has already been used.",
  "instance": "/api/v1/auth/refresh",
  "code": "AUTH_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{
    "refresh_token": "ref_932f8a1a9f02c48e8a9bc0"
  }'`
  },
  {
    id: 'auth-sso',
    category: 'auth',
    method: 'POST',
    path: '/api/v1/auth/sso/callback',
    summary: 'SSO OIDC Callback',
    description: 'Processes corporate authorization codes returned by Okta or Google Workspace identities. Generates user workspace memberships.',
    headers: [
      { name: 'Content-Type', required: true, type: 'string', description: 'Request format descriptor', example: 'application/json' }
    ],
    requestBody: `{
  "provider": "okta",
  "code": "okta_auth_code_921a8f9c2d",
  "state": "random_security_state_99201"
}`,
    validationRules: [
      'provider: Required, must be either "okta" or "google".',
      'code: Required, active OIDC authorization code string.',
      'state: Required, security state string to check CSRF alignment.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_sso_84d2f",
      "email": "executive.ethan@corporate.com",
      "name": "Ethan Hunt",
      "role": "viewer"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/bad-request",
  "title": "State Mismatch",
  "status": 400,
  "detail": "The callback state validation parameter does not match the session CSRF reference.",
  "instance": "/api/v1/auth/sso/callback",
  "code": "SEC_002",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/auth/sso/callback \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "okta",
    "code": "okta_auth_code_921a8f9c2d",
    "state": "random_security_state_99201"
  }'`
  },
  {
    id: 'dash-list',
    category: 'dashboards',
    method: 'GET',
    path: '/api/v1/dashboards',
    summary: 'List Workspace Dashboards',
    description: 'Retrieves a list of analytical dashboards configured inside the workspace. Implements advanced pagination, multi-column sorting, schema filters, and fuzzy string search.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    queryParams: [
      { name: 'page', required: false, type: 'integer', description: 'Page offset indicator (default: 1)', example: '1' },
      { name: 'limit', required: false, type: 'integer', description: 'Items returned per page index (default: 20, max: 100)', example: '15' },
      { name: 'sort_by', required: false, type: 'string', description: 'Column key sorting target', example: 'updated_at' },
      { name: 'order', required: false, type: 'string', description: 'Sort sequence order (asc, desc)', example: 'desc' },
      { name: 'filters[status]', required: false, type: 'string', description: 'Filters dashboard deployment status (active, draft, archived)', example: 'active' },
      { name: 'q', required: false, type: 'string', description: 'Fuzzy string search across names, descriptions, or tags', example: 'Sales Performance' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "dashboards": [
      {
        "id": "dash_sales_99a",
        "name": "Global Sales Performance",
        "description": "Cross-filtered analysis tracking corporate checkout funnels and regional metrics.",
        "status": "active",
        "creator_id": "usr_94f28a9c",
        "created_at": "2026-01-14T08:30:00Z",
        "updated_at": "2026-06-25T14:22:15Z",
        "version": 4,
        "tags": ["sales", "parquet", "financials"]
      }
    ],
    "pagination": {
      "total_records": 48,
      "total_pages": 4,
      "current_page": 1,
      "limit": 15,
      "links": {
        "self": "/api/v1/dashboards?page=1&limit=15&sort_by=updated_at&order=desc",
        "next": "/api/v1/dashboards?page=2&limit=15&sort_by=updated_at&order=desc",
        "prev": null,
        "last": "/api/v1/dashboards?page=4&limit=15&sort_by=updated_at&order=desc"
      }
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/bad-request",
  "title": "Invalid Parameters",
  "status": 400,
  "detail": "The 'limit' parameter exceeded maximum bounds (100).",
  "instance": "/api/v1/dashboards",
  "code": "PARAM_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET "https://api.aperture.sh/v1/dashboards?page=1&limit=15&sort_by=updated_at&order=desc&q=Sales" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'dash-create',
    category: 'dashboards',
    method: 'POST',
    path: '/api/v1/dashboards',
    summary: 'Create Dashboard Spec',
    description: 'Registers a new declarative dashboard config mapping in the system. Receives a structured layout and dynamic column aggregation bindings.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "name": "Cluster Telemetry Monitor",
  "description": "Tracks vectorized ingestion performance on Docker node targets.",
  "status": "active",
  "config": {
    "refresh_rate_sec": 30,
    "layout": {
      "grid_columns": 12,
      "tiles": [
        { "id": "tile_avg_lat", "chart_id": "ch_latency_99", "w": 4, "h": 3, "x": 0, "y": 0 }
      ]
    }
  },
  "tags": ["ops", "telemetry"]
}`,
    validationRules: [
      'name: Required, string, 3 to 100 characters.',
      'description: Optional, string, max 255 characters.',
      'status: Required, enum [active, draft, archived].',
      'config.refresh_rate_sec: Required, integer between 5 and 3600.',
      'config.layout.tiles: Required array, minimum 1 active tile element mapping.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "dashboard": {
      "id": "dash_ops_84a",
      "name": "Cluster Telemetry Monitor",
      "status": "active",
      "config": {
        "refresh_rate_sec": 30,
        "layout": { "grid_columns": 12, "tiles": [{ "id": "tile_avg_lat", "chart_id": "ch_latency_99", "w": 4, "h": 3, "x": 0, "y": 0 }] }
      },
      "created_at": "2026-06-27T08:06:41Z",
      "updated_at": "2026-06-27T08:06:41Z",
      "version": 1
    }
  }
}`,
    responseError: errorSchemaExample,
    curlExample: `curl -X POST https://api.aperture.sh/v1/dashboards \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Cluster Telemetry Monitor",
    "description": "Tracks vectorized ingestion performance on Docker node targets.",
    "status": "active",
    "config": {
      "refresh_rate_sec": 30,
      "layout": {
        "grid_columns": 12,
        "tiles": [
          { "id": "tile_avg_lat", "chart_id": "ch_latency_99", "w": 4, "h": 3, "x": 0, "y": 0 }
        ]
      }
    },
    "tags": ["ops", "telemetry"]
  }'`
  },
  {
    id: 'dash-get',
    category: 'dashboards',
    method: 'GET',
    path: '/api/v1/dashboards/{id}',
    summary: 'Retrieve Dashboard Details',
    description: 'Fetch the comprehensive layout specifications, configured visual tags, metadata metrics, and authorization boundaries of a targeted dashboard.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "dashboard": {
      "id": "dash_sales_99a",
      "name": "Global Sales Performance",
      "description": "Cross-filtered analysis tracking corporate checkout funnels and regional metrics.",
      "status": "active",
      "config": {
        "refresh_rate_sec": 60,
        "layout": {
          "grid_columns": 12,
          "tiles": [
            { "id": "tile_revenue", "chart_id": "ch_rev_01", "w": 6, "h": 4, "x": 0, "y": 0 },
            { "id": "tile_conversion", "chart_id": "ch_conv_02", "w": 6, "h": 4, "x": 6, "y": 0 }
          ]
        }
      },
      "created_at": "2026-01-14T08:30:00Z",
      "updated_at": "2026-06-25T14:22:15Z",
      "version": 4
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Dashboard Not Found",
  "status": 404,
  "detail": "No dashboard matching identifier 'dash_sales_99x' exists in this active workspace.",
  "instance": "/api/v1/dashboards/dash_sales_99x",
  "code": "DASH_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/dashboards/dash_sales_99a \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'dash-update',
    category: 'dashboards',
    method: 'PUT',
    path: '/api/v1/dashboards/{id}',
    summary: 'Update Dashboard Configuration',
    description: 'Performs a full schema update of layout attributes, configuration options, refresh loops, and aggregate settings. Auto-increments version tracers.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "name": "Global Sales Performance v2",
  "description": "Updated revenue funnel with direct Parquet indexing targets.",
  "status": "active",
  "config": {
    "refresh_rate_sec": 120,
    "layout": {
      "grid_columns": 12,
      "tiles": [
        { "id": "tile_revenue_new", "chart_id": "ch_rev_01", "w": 8, "h": 4, "x": 0, "y": 0 }
      ]
    }
  }
}`,
    validationRules: [
      'name: Required, 3 to 100 characters.',
      'status: Required, enum [active, draft, archived].',
      'config: Required object containing complete layout tile configurations.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "dashboard": {
      "id": "dash_sales_99a",
      "name": "Global Sales Performance v2",
      "status": "active",
      "config": {
        "refresh_rate_sec": 120,
        "layout": { "grid_columns": 12, "tiles": [{ "id": "tile_revenue_new", "chart_id": "ch_rev_01", "w": 8, "h": 4, "x": 0, "y": 0 }] }
      },
      "updated_at": "2026-06-27T08:06:41Z",
      "version": 5
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/conflict",
  "title": "Optimistic Locking Failure",
  "status": 409,
  "detail": "The dashboard has been updated by another user process. Reload configuration and submit again.",
  "instance": "/api/v1/dashboards/dash_sales_99a",
  "code": "SEC_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X PUT https://api.aperture.sh/v1/dashboards/dash_sales_99a \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Global Sales Performance v2",
    "description": "Updated revenue funnel with direct Parquet indexing targets.",
    "status": "active",
    "config": {
      "refresh_rate_sec": 120,
      "layout": {
        "grid_columns": 12,
        "tiles": [
          { "id": "tile_revenue_new", "chart_id": "ch_rev_01", "w": 8, "h": 4, "x": 0, "y": 0 }
        ]
      }
    }
  }'`
  },
  {
    id: 'dash-delete',
    category: 'dashboards',
    method: 'DELETE',
    path: '/api/v1/dashboards/{id}',
    summary: 'Delete Dashboard Reference',
    description: 'Permanently unregisters a dashboard and its component tile links from the active database repository.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "Dashboard successfully unregistered."
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Target dashboard does not exist or has already been deleted.",
  "instance": "/api/v1/dashboards/dash_not_exist",
  "code": "DASH_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X DELETE https://api.aperture.sh/v1/dashboards/dash_sales_99a \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'chart-list',
    category: 'charts',
    method: 'GET',
    path: '/api/v1/charts',
    summary: 'List Workspace Charts',
    description: 'Fetch the library of analytical charts configured in the workspace with complete metadata pagination and filters.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    queryParams: [
      { name: 'page', required: false, type: 'integer', description: 'Offset page indicator', example: '1' },
      { name: 'limit', required: false, type: 'integer', description: 'Items per index', example: '20' },
      { name: 'filters[type]', required: false, type: 'string', description: 'Filter by visual rendering block (bar, line, scatter, table)', example: 'bar' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "charts": [
      {
        "id": "ch_rev_01",
        "name": "Monthly Ingest Revenue",
        "type": "bar",
        "source_id": "src_clickhouse_01",
        "query_template": "SELECT date_trunc('month', timestamp) as mnth, sum(revenue) FROM billing GROUP BY 1",
        "visual_options": {
          "colors": ["#6366F1"],
          "show_legend": true
        }
      }
    ],
    "pagination": { "total_records": 12, "total_pages": 1, "current_page": 1, "limit": 20 }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Authentication Failed",
  "status": 401,
  "detail": "Failed to decrypt active session token payload.",
  "instance": "/api/v1/charts",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET "https://api.aperture.sh/v1/charts?filters[type]=bar" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'chart-create',
    category: 'charts',
    method: 'POST',
    path: '/api/v1/charts',
    summary: 'Register Chart Config',
    description: 'Registers a new analytical visualization chart tied to an active columnar source index or connection target.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "name": "Regional Traffic Scatter",
  "type": "scatter",
  "source_id": "src_clickhouse_01",
  "query_template": "SELECT latency, payload_size, region FROM request_trace",
  "visual_options": {
    "colors": ["#818CF8", "#F43F5E"],
    "show_legend": true,
    "x_axis_field": "latency",
    "y_axis_field": "payload_size"
  }
}`,
    validationRules: [
      'name: Required, 3 to 100 characters.',
      'type: Required, enum [bar, line, scatter, table, area, pie].',
      'source_id: Required, active data source connection reference ID.',
      'query_template: Required, valid SQL string executing column dimensions.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "chart": {
      "id": "ch_traffic_02",
      "name": "Regional Traffic Scatter",
      "type": "scatter",
      "source_id": "src_clickhouse_01",
      "created_at": "2026-06-27T08:06:41Z"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/bad-request",
  "title": "Broken Source Target",
  "status": 400,
  "detail": "Data source ID 'src_clickhouse_01' does not match any registered connection.",
  "instance": "/api/v1/charts",
  "code": "SRC_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/charts \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Regional Traffic Scatter",
    "type": "scatter",
    "source_id": "src_clickhouse_01",
    "query_template": "SELECT latency, payload_size, region FROM request_trace",
    "visual_options": {
      "colors": ["#818CF8", "#F43F5E"],
      "show_legend": true,
      "x_axis_field": "latency",
      "y_axis_field": "payload_size"
    }
  }'`
  },
  {
    id: 'chart-get',
    category: 'charts',
    method: 'GET',
    path: '/api/v1/charts/{id}',
    summary: 'Retrieve Chart Configuration',
    description: 'Fetch visual dimensions, options, queries, and connection mapping details for a specific chart.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "chart": {
      "id": "ch_rev_01",
      "name": "Monthly Ingest Revenue",
      "type": "bar",
      "source_id": "src_clickhouse_01",
      "query_template": "SELECT date_trunc('month', timestamp) as mnth, sum(revenue) FROM billing GROUP BY 1",
      "visual_options": {
        "colors": ["#6366F1"],
        "show_legend": true
      }
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Chart Definition Missing",
  "status": 404,
  "detail": "The requested chart configuration does not exist in this database namespace.",
  "instance": "/api/v1/charts/ch_rev_01x",
  "code": "CH_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/charts/ch_rev_01 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'chart-update',
    category: 'charts',
    method: 'PUT',
    path: '/api/v1/charts/{id}',
    summary: 'Modify Chart Parameters',
    description: 'Enforces complete updates on column mappings, queries, coloring configurations, and title dimensions.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "name": "Monthly Revenue Funnels (Adjusted)",
  "type": "bar",
  "source_id": "src_clickhouse_01",
  "query_template": "SELECT date_trunc('month', timestamp) as mnth, sum(revenue) as total_rev FROM billing GROUP BY 1",
  "visual_options": { "colors": ["#4F46E5"] }
}`,
    validationRules: [
      'name: Required, 3 to 100 characters.',
      'type: Required, valid visual chart type indicator.',
      'query_template: Required, valid aggregation query.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "chart": {
      "id": "ch_rev_01",
      "name": "Monthly Revenue Funnels (Adjusted)",
      "updated_at": "2026-06-27T08:06:41Z"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unprocessable-entity",
  "title": "SQL Syntax Error",
  "status": 422,
  "detail": "The SQL query in query_template has structural parsing syntax issues.",
  "instance": "/api/v1/charts/ch_rev_01",
  "code": "VAL_002",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X PUT https://api.aperture.sh/v1/charts/ch_rev_01 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Monthly Revenue Funnels (Adjusted)",
    "type": "bar",
    "source_id": "src_clickhouse_01",
    "query_template": "SELECT date_trunc('month', timestamp) as mnth, sum(revenue) as total_rev FROM billing GROUP BY 1",
    "visual_options": { "colors": ["#4F46E5"] }
  }'`
  },
  {
    id: 'chart-delete',
    category: 'charts',
    method: 'DELETE',
    path: '/api/v1/charts/{id}',
    summary: 'Delete Chart Blueprint',
    description: 'Safely removes the chart definition. Erases dependent tile map bindings.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "Chart definition successfully deleted."
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/conflict",
  "title": "Reference Dependency Constraint",
  "status": 409,
  "detail": "Cannot delete chart 'ch_rev_01' because it is actively bound to dashboard 'dash_sales_99a'. Remove from layout first.",
  "instance": "/api/v1/charts/ch_rev_01",
  "code": "DEP_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X DELETE https://api.aperture.sh/v1/charts/ch_rev_01 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'vis-templates',
    category: 'visualizations',
    method: 'GET',
    path: '/api/v1/visualizations/templates',
    summary: 'List Visualization Templates',
    description: 'Fetch the active library of reusable layouts, styling skins, grid dimensions, and custom CSS variables configured in the design system.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "templates": [
      {
        "id": "tpl_linear_dark",
        "name": "Linear Twilight Aesthetic",
        "css_variables": {
          "background": "#06080F",
          "card": "#0D111A",
          "accent": "#818CF8"
        },
        "is_default": true
      }
    ]
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Access Blocked",
  "status": 401,
  "detail": "Bearer session authentication has expired.",
  "instance": "/api/v1/visualizations/templates",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/visualizations/templates \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'vis-render',
    category: 'visualizations',
    method: 'POST',
    path: '/api/v1/visualizations/render',
    summary: 'Compile High-Fidelity SVG Visual',
    description: 'Processes a raw visual configuration structure, dimensions, and dataset coordinates, generating a pristine SVG representation.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "template_id": "tpl_linear_dark",
  "width": 600,
  "height": 400,
  "dataset": [
    { "x": "2026-01", "y": 94200 },
    { "x": "2026-02", "y": 105800 }
  ],
  "visual_mapping": {
    "x_axis": "x",
    "y_axis": "y",
    "stroke": "#818CF8",
    "fill": "rgba(129, 140, 248, 0.1)"
  }
}`,
    validationRules: [
      'template_id: Required, valid system visualization template ID.',
      'width: Required, integer between 100 and 3840.',
      'height: Required, integer between 100 and 2160.',
      'dataset: Required array of key-value data mappings.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "svg": "<svg width=\\"600\\" height=\\"400\\" viewBox=\\"0 0 600 400\\"...><path d=\\"M 50 350 L 550 50\\"... /></svg>",
    "checksum": "sha256_94fa8cd92b0..."
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unprocessable-entity",
  "title": "Invalid Render Specs",
  "status": 422,
  "detail": "The dimensions provided exceed the default rendering boundary ratios.",
  "instance": "/api/v1/visualizations/render",
  "code": "VAL_003",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/visualizations/render \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "template_id": "tpl_linear_dark",
    "width": 600,
    "height": 400,
    "dataset": [{ "x": "2026-01", "y": 94200 }, { "x": "2026-02", "y": 105800 }],
    "visual_mapping": { "x_axis": "x", "y_axis": "y", "stroke": "#818CF8", "fill": "rgba(129, 140, 248, 0.1)" }
  }'`
  },
  {
    id: 'query-execute',
    category: 'query',
    method: 'POST',
    path: '/api/v1/query/execute',
    summary: 'Execute OLAP Analytical Query',
    description: 'Submits parameterized query specifications to the embedded analytical DuckDB core (or ClickHouse cluster). Implements extreme vector-speed data filters, aggregations, and sub-second cross-filtering.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "source_id": "src_clickhouse_01",
  "raw_sql": "SELECT region, count(id) as total_requests, avg(latency_ms) as latency FROM telemetry_log WHERE timestamp >= ? AND timestamp <= ? GROUP BY region",
  "parameters": ["2026-06-26T00:00:00Z", "2026-06-27T00:00:00Z"],
  "options": {
    "use_cache": true,
    "timeout_ms": 15000,
    "max_rows": 500
  }
}`,
    validationRules: [
      'source_id: Required, valid active data source reference.',
      'raw_sql: Required, valid ANSI-compliant analytical SQL string with question-mark parameter binders.',
      'parameters: Optional array, sequence of inputs matching the binders.',
      'options.max_rows: Optional, integer between 1 and 50000.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "execution_time_ms": 14.28,
    "cache_hit": true,
    "columns": [
      { "name": "region", "type": "VARCHAR" },
      { "name": "total_requests", "type": "BIGINT" },
      { "name": "latency", "type": "DOUBLE" }
    ],
    "rows": [
      ["us-west-1", 49201, 14.2],
      ["eu-west-1", 38402, 18.5]
    ],
    "total_rows": 2
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/bad-request",
  "title": "SQL Syntax Failure",
  "status": 400,
  "detail": "Table 'telemetry_log_missing' does not exist in source schema context.",
  "instance": "/api/v1/query/execute",
  "code": "SQL_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/query/execute \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "source_id": "src_clickhouse_01",
    "raw_sql": "SELECT region, count(id) as total_requests, avg(latency_ms) as latency FROM telemetry_log WHERE timestamp >= ? AND timestamp <= ? GROUP BY region",
    "parameters": ["2026-06-26T00:00:00Z", "2026-06-27T00:00:00Z"]
  }'`
  },
  {
    id: 'query-explain',
    category: 'query',
    method: 'POST',
    path: '/api/v1/query/explain',
    summary: 'Explain Query Plan Tracing',
    description: 'Performs syntax validation and returns the query parsing plan, AST structure, index matching, and step execution estimate tracers.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "source_id": "src_clickhouse_01",
  "raw_sql": "SELECT avg(latency_ms) FROM telemetry_log"
}`,
    responseSuccess: `{
  "status": "success",
  "data": {
    "ast": { "type": "SelectStatement", "select_list": [...] },
    "execution_plan": "└─ PhysicalOperator: Projection\\n   └─ PhysicalOperator: HashAggregate\\n      └─ PhysicalOperator: ColumnarScan (table: telemetry_log, columns: [latency_ms])",
    "estimated_scanned_bytes": 4194304,
    "optimized_sql": "SELECT avg(latency_ms) FROM telemetry_log"
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Access Blocked",
  "status": 401,
  "detail": "Failed session permissions mapping check.",
  "instance": "/api/v1/query/explain",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/query/explain \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "source_id": "src_clickhouse_01",
    "raw_sql": "SELECT avg(latency_ms) FROM telemetry_log"
  }'`
  },
  {
    id: 'query-translate',
    category: 'query',
    method: 'POST',
    path: '/api/v1/query/translate',
    summary: 'Translate Natural Language to SQL',
    description: 'Utilizes our privacy-first, schema-only LLM bridge. Translates simple user questions into robust DuckDB SQL. Secure: only transmits metadata schemas to language models.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "prompt": "Show me the average query latency for us-west region yesterday grouped by timestamp",
  "source_id": "src_clickhouse_01"
}`,
    validationRules: [
      'prompt: Required, string, 10 to 500 characters.',
      'source_id: Required, active data source connection reference.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "sql": "SELECT date_trunc('hour', timestamp) AS hr, avg(latency_ms) AS avg_lat FROM telemetry_log WHERE region = 'us-west' AND timestamp >= current_date - 1 GROUP BY hr ORDER BY hr ASC",
    "explanation": "Extracted 'us-west' filter for the 'region' column, rounded 'timestamp' to hourly intervals, aggregated average 'latency_ms', and filtered for yesterday.",
    "confidence_score": 0.96
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/bad-request",
  "title": "Translation Refused",
  "status": 400,
  "detail": "The prompt contains ambiguous references. Specify columns or schemas.",
  "instance": "/api/v1/query/translate",
  "code": "AI_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/query/translate \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Show me the average query latency for us-west region yesterday grouped by timestamp",
    "source_id": "src_clickhouse_01"
  }'`
  },
  {
    id: 'export-create',
    category: 'exports',
    method: 'POST',
    path: '/api/v1/exports',
    summary: 'Enqueue Asynchronous Export Task',
    description: 'Enqueues a background rendering job compiling data into PDF or raw row-level CSV/Parquet formats. Returns an active task ID tracker immediately.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "dashboard_id": "dash_sales_99a",
  "format": "pdf",
  "options": {
    "page_size": "A4",
    "orientation": "portrait",
    "include_filters": true
  }
}`,
    validationRules: [
      'dashboard_id: Required, active dashboard ID.',
      'format: Required, enum [pdf, csv, parquet, xlsx].',
      'options.page_size: Required if format is pdf, enum [A4, Letter, A3].'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "task_id": "task_exp_92c10a32",
    "status": "queued",
    "format": "pdf",
    "created_at": "2026-06-27T08:06:41Z"
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Role Permission Missing",
  "status": 401,
  "detail": "The 'viewer' role does not have authorization to trigger data exports.",
  "instance": "/api/v1/exports",
  "code": "AUTH_003",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/exports \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "dashboard_id": "dash_sales_99a",
    "format": "pdf",
    "options": { "page_size": "A4", "orientation": "portrait", "include_filters": true }
  }'`
  },
  {
    id: 'export-status',
    category: 'exports',
    method: 'GET',
    path: '/api/v1/exports/{task_id}',
    summary: 'Poll Export Job Status',
    description: 'Retrieves active polling tracking metrics, build percentages, status flags, and final download secure S3 URL locations upon completion.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "task_id": "task_exp_92c10a32",
    "status": "completed",
    "progress_percent": 100,
    "completed_at": "2026-06-27T08:07:05Z",
    "download_url": "https://s3.aperture.sh/exports/dash_sales_99a_20260627.pdf?X-Amz-Signature=...",
    "expires_at": "2026-06-28T08:07:05Z"
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Task Not Found",
  "status": 404,
  "detail": "No active export job matched identifier 'task_exp_92c10a32x'.",
  "instance": "/api/v1/exports/task_exp_92c10a32x",
  "code": "TASK_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/exports/task_exp_92c10a32 \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'user-list',
    category: 'users',
    method: 'GET',
    path: '/api/v1/users',
    summary: 'List Workspace Users',
    description: 'Fetch list of registered users in the active workspace. Implements searching, pagination, sorting, and filter categories.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    queryParams: [
      { name: 'page', required: false, type: 'integer', description: 'Page count', example: '1' },
      { name: 'limit', required: false, type: 'integer', description: 'User caps', example: '10' },
      { name: 'sort_by', required: false, type: 'string', description: 'Sort criteria', example: 'name' },
      { name: 'filters[role]', required: false, type: 'string', description: 'Filter role boundaries', example: 'admin' },
      { name: 'q', required: false, type: 'string', description: 'Search across names or emails', example: 'Amanda' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "users": [
      {
        "id": "usr_94f28a9c",
        "email": "analyst.amanda@company.com",
        "name": "Amanda Vance",
        "role": "analyst",
        "status": "active"
      }
    ],
    "pagination": { "total_records": 4, "total_pages": 1, "current_page": 1, "limit": 10 }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/forbidden",
  "title": "Access Forbidden",
  "status": 403,
  "detail": "Only admin users are allowed to execute user directory lookups.",
  "instance": "/api/v1/users",
  "code": "AUTH_003",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET "https://api.aperture.sh/v1/users?q=Amanda" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'user-create',
    category: 'users',
    method: 'POST',
    path: '/api/v1/users',
    summary: 'Invite Workspace Colleague',
    description: 'Enqueues workspace invitation triggers. Registers draft profile records.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "email": "developer.dan@company.com",
  "name": "Dan Cooper",
  "role": "analyst"
}`,
    validationRules: [
      'email: Required, valid RFC 5322 structure.',
      'name: Required, 2 to 100 characters.',
      'role: Required, valid active system role.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "user": {
      "id": "usr_73a21bc9",
      "email": "developer.dan@company.com",
      "name": "Dan Cooper",
      "role": "analyst",
      "status": "pending_invite"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/conflict",
  "title": "Email Already Exists",
  "status": 409,
  "detail": "Email 'developer.dan@company.com' has already been invited to this workspace.",
  "instance": "/api/v1/users",
  "code": "USER_002",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/users \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "developer.dan@company.com",
    "name": "Dan Cooper",
    "role": "analyst"
  }'`
  },
  {
    id: 'user-get',
    category: 'users',
    method: 'GET',
    path: '/api/v1/users/{id}',
    summary: 'Get User Detail',
    description: 'Fetch profile metadata, historical trace logs, and permissions scope for a user.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "user": {
      "id": "usr_94f28a9c",
      "email": "analyst.amanda@company.com",
      "name": "Amanda Vance",
      "role": "analyst",
      "status": "active",
      "last_active": "2026-06-27T08:05:01Z"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "User Profile Missing",
  "status": 404,
  "detail": "No user matched identifier 'usr_94f28a9cx'.",
  "instance": "/api/v1/users/usr_94f28a9cx",
  "code": "USER_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/users/usr_94f28a9c \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'user-update',
    category: 'users',
    method: 'PUT',
    path: '/api/v1/users/{id}',
    summary: 'Update User Meta',
    description: 'Enforces complete update of full names, visual configurations, or active roles.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "name": "Amanda Vance Cooper",
  "role": "admin"
}`,
    validationRules: [
      'name: Required, 2 to 100 characters.',
      'role: Required if updating permissions, admin checks apply.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "user": {
      "id": "usr_94f28a9c",
      "name": "Amanda Vance Cooper",
      "role": "admin",
      "updated_at": "2026-06-27T08:06:41Z"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/forbidden",
  "title": "Access Denied",
  "status": 403,
  "detail": "Only administrator roles can elevate system permission privileges.",
  "instance": "/api/v1/users/usr_94f28a9c",
  "code": "AUTH_003",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X PUT https://api.aperture.sh/v1/users/usr_94f28a9c \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Amanda Vance Cooper",
    "role": "admin"
  }'`
  },
  {
    id: 'user-delete',
    category: 'users',
    method: 'DELETE',
    path: '/api/v1/users/{id}',
    summary: 'Remove User Account',
    description: 'Permanently deletes user login profile and revokes session keys across all channels.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "User membership successfully deleted."
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/conflict",
  "title": "Orphan Prevention Failure",
  "status": 409,
  "detail": "Cannot delete user. Workspace requires at least one active administrator.",
  "instance": "/api/v1/users/usr_94f28a9c",
  "code": "USER_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X DELETE https://api.aperture.sh/v1/users/usr_94f28a9c \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'role-list',
    category: 'roles',
    method: 'GET',
    path: '/api/v1/roles',
    summary: 'List Workspace Roles',
    description: 'Fetch the dictionary of role entities and access permissions (analyst, developer, viewer, admin).',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "roles": [
      {
        "id": "rol_analyst",
        "name": "analyst",
        "scope": ["dashboards:create", "dashboards:read", "dashboards:write", "queries:execute"],
        "row_filters": ["telemetry_log: region = 'us-west'"]
      }
    ]
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Token Malformed",
  "status": 401,
  "detail": "The Authorization token structure is broken.",
  "instance": "/api/v1/roles",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/roles \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'role-get',
    category: 'roles',
    method: 'GET',
    path: '/api/v1/roles/{id}/permissions',
    summary: 'Get Role Permissions',
    description: 'Fetches granular OPA rules, schemas, and row-level filtering policies assigned to a role.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "role_id": "rol_analyst",
    "permissions": ["dashboards:create", "dashboards:read", "dashboards:write", "queries:execute"],
    "row_level_policies": [
      { "table": "billing", "policy": "workspace_id = 'ws_aperture_devs'" }
    ]
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Role Not Found",
  "status": 404,
  "detail": "No role structure matched identity 'rol_custom'.",
  "instance": "/api/v1/roles/rol_custom/permissions",
  "code": "ROLE_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/roles/rol_analyst/permissions \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'role-update',
    category: 'roles',
    method: 'PUT',
    path: '/api/v1/roles/{id}/permissions',
    summary: 'Update Role Policies',
    description: 'Enforces complete update of permission definitions, scopes, or dataset row policies.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "permissions": ["dashboards:create", "dashboards:read", "dashboards:write", "queries:execute", "exports:create"],
  "row_level_policies": [
    { "table": "billing", "policy": "workspace_id = 'ws_aperture_devs'" }
  ]
}`,
    validationRules: [
      'permissions: Required array of valid system permission tags.',
      'row_level_policies: Required list of row filtering rules (ANSI SQL WHERE fragments).'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "role_id": "rol_analyst",
    "permissions": ["dashboards:create", "dashboards:read", "dashboards:write", "queries:execute", "exports:create"],
    "updated_at": "2026-06-27T08:06:41Z"
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unprocessable-entity",
  "title": "Broken Policy SQL",
  "status": 422,
  "detail": "Row policy 'workspace_id = =' contains syntax syntax errors.",
  "instance": "/api/v1/roles/rol_analyst/permissions",
  "code": "VAL_004",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X PUT https://api.aperture.sh/v1/roles/rol_analyst/permissions \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "permissions": ["dashboards:create", "dashboards:read", "dashboards:write", "queries:execute", "exports:create"],
    "row_level_policies": [{ "table": "billing", "policy": "workspace_id = '"'"'ws_aperture_devs'"'"'" }]
  }'`
  },
  {
    id: 'settings-get',
    category: 'settings',
    method: 'GET',
    path: '/api/v1/settings/workspace',
    summary: 'Fetch Workspace Configuration',
    description: 'Fetch default polling loops, security settings, cache bounds, and telemetry metrics configured in this workspace.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "settings": {
      "workspace_id": "ws_aperture_devs",
      "default_refresh_rate": 30,
      "max_cache_duration_sec": 300,
      "security_settings": {
        "mfa_enforced": true,
        "sso_only": false
      },
      "telemetry_enabled": false
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Authentication Failed",
  "status": 401,
  "detail": "Failed authentication mapping.",
  "instance": "/api/v1/settings/workspace",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/settings/workspace \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'settings-update',
    category: 'settings',
    method: 'PATCH',
    path: '/api/v1/settings/workspace',
    summary: 'Update Workspace Prefs',
    description: 'Performs dry schema modifications on config settings. Supports partial updates via standard PATCH methods.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "default_refresh_rate": 60,
  "telemetry_enabled": true
}`,
    validationRules: [
      'default_refresh_rate: Optional, integer between 5 and 3600.',
      'telemetry_enabled: Optional, boolean.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "settings": {
      "workspace_id": "ws_aperture_devs",
      "default_refresh_rate": 60,
      "max_cache_duration_sec": 300,
      "telemetry_enabled": true
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unprocessable-entity",
  "title": "Invalid Preference Parameters",
  "status": 422,
  "detail": "The 'default_refresh_rate' must be under 3600 seconds.",
  "instance": "/api/v1/settings/workspace",
  "code": "VAL_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X PATCH https://api.aperture.sh/v1/settings/workspace \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "default_refresh_rate": 60,
    "telemetry_enabled": true
  }'`
  },
  {
    id: 'webhook-list',
    category: 'webhooks',
    method: 'GET',
    path: '/api/v1/webhooks',
    summary: 'List Outgoing Webhooks',
    description: 'Retrieves a list of configured webhook subscription tunnels capturing events like ingestion status and alerts.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "webhooks": [
      {
        "id": "wh_01fa92cb",
        "url": "https://api.corporate.com/webhooks/ingest",
        "events": ["ingest.completed", "ingest.failed"],
        "secret": "whsec_92f1a8c...",
        "created_at": "2026-03-12T10:14:00Z"
      }
    ]
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Invalid Token",
  "status": 401,
  "detail": "Session authentication token expired.",
  "instance": "/api/v1/webhooks",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/webhooks \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'webhook-create',
    category: 'webhooks',
    method: 'POST',
    path: '/api/v1/webhooks',
    summary: 'Subscribe to Webhook Events',
    description: 'Registers an active outgoing webhook listener endpoint, returning a verification payload and secret sign keys.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "url": "https://api.corporate.com/webhooks/ingest",
  "events": ["ingest.completed", "ingest.failed"]
}`,
    validationRules: [
      'url: Required, valid HTTPS format string, maximum 255.',
      'events: Required array, must contain valid system subscription tags.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "webhook": {
      "id": "wh_01fa92cb",
      "url": "https://api.corporate.com/webhooks/ingest",
      "events": ["ingest.completed", "ingest.failed"],
      "secret": "whsec_94fda8c291cb0a...",
      "created_at": "2026-06-27T08:06:41Z"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/bad-request",
  "title": "Insecure URL",
  "status": 400,
  "detail": "Webhook URLs must use secure HTTPS protocols.",
  "instance": "/api/v1/webhooks",
  "code": "SEC_005",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/webhooks \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://api.corporate.com/webhooks/ingest",
    "events": ["ingest.completed", "ingest.failed"]
  }'`
  },
  {
    id: 'webhook-delete',
    category: 'webhooks',
    method: 'DELETE',
    path: '/api/v1/webhooks/{id}',
    summary: 'Remove Webhook Subscriber',
    description: 'Unsubscribes from events. Deletes webhook profile definitions.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "Webhook listener unsubscribed successfully."
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Webhook Not Found",
  "status": 404,
  "detail": "Target webhook registration does not exist or has already been deleted.",
  "instance": "/api/v1/webhooks/wh_not_exist",
  "code": "WEBHOOK_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X DELETE https://api.aperture.sh/v1/webhooks/wh_01fa92cb \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'scheduler-list',
    category: 'scheduler',
    method: 'GET',
    path: '/api/v1/scheduler/jobs',
    summary: 'List Background Jobs',
    description: 'Lists background warehouse sync jobs, parquet compression polling cycles, and aggregate table updates.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "jobs": [
      {
        "id": "job_parquet_hourly",
        "name": "Hourly Parquet Compression",
        "cron_expression": "0 * * * *",
        "target_source_id": "src_clickhouse_01",
        "status": "active",
        "last_run": "2026-06-27T08:00:00Z",
        "next_run": "2026-06-27T09:00:00Z"
      }
    ]
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Token Validation Failed",
  "status": 401,
  "detail": "Token signatures do not match workspace validation records.",
  "instance": "/api/v1/scheduler/jobs",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET https://api.aperture.sh/v1/scheduler/jobs \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'scheduler-create',
    category: 'scheduler',
    method: 'POST',
    path: '/api/v1/scheduler/jobs',
    summary: 'Register Background Job',
    description: 'Creates background task schedules targeting specific source warehouses and sync schedules using standard CRON expressions.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' },
      { name: 'Content-Type', required: true, type: 'string', description: 'JSON media type', example: 'application/json' }
    ],
    requestBody: `{
  "name": "Daily Warehouse ETL Pull",
  "cron_expression": "0 2 * * *",
  "target_source_id": "src_clickhouse_01"
}`,
    validationRules: [
      'name: Required, 3 to 100 characters.',
      'cron_expression: Required, standard 5-field CRON schedule string.',
      'target_source_id: Required, active source warehouse connection reference.'
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "job": {
      "id": "job_daily_etl_74",
      "name": "Daily Warehouse ETL Pull",
      "cron_expression": "0 2 * * *",
      "target_source_id": "src_clickhouse_01",
      "status": "active",
      "created_at": "2026-06-27T08:06:41Z"
    }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unprocessable-entity",
  "title": "Broken Cron Expression",
  "status": 422,
  "detail": "The cron expression '0 2 * * * *' has invalid segment sizes.",
  "instance": "/api/v1/scheduler/jobs",
  "code": "VAL_005",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/scheduler/jobs \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Daily Warehouse ETL Pull",
    "cron_expression": "0 2 * * *",
    "target_source_id": "src_clickhouse_01"
  }'`
  },
  {
    id: 'scheduler-trigger',
    category: 'scheduler',
    method: 'POST',
    path: '/api/v1/scheduler/jobs/{id}/trigger',
    summary: 'Manually Trigger Job Ingest',
    description: 'Bypasses scheduler queue and triggers task execution immediately in a secure, background process thread.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "Job successfully enqueued. Thread process tracking initiated.",
  "data": {
    "execution_id": "run_94fa8cb91cda"
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/conflict",
  "title": "Job Already Running",
  "status": 409,
  "detail": "Target job 'job_parquet_hourly' is already executing. Concurrency limits prevent simultaneous execution.",
  "instance": "/api/v1/scheduler/jobs/job_parquet_hourly/trigger",
  "code": "SCHED_002",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X POST https://api.aperture.sh/v1/scheduler/jobs/job_parquet_hourly/trigger \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'notif-list',
    category: 'notifications',
    method: 'GET',
    path: '/api/v1/notifications',
    summary: 'List User Alerts',
    description: 'Fetch real-time alert logs and warning tags assigned to the active authenticated profile.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    queryParams: [
      { name: 'page', required: false, type: 'integer', description: 'Current offset page index', example: '1' },
      { name: 'limit', required: false, type: 'integer', description: 'Alert boundaries', example: '20' },
      { name: 'filters[read]', required: false, type: 'string', description: 'Filter read status (true, false)', example: 'false' }
    ],
    responseSuccess: `{
  "status": "success",
  "data": {
    "notifications": [
      {
        "id": "ntf_ingest_alert_01",
        "title": "Ingestion Failed",
        "message": "ETL pull from prod_clickhouse_core aborted after connection timeout of 30 seconds.",
        "type": "error",
        "is_read": false,
        "created_at": "2026-06-27T07:45:12Z"
      }
    ],
    "pagination": { "total_records": 1, "total_pages": 1, "current_page": 1, "limit": 20 }
  }
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/unauthorized",
  "title": "Unauthorized Request",
  "status": 401,
  "detail": "Expired bearer token validation credentials.",
  "instance": "/api/v1/notifications",
  "code": "AUTH_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X GET "https://api.aperture.sh/v1/notifications?filters[read]=false" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
  },
  {
    id: 'notif-read',
    category: 'notifications',
    method: 'PATCH',
    path: '/api/v1/notifications/{id}/read',
    summary: 'Mark Alert Read',
    description: 'Sets notification status as read.',
    headers: [
      { name: 'Authorization', required: true, type: 'string', description: 'Bearer JWT token', example: 'Bearer eyJhbGciOiJIUzI1...' }
    ],
    responseSuccess: `{
  "status": "success",
  "message": "Notification state updated successfully."
}`,
    responseError: `{
  "type": "https://aperture.sh/errors/not-found",
  "title": "Alert Missing",
  "status": 404,
  "detail": "No notification matched identity 'ntf_ingest_alert_01x'.",
  "instance": "/api/v1/notifications/ntf_ingest_alert_01x/read",
  "code": "NOTIF_001",
  "timestamp": "2026-06-27T08:06:41Z"
}`,
    curlExample: `curl -X PATCH https://api.aperture.sh/v1/notifications/ntf_ingest_alert_01/read \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1..."`
}
];

export const openApiSpecYAML = `openapi: 3.1.0
info:
  title: Aperture Analytics OSS REST API
  description: |
    Comprehensive GitOps-First BI Platform API. Designed around high-performance columnar data warehouses 
    (embedded DuckDB or ClickHouse cluster engines), local Parquet stores, and metadata schemas.
    
    ### Key Features
    - **RESTful Architecture**: Clean URL parameters, strict versioning paths, and standard HTTP verbs.
    - **Durable Versioning**: API paths pre-bound with the \`/v1/\` namespace prefix.
    - **Strict Security Guardrails**: Secure Bearer tokens (JWT) paired with RBAC roles and row-level policies.
    - **RFC 7807 Error Responses**: Comprehensive standard validation alerts and unprocessable errors.
    - **Speed & Caching**: Multi-layer Redis keys and local column statistics caching mechanisms.
  version: 1.0.0
  contact:
    name: Aperture Architecture Team
    url: https://aperture.sh/docs
    email: architecture@aperture.sh
servers:
  - url: https://api.aperture.sh
    description: Production Core Server
  - url: http://localhost:3000
    description: Sandboxed Dev Node

paths:
  /api/v1/auth/login:
    post:
      summary: Authenticate User Session
      description: Exchange user credentials for an encrypted JWT bearer access token.
      operationId: authLogin
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                  maxLength: 255
                  example: analyst.amanda@company.com
                password:
                  type: string
                  minLength: 12
                  example: pA$$w0rd_complex_992
                mfa_token:
                  type: string
                  pattern: '^[0-9]{6}$'
                  example: "492102"
      responses:
        '200':
          description: Session successfully authenticated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Invalid email or password credentials.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorEnvelope'

  /api/v1/dashboards:
    get:
      summary: List Configured Dashboards
      description: Returns a paginated, sorted, filtered, and searchable list of active analytical dashboards in the workspace.
      operationId: listDashboards
      parameters:
        - name: page
          in: query
          required: false
          schema:
            type: integer
            default: 1
          description: Page count offset.
        - name: limit
          in: query
          required: false
          schema:
            type: integer
            default: 20
            maximum: 100
          description: Total records returned per page.
        - name: sort_by
          in: query
          required: false
          schema:
            type: string
            enum: [name, created_at, updated_at, version]
            default: updated_at
        - name: order
          in: query
          required: false
          schema:
            type: string
            enum: [asc, desc]
            default: desc
        - name: filters[status]
          in: query
          required: false
          schema:
            type: string
            enum: [active, draft, archived]
          description: Filter dashboards by state.
        - name: q
          in: query
          required: false
          schema:
            type: string
          description: Fuzzy text search query across title, descriptions, or visual tags.
      responses:
        '200':
          description: A list of dashboards matching criteria.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DashboardListResponse'
        '400':
          description: Parametric sorting or pagination validation errors.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorEnvelope'

    post:
      summary: Create Declarative Dashboard Specification
      description: Registers a brand new dashboard layout spec, complete with tile bindings.
      operationId: createDashboard
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DashboardSpec'
      responses:
        '201':
          description: Dashboard spec successfully registered.
        '422':
          description: Validation rules violated.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorEnvelope'

  /api/v1/dashboards/{id}:
    get:
      summary: Fetch Dashboard Layout Specs
      description: Retrieve the comprehensive layout tile grids, dimensions, refresh properties, and access tags.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Comprehensive dashboard model returned.
        '444':
          description: Dashboard not found.

    put:
      summary: Replace Dashboard Layout Config
      description: Performs full layout updates, increments target version numbers.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DashboardSpec'
      responses:
        '200':
          description: Successfully updated parameters.
        '409':
          description: Optimistic concurrency collision check failure.

    delete:
      summary: Delete Dashboard Blueprint
      description: Unregisters a dashboard and cleans up metadata layout maps.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successfully unregistered.

  /api/v1/query/execute:
    post:
      summary: Execute Sub-Second Analytical Query
      description: Directly executes high-speed parameterized aggregations against embedded DuckDB or ClickHouse engines.
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [source_id, raw_sql]
              properties:
                source_id:
                  type: string
                  example: src_clickhouse_01
                raw_sql:
                  type: string
                  example: SELECT region, count(id) FROM telemetry GROUP BY 1
                parameters:
                  type: array
                  items:
                    type: string
                options:
                  type: object
                  properties:
                    use_cache:
                      type: boolean
                      default: true
                    timeout_ms:
                      type: integer
                      default: 15000
      responses:
        '200':
          description: Analytical query compiled and evaluated successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/QueryExecutionResponse'
        '422':
          description: Query syntax error or structural constraint failure.

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    AuthResponse:
      type: object
      properties:
        status:
          type: string
          example: success
        data:
          type: object
          properties:
            access_token:
              type: string
            expires_in:
              type: integer
            token_type:
              type: string
              example: Bearer
            user:
              type: object
              properties:
                id:
                  type: string
                email:
                  type: string
                role:
                  type: string

    DashboardSpec:
      type: object
      required: [name, status, config]
      properties:
        name:
          type: string
          minLength: 3
          maxLength: 100
        description:
          type: string
          maxLength: 255
        status:
          type: string
          enum: [active, draft, archived]
        config:
          type: object
          required: [refresh_rate_sec, layout]
          properties:
            refresh_rate_sec:
              type: integer
              minimum: 5
              maximum: 3600
            layout:
              type: object
              required: [grid_columns, tiles]
              properties:
                grid_columns:
                  type: integer
                  example: 12
                tiles:
                  type: array
                  items:
                    type: object
                    required: [id, chart_id, w, h, x, y]

    DashboardListResponse:
      type: object
      properties:
        status:
          type: string
        data:
          type: object
          properties:
            dashboards:
              type: array
              items:
                type: object
            pagination:
              type: object
              properties:
                total_records:
                  type: integer
                total_pages:
                  type: integer
                current_page:
                  type: integer
                limit:
                  type: integer

    QueryExecutionResponse:
      type: object
      properties:
        status:
          type: string
        data:
          type: object
          properties:
            execution_time_ms:
              type: number
            cache_hit:
              type: boolean
            columns:
              type: array
              items:
                type: object
            rows:
              type: array
              items:
                type: array

    ErrorEnvelope:
      type: object
      required: [type, title, status, detail, instance, code, timestamp]
      properties:
        type:
          type: string
          format: uri
        title:
          type: string
        status:
          type: integer
        detail:
          type: string
        instance:
          type: string
        code:
          type: string
        timestamp:
          type: string
          format: date-time
        invalid_params:
          type: array
          items:
            type: object
            required: [name, reason]
            properties:
              name:
                type: string
              reason:
                type: string
`;
