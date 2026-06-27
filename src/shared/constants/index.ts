import { 
  TrendingUp, 
  Target, 
  Cpu, 
  Database, 
  Lock, 
  GitBranch, 
  AlertTriangle, 
  Layers, 
  Settings, 
  CheckCircle, 
  Users, 
  Smartphone, 
  RefreshCw, 
  FileText, 
  Sparkles, 
  Terminal, 
  HardDrive, 
  Server, 
  Cloud, 
  BookOpen,
  Eye,
  Workflow,
  Code,
  Shield,
  Bell,
  Share2,
  Key,
  Layout,
  Briefcase,
  Search,
  GitPullRequest
} from 'lucide-react';
import { Competitor, StackLayer, ArchModule, UXScreenSpec } from '../types';

export const competitors: Competitor[] = [
  {
    id: 'powerbi',
    name: 'Power BI',
    strengths: [
      'Deep integration with the Microsoft ecosystem (Azure, Office, Teams)',
      'Unmatched modeling capability using DAX for complex data relationships',
      'Massive enterprise distribution; aggressively priced and bundled with E5 licenses',
      'Extensive library of pre-built visuals and third-party integrations'
    ],
    weaknesses: [
      'Heavy lock-in to Microsoft’s closed ecosystem',
      'Windows-only desktop client required for dashboard authoring',
      'DAX and M languages present a steep, proprietary learning curve',
      'Performance can degrade severely on large local data models before publishing to service'
    ],
    opportunities: [
      'Capturing enterprise legacy migrations to Azure-hosted environments',
      'Infusing Microsoft Copilot to simplify the archaic DAX modeling process'
    ],
    complaints: [
      'Users complain that the Desktop app is sluggish, bloated, and looks like Microsoft Office 2013.',
      'Configuring the enterprise data gateway is notoriously complex and prone to silent failures.',
      'Cross-platform support is non-existent; macOS developers must run Windows virtual machines.'
    ],
    outdated: 'The native Windows-desktop-bound authoring paradigm. In a browser-first, cloud-native world, forcing analysts to download a multi-gigabyte Windows EXE feels like the early 2010s.'
  },
  {
    id: 'tableau',
    name: 'Tableau',
    strengths: [
      'Industry-standard visualization engine with pixel-perfect visual aesthetics',
      'Intuitive "Pills & Shelves" drag-and-drop analytics UX',
      'Incredible community support and public portfolio ecosystem (Tableau Public)',
      'Robust native connectors for high-speed direct queries'
    ],
    weaknesses: [
      'Prohibitively expensive (steep licensing pricing, Salesforce tax)',
      'Under Salesforce, product innovation has slowed while sales pressure increased',
      'Advanced calculations (Level of Detail/LOD) are notoriously unintuitive',
      'Lacks modern software engineering practices (version control is incredibly difficult)'
    ],
    opportunities: [
      'Positioning as the premium visual layer for Salesforce’s new unified Data Cloud'
    ],
    complaints: [
      'Users feel nickel-and-dimed by the seat-license pricing, making democratization expensive.',
      'Web-based editing is incomplete, forcing reliance on the Desktop app for complex logic.',
      'Integrating Tableau dashboards cleanly into external SaaS products is complex and expensive.'
    ],
    outdated: 'The heavy desktop client and the file-based dashboard distribution (.twbx). Tableau’s metadata structure is massive XML, which makes true Git-based code reviews and collaborative developer workflows painful.'
  },
  {
    id: 'metabase',
    name: 'Metabase',
    strengths: [
      'Sensational onboarding experience; can go from zero to live charts in under 5 minutes',
      'The "Visual Query Builder" is the absolute gold standard for non-technical users',
      'Lightweight, modern, and trivial to self-host with a single JAR or Docker image',
      'Extremely clean and simple UI aesthetics'
    ],
    weaknesses: [
      'Query performance falls off a cliff on massive datasets without raw SQL optimization',
      'Extremely limited catalog of visualization types and customization controls',
      'Granular row-level permissions and governance are locked behind expensive enterprise tiers',
      'Lacks advanced data transformation and semantic modeling capabilities'
    ],
    opportunities: [
      'Becoming the default analytics tab inside other SaaS products via embedded analytics'
    ],
    complaints: [
      'Advanced power users complain that the visual query builder is too restrictive.',
      'Formatting and customizing charts (e.g., dual axes, advanced colors, tooltips) is very limited.',
      'Doing cross-database joins is either impossible or extremely slow.'
    ],
    outdated: 'Metabase’s internals rely heavily on standard relational databases for live queries. Without a built-in modern high-speed columnar or cache engine, it is bottlenecked by the user’s primary application database, causing live production DB slowdowns.'
  },
  {
    id: 'superset',
    name: 'Apache Superset',
    strengths: [
      'Incredibly scalable, built to handle petabyte-scale data lakes via cloud data warehouses',
      'Extensive visual catalog with dozens of advanced visualization styles out of the box',
      'Strongly backed by a massive open-source community and enterprise sponsors',
      'Highly flexible role-based access control (RBAC) and security engine'
    ],
    weaknesses: [
      'Overwhelmingly complex to configure, deploy, and maintain (requires dedicated DevOps)',
      'The no-code query building interface is clunky and unintuitive for business users',
      'No true built-in data transformation or lightweight caching; entirely query-dependent',
      'Interface feels fragmented and visually inconsistent'
    ],
    opportunities: [
      'Standardizing as the default open-source dashboard layer for modern data stacks (dbt + Snowflake)'
    ],
    complaints: [
      'Users complain that setting up the platform requires extensive technical knowledge.',
      'Dashboard filters are notoriously difficult to configure and often break when layouts shift.',
      'The visual styling of charts looks academic or utilitarian rather than modern and polished.'
    ],
    outdated: 'The configuration and deployment system. In an era of instant-on serverless or single-binary edge tools, Superset’s massive multi-container deployment architecture (Celery, Redis, Gunicorn, PostgreSQL, Superset) feels heavy for small-to-medium businesses.'
  },
  {
    id: 'grafana',
    name: 'Grafana',
    strengths: [
      'Unrivaled leader in time-series visualization and infrastructure monitoring',
      'Real-time streaming capabilities with push metrics support',
      'Vibrant plugin marketplace supporting hundreds of specialized datasources',
      'Exceptional alerting and anomaly detection frameworks'
    ],
    weaknesses: [
      'Extremely poor fit for standard business BI (financial metrics, CRM pipelines, accounting)',
      'Tabular reporting and complex cross-filtering across non-time-series data is weak',
      'Interface and terminology are highly technical, geared exclusively for engineers',
      'No conceptual model of a "semantic business layer" (dimensions and measures)'
    ],
    opportunities: [
      'Expanding into IoT, edge devices, and real-time operational analytics beyond DevOps'
    ],
    complaints: [
      'Business analysts complain that the interface is completely foreign and intimidating.',
      'Creating unified reports that join relational customer data with metrics is highly painful.',
      'SQL writing is required for almost any non-trivial visualization.'
    ],
    outdated: 'The dashboards are strictly metric-focused dashboards rather than dynamic exploratory environments. Forcing business data into time-series frameworks feels outdated when dealing with static business schemas.'
  },
  {
    id: 'looker',
    name: 'Looker Studio',
    strengths: [
      'Completely free of charge for most standard use cases',
      'Immediate integration with Google Workspace, BigQuery, and Google Marketing Platform',
      'Very gentle learning curve; similar to building a slide deck',
      'Excellent collaborative sharing model built on standard Google Drive permissions'
    ],
    weaknesses: [
      'Extremely slow rendering; loading spinners are ubiquitous',
      'No native code-based version control (no Git workflows or YAML/JSON definitions)',
      'Highly fragile data connectors that fail silently or hit strict API quota limits',
      'No options for self-hosting or on-prem deployment (strictly SaaS-bound)'
    ],
    opportunities: [
      'Deepening integrations with Google’s Gemini for automatic chart recommendations'
    ],
    complaints: [
      'Users complain about constant loading spinners and "Resource Limit Exceeded" errors.',
      'The lack of an undo/redo stack that persists, and lack of versioning leads to lost work.',
      'No way to write sophisticated custom calculations outside of basic formulas.'
    ],
    outdated: 'The visual designer is fundamentally a static canvas layout. It is treated like an interactive PDF or slide deck rather than a fluid, responsive, code-driven visual canvas.'
  },
  {
    id: 'thoughtspot',
    name: 'ThoughtSpot',
    strengths: [
      'Pioneered search-driven analytics with an advanced Natural Language Query (NLQ) engine',
      'Designed to run extremely fast direct queries on top of cloud warehouses',
      'AI-driven auto-generation of dashboards and metrics discovery',
      'Highly modern visual layout and aesthetic appeal'
    ],
    weaknesses: [
      'Prohibitively expensive enterprise pricing model',
      'Requires substantial data engineering to build the underlying semantic layer first',
      'Not designed for small-to-medium businesses or standard relational operational databases',
      'Heavy setup complexity before search works accurately'
    ],
    opportunities: [
      'Leveraging LLMs to make the natural language search fully contextual and zero-config'
    ],
    complaints: [
      'SMBs complain that they are priced out of the tool instantly.',
      'If the underlying data model is not pristine, search results return incorrect or hallucinated joins.',
      'Limited custom visual formatting options.'
    ],
    outdated: 'The closed-source, proprietary nature. As modern software trends toward open-source, open-standards semantic layers (like dbt), locking down the search and semantic layers behind a high-walled proprietary vault feels increasingly obsolete.'
  }
];

