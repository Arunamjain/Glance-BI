import React, { useState } from 'react';
import { Workflow, Play, Info } from 'lucide-react';
import { dataFlowSteps } from '../../../shared/constants';

export default function DataflowVisualizerView() {
  const [flowStep, setFlowStep] = useState<number>(0);

  return (
    <div className="space-y-10 animate-fadeIn" id="visualizer-view">
      {/* Visualizer Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Workflow className="w-4 h-4" />
          <span>Interactive Architecture Visualizer</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">Interactive Analytical Dataflow</h2>
        <p className="text-sm text-slate-400 mt-2 font-sans">Walk through the precise execution path of an analytical query inside the Aperture Engine architecture.</p>
      </div>

      {/* Flow Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Graph Representation */}
        <div className="lg:col-span-7 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center relative min-h-[420px]">
          {/* SVG Architecture Diagram */}
          <div className="w-full max-w-lg">
            <svg viewBox="0 0 500 280" className="w-full h-auto overflow-visible">
              {/* Source Database Nodes */}
              <g className={`transition-all duration-300 ${flowStep === 0 ? 'scale-105 opacity-100' : 'opacity-40'}`}>
                <rect x="10" y="20" width="100" height="40" rx="6" fill="#1E293B" stroke={flowStep === 0 ? '#6366F1' : '#475569'} strokeWidth="1.5" />
                <text x="60" y="45" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-sans">Data Sources</text>
                <text x="60" y="55" fill="#94A3B8" fontSize="7" textAnchor="middle" className="font-mono">Postgres/MySQL/CSV</text>
              </g>

              {/* Arrow Source -> Ingestion */}
              <path d="M 110 40 L 150 40" stroke={flowStep === 1 ? '#6366F1' : '#475569'} strokeWidth="1.5" strokeDasharray={flowStep === 1 ? "4,4" : "none"} fill="none" className="transition-all" />
              
              {/* Ingestion Sync */}
              <g className={`transition-all duration-300 ${flowStep === 1 ? 'scale-105 opacity-100' : 'opacity-40'}`}>
                <rect x="150" y="20" width="100" height="40" rx="6" fill="#1E293B" stroke={flowStep === 1 ? '#6366F1' : '#475569'} strokeWidth="1.5" />
                <text x="200" y="45" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-sans">Ingestion Sync</text>
                <text x="200" y="55" fill="#94A3B8" fontSize="7" textAnchor="middle" className="font-mono">Parquet Compressor</text>
              </g>

              {/* Arrow Ingestion -> DuckDB */}
              <path d="M 200 60 L 200 110" stroke={flowStep === 2 ? '#6366F1' : '#475569'} strokeWidth="1.5" strokeDasharray={flowStep === 2 ? "4,4" : "none"} fill="none" className="transition-all" />

              {/* DuckDB OLAP Column Database */}
              <g className={`transition-all duration-300 ${flowStep === 2 ? 'scale-105 opacity-100' : 'opacity-40'}`}>
                <rect x="140" y="110" width="120" height="50" rx="6" fill="#1F1E3D" stroke={flowStep === 2 ? '#6366F1' : '#475569'} strokeWidth="1.5" />
                <text x="200" y="135" fill="#FFFFFF" fontSize="10" fontWeight="extrabold" textAnchor="middle" className="font-sans">Embedded DuckDB</text>
                <text x="200" y="148" fill="#A5B4FC" fontSize="7" textAnchor="middle" className="font-mono">OLAP Vectorized Engine</text>
              </g>

              {/* Arrow DuckDB -> Express API */}
              <path d="M 260 135 L 340 135" stroke={flowStep === 3 ? '#6366F1' : '#475569'} strokeWidth="1.5" strokeDasharray={flowStep === 3 ? "4,4" : "none"} fill="none" className="transition-all" />

              {/* Backend Express API & Redis Cache */}
              <g className={`transition-all duration-300 ${flowStep === 3 ? 'scale-105 opacity-100' : 'opacity-40'}`}>
                <rect x="340" y="110" width="110" height="50" rx="6" fill="#1E293B" stroke={flowStep === 3 ? '#6366F1' : '#475569'} strokeWidth="1.5" />
                <text x="395" y="135" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-sans">Express Backend</text>
                <text x="395" y="148" fill="#94A3B8" fontSize="7" textAnchor="middle" className="font-mono">API & Query Cache</text>
              </g>

              {/* Arrow Express API -> React Frontend */}
              <path d="M 395 160 L 395 210" stroke={flowStep === 4 ? '#6366F1' : '#475569'} strokeWidth="1.5" strokeDasharray={flowStep === 4 ? "4,4" : "none"} fill="none" className="transition-all" />

              {/* React Frontend Render */}
              <g className={`transition-all duration-300 ${flowStep === 4 ? 'scale-105 opacity-100' : 'opacity-40'}`}>
                <rect x="330" y="210" width="130" height="40" rx="6" fill="#1E293B" stroke={flowStep === 4 ? '#6366F1' : '#475569'} strokeWidth="1.5" />
                <text x="395" y="231" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-sans">React Dashboard UI</text>
                <text x="395" y="241" fill="#94A3B8" fontSize="7" textAnchor="middle" className="font-mono">Recharts Visual Studio</text>
              </g>
            </svg>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between border-t border-slate-800 pt-4">
            <div className="text-[10px] uppercase font-bold text-slate-500 font-mono">STEP {flowStep + 1} OF 5</div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFlowStep((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3 py-1 bg-slate-800 text-xs font-semibold rounded hover:bg-slate-700 hover:text-white transition cursor-pointer"
              >
                Prev
              </button>
              <button
                onClick={() => setFlowStep((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3 py-1 bg-indigo-600 text-xs font-semibold rounded hover:bg-indigo-500 hover:text-white transition flex items-center space-x-1 cursor-pointer"
              >
                <Play className="w-3 h-3 text-white" />
                <span>Next Step</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Descriptions Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider font-mono">Data Execution Step Detail</h3>
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-extrabold text-xs font-mono">
                {flowStep + 1}
              </div>
              <h4 className="text-md font-bold text-white tracking-tight font-sans">{dataFlowSteps[flowStep].title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {dataFlowSteps[flowStep].description}
              </p>
            </div>
          </div>

          {/* Flow Checklist / Overview */}
          <div className="bg-indigo-950/10 border border-indigo-500/15 p-5 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-widest font-mono">
              <Info className="w-4 h-4 shrink-0" />
              <span>Architectural Advantage</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              By caching aggregated columns as parquet locally, we bypass transactional read bottlenecks completely. DuckDB loads only column statistics and block memory headers into RAM, yielding a sub-30ms execution profile for millions of metrics without standard query index tuning overhead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
