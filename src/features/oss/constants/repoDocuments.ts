export interface RepoDocument {
  id: string;
  name: string;
  icon: string;
  description: string;
  filePath: string;
  content: string;
}

export interface IssueTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  filePath: string;
}

export interface GoodFirstIssue {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium';
  tags: string[];
  description: string;
  expectedDeliverable: string;
  mentoringTips: string;
}

export interface DiscussionThread {
  id: string;
  category: 'General' | 'Ideas' | 'Q&A' | 'Show and Tell';
  title: string;
  author: string;
  avatar: string;
  replies: number;
  votes: number;
  isPinned: boolean;
  content: string;
}

export const repoDocuments: RepoDocument[] = [
  {
    id: 'readme',
    name: 'README.md',
    icon: 'FileText',
    description: 'The primary landing page and orientation document for the repository, describing the core value proposition, architecture, and quickstart commands.',
    filePath: 'README.md',
    content: `# 🔭 Aperture

> **GitOps-First Business Intelligence & Embedded OLAP Engine.** 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Multi--stage-blue.svg)](https://www.docker.com/)
[![DuckDB](https://img.shields.io/badge/OLAP-DuckDB-orange.svg)](https://duckdb.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Aperture is an open-source, lightweight, high-performance business intelligence engine that runs on a GitOps-First architecture. By compiling a server-side DuckDB OLAP engine with a declarative YAML compiler, Aperture allows software developers and data engineers to manage dashboards as code, version layouts in Git, and run blazing-fast local file queries (CSV, Parquet, JSON) with sub-50ms render times over millions of records.

---

## ✨ Features

- 📂 **Local OLAP Superpowers:** Embedded DuckDB server-side bindings query millions of rows in Parquet or CSV format instantly without cloud overhead.
- 🔄 **Bidirectional GitOps Sync:** Edit dashboards in the UI and automatically commit YAML configs to GitHub/GitLab; or update YAML configs in Git and watch dashboards instantly hot-reload.
- 🗃️ **Multi-Dialect Query Adapters:** Decoupled AST query compiler automatically translates abstract query rules into optimized PostgreSQL, MySQL, or DuckDB ANSI SQL.
- 📊 **Responsive Bento-style Canvas:** Move, resize, and structure visual widgets dynamically with standard drag-and-drop handles.
- 🎨 **Beautiful D3.js & Recharts Visualizations:** Lightweight SVG visualizations featuring smooth animations, interactive dual-axis guides, and detailed tooltips.
- 🔐 **Stateless Security:** Secured with HTTP-only stateless cookies, JWT signatures, Role-Based Access Control (RBAC), and Row-Level Tenant isolation.

---

## 🏗️ Architecture

Aperture operates on a lightweight, decoupled stack designed for portability and speed:

\`\`\`
┌────────────────────────────────────────────────────────┐
│                      Client UI                         │
│   (Vite React SPA + Tailwind CSS + D3/Recharts Visual)  │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP REST / WebSockets (Real-time logs)
┌──────────────────────────▼─────────────────────────────┐
│                   Aperture Core Backend                 │
│         (Node.js TS Monorepo Core Service Worker)       │
└──────┬────────────────────┬─────────────────────┬──────┘
       │                    │                     │
┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
│  Local OLAP │      │ Relational  │      │ GitOps Sync │
│ (DuckDB Eng)│      │  (Postgres/ │      │ (isomorphic-│
│             │      │  MySQL Pools│      │    git)     │
└─────────────┘      └─────────────┘      └─────────────┘
\`\`\`

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js:** v18.x or greater
- **pnpm:** v8.x or greater
- **Docker:** (Optional, for isolated orchestration)

### 2. Local Setup
Clone the repository and install standard dependencies:
\`\`\`bash
# Clone the repository
git clone https://github.com/aperture-bi/aperture.git
cd aperture

# Install dependencies using pnpm monorepo manager
pnpm install

# Set up local environment files
cp .env.example .env
\`\`\`

### 3. Run Development Server
\`\`\`bash
# Boot the client and backend simultaneously under monorepo workspace
pnpm dev
\`\`\`
The Web UI will be accessible at \`http://localhost:3000\`.

### 4. Build Production Container
\`\`\`bash
# Run local docker compose containing DuckDB and relational databases
docker compose up -d
\`\`\`

---

## 📂 Repository Layout

\`\`\`
├── .github/                  # GitHub Community Configs & Workflows
│   ├── ISSUE_TEMPLATE/       # YAML Bug and Feature templates
│   └── pull_request_template.md
├── apps/                     # Application packages
│   ├── client/               # Vite React Single Page Application
│   └── server/               # Node.js TypeScript backend core engine
├── packages/                 # Shared internal workspace utilities
│   ├── types/                # Unified TypeScript type definitions
│   ├── query-compiler/       # Abstract OLAP AST mapping modules
│   └── schemas/              # YAML validation JSON-schema layouts
├── docs/                     # Architectural & operational specs
├── LICENSE                   # MIT License
├── pnpm-workspace.yaml       # Monorepo configuration
└── README.md                 # Project orientation page
\`\`\`

---

## 🤝 Contributing

We love open-source contributions! Whether you're fixing a minor CSS typo in our responsive bento grid or adding a new database driver adapter, please read our [CONTRIBUTING.md](./CONTRIBUTING.md) to understand our coding rules and pull request review pipelines.

---

## 🔒 Security

For security vulnerability reporting procedures, please read our [SECURITY.md](./SECURITY.md) guidelines. Never post active security bugs directly onto public GitHub issues.

---

## 📄 License

This project is licensed under the terms of the MIT License. See [LICENSE](./LICENSE) for full details.`
  },
  {
    id: 'architecture',
    name: 'ARCHITECTURE.md',
    icon: 'Cpu',
    description: 'Detailed system architecture guidelines, documenting execution pathways, query compilation engines, and local file storage abstractions.',
    filePath: 'docs/ARCHITECTURE.md',
    content: `# 🏗️ Aperture Core Architecture

This document outlines the design decisions, operational components, and dataflow execution patterns behind Aperture's GitOps-First Business Intelligence engine.

## 1. Core Principles

Aperture was built to solve a specific problem: standard BI tools (such as Tableau, Looker) require heavy database round-trips, separate metadata storage databases, and lack native support for local configuration files. 

To solve this, Aperture enforces three core rules:
1. **Zero Metadata Databases:** Dashboard configurations are declarative, represented strictly in YAML files synced with remote Git environments. No metadata storage is required.
2. **Embedded Performance:** Query performance leverages in-process OLAP execution pools via DuckDB.
3. **Dialect Decoupling:** Dashboards compile into an abstract AST query form, keeping business metrics entirely independent from specific database implementations.

---

## 2. Ingestion & Storage Architecture

Aperture utilizes a multi-layer ingestion and memory-mapped execution system:

\`\`\`
               ┌───────────────────────┐
               │ CSV / Parquet Upload  │
               └───────────┬───────────┘
                           │ Drag-and-Drop Ingestion UI
                           ▼
               ┌───────────────────────┐
               │    Schema Sniffer     │ (Detects types & columns)
               └───────────┬───────────┘
                           ▼
 ┌──────────────────────────────────────────────────┐
 │               Aperture Storage Router            │
 └─────────┬───────────────────────────────┬────────┘
           │ (Local files)                 │ (Cloud Databases)
           ▼                               ▼
 ┌───────────────────┐           ┌───────────────────┐
 │ Embedded DuckDB   │           │ PostgreSQL/MySQL  │
 │ (.duckdb storage) │           │ Database Pools    │
 └───────────────────┘           └───────────────────┘
\`\`\`

### A. Local OLAP Ingestion
When users drop CSV or Parquet files into the mapping screen:
- A streaming **Schema Sniffer** inspects the initial 1,000 bytes, determining column keys and mapping native structures (e.g. string, integer, float, date, boolean).
- The file uploads directly to backend directories and mounts onto DuckDB in-process bindings using automated chunk-size parameterized SQL pipelines:
  \`\`\`sql
  CREATE TABLE dataset_v1 AS SELECT * FROM read_parquet('dataset_v1.parquet');
  \`\`\`
- Memory caps are enforced dynamically, preventing local disk memory from exhausting host resources.

### B. Relational Connectors
For cloud databases:
- PostgreSQL and MySQL data adapters establish connection pools using standard pooling parameters.
- Analytical queries run directly against read-replicas, isolating analytical processing workloads from transactional business databases.

---

## 3. Query Compilation Engine (Abstract AST Compiler)

To decouple dashboard visuals from specific SQL database dialects, queries represent an abstract JSON payload. The core engine compiles these payloads using a recursive AST (Abstract Syntax Tree) compiler:

### Abstract Query Payload Example:
\`\`\`json
{
  "table": "customer_logs",
  "dimensions": ["region", "signup_date"],
  "metrics": [
    { "key": "total_sales", "formula": "sum", "column": "revenue" }
  ],
  "filters": [
    { "column": "signup_date", "operator": "gte", "value": "2026-01-01" }
  ],
  "limit": 100
}
\`\`\`

### Dialect Compiler Outputs:
- **DuckDB Dialect Compiler:** Output utilizes backslash file-path lookups and vectorized syntax.
- **PostgreSQL Dialect Compiler:** Output enforces double-quoted system characters and typical standard schemas.
- **MySQL Dialect Compiler:** Output compiles using backticks for identifiers and adapts date-time functions.

All inputs undergo strict sanitization inside AST nodes to prevent SQL injection vulnerabilities.

---

## 4. GitOps Synchronization Loop

Aperture contains a background worker utilizing isomorphic-git to poll and push layout modifications:

1. **Pull Sync:** A cron polling process checks remote GitHub/GitLab branches every 30 seconds. When a change to a dashboard's YAML configuration is discovered, the server parses the file, validates the YAML structure, and notifies connected client screens via WebSocket events.
2. **Push Sync:** When an authorized user rearranges, resizes, or updates a visual widget in the UI, the browser serializes the layout back into a formatted YAML configuration string. The server stages this file, commits it with the active user's credentials, and pushes the commit directly back to the remote repository.

---

## 5. Security & Isolation Model

- **Session Hardening:** REST sessions are secured with HTTP-Only, Secure, SameSite=Strict cookies to protect against XSS attacks.
- **Row-Level Security (RLS) Interceptor:** Multi-tenant database connections pass through query-filters that automatically append tenant identification clauses to every AST compile, guaranteeing data isolation at the engine level.
- **AST Whitelisting:** Raw SQL play-zones validate syntax using custom tokenizers. Destructive command actions (e.g. \`DROP\`, \`DELETE\`, \`INSERT\`) are flagged and aborted before they can be sent to target databases.`
  },
  {
    id: 'contributing',
    name: 'CONTRIBUTING.md',
    icon: 'Users',
    description: 'Guidelines for contribution, developer environment configurations, coding standards, and testing procedures.',
    filePath: 'CONTRIBUTING.md',
    content: `# 🤝 Contributing to Aperture

First off, thank you for taking the time to contribute! It is contributors like you that make Aperture an incredible open-source Business Intelligence tool.

Please read our code standards, architectural constraints, and contribution guide before opening a Pull Request.

---

## 1. Our Development Guidelines

To keep the Aperture codebase highly clean, we enforce several standards:
- **TypeScript First:** Any code must be fully typed. Avoid using \`any\` types wherever possible.
- **Strict Linting:** We run strict ESLint patterns. Run \`pnpm lint\` locally to verify code format before pushing.
- **Decoupled Business Logic:** Keep backend controllers isolated from specific database drivers. All database operations must pass through our abstract query adapter interfaces.
- **No Inline Styles:** All UI components utilize Tailwind CSS utility classes. Avoid inline style attributes.

---

## 2. Setting Up Your Developer Environment

We utilize a \`pnpm\` monorepo workspace for dependency management.

### Prerequisites
- Node.js (v18+)
- pnpm (v8+)
- Docker (for database integration testing)

### Clone & Install
\`\`\`bash
# Clone repository
git clone https://github.com/aperture-bi/aperture.git
cd aperture

# Run monorepo clean install
pnpm install
\`\`\`

### Environment Configuration
Copy the default environment variables template and configure your local values:
\`\`\`bash
cp .env.example .env
\`\`\`

### Running the App Locally
\`\`\`bash
# Start backend API and front-end SPA concurrently
pnpm dev
\`\`\`

---

## 3. Creating a Branch

When starting a task, create a feature branch off of the \`main\` branch. Use structured names for your branches:
- \`feat/short-feature-name\` for new features
- \`fix/bug-description\` for bug repairs
- \`docs/page-updated\` for documentation updates
- \`test/suite-name\` for adding tests

---

## 4. Coding Standards & Git Commit Messages

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) standard for clear, readable git logs.
Format: \`<type>(<scope>): <subject>\`

### Common Types:
- \`feat\`: A new user-facing feature.
- \`fix\`: A bug fix.
- \`docs\`: Documentation changes only.
- \`style\`: Formatting or visual changes that do not affect code logic.
- \`refactor\`: Code changes that neither fix a bug nor add a feature.
- \`test\`: Adding or correcting tests.
- \`chore\`: Updating dependencies or build systems.

### Example Commits:
- \`feat(query): add mysql translation module to abstract adapter\`
- \`fix(bento): resolve overlap overlapping layout on safari screens\`

---

## 5. Submitting a Pull Request

1. **Run local tests and checks:**
   \`\`\`bash
   pnpm lint
   pnpm test
   pnpm build
   \`\`\`
2. **Push branch changes:** Push your feature branch to your GitHub fork.
3. **Open a Pull Request:** Complete our structured PR template, detailing what changes were made, why they are needed, and how they were verified.
4. **Code Review:** At least one core maintainer must review and approve your pull request before it can be merged into \`main\`. You must resolve any review requests or suggestions.`
  },
  {
    id: 'code-of-conduct',
    name: 'CODE_OF_CONDUCT.md',
    icon: 'Layers',
    description: 'The contributor covenant code of conduct defining community behavior, expectations, and reporting lines.',
    filePath: 'CODE_OF_CONDUCT.md',
    content: `# Contributor Covenant Code of Conduct

## 1. Our Pledge

We, as members, contributors, and leaders, pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

---

## 2. Our Standards

Examples of behavior that contributes to a positive environment for our community include:
- Demonstrating empathy and kindness toward other people.
- Being respectful of differing opinions, viewpoints, and experiences.
- Giving and gracefully accepting constructive feedback.
- Accepting responsibility and apologizing to those affected by our mistakes, and learning from the experience.
- Focusing on what is best for the overall community.

Examples of unacceptable behavior include:
- The use of sexualized language or imagery, and unwelcome sexual attention or advances.
- Trolling, insulting or derogatory comments, and personal or political attacks.
- Public or private harassment.
- Publishing others' private information, such as a physical or email address, without their explicit permission.
- Other conduct which could reasonably be considered inappropriate in a professional setting.

---

## 3. Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

Community leaders have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, and will communicate reasons for moderation decisions when appropriate.

---

## 4. Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces. Examples of representing our community include using an official email address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

---

## 5. Reporting Procedures

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leadership at **maintainers@aperture-bi.org**. All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the reporter of any incident.`
  },
  {
    id: 'security',
    name: 'SECURITY.md',
    icon: 'Shield',
    description: 'Vulnerability disclosure policies, security boundaries, and response timelines for security patches.',
    filePath: 'SECURITY.md',
    content: `# 🔒 Security Policy

We take the security of Aperture seriously. We are committed to protecting our community, users, and deployments from security vulnerabilities.

This document describes how to report security issues and outlines our response timeline for patch delivery.

---

## 1. Security Scope Boundaries

Aperture supports the following security zones:
- **Stateless Session Validation:** JWT parsing and cookie configuration.
- **Query Protection:** AST-level whitelisting and input parameterization to prevent SQL injection.
- **Multi-Tenant Data Isolation:** Tenant identity filters injected automatically into raw database query states.

Out-of-Scope:
- Compromises resulting from exposed or leaked environment keys.
- Misconfiguration of directory-level file system permissions on self-hosted instances.

---

## 2. Reporting a Vulnerability

**Please do not report security vulnerabilities on public GitHub issues.**

If you discover a security vulnerability in Aperture, please report it privately:
- Email our security response team directly at **security@aperture-bi.org**.
- Provide a detailed description of the vulnerability, clear reproduction steps, and a working proof-of-concept (PoC) if possible.

---

## 3. Our Response Timeline (SLA)

Once we receive a private report, we will:
1. **Acknowledge:** Confirm receipt of your report within **24 hours**.
2. **Triage:** Analyze the vulnerability and determine its impact rating (Low, Medium, High, Critical) within **72 hours**.
3. **Patch:** Develop and test a security patch. We aim to release hotfixes for High/Critical vulnerabilities within **7 days** of initial triage.
4. **Disclosure:** Once a patch is released, we will publish a security advisory (GHSA) acknowledging your discovery and detailing the fix.

Thank you for helping keep Aperture secure!`
  },
  {
    id: 'changelog',
    name: 'CHANGELOG.md',
    icon: 'Activity',
    description: 'The historical log of project releases, outlining features, bug fixes, and breaking changes.',
    filePath: 'CHANGELOG.md',
    content: `# 🗒️ Changelog

All notable changes to the Aperture project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-06-27 (OSS Launch)

### Added
- **Core DuckDB In-Process Bindings:** Thread-safe local file OLAP database connections.
- **Bidirectional Git Sync Engine:** Real-time polling and auto-commits back to remote Git repos.
- **Bento-Style Drag Grid Canvas:** Interactive dashboard widget arrangement panels.
- **Abstract Query AST Compiler:** Dialect-independent compiler for SQL queries.
- **Enterprise SSO & SAML Providers:** Support for external Okta, Keycloak, and LDAP directory syncs.
- **D3.js SVG Visualizations:** Custom bar, column, and line charts with smooth transitions.

### Changed
- Replaced standard local storage with encrypted JSON cache models.
- Updated query execution routers to execute analytical queries over Postgres read replicas.

### Security
- Introduced strict AST whitelisting to block non-analytical command statements.
- Deployed Row-Level Security injection layers to enforce multi-tenant isolation.

---

## [0.9.0] - 2026-04-12

### Added
- **Monorepo Structure:** Migrated repository structure into a Turborepo-managed workspace.
- **CSV Schema Sniffer:** Automated type inference and metadata discovery for CSV imports.
- **Monaco SQL Playground:** Built-in SQL code editor with metadata autocompletes.

### Fixed
- Resolved browser memory leaks on Safari during rapid window resizing.
- Patched connection pool timeouts for MySQL database adapters.

---

## [0.8.0] - 2026-01-15

### Added
- **Initial Preview Build:** Basic REST API structures and early prototype charting modules.`
  },
  {
    id: 'license',
    name: 'LICENSE',
    icon: 'FileText',
    description: 'The MIT License, designating the code as open source and detailing software permissions.',
    filePath: 'LICENSE',
    content: `MIT License

Copyright (c) 2026 Aperture BI Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  }
];

export const issueTemplates: IssueTemplate[] = [
  {
    id: 'bug',
    name: 'Bug Report Template',
    description: 'Markdown template for reporting issues with detailed system contexts, logs, and reproduction steps.',
    filePath: '.github/ISSUE_TEMPLATE/bug_report.md',
    content: `---
name: 🐛 Bug Report
about: Create a report to help us improve Aperture
title: 'bug: [Short description of issue]'
labels: 'bug, triage'
assignees: ''
---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔄 Reproduction Steps
1. Configure a dashboard with YAML spec...
2. Click on the widget button...
3. See error details in console...

## 🎯 Expected Behavior
What did you expect to happen?

## 📸 Screenshots or Console Logs
If applicable, add screenshots or copy browser console/server logs here to help explain your problem.

## 💻 Environment Details
- **Aperture Version:** [e.g. v1.0.0]
- **OS Platform:** [e.g. macOS, Ubuntu 22.04, Windows 11]
- **Database Engine Used:** [e.g. DuckDB local, PostgreSQL 15, MySQL 8]
- **Browser Client:** [e.g. Chrome 120, Safari 17]

## 📝 Additional Context
Add any other context about the problem here.`
  },
  {
    id: 'feature',
    name: 'Feature Request Template',
    description: 'Markdown template for proposing new dashboard metrics, database adapters, or layout widgets.',
    filePath: '.github/ISSUE_TEMPLATE/feature_request.md',
    content: `---
name: ✨ Feature Request
about: Propose a new feature or database adapter for Aperture
title: 'feat: [Short title of proposal]'
labels: 'enhancement, discussion'
assignees: ''
---

## 💡 Is your feature request related to a problem?
A clear and concise description of what the problem is. E.g. "I'm frustrated because there is no driver for Snowflake databases..."

## 🛠️ Proposed Solution
Describe the solution or feature addition you'd like to see. Explain how the YAML configuration layout should look for this feature.

## 🎨 Design Concept (For UI elements)
Describe the layout design or visual elements required for this addition.

## 🔗 Alternatives Considered
A clear and concise description of any alternative solutions or features you've considered.

## 📝 Additional Context
Add any other context, drawings, or code snippets related to the feature request here.`
  },
  {
    id: 'pr',
    name: 'Pull Request Template',
    description: 'Checklist to guide developers through git commits, code style review, testing, and PR submission.',
    filePath: '.github/pull_request_template.md',
    content: `## 🔍 Pull Request Context

### Related Issues
Fixes #[Issue Number] | Closes #[Issue Number]

### Description
Provide a clear summary of what changes were made, what problem they solve, and any architectural choices you made.

---

## 🛠️ Type of Change
Please check the options that apply:
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update (no logic modifications)
- [ ] 🧪 Testing addition or improvement

---

## 📋 Pre-Flight Checklist
Please verify the following guidelines are completed before submitting your Pull Request:
- [ ] **Tests:** I have added automated tests to verify my changes.
- [ ] **Typing:** I have used strict TypeScript typing and resolved all compiler warnings.
- [ ] **Formatting:** My code passes all ESLint checks cleanly (\`pnpm lint\`).
- [ ] **Build:** The application compiles successfully in the monorepo (\`pnpm build\`).
- [ ] **Documentation:** I have updated corresponding documentation or YAML schemas.
- [ ] **Git Commits:** My commit messages follow the Conventional Commits rules.

---

## 🧪 Verification Logs
Provide details about your testing environment and logs proving your changes pass. Include commands executed or screenshots for UI changes.`
  }
];

export const goodFirstIssues: GoodFirstIssue[] = [
  {
    id: 'gfi-1',
    title: 'add(db): implement simple sqlite connector driver',
    difficulty: 'Easy',
    tags: ['database', 'good-first-issue', 'typescript'],
    description: 'Implement a new SQLite connection adapter by extending our Abstract Query Adapter. This should compile abstract AST inputs into valid SQLite ANSI syntax.',
    expectedDeliverable: 'A clean SQLite data adapter module located in `packages/query-compiler/drivers/sqlite.ts` alongside unit tests.',
    mentoringTips: 'Check our existing MySQL driver implementation in the query-compiler package. It contains a very similar compile sequence, you can map syntax patterns from there.'
  },
  {
    id: 'gfi-2',
    title: 'fix(ui): prevent overlap of long tooltip lines in Recharts line widget',
    difficulty: 'Easy',
    tags: ['frontend', 'good-first-issue', 'ux', 'tailwind'],
    description: 'When hovering over multi-line Recharts area charts, very long dataset keys or labels overlap and distort the layout on narrow laptop screens.',
    expectedDeliverable: 'Apply flexible truncation and min-width styling adjustments to the tooltips to wrap long text lines gracefully.',
    mentoringTips: 'The chart rendering modules are in `apps/client/src/features/charts/RechartsArea.tsx`. Use Tailwind\'s `truncate` or `break-words` utilities.'
  },
  {
    id: 'gfi-3',
    title: 'docs(yaml): add full json schema validation guidelines for bento widgets',
    difficulty: 'Medium',
    tags: ['documentation', 'good-first-issue', 'yaml'],
    description: 'Extend our existing schema definitions in `packages/schemas/bento.json` to support custom grid spacing options and borders on bento layout tiles.',
    expectedDeliverable: 'Updated JSON schema layouts and matching documentation additions explaining how developers can configure spacing in dashboards.',
    mentoringTips: 'You\'ll need to modify the schema definitions and test them against some example YAML templates. Ask on the #dev-channels Discord channel for feedback!'
  }
];

export const discussionThreads: DiscussionThread[] = [
  {
    id: 'disc-1',
    category: 'Ideas',
    title: '💡 Add Snowflake database driver support to abstract query compiler?',
    author: 'hector_data_guy',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80',
    replies: 14,
    votes: 42,
    isPinned: true,
    content: `Hey team! We absolutely love using Aperture for our in-house Postgres datasets. We have started migrating some of our core warehousing arrays onto Snowflake and would love to build our dashboards using the same GitOps layout loops.

Has anyone started designing a Snowflake query translation adapter? If not, I can begin drafting one this weekend by following the abstract adapter guidelines! Who else is interested?`
  },
  {
    id: 'disc-2',
    category: 'Q&A',
    title: '❓ How do I handle large Parquet file memory limits on small hosting containers?',
    author: 'clara_sys_ops',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
    replies: 8,
    votes: 19,
    isPinned: false,
    content: `Hi community! I am self-hosting Aperture inside a small, single-core 512MB RAM container. It compiles and boots beautifully, but when I attempt to ingest a 1.2GB Parquet dataset containing nested arrays, the in-process DuckDB engine hits memory constraints and triggers container terminations.

What is the recommended approach to clamp chunk memory sizes or configure parallel threading inside DuckDB bounds? Thank you!`
  },
  {
    id: 'disc-3',
    category: 'Show and Tell',
    title: '🚀 Shipped a custom dbt docs sync action for Aperture dashboards',
    author: 'alex_oss_dev',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=80&h=80&q=80',
    replies: 23,
    votes: 88,
    isPinned: true,
    content: `Hello everyone! I wanted to show off a simple GitHub Action I built for our team. It automatically compiles dbt documentation structures, extracts logical descriptions, and updates Aperture's dashboard YAML files with column-level explanations on every commit!

This ensures our data definitions remain fully documented and synced without manual editing. Check out the repository link below and let me know if you would like me to contribute this as a core feature!`
  }
];

export const docStructureData = [
  { path: 'docs/ARCHITECTURE.md', purpose: 'Full description of system structure, compiler steps, and ingestion pathways.' },
  { path: 'docs/SSO_SETUP.md', purpose: 'Detailed tutorials for Okta, Keycloak SAML integration, and directory sync mappings.' },
  { path: 'docs/GITOPS_WORKFLOW.md', purpose: 'Step-by-step guidelines for setting up webhook listeners and repository branch security.' },
  { path: 'docs/API_REFERENCE.md', purpose: 'API documentation for REST metadata endpoints and WebSocket stream schemas.' },
  { path: 'docs/YAML_SCHEMA_SPEC.md', purpose: 'Definitions for bento layouts, widget mappings, and variable formatting.' }
];

export const communityStrategy = {
  philosophy: 'Aperture is built for and maintained by the developer community. We believe in providing robust documentation, open feedback systems, and transparent release workflows.',
  channels: [
    { name: 'Discord Community Server', purpose: 'Daily chats, real-time troubleshooting assistance, and development discussions in #dev-channels.', link: 'https://discord.gg/aperture-bi' },
    { name: 'GitHub Discussions', purpose: 'Proposing new features, sharing custom dashboard layouts, and general Q&A.', link: 'https://github.com/aperture-bi/aperture/discussions' },
    { name: 'Monthly Core Meetups', purpose: 'A live video meeting on the third Thursday of every month to discuss releases, roadmaps, and PR triage.', link: 'https://meet.google.com/aperture-bi' }
  ],
  devRelChecklist: [
    { title: 'The 30-Minute triage commitment', description: 'Core maintainers must reply to new issues or pull requests within 30 minutes to sustain developer excitement.' },
    { title: 'Automatic Slack/Discord alert streams', description: 'Configure automated webhooks notifying community chat channels of newly created issues or pull requests.' },
    { title: 'Interactive video walkthroughs', description: 'Deliver quarterly visual tutorials detailing how developers can add custom widgets or create connectors.' },
    { title: 'Contributor swag tiers', description: 'Send high-quality custom laptop stickers, t-shirts, and mugs to developers who land significant contributions.' }
  ]
};

export const demoStrategy = {
  overview: 'The key to open-source adoption is letting developers experience the product instantly. We employ a multi-layered demo strategy:',
  layers: [
    { name: 'Instant Sandbox Sandbox Platform', description: 'A fully functional browser sandbox containing pre-loaded CSV and Parquet datasets where developers can write SQL and explore bento-grid templates immediately.' },
    { name: 'One-Click Local Deployment', description: 'Provide simple commands like `npx aperture-bi init` or a curl-to-bash installer to boot Aperture in local developer terminals in under 10 seconds.' },
    { name: 'Self-Generating Playgrounds', description: 'The server automatically generates interactive mock datasets (e.g. standard tech sales models) on initial boot if no configuration files exist.' }
  ]
};