export const marketGaps = [
  {
    title: "The 'Fast-OLAP for SMBs' Gap",
    description: "Small businesses cannot afford Snowflake or BigQuery, nor do they want the latency of running live heavy analytical queries directly on their production PostgreSQL/MySQL replicas. There is no simple self-hosted BI platform that embeds an ultra-fast local column-store engine (like DuckDB) to speed up querying standard databases by 100x out-of-the-box, operating seamlessly in a single-binary package."
  },
  {
    title: "The 'GitOps & Developer Experience' Gap",
    description: "Modern BI tools store their dashboard layouts and query logic in messy database blobs or opaque proprietary formats, making change-tracking, branch staging, code reviews, and automated deployment practically impossible. Software engineers want a BI tool where every dashboard, chart, and semantic relationship is defined in clean, human-readable YAML/JSON, allowing dashboards-as-code to live inside standard Git repositories."
  },
  {
    title: "The 'Privacy-First, Offline-Capable AI' Gap",
    description: "To use AI query features in existing cloud-based BI, enterprises must upload their sensitive schemas and data tables to third-party cloud servers. This is an absolute blocker for highly regulated sectors (finance, healthcare, legal). There is a critical gap for a self-hosted platform that runs local, private AI models (or proxies queries securely via schema-only metadata) to generate SQL safely without letting raw data leave the perimeter."
  }
];

export const productVision = {
  name: "Aperture Analytics",
  tagline: "The Modern Open-Source, GitOps-First BI Platform powered by Embedded OLAP.",
  pillars: [
    {
      title: "Embedded OLAP Speed",
      description: "Under the hood, Aperture embeds DuckDB, a high-performance analytical engine. It automatically ingests and synchronizes relational databases (PostgreSQL, MySQL), CSVs, or Parquet files into compressed columnar snapshots in local storage, enabling 50ms dashboard loading times on millions of records, right on your server.",
      icon: HardDrive
    },
    {
      title: "BI-as-Code (GitOps)",
      description: "Every metric, data source, and dashboard is stored as a clean, human-readable YAML file. Track dashboard changes in Git, open pull requests for chart changes, run automated tests, and deploy dashboards using your existing CI/CD pipelines.",
      icon: GitBranch
    },
    {
      title: "Privacy-First AI Core",
      description: "Ask business questions in plain English. Aperture's localized query translation engine handles natural language-to-SQL logic server-side. It only parses the schema metadata, ensuring that actual customer or financial data never leaks to external networks.",
      icon: AlertTriangle
    },
    {
      title: "Sensational Developer UX",
      description: "Built for developers who appreciate speed and simplicity. It features a lightweight single-binary distribution, standard Docker containerization, a beautiful minimalist dark/light UI, and instant-on responsive dashboards without heavy enterprise bloat.",
      icon: Terminal
    }
  ]
};

export const stackLayers: StackLayer[] = [
  {
    id: 'frontend',
    name: 'Frontend Framework',
    selected: 'React 19 + TypeScript + Vite',
    selectedReason: 'Vite provides near-instantaneous developer feedback and clean production builds. React 19 provides state-of-the-art component composition, great custom hook structures for UI states, and handles heavy interactive dashboards efficiently when combined with lightweight state management.',
    alternatives: [
      { name: 'Svelte/SvelteKit', reason: 'Outstanding performance and small bundle size, but lacks the vast ecosystem of charting libraries, developer pools, and robust enterprise-grade visualization components readily available for React.' },
      { name: 'Next.js', reason: 'Excellent framework, but adds unnecessary complexity and server-side deployment lock-in. A pure React SPA bundled with Vite can be easily served by any lightweight backend (like Express, Go, or Rust) inside a single Docker container, which is critical for easy self-hosting.' }
    ],
    icon: Smartphone
  },
  {
    id: 'backend',
    name: 'Backend API Server',
    selected: 'Node.js (Express/Fastify) or Go',
    selectedReason: 'A lightweight Node.js/TypeScript backend (using Express or Fastify) allows complete code-sharing between frontend types and backend schemas. It provides superb asynchronous handling for parallel database queries and has mature libraries for metadata management and external database connectors.',
    alternatives: [
      { name: 'Python (Django/FastAPI)', reason: 'Great for data science, but introduces significantly higher memory overhead, slower concurrency performance, and complicates the single-container distribution model compared to Node.js or compiled Go.' },
      { name: 'Rust (Axum)', reason: 'Provides blazing fast speed and extreme safety, but slows down development velocity significantly for standard REST APIs, authentication endpoints, and YAML configuration parsing.' }
    ],
    icon: Server
  },
  {
    id: 'metadata_db',
    name: 'Metadata Store',
    selected: 'SQLite (Self-Hosted) / PostgreSQL (Cloud)',
    selectedReason: 'For self-hosted instances, a lightweight, embedded SQLite database is stored locally as a single file, keeping onboarding completely zero-config. For cloud or enterprise environments, the platform seamlessly swaps SQLite for PostgreSQL to handle high concurrency, connection pooling, and multi-user scaling.',
    alternatives: [
      { name: 'MongoDB', reason: 'NoSQL is a poor choice for highly structured relational metadata (such as user permissions, organizations, dashboards, and schema charts) that require foreign key integrity.' },
      { name: 'Redis only', reason: 'Redis lacks durable on-disk structural storage, relational querying, and complex indexing capabilities required for managing long-term configuration data.' }
    ],
    icon: Database
  },
  {
    id: 'olap_engine',
    name: 'Analytics OLAP Engine',
    selected: 'DuckDB (Embedded) & ClickHouse (Enterprise)',
    selectedReason: 'DuckDB is a revolution in analytical querying. It embeds directly inside our backend process as a lightweight C++ library (zero network overhead) and executes vectorized SQL queries on compressed parquet data blocks 100x faster than standard relational engines. For multi-terabyte enterprise clusters, we offer a seamless query pipeline to ClickHouse.',
    alternatives: [
      { name: 'PostgreSQL Relational', reason: 'While Postgres is an amazing transactional database, its row-oriented storage is highly inefficient for analytical queries (aggregations, group-bys, column scans) across millions of rows, leading to slow dashboard rendering times.' },
      { name: 'Snowflake / BigQuery', reason: 'Extremely fast, but introduces mandatory cloud-hosting fees, high latency for real-time dashboards, and completely breaks the self-hosted, privacy-first, offline-capable architecture.' }
    ],
    icon: HardDrive
  },
  {
    id: 'auth',
    name: 'Authentication',
    selected: 'JWT + Local Sessions + OpenID / SAML',
    selectedReason: 'Provides a secure, stateless authentication mechanism using JWTs for API calls. To maintain zero external dependencies for local-first setups, we build self-contained email/password authentication alongside standard OpenID Connect (OIDC) and SAML connectors for enterprise Single Sign-On (SSO).',
    alternatives: [
      { name: 'Third-Party SaaS Auth (Auth0/Clerk)', reason: 'Completely violates our self-hosting, privacy-first, and offline-capable architecture. If the host machine lacks external internet access, authentication would completely fail.' }
    ],
    icon: Lock
  },
  {
    id: 'caching',
    name: 'Caching System',
    selected: 'In-Memory Cache (Self-Hosted) / Redis (Enterprise)',
    selectedReason: 'To maximize performance, query result sets are cached locally. For single-instance or local-first self-hosted deployments, an optimized in-memory key-value LRU store is used to avoid external dependencies. For clustered, highly scalable environments, Redis is integrated seamlessly for unified caching across nodes.',
    alternatives: [
      { name: 'Memcached', reason: 'Memcached lacks rich data structures, lacks built-in persistence options, and lacks active modern container orchestration support compared to Redis, making long-term maintenance harder.' },
      { name: 'No Cache', reason: 'Executing every dashboard hover or refresh as a live database query creates massive resource contention, increasing database bills or performance degradation.' }
    ],
    icon: RefreshCw
  },
  {
    id: 'charts',
    name: 'Data Visualization Engine',
    selected: 'D3.js + Recharts + HTML5 Canvas',
    selectedReason: 'D3.js provides raw mathematical and layouts power for custom advanced diagrams. Recharts wraps D3 power into simple, responsive React components for standard visual charts (Bar, Line, Area). For rendering dense tables or high-frequency scatterplots with 50,000+ nodes, we fallback to custom HTML5 Canvas overlays to bypass React virtual DOM bottlenecks.',
    alternatives: [
      { name: 'ECharts (Apache)', reason: 'Incredibly powerful, but has a massive bundle size and uses a declarative option-based imperative API that does not feel native or clean inside React’s component lifecycles.' },
      { name: 'Chart.js', reason: 'Good for basic needs, but lacks the sophisticated layout styling, custom responsive animations, and architectural extensibility needed for a world-class analytics tool.' }
    ],
    icon: TrendingUp
  },
  {
    id: 'search',
    name: 'Search (Metadata & NLQ)',
    selected: 'SQLite FTS5 + Local Transformers.js Embeddings',
    selectedReason: 'For discovery of metrics, charts, and dashboards, we embed SQLite Full-Text Search (FTS5) directly in our backend. For semantic natural language search (NLQ) and localized query comprehension, we use localized Transformers.js models running inside our backend engine, eliminating external model dependencies.',
    alternatives: [
      { name: 'Elasticsearch / OpenSearch', reason: 'Elasticsearch requires several gigabytes of RAM to run, which completely destroys our ability to run efficiently on low-cost single-instance machines or Raspberry Pi servers.' },
      { name: 'Pinecone / Cloud Vector DBs', reason: 'Violates our offline self-hosting core values, introduces billing friction, and raises privacy flags regarding structural metric leaking.' }
    ],
    icon: Search
  },
  {
    id: 'workers',
    name: 'Background Workers',
    selected: 'Graphile Worker (PG/Node) / BullMQ (Redis)',
    selectedReason: 'Graphile Worker runs high-performance background job processing directly within PostgreSQL metadata architectures, while BullMQ provides Redis-backed job queues for ultra-high throughput file ingestion. A native node-cron fallback handles lightweight polling schedules in self-hosted mode.',
    alternatives: [
      { name: 'Celery (Python + RabbitMQ)', reason: 'Introduces Python as a runtime dependency and RabbitMQ as a service, drastically increasing the maintenance overhead and resource footprints of our deployment containers.' },
      { name: 'Temporal.io', reason: 'Overkill for a business intelligence system. Temporal adds significant architectural complexity, requiring multiple databases and worker fleets to operate.' }
    ],
    icon: Workflow
  },
  {
    id: 'deployment',
    name: 'Deployment Model',
    selected: 'Single-Binary (compiled C/Node) or Docker Container',
    selectedReason: 'Packaging our compiled Node.js backend, static React assets, and embedded DuckDB/SQLite binaries into a single Docker container allows a developer to launch Aperture on any cloud or local VM with a single command: docker run -p 3000:3000 aperture/analytics.',
    alternatives: [
      { name: 'Serverless Functions (AWS Lambda / Vercel)', reason: 'Lacks long-term local persistent caching, has severe cold-starts, lacks embedded memory persistence for DuckDB, and completely breaks our offline self-hosting guarantee.' }
    ],
    icon: Cloud
  },
  {
    id: 'containerization',
    name: 'Containerization Strategy',
    selected: 'Multi-Arch Docker Images (Linux AMD64 + ARM64)',
    selectedReason: 'We construct container builds supporting both AMD64 and ARM64 processors. This allows Aperture to run on modern, high-efficiency cloud hardware like AWS Graviton, and enables enthusiasts to run self-hosted dashboard servers on Raspberry Pis with extreme efficiency.',
    alternatives: [
      { name: 'Virtual Machine Images (AMI/VMDK) only', reason: 'VM images are large, slow to build, slow to boot, cloud-locked, and lack the portability and modern orchestration benefits of lightweight Docker containers.' }
    ],
    icon: Layers
  },
  {
    id: 'monitoring',
    name: 'Monitoring & Metrics',
    selected: 'Prometheus scraping endpoint + OpenTelemetry standard',
    selectedReason: 'Aperture exposes a native /metrics endpoint compiled with Prometheus scrapers and conforms to OpenTelemetry standards. This allows self-hosted users to integrate their performance, queue, and query times into existing monitoring platforms with zero license cost.',
    alternatives: [
      { name: 'Datadog / New Relic integrations', reason: 'These SaaS solutions introduce proprietary code agents, violate offline-capability rules, and lock self-hosted installations into expensive enterprise licensing tiers.' }
    ],
    icon: Eye
  },
  {
    id: 'logging',
    name: 'Logging & Telemetry',
    selected: 'Structured JSON logs with Winston/Pino to stdout',
    selectedReason: 'Writing logs in structured JSON format directly to standard output (stdout) allows Docker engines, Kubernetes, Vector, or FluentBit to capture and stream system telemetry cleanly without managing local log file rotation.',
    alternatives: [
      { name: 'Text file logging only', reason: 'Parsing unstructured raw text files is fragile, makes automated alert parsing highly complex, and is notoriously difficult to aggregate across clustered nodes.' }
    ],
    icon: FileText
  },
  {
    id: 'testing',
    name: 'Testing Framework',
    selected: 'Vitest (Unit/Integration) + Playwright (E2E)',
    selectedReason: 'Vitest runs our server-side and client-side unit tests 10x faster by leveraging our existing Vite config and ESM setup. Playwright provides extremely fast, headless, multi-browser end-to-end testing with minimal setup and excellent developer-focused debugging tools.',
    alternatives: [
      { name: 'Jest', reason: 'Jest has sluggish startup times and extremely complex configuration requirements for modern ES Modules (ESM) and TypeScript, which increases maintenance friction.' },
      { name: 'Cypress', reason: 'Cypress has a heavier, browser-bound execution model, is slower, and lacks the native parallel-execution and multi-tab testing strengths of Playwright.' }
    ],
    icon: CheckCircle
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    selected: 'GitHub Actions with self-hosted runners option',
    selectedReason: 'GitHub Actions is the industry standard for open-source project management. It automates linting, type-checking, vitest execution, security vulnerability scans, and multi-platform Docker container builds without requiring any infrastructure maintenance.',
    alternatives: [
      { name: 'Jenkins', reason: 'Configuring and maintaining self-hosted Jenkins servers requires significant administrative time, introducing huge operational overhead and potential security vulnerabilities.' }
    ],
    icon: GitPullRequest
  }
];

