import React, { useState } from 'react';
import { BookOpen, Target, Cpu, Users, TrendingUp, Sparkles, Calendar } from 'lucide-react';
import MilestonePlanner from './MilestonePlanner';

export default function PRDView() {
  const [roadmapTab, setRoadmapTab] = useState<'high-level' | 'milestones'>('milestones');

  return (
    <div className="space-y-12 animate-fadeIn" id="prd-view">
      {/* PRD Hero Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Product Requirements Document (PRD)</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">Platform Specification & Roadmap</h2>
        <p className="text-sm text-slate-400 mt-2 font-sans">Prepared by the Head of Product for Aperture Analytics OSS development cycles.</p>
      </div>

      {/* Core Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vision & Mission */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-md">
              <Target className="w-5 h-5 text-indigo-400" />
              <span>Product Vision</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              To democratize hyper-fast visual data analytics for every growing company, bypassing expensive enterprise data lakes with lightweight, high-performance local columnar technologies built directly inside an open-source, developer-friendly git-managed ecosystem.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-md">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span>Product Mission</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Build a single, secure, lightweight binary that orchestrates DuckDB analytical engines, reads YAML-defined dashboards, operates perfectly offline on resource-constrained host machines, and empowers developers to build beautiful interactive dashboards in seconds.
            </p>
          </div>
        </div>

        {/* Core Philosophy & Competitive Advantages */}
        <div className="bg-[#0F1424] border border-slate-800 p-6 rounded-xl space-y-6">
          <h3 className="font-bold text-md text-white border-b border-slate-800 pb-2">Core Philosophy & Competitive Advantages</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs uppercase font-bold tracking-wider text-indigo-400 font-mono">1. Instant Onboarding</h4>
              <p className="text-xs text-slate-400 font-sans">Zero database setup required. One command to launch, immediately auto-discovers relational source schemas and files.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase font-bold tracking-wider text-indigo-400 font-mono">2. True Dashboards-as-Code</h4>
              <p className="text-xs text-slate-400 font-sans font-sans">No raw SQL stored in binary database rows. Pure Git-friendly declarative YAML schemas specify visual columns, joins, and aggregates.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs uppercase font-bold tracking-wider text-indigo-400 font-mono">3. Privacy and Isolation By Default</h4>
              <p className="text-xs text-slate-400 font-sans">No dynamic analytics payloads are sent to cloud storage. Secure, sandboxed processing handles querying inside local hardware networks.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Personas Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>Target User Personas</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Persona 1 */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 text-sm font-bold">
                DA
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">"Dev-Ops Dave"</h4>
                <p className="text-xs text-slate-400 font-sans">Principal Systems Engineer at growing SaaS SMB</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Dave hates maintaining complex multi-container analytics suites. He wants a lightweight BI application that self-boots in Docker without heavy configuration, exposes standard logging APIs, connects safely to read replicas, and stays fast without constantly tuning Postgres indexes.
            </p>
          </div>

          {/* Persona 2 */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 text-sm font-bold">
                AN
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">"Analyst Amanda"</h4>
                <p className="text-xs text-slate-400 font-sans">Solo Business Intelligence Lead</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Amanda values clean styling, fast dashboard interactions, and writing code in version control. She is tired of dragging-and-dropping fields in slow web UIs and losing changes because of clunky cloud version systems. She wants a clean, local-first code-based BI platform.
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap Phases Timeline */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-4">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>Development Lifecycle Roadmap & Milestones</span>
          </h3>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setRoadmapTab('milestones')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center space-x-1.5 ${
                roadmapTab === 'milestones'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>50-Day Milestones</span>
            </button>
            <button
              onClick={() => setRoadmapTab('high-level')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all flex items-center space-x-1.5 ${
                roadmapTab === 'high-level'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>High-Level Phases</span>
            </button>
          </div>
        </div>

        {roadmapTab === 'milestones' ? (
          <MilestonePlanner />
        ) : (
          <div className="space-y-4">
            {/* Phase 1: MVP */}
            <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded font-mono">Phase 1</span>
                <h4 className="text-md font-bold text-white mt-2">The MVP (Fast-Core)</h4>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="text-xs text-slate-300 leading-relaxed font-mono">
                  Deliver the single-binary engine compiling the local DuckDB adapter with the React SPA frontend. 
                  Supports direct YAML configuration uploads, automated local file parsing (CSV, Parquet), 
                  and essential charts (bar, line, tabular) with instant cross-filters loading under 50ms on 1M rows.
                </div>
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Single-Binary</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">DuckDB Adapter</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">YAML Parser</span>
                </div>
              </div>
            </div>

            {/* Phase 2: Version 1.0 */}
            <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-mono">Phase 2</span>
                <h4 className="text-md font-bold text-white mt-2">V1 (GitOps-Full)</h4>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="text-xs text-slate-300 leading-relaxed font-mono">
                  Introduce native Git synchronization: bidirectional repository integrations where changes in the UI can commit back to GitHub/GitLab, 
                  and commits to the repo automatically refresh the server dashboards. Adds database scheduling pull syncs (PostgreSQL, MySQL write-replicas) 
                  and robust user collaboration portals.
                </div>
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Git Sync API</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Relational Pull Adapters</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">User Portals</span>
                </div>
              </div>
            </div>

            {/* Phase 3: Version 2.0 */}
            <div className="bg-slate-900/30 border border-slate-800 p-5 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-1 rounded font-mono">Phase 3</span>
                <h4 className="text-md font-bold text-white mt-2">V2 (Enterprise Scale)</h4>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="text-xs text-slate-300 leading-relaxed font-mono">
                  Add native distributed ClickHouse clustering queries for big enterprise datasets. 
                  Support advanced multi-tenant SaaS embeds with customized visual styles, 
                  and enterprise LDAP, Okta SAML, Active Directory Single Sign-on.
                </div>
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">ClickHouse cluster</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Multi-tenant Embeds</span>
                  <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">SAML SSO</span>
                </div>
              </div>
            </div>

            {/* Phase 4: AI Roadmap */}
            <div className="bg-gradient-to-r from-indigo-950/20 to-slate-900 border border-indigo-500/20 p-5 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded flex items-center space-x-1 w-fit font-mono">
                  <Sparkles className="w-3 h-3 text-indigo-400 shrink-0 mr-1 animate-pulse" />
                  <span>AI Engine</span>
                </span>
                <h4 className="text-md font-bold text-white mt-2">Privacy-First AI Specs</h4>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="text-xs text-slate-300 leading-relaxed font-mono">
                  Implement our schema-only LLM bridge. The tool translates local natural language questions into highly accurate analytical SQL commands 
                  by sending ONLY structural schema coordinates (tables, columns, descriptions) to private models (or API endpoints), ensuring the 
                  underlying raw user record data NEVER leaves the host perimeter. Includes automatic semantic layer annotation.
                </div>
                <div className="flex flex-wrap gap-2 pt-1 font-mono">
                  <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">Schema-Only Parsing</span>
                  <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">Natural Query to SQL</span>
                  <span className="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">Auto dbt Docs</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Strategic Business Model & OSS Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">Business Model</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <strong>Open-Core Monetization:</strong> The fundamental engine, DuckDB ingestion, Git synchronization, standard charts, and local AI engines are 100% MIT licensed. Paid premium layers add multi-user security, Okta SAML integrations, distributed ClickHouse clusters, and hosted managed clouds.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">Success Metrics</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <strong>Primary KPIs:</strong> Github Star traction, Docker image monthly download numbers, contributor counts, time-to-first-chart (aiming for &lt;3 minutes), active daily community users, and enterprise pipeline cloud conversion.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-2">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">Open Source Strategy</h4>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <strong>Community Trust:</strong> Transparent development cycles, dbt Core integration out of the box, standard developer-first documentation, and active Discord channels. We will never paywall essential single-user querying or visual exploration features.
          </p>
        </div>
      </div>
    </div>
  );
}
