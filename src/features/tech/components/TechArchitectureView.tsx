import React, { useState } from 'react';
import { Settings, Check, XCircle, Terminal, Lock } from 'lucide-react';
import { stackLayers } from '../../../shared/constants';
import { StackLayer } from '../../../shared/types';

export default function TechArchitectureView() {
  const [selectedStack, setSelectedStack] = useState<StackLayer>(stackLayers[0]);

  return (
    <div className="space-y-10 animate-fadeIn" id="architecture-view">
      {/* Arch Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          <span>System Architecture Specifications</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">Technology Stack Decisions & Evaluation</h2>
        <p className="text-sm text-slate-400 mt-2 font-sans">Principal Engineer's comparative evaluation and architectural selections for the production analytics stack.</p>
      </div>

      {/* Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Layers List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">Architecture Layers</h3>
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            {stackLayers.map((layer) => {
              const IconComp = layer.icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedStack(layer)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center space-x-3 cursor-pointer ${
                    selectedStack.id === layer.id
                      ? 'bg-slate-800/90 border-indigo-500'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${selectedStack.id === layer.id ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-slate-400 font-sans">{layer.name}</div>
                    <div className="font-semibold text-sm text-white font-sans">{layer.selected.split('(')[0].split('+')[0]}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Selection rationale card */}
        <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono">Layer Specification</span>
              <h3 className="text-xl font-bold text-white tracking-tight mt-1">{selectedStack.name} Decision</h3>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span className="font-sans">Chosen Tech Stack</span>
            </div>
          </div>

          {/* Selected Choice Box */}
          <div className="space-y-3 bg-indigo-950/10 border border-indigo-500/15 p-5 rounded-xl">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono">SELECTED TECHNOLOGY</div>
            <div className="text-lg font-bold text-white font-sans">{selectedStack.selected}</div>
            <div className="text-xs text-slate-300 leading-relaxed font-mono mt-2">
              {selectedStack.selectedReason}
            </div>
          </div>

          {/* Rejected Alternatives */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Evaluated & Rejected Alternatives</h4>
            <div className="space-y-3">
              {selectedStack.alternatives.map((alt, index) => (
                <div key={index} className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1.5">
                  <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs font-sans">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>{alt.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    {alt.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Experience & Operational Infra Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-800">
        <div className="space-y-4">
          <h3 className="font-bold text-md text-white flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span className="font-sans">Deployment & CI/CD Framework</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            Aperture uses a Docker single-container distribution model. The static frontend is built into compact JS assets, which are bundled and served by the Express backend API router. 
            This single Docker container packages Node.js, SQLite metadata, and the DuckDB analytical libraries. 
            For easy production releases, GitHub Actions build standard image tags, run unit tests, and push lightweight containers directly to major registry clouds.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-md text-white flex items-center space-x-2">
            <Lock className="w-5 h-5 text-indigo-400" />
            <span className="font-sans">Monitoring & Security Architecture</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            All analytical workflows occur directly inside the server memory namespace, utilizing DuckDB’s ultra-efficient vectorized memory buffers. 
            The logging interface outputs standard structural JSON files, parsing analytical runtimes and execution paths to enable Grafana/Prometheus scraping. 
            Data sanitization is enforced at the gateway layer, and parameterized prepared statements prevent SQL injections in both metadata database tables and downstream analytical queries.
          </p>
        </div>
      </div>
    </div>
  );
}