export const dataFlowSteps = [
  {
    title: "1. Data Source Connection",
    description: "Aperture connects to external transactional databases (PostgreSQL, MySQL, SQL Server) or ingests raw files (CSV, Parquet, JSON) from local folders or S3 buckets.",
    highlight: "source"
  },
  {
    title: "2. Vectorized Ingestion Sync",
    description: "A scheduler pulls updated records and stores them locally as highly compressed, columnar Parquet files on the server host machine.",
    highlight: "ingestion"
  },
  {
    title: "3. Embedded DuckDB In-Memory Execution",
    description: "When a user requests a dashboard, the query is executed by DuckDB directly against these Parquet files. DuckDB reads only the requested columns, completing analytical queries over millions of rows in <30ms.",
    highlight: "olap"
  },
  {
    title: "4. Express API & Redis Caching",
    description: "The lightweight Express backend captures the results, formats them, and caches standard query results in Redis (or in-memory cache) to instantly serve repetitive dashboard hits.",
    highlight: "api"
  },
  {
    title: "5. Beautiful React Dashboard Visuals",
    description: "The React frontend receives the compact JSON data payload and renders ultra-fast, responsive charts using Recharts/D3 with gorgeous hover animations and global filter cross-filtering.",
    highlight: "frontend_render"
  }
];

