export interface RepoFileSpec {
  name: string;
  description: string;
  role: string;
}

export interface RepoNode {
  id: string;
  name: string;
  path: string;
  iconName: 'folder' | 'frontend' | 'backend' | 'infra' | 'docker' | 'github' | 'test' | 'docs' | 'script' | 'package' | 'config' | 'assets' | 'public' | 'examples';
  shortDesc: string;
  whyItExists: string;
  architecturalRole: string;
  designPrinciples: string[];
  suggestedFiles: RepoFileSpec[];
  bestPractices: string[];
  cognitiveBenefit: string;
}

export const repositoryTreeData: RepoNode[] = [
  {
    id: 'github-actions',
    name: 'GitHub Actions (.github/workflows)',
    path: '.github/workflows/',
    iconName: 'github',
    shortDesc: 'Declarative pipelines for continuous integration, type checking, auditing, and automated container delivery.',
    whyItExists: 'Modern teams require rapid, automated feedback to prevent software regressions. This directory acts as the centralized engine of the continuous integration and delivery (CI/CD) system, automating code quality checks, security audits, test execution, and deployment.',
    architecturalRole: 'Enforces quality gates before any code merges into production. It isolates build verification processes in secure, cloud-hosted virtual environments, ensuring only thoroughly compiled and tested artifacts are distributed.',
    designPrinciples: [
      'Idempotency: Pipeline actions must yield the exact same results regardless of run frequency.',
      'Immutable Artifacts: Docker images are compiled and tagged with unique commit hashes, preventing running untested changes in production.',
      'Parallelized Execution: Severs dependency bottlenecks by splitting linter tasks, database unit tests, and integration tests into concurrent worker nodes.'
    ],
    suggestedFiles: [
      {
        name: 'ci.yml',
        description: 'Automates linting (ESLint), type validation (tsc), security vulnerabilities auditing (npm audit), and lightweight unit tests on every pull request.',
        role: 'Prevents corrupted, un-linted, or type-broken code from merging into core development branch namespaces.'
      },
      {
        name: 'release.yml',
        description: 'Compiles production-optimized Docker containers, executes multi-arch builds (AMD64 & ARM64), and publishes successful builds to the secure Google Artifact Registry.',
        role: 'Facilitates automated zero-downtime deployment releases upon merging features to the main branch.'
      }
    ],
    bestPractices: [
      'Pin action versions to exact cryptographic commit SHA values instead of mutable tags (e.g., node@v4) to shield workflows from upstream supply-chain compromises.',
      'Configure robust repository-level caching rules (e.g. cache node_modules, cache Docker build cache layers) to optimize pipeline runtimes below 3 minutes.'
    ],
    cognitiveBenefit: 'Eliminates human deployment mistakes and manual release testing cycles, providing engineers with confidence on every single commit.'
  },
  {
    id: 'config',
    name: 'Unified Config (.config/)',
    path: '.config/',
    iconName: 'config',
    shortDesc: 'A centralized repository namespace housing tooling presets, syntax linting policies, and environment parameters.',
    whyItExists: 'In large-scale microservices or monorepos, scattering configuration files like .eslintrc, .prettierrc, and tsconfig.json across individual project folders leads to fragmented standards, duplicate declarations, and configuration drift.',
    architecturalRole: 'Provides a single source of truth for repository behavior, syntax guidelines, and compilation rules, allowing sub-folders to inherit settings through simple extends directives.',
    designPrinciples: [
      'Dry (Don\'t Repeat Yourself): Consolidates tooling configurations so updates propagate automatically to all packages.',
      'Strict Type-Checking: Configures rigorous compilations (e.g., disallow implicit returns, enforce strict null checking) to catch code errors early.',
      'Standardized Quality: Aligns team formatting rules strictly, preventing unnecessary noise in git commit differentials.'
    ],
    suggestedFiles: [
      {
        name: 'eslint/base.json',
        description: 'Contains core language rules, accessibility mandates (JSX-a11y), and import sorting presets.',
        role: 'Serves as the parent configuration file inherited by the frontend, backend, and shared libraries.'
      },
      {
        name: 'typescript/tsconfig.base.json',
        description: 'Strict TypeScript compilation instructions defining ECMAScript target outputs, module resolutions, and strict flags.',
        role: 'Provides base structural compiler options ensuring all apps parse and compile code symmetrically.'
      }
    ],
    bestPractices: [
      'Enforce linting and formating presets inside pre-commit hooks (e.g., using husky and lint-staged) to prevent poorly styled code from reaching remote branches.',
      'Keep configurations strictly separate from application business code to ease tooling updates.'
    ],
    cognitiveBenefit: 'Saves developer time by aligning IDE code formatters, removing arguments over code styles, and simplifying dependency updates.'
  },
  {
    id: 'assets',
    name: 'Static Assets (assets/)',
    path: 'assets/',
    iconName: 'assets',
    shortDesc: 'Houses high-fidelity static media, branding guidelines, technical architecture diagrams, and mock database layers.',
    whyItExists: 'Documentation and presentations need visual assets (diagrams, logos, banners) that remain stable over time. Storing these assets directly within the repository keeps documentation and code perfectly synchronized, avoiding the risk of broken links to external hosting sites.',
    architecturalRole: 'Acts as the offline media vaults of the platform, providing design materials, conceptual diagrams, and user flow documentation directly to developers and stakeholders alike.',
    designPrinciples: [
      'Vector Priority: Prefer vector-based SVGs over raster formats (PNG, JPEG) to guarantee crisp visual display at any resolution with low storage footprints.',
      'Organization Symmetries: Group resources logically into subdirectories matching branding, docs, and mock fixtures.',
      'No Large BinaryBlobs: Excludes heavy videos or massive media datasets to prevent repository size bloat.'
    ],
    suggestedFiles: [
      {
        name: 'brand/logo_dark.svg',
        description: 'The vector design files of the platform logo optimized for dark layouts.',
        role: 'Guarantees consistent, high-contrast brand recognition across documentation and application login interfaces.'
      },
      {
        name: 'architecture/system_dataflow.svg',
        description: 'High-detail technical flowchart displaying the vectorized analytical pipelines from clickhouse ingestion down to D3 React viewports.',
        role: 'Assists newly onboarded engineers in conceptualizing system relationships quickly.'
      }
    ],
    bestPractices: [
      'Apply SVG compressors (like SVGO) to all media assets prior to checking them into git to strip metadata, editor coordinates, and extra namespaces.',
      'Utilize Git LFS (Large File Storage) if large binary design mockups or asset bundles must be stored in the repository.'
    ],
    cognitiveBenefit: 'Keeps design details and systems diagrams directly inside the developer workspace, easing technical conceptualization during engineering sprints.'
  },
  {
    id: 'public',
    name: 'Public Assets (public/)',
    path: 'public/',
    iconName: 'public',
    shortDesc: 'Shared client-side files, favicons, security crawlers instructions, and static metadata served directly to the browser root.',
    whyItExists: 'Client browsers and internet web crawlers query certain files directly from the absolute root URI (e.g., /robots.txt or /favicon.ico). This directory stores raw assets that bypass code compilation and bundler optimizations, making them accessible to any direct browser request.',
    architecturalRole: 'Acts as the static gateway served at the absolute domain root of the web platform, handling core search indexes, favicon configurations, and browser-level identity settings.',
    designPrinciples: [
      'Static Independence: Files within this directory must remain self-contained, requiring zero database requests or runtime compilation.',
      'Cross-Platform Interoperability: Favicon architectures should accommodate Apple iOS, Google Android, and desktop browsers perfectly.',
      'SEO & Crawling Safeguards: Explicitly sets scraping directions to keep internal operational endpoints private.'
    ],
    suggestedFiles: [
      {
        name: 'robots.txt',
        description: 'Web crawler rule files instructing Googlebot and Bingbot on which paths to catalog and which paths (such as admin panels or query terminals) to ignore.',
        role: 'Optimizes search indexing footprints while preventing crawlers from stressing sensitive analytical backend endpoints.'
      },
      {
        name: 'favicons/site.webmanifest',
        description: 'Declarative JSON configuration detailing browser application icons, background colors, orientations, and themes.',
        role: 'Allows users to pin the BI dashboard platform to mobile and desktop home screens as a high-contrast web app.'
      }
    ],
    bestPractices: [
      'Keep files in this folder extremely lightweight; avoid packing large datasets, custom fonts, or high-definition pictures that could be optimized via bundler trees.',
      'Always implement long-term browser cache headings for files within public/ to accelerate subsequent platform visits.'
    ],
    cognitiveBenefit: 'Ensures the application renders correctly in browser tab lists, search results, and mobile home screens with zero loading delays.'
  },
  {
    id: 'scripts',
    name: 'Automation Scripts (scripts/)',
    path: 'scripts/',
    iconName: 'script',
    shortDesc: 'Onboarding automation, local schema updates, developer macros, and database setup scripts.',
    whyItExists: 'A sign of high-quality software craftsmanship is the ease of getting started. Manual configuration sequences are fragile and error-prone. This directory houses automated macros to streamline local setup, test data generation, and operational maintenance.',
    architecturalRole: 'Empowers developers with rapid execution commands, bridging the gap between raw codebase folders and operational systems.',
    designPrinciples: [
      'Fail-Fast: Automation scripts must inspect and report missing environment variables or credentials immediately, rather than failing silently.',
      'Defensive Design: Checks active dependencies (such as confirming Docker or npm are installed) before executing complex commands.',
      'Verbose Feedback: Output structural, color-coded terminals lines detailing active tasks and clear instructions in case of failures.'
    ],
    suggestedFiles: [
      {
        name: 'setup.sh',
        description: 'A single-command developer environment bootstrap script that checks requirements, builds config files, and launches Docker containers.',
        role: 'Enables any newly joined engineer to transition from repository cloning to active code development in minutes.'
      },
      {
        name: 'db-migrate.ts',
        description: 'Analytical database schema setup script that compiles relational structures and initializes standard tables inside ClickHouse/DuckDB.',
        role: 'Facilitates reliable, repeatable schema updates without manual SQL terminal execution.'
      }
    ],
    bestPractices: [
      'Write shell scripts defensively utilizing strict flags (such as "set -euo pipefail" in bash) to stop execution instantly if a nested command returns an error.',
      'Document the required inputs and environment variables at the top of each script file.'
    ],
    cognitiveBenefit: 'Bypasses the traditional overhead of manual setup steps, ensuring developers spend their time writing features rather than fighting system configurations.'
  },
  {
    id: 'docs',
    name: 'Engineering Wiki (docs/)',
    path: 'docs/',
    iconName: 'docs',
    shortDesc: 'Repository encyclopedia, architectural decision records (ADRs), API blueprints, and developer guides.',
    whyItExists: 'Code explains "how", but documentation explains "why". As architectures evolve, the original design intentions are often lost, causing downstream developers to introduce conflicting designs. This directory acts as the engineering ledger, preserving structural decisions, data schemas, and integration specifications.',
    architecturalRole: 'Provides a developer-friendly knowledge base directly alongside the source code, keeping technical documentation and engineering implementations in perfect alignment.',
    designPrinciples: [
      'Version-Controlled Truth: Storing documentation as Markdown files allows changes to be tracked, reviewed, and approved via pull requests.',
      'Architectural Traceability: Uses structured ADR structures to preserve technical decisions, describing alternatives, trade-offs, and final decisions.',
      'Simplicity & Scannability: Formats files using clean headings, monospace font blocks, and bullet lists to ensure clarity.'
    ],
    suggestedFiles: [
      {
        name: 'ADR/0002-olap-database-selection.md',
        description: 'Architectural Decision Record documenting the technical evaluations of columnar engines (ClickHouse vs DuckDB vs Snowflake) and the selection rationale.',
        role: 'Preserves the decision-making context, preventing redundant debates over why certain core technologies were selected.'
      },
      {
        name: 'SETUP.md',
        description: 'A comprehensive guide detailing system prerequisites, local environment configurations, diagnostic steps, and deployment procedures.',
        role: 'Onboards external contributors and team members securely.'
      }
    ],
    bestPractices: [
      'Enforce documentation updates as part of major feature pull requests to keep specs and implementations synchronized.',
      'Use standard ADR templates (e.g., Michael Nygard format) containing Title, Status, Context, Decision, and Consequences to maintain consistency.'
    ],
    cognitiveBenefit: 'Reduces developer confusion and prevents technical drift by clarifying architectural decisions and constraints in plain language.'
  },
  {
    id: 'infra',
    name: 'Infrastructure IaC (infra/)',
    path: 'infra/',
    iconName: 'infra',
    shortDesc: 'Declarative Infrastructure-as-Code (IaC) files, Helm configurations, and cloud-native cluster manifests.',
    whyItExists: 'Manually clicking through cloud portals to set up servers, database clusters, and networking components is slow, unrepeatable, and error-prone. Managing infrastructure as code allows teams to provision, modify, and decommission environments instantly and reliably.',
    architecturalRole: 'Handles platform provisioning and deployment, translating logical service definitions into live, scalable physical nodes, private networks, and firewalls inside major cloud providers.',
    designPrinciples: [
      'Immutable Infrastructure: Promotes rebuilding cloud components from declarative scripts rather than modifying live servers in place.',
      'Principle of Least Privilege: Configures restrictive network security parameters, isolating internal analytical database instances from public traffic.',
      'Multi-Environment Symmetry: Standardizes infrastructure scripts to provision identical structures across Staging, UAT, and Production environments.'
    ],
    suggestedFiles: [
      {
        name: 'terraform/main.tf',
        description: 'Terraform configuration provisioning virtual networks, server instances (GKE/EKS clusters), database pools, and access keys.',
        role: 'Enables quick cloud orchestration.'
      },
      {
        name: 'helm/values.yaml',
        description: 'Kubernetes Helm configuration setting pod replicas, memory limits, ingress hostnames, and environment flags.',
        role: 'Coordinates high-availability, low-overhead container routing inside active clusters.'
      }
    ],
    bestPractices: [
      'Store Terraform state files in secure, remote cloud storage with state-locking enabled (e.g., AWS S3 with DynamoDB or GCS) to prevent concurrent state corruption.',
      'Never hardcode sensitive credentials; access keys and certificates must be dynamically fetched from key managers (e.g., Vault, Secret Manager).'
    ],
    cognitiveBenefit: 'Bypasses manual configuration steps, providing repeatable, secure cloud hosting layouts with zero guesswork.'
  },
  {
    id: 'docker',
    name: 'Containerization (docker/)',
    path: 'docker/',
    iconName: 'docker',
    shortDesc: 'Dockerfiles, multi-stage compilation specifications, and container-orchestration setups.',
    whyItExists: '"It works on my machine" is a common developer issue. By packaging application files, runtimes, system dependencies, and libraries into a portable image, Docker ensures that software runs identically across local development machines, CI/CD runners, and production cloud systems.',
    architecturalRole: 'Defines container environments, building secure, minimal images that accelerate startup times, lower resource footprints, and simplify horizontal scaling.',
    designPrinciples: [
      'Multi-Stage Builds: Isolates heavy compiler tools to intermediate build stages, outputting light images containing only compiled application binaries.',
      'Least Privilege Runtime: Launches containers as non-root users, protecting host systems from container breakouts.',
      'Layer Optimization: Orders Docker commands from least-frequently changed to most-frequently changed to maximize image caching speeds.'
    ],
    suggestedFiles: [
      {
        name: 'prod.dockerfile',
        description: 'Multi-stage production Docker blueprint that compiles frontend JS, builds backend binaries, and outputs a secure, minimal runtime container.',
        role: 'Supplies production-grade images.'
      },
      {
        name: 'docker-compose.yml',
        description: 'Coordinates local multi-container development layouts, mounting the backend, database layers, and caches in a local isolated virtual network.',
        role: 'Simulates production networking locally with a single command.'
      }
    ],
    bestPractices: [
      'Utilize small, audited official parent images (like alpine or slim distributions) to minimize the attack surface and speed up download times.',
      'Explicitly ignore development junk files (using a .dockerignore file) to prevent bloating the container context.'
    ],
    cognitiveBenefit: 'Guarantees environment symmetry across all stages of development, eliminating environment-specific bugs.'
  },
  {
    id: 'tests',
    name: 'Integration Suites (tests/)',
    path: 'tests/',
    iconName: 'test',
    shortDesc: 'End-to-end user flow testing scripts, performance load testing, and API integration scenarios.',
    whyItExists: 'While unit tests verify individual code blocks in isolation, they cannot confirm that complex multi-tier systems function correctly together. This directory contains integration tests that simulate actual user interactions, heavy loads, and networking issues.',
    architecturalRole: 'Ensures system reliability, verifying that frontends, backend gateways, databases, and third-party integrations work cohesively before release.',
    designPrinciples: [
      'Black-Box Verification: Tests systems by interacting with public interfaces, mimicking real user behaviors.',
      'Isolating Test State: Pre-generates mock database workspaces and purges them post-test to maintain clean, reliable test runs.',
      'Resiliency & Safety: Avoids testing against live production resources, running tests inside isolated staging or temporary sandbox environments.'
    ],
    suggestedFiles: [
      {
        name: 'e2e/login_and_query.spec.ts',
        description: 'Playwright automation script that launches a headless browser, log in, builds an interactive query, and confirms the chart is rendered correctly.',
        role: 'Verifies the core user journey remains functional after any system modification.'
      },
      {
        name: 'performance/load_test.js',
        description: 'An execution plan (using k6/Artillery) simulating 500 concurrent dashboard users to measure API latency boundaries.',
        role: 'Flags potential performance bottlenecks and memory leaks.'
      }
    ],
    bestPractices: [
      'Write end-to-end tests to target stable user journeys rather than minor visual UI details to avoid brittle tests.',
      'Include clear, descriptive console logging on test failures, capturing network activity and console errors to ease debugging.'
    ],
    cognitiveBenefit: 'Prevents regressions and production outages by catching system-level issues early in the delivery pipeline.'
  },
  {
    id: 'packages',
    name: 'Shared Workspace Packages (packages/)',
    path: 'packages/',
    iconName: 'package',
    shortDesc: 'Modular, shared, and version-controlled packages in a monorepo setup.',
    whyItExists: 'In full-stack architectures, duplicate code (such as validation schemas, database models, and API interfaces) frequently creeps into both the frontend and backend. Consolidating shared code into independent local packages avoids duplicate code and simplifies code updates.',
    architecturalRole: 'Serves as the internal library registry, providing type contracts and utility functions across all services while preventing circular dependencies.',
    designPrinciples: [
      'Strict Separation of Concerns: Keeps business logic decoupled from transport protocols and rendering libraries.',
      'Single Source of Truth: Edits to shared schemas propagate automatically to both client-side and server-side components.',
      'Loose Coupling: Packages maintain independent configurations, allowing them to compile without relying on global runtime state.'
    ],
    suggestedFiles: [
      {
        name: 'shared-types/index.ts',
        description: 'Unified TypeScript interfaces and API schemas representing payload contracts, user models, and data types.',
        role: 'Prevents interface discrepancies between frontends and backend controllers.'
      },
      {
        name: 'db-schema/index.ts',
        description: 'Declarative database schema models and database validation constraints utilized across ingest pipelines and migration managers.',
        role: 'Maintains database structure consistency.'
      }
    ],
    bestPractices: [
      'Declare external dependencies cleanly inside each package\'s own package.json to prevent ghost dependency errors.',
      'Avoid placing framework-specific dependencies (such as React) in core logic packages (e.g. types/schemas).'
    ],
    cognitiveBenefit: 'Keeps types, validations, and helper utilities in sync across both client and server code, making refactoring safe and fast.'
  },
  {
    id: 'frontend',
    name: 'Frontend Application (apps/frontend/)',
    path: 'apps/frontend/',
    iconName: 'frontend',
    shortDesc: 'A high-performance Single Page Application (SPA) built using React, Tailwind CSS, and D3/Recharts.',
    whyItExists: 'Modern BI platforms require highly interactive, fluid user interfaces. The frontend translates complex analytical records into interactive visual dashboards, providing analysts with intuitive tools to filter, explore, and analyze data.',
    architecturalRole: 'Renders the visual layout, manages client-side state, translates user filter events into query variables, and renders visualizations.',
    designPrinciples: [
      'Component Virtualization: Utilizes optimized rendering loops, keeping interface lag under 16ms during high-density visual updates.',
      'Utility-First Styling: Tailwind CSS classes enable responsive, fluid visual hierarchies with high-contrast color choices.',
      'Symmetric Component Design: Groups visual resources cleanly into logical features, separating interactive forms, UI components, and state.'
    ],
    suggestedFiles: [
      {
        name: 'src/main.tsx',
        description: 'The primary entry point file mounting the React virtual tree and loading global configurations.',
        role: 'Initializes and mounts the frontend application.'
      },
      {
        name: 'package.json',
        description: 'Lists frontend dependency structures (React, Tailwind, Lucide, Recharts) and build scripts.',
        role: 'Configures client build systems and packages.'
      }
    ],
    bestPractices: [
      'Debounce search inputs and slider filters to prevent redundant server queries during rapid user adjustments.',
      'Maintain sufficient color contrast ratios to satisfy WCAG AA standards, ensuring charts are accessible.'
    ],
    cognitiveBenefit: 'Delivers a highly fluid, responsive analytical sandbox, minimizing latency and letting analysts focus on exploring their data.'
  },
  {
    id: 'backend',
    name: 'Backend Gateway (apps/backend/)',
    path: 'apps/backend/',
    iconName: 'backend',
    shortDesc: 'The API gateway and analytical orchestration engine built using Node.js and Fastify/Express.',
    whyItExists: 'The server acts as the secure coordinator of analytical queries. It manages authorization, queries columnar database stores, processes scheduled data ingestions, and coordinates API requests.',
    architecturalRole: 'Serves as the secure entry point for all API requests, translating query variables into database queries and returning aggregated records.',
    designPrinciples: [
      'Stateless Reliability: API routes remain stateless, enabling seamless horizontal scaling across server clusters.',
      'Fail-Safe Data Processing: Executes heavy analytical tasks inside sandboxed database contexts to prevent server blockages.',
      'Parameterized Database Queries: Prevents SQL injection attacks by strictly parameterizing database queries.'
    ],
    suggestedFiles: [
      {
        name: 'src/server.ts',
        description: 'The server initialization file, setting up middlewares, registering endpoints, and establishing connection pools.',
        role: 'Launches the API server and database connection pools.'
      },
      {
        name: 'package.json',
        description: 'Configures server-side packages (Express, DuckDB client, Dotenv, CORS adapters, validation libraries).',
        role: 'Manages API server packages and start scripts.'
      }
    ],
    bestPractices: [
      'Utilize JSON schemas to validate incoming API request bodies, rejecting malformed requests before execution.',
      'Include correlation IDs in all log files to track requests across different backend subsystems.'
    ],
    cognitiveBenefit: 'Provides a secure, high-performance analytical pipeline, keeping data credentials and query execution safe and fast.'
  },
  {
    id: 'examples',
    name: 'Examples & Presets (examples/)',
    path: 'examples/',
    iconName: 'examples',
    shortDesc: 'A sandbox of ready-to-run dashboard configurations, database ingestion files, and custom visualization scripts.',
    whyItExists: 'Even with thorough documentation, engineers often need concrete code examples to understand complex tools. Storing ready-to-run configurations, sample datasets, and sample widgets within the repository speeds up the onboarding process and shows best practices in action.',
    architecturalRole: 'Serves as a developer playground, housing sample configurations and implementations that can be copied directly into workspace environments.',
    designPrinciples: [
      'Self-Contained Simplicity: Examples must be fully functional out of the box, requiring zero external setups or database clusters.',
      'Exemplary Coding Standards: Sample scripts must reflect the repository\'s best practices, showcasing security and optimal performance.',
      'Rich Descriptive Annotations: Code blocks are heavily commented to explain "why" choices were made.'
    ],
    suggestedFiles: [
      {
        name: 'custom-charts/d3-radar.tsx',
        description: 'A fully functional React wrapper utilizing raw D3 mathematical coordinates to render complex radar charts.',
        role: 'Demonstrates how developers can extend the visualization system with custom layouts.'
      },
      {
        name: 'ingest-templates/sales-sample.csv',
        description: 'A pre-formatted local dataset structured to test column data mapping, date formatting, and high-volume CSV uploads.',
        role: 'Provides sample data for sandbox validation.'
      }
    ],
    bestPractices: [
      'Keep files within this folder clean, lightweight, and completely detached from the main production application systems.',
      'Write automated integration tests for these examples to prevent them from becoming broken as APIs change.'
    ],
    cognitiveBenefit: 'Speeds up development and experimentation by providing developers with ready-made, functional code snippets.'
  }
];
