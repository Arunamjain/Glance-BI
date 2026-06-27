import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: 'market' | 'prd' | 'tech' | 'software-arch' | 'visualizer' | 'ux-spec' | 'api-spec' | 'oss' | 'perf') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="border-b border-slate-800/80 bg-[#0F1424]/95 sticky top-0 z-50 backdrop-blur-sm px-6 py-4" id="applet-header">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 font-bold text-xl font-sans" id="brand-logo">A</div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-extrabold text-white tracking-tight leading-none" id="brand-title">Aperture</h1>
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 font-mono" id="release-badge">OSS v1.0</span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans mt-1" id="brand-tagline">GitOps-First Business Intelligence • Embedded OLAP Speed</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5" id="navigation-tabs">
          <button
            onClick={() => setActiveTab('market')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'market'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-market"
          >
            Market Analysis
          </button>
          <button
            onClick={() => setActiveTab('prd')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'prd'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-prd"
          >
            Product PRD
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'tech'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-tech"
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveTab('software-arch')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'software-arch'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-software-arch"
          >
            Software Architecture
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'visualizer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-visualizer"
          >
            Interactive Dataflow
          </button>
          <button
            onClick={() => setActiveTab('ux-spec')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'ux-spec'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-ux-spec"
          >
            UX Design System
          </button>
          <button
            onClick={() => setActiveTab('api-spec')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'api-spec'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-api-spec"
          >
            REST API Spec
          </button>
          <button
            onClick={() => setActiveTab('oss')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'oss'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10 border-indigo-500'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-oss"
          >
            GitHub Repo Hub
          </button>
          <button
            onClick={() => setActiveTab('perf')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeTab === 'perf'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10 border-indigo-500'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
            id="tab-perf"
          >
            ⚡ Performance Spec
          </button>
        </div>
      </div>
    </header>
  );
}
