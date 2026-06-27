import React, { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { competitors, marketGaps, productVision } from '../../../shared/constants';
import { Competitor } from '../../../shared/types';

export default function MarketAnalysisView() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor>(competitors[0]);

  return (
    <div className="space-y-10 animate-fadeIn" id="market-analysis-view">
      {/* Intro Alert */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 p-6 rounded-xl flex items-start space-x-4">
        <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0 border border-indigo-500/20">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-md font-semibold text-white">Strategic Market Positioning Analysis</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-5xl">
            Most modern BI tools are failing on performance, modern developer workflows, or forcing aggressive pricing lock-in. 
            Our analysis looks beyond standard dashboard rendering to expose the core engineering and business weaknesses of the giants, 
            unlocking a clear blueprint to stand beside them.
          </p>
        </div>
      </div>

      {/* Core Competitor Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">Select Competitor Profile</h3>
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
            {competitors.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompetitor(comp)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${
                  selectedCompetitor.id === comp.id
                    ? 'bg-slate-800/90 border-indigo-500 shadow-md shadow-indigo-500/5'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40'
                }`}
              >
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-white">{comp.name}</div>
                  <div className="text-xs text-slate-400 truncate max-w-[200px]">{comp.strengths[0]}</div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${selectedCompetitor.id === comp.id ? 'translate-x-1 text-indigo-400' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Detail Card */}
        <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800/80 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{selectedCompetitor.name} Profile</h3>
              <p className="text-xs text-slate-400 mt-1">Detailed market positioning & structural analysis</p>
            </div>
            <span className="text-xs font-semibold bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full border border-rose-500/20">Competitor Matrix</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="space-y-3 bg-emerald-950/10 border border-emerald-500/10 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Key Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedCompetitor.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-500 shrink-0">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="space-y-3 bg-rose-950/10 border border-rose-500/10 p-4 rounded-xl">
              <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Core Weaknesses</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedCompetitor.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-500 shrink-0">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* User Complaints */}
          <div className="space-y-3 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>What Users Complain About</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedCompetitor.complaints.map((comp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-500 shrink-0">•</span>
                  <span className="italic leading-relaxed">"{comp}"</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outdated Aspect */}
          <div className="space-y-2 border-l-4 border-indigo-500 bg-indigo-950/10 p-4 rounded-r-xl">
            <h4 className="text-xs uppercase font-bold tracking-wider text-indigo-400 font-mono">Where It Feels Outdated</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {selectedCompetitor.outdated}
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Gaps & Opportunities */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white tracking-tight">Identified BI Market Gaps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketGaps.map((gap, index) => (
            <div key={index} className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">Gap #{index + 1}</div>
                <h4 className="text-md font-bold text-white">{gap.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{gap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chosen Product Vision Box */}
      <div className="border border-indigo-500/20 bg-gradient-to-br from-[#0F1424] via-[#141C34] to-[#0F1424] p-8 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest">The Unified Product Vision</div>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">{productVision.name}</h3>
          <p className="text-lg text-slate-300 font-medium leading-relaxed">
            {productVision.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/60">
          {productVision.pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div key={index} className="flex space-x-3 items-start">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/10 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm text-white">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