export const archModules: ArchModule[] = [
  {
    id: 'high-level',
    name: 'High-Level Architecture',
    category: 'System Overview',
    responsibility: 'Coordinates the global data flow, isolates analytics processing lanes, manages user request parsing, and provides clear boundaries between stateless API routing and intensive background operations.',
    icon: Layers,
    subsystems: [
      { name: 'API Gateway & Router', desc: 'Parses and routes incoming JSON configurations, intercepts malicious commands, and applies global rate limiting.' },
      { name: 'Semantic Orchestrator', desc: 'Compiles abstract business concepts (measures, dimensions) into high-performance vectorized OLAP SQL scripts.' },
      { name: 'Ingestion Daemon', desc: 'Monitors external database synchronization schedules and coordinates compressed chunk assembly.' },
      { name: 'OLAP Memory Sandbox', desc: 'Sandboxes DuckDB processing zones, monitoring query CPU limits and RAM usage thresholds.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'User Filter Events', description: 'Interactive cursor adjustments and dropdown filter coordinates.' },
      { type: 'input', data: 'GitOps Commits', description: 'Declarative JSON/YAML dashboard templates from connected git repos.' },
      { type: 'output', data: 'Rectangular Dataset Frames', description: 'Clean query aggregate matrices served to client components.' },
      { type: 'output', data: 'Ingestion Catalogs', description: 'Updated metadata schema definitions mapping available Parquet layers.' }
    ],
    designPatterns: ['Microkernel Core', 'Event-Driven Orchestration', 'Clean Architecture Layer Separation'],
    dataFlowSteps: [
      'Client initiates filter change triggering concurrent dashboard queries.',
      'API Gateway maps request coordinates and validates authorization tokens.',
      'Semantic Layer translates concept query into optimized DuckDB expressions.',
      'OLAP Sandbox executes queries against locally hosted, compressed Parquet.'
    ]
  },
  {
    id: 'frontend',
    name: 'Frontend Architecture',
    category: 'Client Layer',
    responsibility: 'Coordinates client-side state, layout compilation, interactive drag-and-drop query builders, and ultra-high-rate Canvas redraw loops.',
    icon: Layout,
    subsystems: [
      { name: 'State Synchronizer', desc: 'Manages global date scopes, active filters, and synchronized chart cross-filtering parameters.' },
      { name: 'Visual Canvas Overlay', desc: 'Uses HTML5 Canvas to render high-density scatterplots and heavy tables, bypassing virtual DOM overhead.' },
      { name: 'Query Builder Interface', desc: 'A visual drag-and-drop query modeler producing declarative query JSON arrays.' },
      { name: 'Performance Profiler', desc: 'Measures page-load metrics, Web Vitals, and rendering frame-rates to detect local bottlenecks.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Mouse Click / Drag Triggers', description: 'Direct interaction with dashboard charts and filter menus.' },
      { type: 'input', data: 'JSON API Payloads', description: 'Aggregated analytical records returned from the backend router.' },
      { type: 'output', data: 'Rendered SVG / Canvas Elements', description: 'Fluid, interactive visuals showing active dataset trends.' },
      { type: 'output', data: 'Debounced Query Packets', description: 'Optimized REST requests targeting backend semantic endpoints.' }
    ],
    designPatterns: ['Unidirectional Data Flow', 'Composite View', 'Observer Pattern', 'Render Virtualization'],
    dataFlowSteps: [
      'User clicks on a chart segment to cross-filter the active dashboard.',
      'State Synchronizer updates global query context with selected segment coordinates.',
      'All visible dashboard charts receive update notifications and debounce queries.',
      'Canvas overlays redraw immediately when rendering data arrives, bypassing slow DOM reflows.'
    ]
  },
  {
    id: 'backend',
    name: 'Backend Architecture',
    category: 'API Layer',
    responsibility: 'Resolves analytical requests, handles metadata synchronization, executes local LLM natural-language schema parsing, and acts as the secure interface for data warehouse connections.',
    icon: Server,
    subsystems: [
      { name: 'Fastify API Engine', desc: 'Serves compressed JSON APIs with predictable performance and low overhead.' },
      { name: 'GitOps File Compiler', desc: 'Parses dashboard files from local disk and recompiles active metric states on file change.' },
      { name: 'NLQ Schema Translator', desc: 'Translates natural-language queries into semantic aggregates using local open-source embeddings models.' },
      { name: 'Secure Warehouse Gateway', desc: 'Manages pool configurations and credentials for third-party databases.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'REST JSON Envelopes', description: 'Client-requested dashboard query variables.' },
      { type: 'input', data: 'YAML Spec Files', description: 'Git-versioned dashboard and semantic metric definitions.' },
      { type: 'output', data: 'Compiled DuckDB SQL', description: 'Highly optimized query blocks executing against column stores.' },
      { type: 'output', data: 'Secured Connection Pools', description: 'Active connections to external database warehouses.' }
    ],
    designPatterns: ['Facade Pattern', 'Repository Pattern', 'Dependency Injection', 'Strategy Pattern (Warehouses)'],
    dataFlowSteps: [
      'API endpoint accepts client JSON specifying active metrics and filter constraints.',
      'GitOps compiler verifies semantic rules against active dashboard YAML states.',
      'Security layer sanitizes query variables to prevent SQL injection vectors.',
      'Backend schedules execution on the underlying analytical worker and formats return formats.'
    ]
  },
  {
    id: 'database',
    name: 'Database Architecture',
    category: 'Metadata Storage',
    responsibility: 'Maintains relational tables for user identities, access control roles, data warehouse configuration metadata, and dashboard layouts.',
    icon: Database,
    subsystems: [
      { name: 'SQLite Metadata Engine', desc: 'Used for single-instance or local self-hosted configurations to minimize setup.' },
      { name: 'PostgreSQL Core Hub', desc: 'Multi-tenant database storage for clustered enterprise deployments.' },
      { name: 'Drizzle Schema Mapper', desc: 'Type-safe database definition layer that restricts operations to strict transactional tables.' },
      { name: 'Secret Vault (AES-256)', desc: 'Encrypts third-party source database credentials at rest with AES-256-GCM.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'SAML Assertion Claims', description: 'User metadata fields from identity providers.' },
      { type: 'input', data: 'Dashboard Coordinates', description: 'Grid layout coordinates saved by dashboard creators.' },
      { type: 'output', data: 'Decrypted DB Passwords', description: 'Temporary decrypted credentials used during sync loops.' },
      { type: 'output', data: 'Workspace Profile States', description: 'Workspace profile states detailing active dashboard setups for a tenant.' }
    ],
    designPatterns: ['Unit of Work', 'Encryption-at-Rest Decorator', 'Polyglot Persistence'],
    dataFlowSteps: [
      'User changes the connection details of an external database connection.',
      'Drizzle Mapper formats the database command into safe parameterized updates.',
      'Secret Vault encrypts password fields using AES-256 before disk-write.',
      'Database transaction commits securely, logging revision state in system audit trails.'
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics Engine',
    category: 'OLAP Execution',
    responsibility: 'Performs highly parallel vectorized aggregates, multi-column joins, and window functions on local or enterprise data structures.',
    icon: Cpu,
    subsystems: [
      { name: 'DuckDB Vector Core', desc: 'Embedded process processing analytical queries over millions of local rows inside Node memory spaces.' },
      { name: 'Parquet Metadata Reader', desc: 'Reads Apache Parquet metadata and maps data files directly into CPU cache structures.' },
      { name: 'ClickHouse Proxy', desc: 'Enterprise gateway routing ultra-massive queries onto a distributed ClickHouse processing cluster.' },
      { name: 'Resource Sandbox', desc: 'Enforces query timeout loops and stops runaway queries from causing server crashes.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Optimized Column Queries', description: 'Analytical statements targeted for vectorized processors.' },
      { type: 'input', data: 'Compressed Parquet Blobs', description: 'Column-oriented parquet blocks containing historical rows.' },
      { type: 'output', data: 'Rectangular Memory Vectors', description: 'Highly optimized rectangular matrices mapped into CPU cache.' },
      { type: 'output', data: 'Performance Execution Profiles', description: 'Debugging analytics showing step-by-step processing timing.' }
    ],
    designPatterns: ['Vectorized Execution Model', 'Lazy Block Loading', 'Adapter Pattern (DuckDB / ClickHouse)'],
    dataFlowSteps: [
      'Query manager triggers analytical query compiled from semantic metrics.',
      'Parquet reader parses file headers, loading only required columns, skipping unrequested blocks.',
      'DuckDB thread executor groups data blocks in vectorized registers, processing columns in parallel.',
      'Resource Monitor kills execution if runtime exceeds specified threshold (e.g. 5 seconds).'
    ]
  },
  {
    id: 'ingestion',
    name: 'Data Ingestion Pipeline',
    category: 'Data Pipeline',
    responsibility: 'Executes incremental data syncing from external databases, normalizes source schemas, and writes highly compressed, sorted Parquet block files.',
    icon: RefreshCw,
    subsystems: [
      { name: 'Pipeline Scheduler', desc: 'Monitors cron expressions and starts sync jobs for configured data sources.' },
      { name: 'CDC Stream Reader', desc: 'Requests changes from sources using incremental cursors (timestamp, auto-increment keys).' },
      { name: 'Arrow Data Encoder', desc: 'Encodes row streams into Apache Arrow columnar memory structures for seamless formatting.' },
      { name: 'Parquet Partition Writer', desc: 'Writes compressed columnar files, sorting records by query keys to accelerate dashboard performance.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Database Webhook Signals', description: 'Signals from warehouses indicating new tables or partitions.' },
      { type: 'input', data: 'Transactional Change Rows', description: 'Raw database records extracted since the previous watermark.' },
      { type: 'output', data: 'Partitioned Parquet Files', description: 'Highly compressed, sorted data files structured in directory trees.' },
      { type: 'output', data: 'Ingestion Performance Reports', description: 'Log metadata showing record volume and sync durations.' }
    ],
    designPatterns: ['ETL Pipeline', 'Strategy Pattern (Warehouses)', 'Eventual Consistency Model'],
    dataFlowSteps: [
      'Scheduler fires ingestion cycle for production MySQL database table.',
      'CDC stream reader extracts records created or modified since the last high-watermark.',
      'Arrow encoder maps data types and streams tabular blocks to the file compressor.',
      'Writer partition-sorts files and updates active ingestion tables to trigger client-side refreshes.'
    ]
  },
  {
    id: 'rendering',
    name: 'Dashboard Rendering Pipeline',
    category: 'Client Layer',
    responsibility: 'Transforms analytical query payloads into responsive, highly interactive visual charts, ensuring zero lag during rapid user filtering.',
    icon: TrendingUp,
    subsystems: [
      { name: 'Recharts Native Layer', desc: 'Custom wrapper component layer that manages React animation lifecycles.' },
      { name: 'Cross-Filter Orchestrator', desc: 'Listens to chart selections and updates matching metric query components.' },
      { name: 'Canvas Overlay Engine', desc: 'Alternative high-performance renderer for extremely dense charts (50,000+ points).' },
      { name: 'ResizeObserver Core', desc: 'Monitors grid cards and resizes chart viewports on dashboard changes.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Columnar JSON Series', description: 'Raw tabular series ready for chart mapping.' },
      { type: 'input', data: 'Cursor Position Streams', description: 'Real-time mouse positions driving crosshairs and tooltips.' },
      { type: 'output', data: 'Interlinked Highlight States', description: 'Updated filter definitions applying cross-filtering visuals.' },
      { type: 'output', data: 'Auto-Sized Vector Graphics', description: 'Rendered SVG chart structures fit for active display panels.' }
    ],
    designPatterns: ['Canvas Overlay Rendering', 'Observer Pattern', 'Container Queries', 'React Concurrent Mode'],
    dataFlowSteps: [
      'React component receives tabular dataset results from backend express router.',
      'Recharts formats data records into coordinate arrays using internal responsive layout containers.',
      'Hover states activate high-performance tooltips, displaying matching contextual data.',
      'If the data series contains millions of nodes, the system activates the Canvas Overlay, bypasses SVG, and renders pixels directly.'
    ]
  },
  {
    id: 'authentication',
    name: 'Authentication Flow',
    category: 'Security Layer',
    responsibility: 'Identifies incoming users, validates identity parameters, hashes credentials, and handles corporate SSO integrations.',
    icon: Key,
    subsystems: [
      { name: 'Argon2id Hash Vault', desc: 'Encrypts and validates passwords using advanced CPU-hard hashing parameters.' },
      { name: 'JWTSigner Service', desc: 'Issues cryptographically signed JWT cookies with custom expiration and key rotation rules.' },
      { name: 'SSO Adapter Gateway', desc: 'Provides standard OIDC and SAML endpoints for Okta, Active Directory, or Google Workspace.' },
      { name: 'Session Rate Guard', desc: 'Monitors failed login attempts and applies temporary IP bans to prevent brute force.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Credentials & MFA Tokens', description: 'Login details entered into user interface modules.' },
      { type: 'input', data: 'SAML Response Tokens', description: 'SAML response assertions from corporate identity providers.' },
      { type: 'output', data: 'Secure HttpOnly Cookie', description: 'Cryptographically signed session cookies containing token structures.' },
      { type: 'output', data: 'Authorized JWT Payload', description: 'De-serialized scopes detail roles and active permissions.' }
    ],
    designPatterns: ['Token-based Stateless Auth', 'Adapter Pattern (SSO providers)', 'Guard Pattern'],
    dataFlowSteps: [
      'User submits email and password or clicks the "Login with Google" SSO button.',
      'SSO Adapter validates the identity and group claims with the external provider.',
      'Token Generator signs a JSON Web Token containing tenant permissions and expiration keys.',
      'Cookie coordinator attaches an HttpOnly, SameSite=Lax cookie to the user\'s browser, enabling stateless sessions.'
    ]
  },
  {
    id: 'authorization',
    name: 'Authorization Engine',
    category: 'Security Layer',
    responsibility: 'Restricts user actions based on roles (RBAC) and applies row-level security (RLS) to analytical queries, ensuring strict data privacy.',
    icon: Shield,
    subsystems: [
      { name: 'RBAC Policy Evaluator', desc: 'Evaluates user roles against a policy map before enabling write actions.' },
      { name: 'Row-Level Query Injector', desc: 'Intercepts analytical query structures and injects tenant-specific WHERE conditions.' },
      { name: 'Column Masking Engine', desc: 'Overwrites unauthorized column values (e.g. personal IDs, SSNs) with masked values based on user tags.' },
      { name: 'Audit Logger', desc: 'Generates immutable system execution logs detailing metadata queries.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Active Token Scopes', description: 'User roles parsed from decrypted JWT payloads.' },
      { type: 'input', data: 'Original Semantic Query', description: 'Unfiltered SQL statements before access processing.' },
      { type: 'output', data: 'Injected Filter Query', description: 'SQL statements decorated with row-level restrictions.' },
      { type: 'output', data: 'Sanitized Data Vectors', description: 'Result matrices with sensitive columns obscured or omitted.' }
    ],
    designPatterns: ['Policy Decider', 'Command Interceptor', 'Decorator Pattern'],
    dataFlowSteps: [
      'User attempts to view a financial performance dashboard.',
      'RBAC Authorizer verifies that the user holds the "Auditor" or "Executive" role tag.',
      'Row-Level Security Injector checks the user\'s regional tag (e.g., "West Region") and appends WHERE region = "West" to the query.',
      'Column-Level Masking removes sensitive billing numbers from the result array, protecting customer privacy.'
    ]
  },
  {
    id: 'caching',
    name: 'Caching Engine',
    category: 'Optimization Layer',
    responsibility: 'Intercepts duplicate analytical requests to reduce load on the OLAP database engine.',
    icon: HardDrive,
    subsystems: [
      { name: 'Process-Local LRU Store', desc: 'Process-local memory cache for single-node deployments, avoiding network overhead.' },
      { name: 'Redis Cache Interface', desc: 'Enterprise caching engine coordinating hit-states across multiple nodes.' },
      { name: 'SHA256 Fingerprinter', desc: 'Generates deterministic cache keys from query statements, user roles, and filter inputs.' },
      { name: 'Cache Invalidator Core', desc: 'Monitors ingestion logs and deletes cached values when underlying tables are updated.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'SQL String Variables', description: 'Raw query commands targeting DuckDB analytical tables.' },
      { type: 'input', data: 'Query Dataset Result', description: 'Fresh query aggregates freshly compiled from Parquet readers.' },
      { type: 'output', data: 'Instant Cached Payload', description: 'Stored dataset aggregates returned without processing delay.' },
      { type: 'output', data: 'Invalidation Commands', description: 'System orders to drop cache keys following database updates.' }
    ],
    designPatterns: ['Cache-Aside', 'Write-Through', 'Query Fingerprinting Pattern'],
    dataFlowSteps: [
      'Client sends analytical query request containing specific dashboard filter choices.',
      'SHA256 Fingerprinter hashes query SQL along with user groups to produce a unique Cache Key.',
      'Cache Manager queries Redis; on a cache HIT, the cached JSON data is returned instantly.',
      'On a MISS, query runs, and result is saved to Redis with a TTL matching the ingestion frequency.'
    ]
  },
  {
    id: 'export',
    name: 'Export System',
    category: 'Reporting',
    responsibility: 'Generates high-fidelity offline assets (PDF dashboards, CSV files, Excel spreadsheets) without disrupting server UI responsiveness.',
    icon: Share2,
    subsystems: [
      { name: 'Headless Browser Pool', desc: 'Coordinates sandboxed Puppeteer processes to render dashboards and export layout-perfect PDFs.' },
      { name: 'Arrow-to-CSV Streamer', desc: 'Streams rows directly from Parquet files to download pipes, keeping server memory usage low.' },
      { name: 'Excel Workbook Builder', desc: 'Constructs multi-sheet xlsx files with custom formatting and basic formulas.' },
      { name: 'Storage Vault Client', desc: 'Uploads generated report files to S3/Cloud Storage and produces secure pre-signed URLs.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'HTML Dashboard Schemas', description: 'Active dashboard coordinate structures and layouts.' },
      { type: 'input', data: 'Data Stream Chunks', description: 'High-volume data segments streaming from OLAP buffers.' },
      { type: 'output', data: 'Compiled PDF File', description: 'Visual reports matching page-media stylesheets.' },
      { type: 'output', data: 'Pre-Signed S3 Links', description: 'Expiring download paths delivering files securely.' }
    ],
    designPatterns: ['Worker Pool', 'Stream-based Data Exporters', 'Producer-Consumer Pattern'],
    dataFlowSteps: [
      'User clicks the "Export PDF Report" button on a dashboard card.',
      'Backend places an export task containing the dashboard URL into the background queue.',
      'Worker fetches the task, launches a headless Puppeteer browser, and logs in with system credentials.',
      'Puppeteer exports the page as a PDF, uploads the file to S3, and sends the download link to the user.'
    ]
  },
  {
    id: 'notifications',
    name: 'Notification System',
    category: 'Alerting Layer',
    responsibility: 'Monitors metric thresholds, handles user subscriptions, and dispatches real-time alerts across channels.',
    icon: Bell,
    subsystems: [
      { name: 'Alert Rule Evaluator', desc: 'Queries metric thresholds on ingestion completion or cron triggers.' },
      { name: 'SMTP Mailer Core', desc: 'Compiles dynamic HTML email alerts using secure, template-based delivery systems.' },
      { name: 'Slack & Webhook Dispatcher', desc: 'Formats and sends alerts to slack channels and external systems.' },
      { name: 'User Subscription Register', desc: 'Manages notification channels and alert schedules for users.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Threshold Formulas', description: 'User-defined metric bounds triggering alert pathways.' },
      { type: 'input', data: 'Metric Aggregates', description: 'Calculated metrics checked against threshold conditions.' },
      { type: 'output', data: 'Webhook Post Packets', description: 'JSON notification payloads sent to external slack/custom systems.' },
      { type: 'output', data: 'SMTP Email Delivery', description: 'HTML notification templates delivered to subscriber lists.' }
    ],
    designPatterns: ['Observer Pattern', 'Template Method', 'Circuit Breaker (Webhooks)'],
    dataFlowSteps: [
      'Ingestion sync completes, writing updated columns to disk.',
      'Alert Rule Evaluator queries DuckDB to verify metrics (e.g. WHERE bounce_rate > 5%).',
      'Threshold breach detected; Rule Evaluator builds markdown messages using templates.',
      'Webhook Dispatcher pushes alerts to Slack channels and external systems with retry policies.'
    ]
  },
  {
    id: 'background-jobs',
    name: 'Background Jobs Engine',
    category: 'Data Pipeline',
    responsibility: 'Processes long-running asynchronous tasks (CDC ingestion, PDF exports, cache warming, alert evaluations) in a separate thread context.',
    icon: Briefcase,
    subsystems: [
      { name: 'BullMQ Redis Queue', desc: 'Redis-backed job queue for high-throughput clustered deployments.' },
      { name: 'Graphile PG Worker', desc: 'PostgreSQL-backed background job processor that avoids external dependencies.' },
      { name: 'Task Concurrency Governor', desc: 'Throttles background workers during high query traffic to protect database resources.' },
      { name: 'Retry & Failover Controller', desc: 'Retries failed tasks with exponential backoff and routes persistent errors to alert systems.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Job Action Targets', description: 'Payload variables identifying the asynchronous task type.' },
      { type: 'input', data: 'Timer Clock Interrupts', description: 'Recurring scheduler events starting sync routines.' },
      { type: 'output', data: 'Job History Logs', description: 'Database entries documenting job runtimes and outcomes.' },
      { type: 'output', data: 'Invalidation Signal Flags', description: 'Process signals telling caches to drop obsolete values.' }
    ],
    designPatterns: ['Producer-Consumer', 'Priority Queues', 'Retry with Exponential Backoff'],
    dataFlowSteps: [
      'Export System schedules a heavy PDF rendering task.',
      'Producer pushes task details into BullMQ / Graphile Worker queue.',
      'An active background worker pulls the job from the queue and updates task status to "Active".',
      'Job completes, worker writes status to metadata storage, and notifies affected subsystems.'
    ]
  },
  {
    id: 'deployment-arch',
    name: 'Deployment Architecture',
    category: 'Infrastructure',
    responsibility: 'Provides single-command local setup, manages container clusters, and implements secure scaling.',
    icon: Cloud,
    subsystems: [
      { name: 'Multi-Arch Docker Compiler', desc: 'Compiles Node backends, static frontends, and native DuckDB/SQLite binaries into efficient Docker containers.' },
      { name: 'Kubernetes Helm Blueprint', desc: 'Helm charts for clustering metadata nodes and analytics processing queues.' },
      { name: 'Prometheus Scraping Core', desc: 'Exposes /metrics endpoint tracking active connections and query durations.' },
      { name: 'CD Pipeline Webhook', desc: 'Automates cloud runner deployment on fresh registry pushes.' }
    ],
    inputsOutputs: [
      { type: 'input', data: 'Repository Commit Flags', description: 'CI/CD pipeline signals triggering image construction.' },
      { type: 'input', data: 'Cluster Resource Telemetry', description: 'Node metrics (memory, CPU, disk IOPS) from cluster hosts.' },
      { type: 'output', data: 'Multi-Arch Image Registry', description: 'Lightweight Docker images fit for AWS, GCP, or Raspberry Pi.' },
      { type: 'output', data: 'Container Auto-Scale Directives', description: 'Directives telling Kubernetes to alter active pod quantities.' }
    ],
    designPatterns: ['Twelve-Factor App Model', 'Sidecar Pattern', 'Infrastructure-as-Code'],
    dataFlowSteps: [
      'Developer commits code to the repository.',
      'CI/CD pipeline builds AMD64 and ARM64 Docker images on commit.',
      'Kubernetes schedules container replicas across AWS Graviton nodes.',
      'Sidecars gather container metrics and forward them to a central monitoring instance.'
    ]
  }
];

export const uxScreens: UXScreenSpec[] = [
  {
    id: 'landing',
    name: 'Landing Screen',
    category: 'Onboarding & Auth',
    concept: 'Highly-focused visual landing gateway with crisp, centered typography, immediate action prompts, and an interactive, real-time query interface demo directly below the fold. Minimizes brand noise and maximizes functional exposure.',
    anatomyDescription: '1. Sticky Top Navigation (minimal brand signifier, documentation hub, changelog feed, and a single high-contrast login CTA).\n2. Centered Hero Pitch (4.5rem high-contrast Title, paired with a subhead focusing on zero-latency SQL analytics).\n3. Visual Command Bar (interactive simulation of the ⌘ K search prompt, demonstrating NLQ queries in real-time).\n4. Integrated Sandbox Console (a mock interactive table showing column metrics to bypass static screenshots).',
    typographyAndColors: '• Primary Headings: Inter Extra Bold (tracking-tight, text-white)\n• Body Typography: JetBrains Mono for query examples (text-slate-400), Inter Regular for content lists.\n• Contrast: 12.5:1 ratio using absolute slate dark backdrop (#07080E) coupled with pure white primary items.\n• Accents: Crisp cobalt borders (#312E81) and subtle warm violet gradients for active interactive focal zones.',
    keyInteractions: [
      'Magnetic CTA hover: CTA buttons pull the cursor slightly and shift border opacity.',
      'Interactive Command Input: Pressing G on the home screen immediately shifts focus to the search simulation bar.',
      'Visual Grid Hover: High-contrast grid line intersections glow under mouse cursor position coordinate grids.'
    ],
    keyboardShortcuts: [
      { key: 'G then L', action: 'Navigate instantly to the Login view.' },
      { key: '⌘ K', action: 'Focus visual interactive search demo bar.' },
      { key: 'D', action: 'Scroll smoothly to the integrated sandbox preview.' }
    ],
    usabilityEdgeCases: [
      'Slow Network State: Hero CTAs replace text with a skeleton line, keeping layouts structurally locked.',
      'Ad-blocker Interference: Falling back to standard system font-stacks gracefully if external assets are blocked.'
    ],
    mobileResponsive: 'Hero layout stacks column-wise. Interactive sandbox consolidates dimensions into an expand-on-tap drawer at the screen base.',
    icon: Sparkles
  },
  {
    id: 'login',
    name: 'Login Screen',
    category: 'Onboarding & Auth',
    concept: 'A singular, distraction-free card container designed for fast, frictionless entry. Completely removes global navigation to prevent dropoffs. Employs horizontal/vertical symmetry for balanced visual weight.',
    anatomyDescription: '1. Centralized Auth Card (crisp, narrow border with dynamic glow reflecting state).\n2. Brand Signifier (Aperture symbol, small, sharp, 24px).\n3. Passwordless Magic Link Box (primary field, autofocusing on load).\n4. Federated Identity Buttons (Okta, Google Workspace, GitHub SSO rows in low-contrast grays).\n5. Secure Classic Input (hidden toggled credential box below for local administrators).',
    typographyAndColors: '• Headers: 1.25rem Medium Inter (text-white)\n• Helper Labels: 10px Semi-bold JetBrains Mono (text-slate-500) for security claims.\n• Card Borders: Slate 800 (#1E293B) transitioning to Indigo 500 (#6366F1) when fields are active.',
    keyInteractions: [
      'Focus-Ring Morphing: Click on input transitions Card Border Glow dynamically.',
      'Dynamic Shake Loop: Fails of OIDC tokens cause the Centralized Card to shake 5px laterally.',
      'Auto-Suggest Flags: Successful login triggers a brief, subtle green check transition before rendering dashboards.'
    ],
    keyboardShortcuts: [
      { key: 'Tab', action: 'Move seamlessly between Login fields.' },
      { key: 'Enter', action: 'Submit active credentials or request Magic Link.' },
      { key: '⌘ O', action: 'Trigger Okta corporate SSO authentication pathway.' }
    ],
    usabilityEdgeCases: [
      'Expired Session: Form displays a small amber banner at top detailing "Session Expired. Please log in again."',
      'SSO Failure: If federated login errors out, redirects to email with pre-filled support ticket text.'
    ],
    mobileResponsive: 'Full viewport card height, input targets expanded to 46px height with generous hit targets for touch input.',
    icon: Lock
  },
  {
    id: 'dashboard',
    name: 'Dashboard Canvas',
    category: 'Workspace Core',
    concept: 'Highly dense, infinite-scroll grid organizing operational, analytical, and telemetry indicators into aligned, high-contrast bento panels. Replaces standard white-space blocks with visual lines.',
    anatomyDescription: '1. Persistent Global Filters (Date pickers, tenant coordinate dropdowns, custom segmentation rules).\n2. Interlocking Metric Cards (Top row showing core aggregates with sparklines).\n3. Cross-Filter Area (Interactive scatterplots and trend timelines mapping core records).\n4. Live Feed Stream (Low-latency table showing latest row transactions in monospace formatting).',
    typographyAndColors: '• Large Aggregates: 2.25rem Space Grotesk/Inter Bold (text-white)\n• Labels & Timestamps: 11px JetBrains Mono (text-slate-400)\n• Background: Slate 950 (#090D16) paired with cards rendered in Deep Slate (#0E1322).',
    keyInteractions: [
      'Interactive Chart Drag: Mouse dragging over trend lines highlights query boundaries and restricts all other metrics.',
      'Focal Crosshairs: Hovering over one chart draws vertical ruler lines across all stacked charts in unison.',
      'Widget Pinning: Double click on card headers expands widgets into central dialog frames.'
    ],
    keyboardShortcuts: [
      { key: 'G then D', action: 'Focus Dashboard viewport.' },
      { key: 'F', action: 'Open Global Filter panel overlay.' },
      { key: 'C', action: 'Clear all active filter coordinates.' },
      { key: 'R', action: 'Trigger manual database sync and invalidate query caches.' }
    ],
    usabilityEdgeCases: [
      'Zero Rows Scenario: Displays clean typography: "No matches found in active range. Reset filters (Press C)".',
      'Extreme Values: Numbers above billions are automatically shortened using unified scales (e.g. 1.2B) to protect borders.'
    ],
    mobileResponsive: 'All cards collapse into a stacked column layout. Top filter bar sticks to mobile top, collapsing into a slide-out filter drawer.',
    icon: Layout
  },
  {
    id: 'sidebar',
    name: 'Command Sidebar',
    category: 'Workspace Core',
    concept: 'High-density, collapsible navigation and control panel. Provides structural boundaries, instant workspace shifting, and real-time alerts without taking up active query workspace.',
    anatomyDescription: '1. Tenant Shift Selector (Workspace switcher with workspace logos and user credentials).\n2. Core Categories (Pinned dashboards, recent queries, dynamic alerts, SQL playgrounds).\n3. Saved Collections (Hierarchical tree of dashboard files synchronized via GitOps).\n4. Ingestion Feed Status (Dynamic indicators showing background sync states).',
    typographyAndColors: '• Items: 12px Inter Medium (text-slate-400, hover: text-white)\n• Status Labels: 10px Mono JetBrains (text-slate-500)\n• Backdrop: Absolute Dark Slate (#080B14) to separate navigation from active analytical canvases.',
    keyInteractions: [
      'Expand/Collapse transition: Left sidebar collapses smoothly to a narrow 48px icon rail.',
      'Notification Pings: Active alerts draw a subtle pulsing amber dot directly on the navigation list item.',
      'Drag-and-Drop Organization: Dragging dashboard items lets curators reorder items in directories.'
    ],
    keyboardShortcuts: [
      { key: '⌘ B', action: 'Toggle Sidebar visible/collapsed states.' },
      { key: 'G then S', action: 'Focus Settings within Sidebar directory.' },
      { key: 'G then Q', action: 'Navigate to SQL Playground playground.' }
    ],
    usabilityEdgeCases: [
      'Offline State: If server websocket drops, sidebar changes bottom logo to red and displays "Offline - Retrying...".',
      'Overfilled Lists: Active folders scrolling is isolated within its container to keep overall layouts locked.'
    ],
    mobileResponsive: 'Collapses into a slide-out left-drawer activated by a floating menu button at screen top.',
    icon: Server
  },
  {
    id: 'chart-builder',
    name: 'Chart Builder Studio',
    category: 'Creation Tools',
    concept: 'Two-panel analytical creator. Places configuration parameters on the left and instant visual layout previews on the right, enabling immediate visualization adjustments.',
    anatomyDescription: '1. Data Field Catalog (Draggable columns organized by type: dimension, metric, datetime).\n2. Drag-and-Drop drop zones (X-Axis, Y-Axis, Color encoding, Size attributes).\n3. Chart-Type Grid (Visual selector buttons: Area, Line, Scatter, Bar, Heatmap).\n4. Live Canvas Preview (Renders responsive, high-fidelity SVG graphics as configurations shift).',
    typographyAndColors: '• Section Labels: 10px Bold Mono (text-slate-500)\n• Field Badges: 11px Inter (text-indigo-300, bg-indigo-500/10, border-indigo-500/15)\n• Preview Grid: Dotted alignment lines (#1E293B) mirroring canvas grids.',
    keyInteractions: [
      'Dynamic Drag Shadows: Dragging fields renders light blue shadows on valid target coordinate zones.',
      'Instant Redraw Loop: Adjusting a dimension updates underlying query structures and updates visual charts in 20ms.',
      'Color Palette Selector: Hovering over color profiles previews chart spectrum variations.'
    ],
    keyboardShortcuts: [
      { key: 'V', action: 'Cycle through visual chart layouts (Bar → Line → Scatter).' },
      { key: '⌘ S', action: 'Save chart configuration and commit metadata to workspace.' },
      { key: '⌘ E', action: 'Open raw SQL representation of current visual chart parameters.' }
    ],
    usabilityEdgeCases: [
      'Incompatible Fields: Dragging text dimensions to mathematical axis prompts: "Line chart requires numeric metrics. Converting to Scatter Plot...".',
      'Huge Rows: Over 50,000 data rows automatically activates high-performance Canvas rendering, bypassing SVG.'
    ],
    mobileResponsive: 'Single column layout with a bottom tab switcher allowing users to toggle between Config parameters and Active Preview panels.',
    icon: TrendingUp
  },
  {
    id: 'sql-editor',
    name: 'SQL Playground',
    category: 'Creation Tools',
    concept: 'Professional terminal tailored for data analysts. Minimizes layout clutter, supports multiple query tabs, provides instant schema indexing, and formats tables using monospace grids.',
    anatomyDescription: '1. Tab Matrix (Multi-tab SQL query worksheets).\n2. SQL Input Area (Sleek text workspace with custom line numbers, code highlighting, and error gutters).\n3. Schema Browser (Collapsible sidebar displaying database catalogs, tables, columns, and data types).\n4. Output Console (Tabbed output tables showing execution timings and compiled aggregate records).',
    typographyAndColors: '• Editor Typography: Fira Code or JetBrains Mono (text-slate-200, selection: text-indigo-200)\n• Keywords: Bold Indigo (#818CF8), Comments: Slate 500 (#64748B), Values: Emerald 400 (#34D399)\n• Table Grid: Thin Slate lines (#1E293B) with striped records (#0F172A / #070B14).',
    keyInteractions: [
      'Autocompletion popups: Typing tables or columns triggers a dropdown of schema hints matching typed letters.',
      'Inline Errors: Syntax failures draw a wavy red line directly below coordinates, popping tooltips on mouseover.',
      'Column Sizing: Output grid boundaries are fully draggable to help developers review large rows.'
    ],
    keyboardShortcuts: [
      { key: '⌘ Enter', action: 'Execute active SQL query blocks.' },
      { key: '⌘ I', action: 'Auto-format SQL indentation and capitalizations.' },
      { key: '⌘ /', action: 'Toggle code comments over active lines.' },
      { key: '⌘ ]', action: 'Cycle forward through active editor worksheets.' }
    ],
    usabilityEdgeCases: [
      'Runaway Query: Clicking "Cancel Run" drops database connections, logging safe execution abort records.',
      'Null results: Empty columns display a light gray italicized label "NULL" to separate empty fields from empty strings.'
    ],
    mobileResponsive: 'We explicitly disable complex SQL composing on screens under 768px. Displaying SQL statements as read-only codecards.',
    icon: Terminal
  },
  {
    id: 'ai-assistant',
    name: 'AI Console Drawer',
    category: 'Creation Tools',
    concept: 'Natural-language query co-pilot. Connects directly to our local embedding database, letting analysts build metrics and layouts using standard conversational phrasing.',
    anatomyDescription: '1. Slide-out Panel Overlay (Activated from header or commands menu, slides out on the right).\n2. Message Stream (Conversational bubbles formatting queries, explaining schemas, and writing formulas).\n3. Dynamic Code Blocks (Interactive card items within messages that can be directly applied to play areas).\n4. Input Console (Text area supporting multi-line query logs, with indicator tags of referenced database scopes).',
    typographyAndColors: '• AI Response Panels: Slate 900 (#111827)\n• Code Text: 11px JetBrains Mono (text-amber-400, bg-slate-950)\n• Active Indicator: Pulsing mint green dot indicating AI ready-states.',
    keyInteractions: [
      'Apply to Editor click: Hovering over suggested queries displays an "Apply Worksheet" button that inserts code instantly.',
      'Scroll Anchor: New prompt streaming keeps chats anchored to the base, with manual scroll overriding lock-states.',
      'Reference Badges: Hovering over identified table tags highlights matching names in the schema browser.'
    ],
    keyboardShortcuts: [
      { key: '⌘ K', action: 'Toggle AI Console drawer visible/collapsed.' },
      { key: 'Escape', action: 'Dismiss slide-out panel overlay.' },
      { key: '⌘ ArrowUp', action: 'Insert last conversation prompt into active input field.' }
    ],
    usabilityEdgeCases: [
      'Hallucination Safeguards: SQL query outputs are auto-validated against active database catalogs before showing outputs to users.',
      'Interrupted Streaming: Drops in connection display clean error lines: "Prompt timeout. Retry (⌘ Shift R)".'
    ],
    mobileResponsive: 'Full screen slide-out block with a bottom action toolbar for fast, mobile-friendly touch prompts.',
    icon: Cpu
  },
  {
    id: 'settings',
    name: 'Workspace Settings',
    category: 'Settings & Shares',
    concept: 'Symmetrical, tabbed configuration cockpit. Isolates critical workspace configurations, API keys, and notification triggers into specific sidebar categories with immediate auto-saving.',
    anatomyDescription: '1. Settings Navigator (Sidebar lists: Workspace Profile, Team Members, Connected Databases, Keys, Preferences).\n2. Field Inputs Grid (Aligned input fields with explicit descriptive headers).\n3. Unified Save Indicator (Sticky footer showing "All changes saved locally" to avoid heavy save buttons).\n4. Critical Zones (Red-tinted blocks for billing terminations or database catalog purges).',
    typographyAndColors: '• Category Headings: 14px Inter Semi-Bold (text-white)\n• Description Text: 11px Inter Regular (text-slate-400)\n• Warning Blocks: Crimson border gradients (#991B1B) with low-opacity dark red backgrounds.',
    keyInteractions: [
      'Unsaved Warning loops: Attempting to close modified layouts prompts a low-vibration warning shake on affected forms.',
      'Key Exposure click: Clicking "Reveal Secret" transitions asterisks into high-contrast text with an expiring timer.',
      'Category shifting: Clicking items transitions page contents seamlessly with a 150ms lateral slide.'
    ],
    keyboardShortcuts: [
      { key: 'G then S', action: 'Jump instantly to settings cockpit.' },
      { key: '⌘ ,', action: 'Open settings dialog from any active view.' },
      { key: 'Escape', action: 'Close active settings modal.' }
    ],
    usabilityEdgeCases: [
      'Loss of Credentials: If active database credentials expire during config, highlights input boundaries in red.',
      'Rate Limits: API Key creation displays clear counts: "Active keys: 4 of 5 allowed in Developer license."'
    ],
    mobileResponsive: 'Sidebar transforms into a top dropdown selector. Inputs adjust to 100% viewport width with touch fields.',
    icon: Settings
  },
  {
    id: 'data-source',
    name: 'Data Source Manager',
    category: 'Data Pipeline',
    concept: 'Visual inventory and control deck for connected databases. Focuses on data reliability, sync schedules, and connection safety, keeping data flowing cleanly.',
    anatomyDescription: '1. Connections Grid (Cards representing databases: ClickHouse, MySQL, Snowflake, Postgres).\n2. Health Indicators (Colored status indicators displaying sync latency: Green: OK, Orange: Delayed, Red: Error).\n3. Sync Log Table (Detailed logs displaying rows fetched, ingestion runtimes, and active cron metrics).\n4. Create Connector Card (A clean, dashed button row triggering connection creation templates).',
    typographyAndColors: '• Database Names: 14px Inter Bold (text-white)\n• Latency text: 10px JetBrains Mono (text-slate-400)\n• Status Dot: Emerald 400 (#34D399) or Amber 500 (#F59E0B) for active latency states.',
    keyInteractions: [
      'Test Connection action: Clicking "Test" triggers a background query and glows green or red depending on status.',
      'Manual Sync loop: Hovering sync buttons triggers a rotation animation that runs during background processing.',
      'Logs Pagination: Dynamic scrolling loads sync history without refreshing layout grids.'
    ],
    keyboardShortcuts: [
      { key: 'G then C', action: 'Focus Data Source configuration cards.' },
      { key: 'T', action: 'Trigger health tests across all connected database systems.' },
      { key: 'N', action: 'Open "Add New Data Connection" overlay template.' }
    ],
    usabilityEdgeCases: [
      'Invalid Credentials: Ingest loops write detailed stack traces inside expandable panels, protecting credentials.',
      'Offline Server: Grey status indicators display "Unable to poll database health status. Recalculating..." templates.'
    ],
    mobileResponsive: 'Converts grid into single-column list cards. Row statistics collapse into touch-expandable sheets.',
    icon: Database
  },
  {
    id: 'import-wizard',
    name: 'Import Wizard',
    category: 'Data Pipeline',
    concept: 'Step-by-step assistant for converting raw local files into optimized Parquet tables. Prioritizes file type validation, schema inference, and drag-and-drop feedback.',
    anatomyDescription: '1. Process Header (Timeline line displaying step phases: 1. File Upload, 2. Schema Map, 3. Ingestion Config).\n2. Drag-and-Drop Area (Generous dotted-border box centered on screen, accepting CSV and Parquet formats).\n3. Column Mapping Panel (Interlocking table matching raw columns with target database types).\n4. Real-time Log Bar (Progress bars tracking upload speeds, row parsing, and compression ratios).',
    typographyAndColors: '• Phase Titles: 11px Inter Semi-Bold (text-indigo-400)\n• Drop Area Labels: 15px Inter Medium (text-white)\n• Schema Headers: 10px JetBrains Mono (text-slate-500) for inferred column layouts.',
    keyInteractions: [
      'Dynamic File Drag: Dragging files over the browser shifts border outlines from slate to glowing indigo.',
      'Automated Type Checks: Inferred types show colored badges (Int, Text, Date) that can be changed via simple dropdowns.',
      'Dynamic Progress: High-frequency bars render parsing speeds (e.g. 15,000 rows/sec) using smooth transitions.'
    ],
    keyboardShortcuts: [
      { key: '⌘ U', action: 'Open import assistant dialog.' },
      { key: 'Space', action: 'Trigger default file finder overlay.' },
      { key: 'Enter', action: 'Progress to the next schema mapping phase.' }
    ],
    usabilityEdgeCases: [
      'Corrupted File Schema: Uploading scrambled files flags bad rows in red, allowing users to skip errors.',
      'Duplicate Columns: Highlights matching names: "Column \'id\' appears twice. Renaming second column to \'id_1\'."'
    ],
    mobileResponsive: 'Import Wizard is disabled on mobile screens under 1024px due to grid data density constraints.',
    icon: RefreshCw
  },
  {
    id: 'share-dashboard',
    name: 'Share Studio',
    category: 'Settings & Shares',
    concept: 'Contextual access management dialog. Consolidates user permissions, share link generators, and embedded HTML codes into a clean, minimalist overlay.',
    anatomyDescription: '1. Tab Selector (Tabs: Member Invites, Public Links, Embed Codes).\n2. Email Invite Grid (Multi-field line containing email inputs and role dropdown selections).\n3. Member Access List (Scrolling list showing profile chips, active roles, and delete controls).\n4. Expiring Token Creator (Controls to generate pre-signed, secure, expiring public links).',
    typographyAndColors: '• Access Roles: 11px Inter Semi-Bold (text-slate-400)\n• Token Links: 10px JetBrains Mono (text-indigo-400, bg-[#0A0E1A])\n• Toggle Switches: Cobalt background (#4F46E5) for active states.',
    keyInteractions: [
      'One-click Copy: Clicking "Copy URL" turns button labels to a green "Copied!" check for 2 seconds.',
      'Dynamic Row Removals: Deleting team member access fades out names with a quick horizontal slide.',
      'Email Autocomplete: Entering names parses active organization rosters, suggesting matched entries.'
    ],
    keyboardShortcuts: [
      { key: '⌘ Shift S', action: 'Open Share Studio overlay panel.' },
      { key: '⌘ C', action: 'Copy active dashboard link coordinates.' },
      { key: 'I', action: 'Shift focus immediately to Email Invite field.' }
    ],
    usabilityEdgeCases: [
      'Domain Restriction: Workspace administrators can lock sharing to verified company email domains only.',
      'Token Expiration: Links display remaining hours (e.g., "Expires in 14 hours") to avoid access confusion.'
    ],
    mobileResponsive: 'Overlay adjusts to 100% mobile viewport height with full touch sliders for all options.',
    icon: Share2
  },
  {
    id: 'export',
    name: 'Export Studio',
    category: 'Settings & Shares',
    concept: 'Reporting asset configuration panel. Renders actual visual layout previews of exported PDF or spreadsheet boundaries, ensuring layout-perfect outputs.',
    anatomyDescription: '1. Format Selections (High-contrast preset cards: Layout-Perfect PDF, Row CSV, Excel Sheet, Vector SVG).\n2. Print Boundary Overlays (Rulers and grids adjusting paper formats: A4, Letter, Portrait, Landscape).\n3. Column Selection Matrix (Checklist selectors letting curators filter exported columns).\n4. Download Processing Overlay (Sleek drawer tracking background compiler queues).',
    typographyAndColors: '• Dimensions Text: 10px JetBrains Mono (text-slate-500)\n• Layout Scales: 11px Inter Regular (text-slate-300)\n• Status Flags: Soft blue border gradients (#2563EB) during active download generation.',
    keyInteractions: [
      'Aesthetic Layout Preview: Changing formats scales page boundaries with real-time aspect ratios.',
      'Column Check Toggles: Checking columns immediately updates cells in the miniature export table.',
      'Dynamic Downloads: Complete exports prompt a temporary download bar at the screen base.'
    ],
    keyboardShortcuts: [
      { key: '⌘ P', action: 'Open Export Studio modal.' },
      { key: '⌘ J', action: 'Download active table directly as CSV format.' },
      { key: '⌘ H', action: 'Toggle page orientation (Portrait ↔ Landscape).' }
    ],
    usabilityEdgeCases: [
      'Massive Row Exports: CSV datasets with over 1,000,000 rows stream rows directly, avoiding memory crashes.',
      'Puppeteer Failures: If PDF conversion times out, switches to vector page prints natively.'
    ],
    mobileResponsive: 'Simplified to instant CSV/Excel download actions, removing complex PDF layout tuning.',
    icon: FileText
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode System',
    category: 'Experience Modes',
    concept: 'A unified contrast-balanced palette engineered for technical workspaces. Replaces standard pitch blacks with deep ink slates, preserving contrast ratios and reducing eye strain.',
    anatomyDescription: '1. Global Backgrounds (Deep ink slate background that maintains deep shadows without losing grid lines).\n2. Interlocking Borders (Muted slate grid separators creating sharp structure without visual noise).\n3. Secondary Text Rules (Soft charcoal grays highlighting secondary dimensions and technical notes).\n4. Core Accents (Saturated, neon-adjacent colors used only for data lines and indicators).',
    typographyAndColors: '• Default Canvas: Deep Obsidian (#06080F)\n• Elevated Surfaces: Muted Carbon (#0D111A)\n• Grid Borders: Slate Grey (#1F293D)\n• Core Highlights: Warm Indigo (#818CF8) and Seafoam Green (#34D399).',
    keyInteractions: [
      'Theme Shift Curve: Transitioning modes morphs all element backgrounds with a 300ms ease-in-out curve.',
      'Chart Glow Adjustment: Mode updates reduce active chart glows to prevent screen halo effects.',
      'Unified Contrast Checks: Core variables automatically recalibrate to preserve 7.5:1 visibility scores.'
    ],
    keyboardShortcuts: [
      { key: '⌘ Shift D', action: 'Toggle between Dark Slate and Light themes.' },
      { key: '⌘ H', action: 'Lower overall layout brightness (Theater Mode).' }
    ],
    usabilityEdgeCases: [
      'Ambient Sunlight: Theater Mode automatically disabled under strong ambient sensor feeds.',
      'Color-blind settings: Mode shifting updates red/green charts to high-contrast blue/orange palettes.'
    ],
    mobileResponsive: 'Maintains identical dark color palettes across all handheld mobile screen layouts.',
    icon: Eye
  },
  {
    id: 'mobile',
    name: 'Mobile Viewport Spec',
    category: 'Experience Modes',
    concept: 'Multi-touch mobile view. Condenses heavy analytical grids into swipe-friendly, single-column visual cards, providing dashboard control on the go.',
    anatomyDescription: '1. Navigation Header (Hamburgers, active company title, quick alerts icon).\n2. Dynamic Filter Scroll (A horizontal scroll rail showing active date segments and filtering controls).\n3. Primary Card Grid (Stacked list cards scaling to 100% viewport width).\n4. Bottom Control Rail (Touch icons giving access to Dashboards, SQL, and Settings).',
    typographyAndColors: '• Header Headings: 15px Bold Inter (text-white)\n• Metric Labels: 10px JetBrains Mono (text-slate-400)\n• Touch Targets: Standard 46px grid squares with spacious touch margin separation.',
    keyInteractions: [
      'Slide-Out Drawer Gestures: Sweeping right from edge slides navigation overlays open seamlessly.',
      'Pull-to-Refresh: Dragging dashboards down triggers connection polls and re-syncs datasets.',
      'Chart Touch Crosshairs: Dragging fingers across charts highlights data coordinates with responsive indicators.'
    ],
    keyboardShortcuts: [
      { key: 'No Physical Keys', action: 'All operations are triggered by swipe gestures.' }
    ],
    usabilityEdgeCases: [
      'Vertical Rotation: Rotating devices opens dual-pane layouts matching desktop viewports.',
      'Unstable Network: Displays static data frames with offline badges until network connection is restored.'
    ],
    mobileResponsive: 'All layouts are designed mobile-first, ensuring smooth, highly polished touch states.',
    icon: Smartphone
  }
];
