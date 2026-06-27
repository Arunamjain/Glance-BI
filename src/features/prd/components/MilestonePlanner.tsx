import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle, Clock, Database, Shield, 
  PieChart, Layers, Bot, ChevronDown, ChevronUp, Terminal, 
  FileText, GitCommit, Calendar, Activity, RefreshCw 
} from 'lucide-react';
import { milestonesData, Milestone } from '../../../shared/constants/milestones';

export default function MilestonePlanner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(1); // Expand day 1 by default
  const [showDoDOnly, setShowDoDOnly] = useState(false);

  const phases = [
    'All',
    'Phase 1: Core Engine & Local Analytics',
    'Phase 2: GitOps & SQL Integration',
    'Phase 3: Visualizer, Chart Builder & Export',
    'Phase 4: Advanced SSO & Collaboration',
    'Phase 5: Scale, Performance & AI-Assistant'
  ];

  // Statistics
  const stats = useMemo(() => {
    const total = milestonesData.length;
    const ph1 = milestonesData.filter(m => m.phase.includes('Phase 1')).length;
    const ph2 = milestonesData.filter(m => m.phase.includes('Phase 2')).length;
    const ph3 = milestonesData.filter(m => m.phase.includes('Phase 3')).length;
    const ph4 = milestonesData.filter(m => m.phase.includes('Phase 4')).length;
    const ph5 = milestonesData.filter(m => m.phase.includes('Phase 5')).length;
    return { total, ph1, ph2, ph3, ph4, ph5 };
  }, []);

  const filteredMilestones = useMemo(() => {
    return milestonesData.filter(m => {
      const matchesSearch = 
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.tasks.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        m.expectedGitCommit.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPhase = selectedPhase === 'All' || m.phase === selectedPhase;
      
      return matchesSearch && matchesPhase;
    });
  }, [searchTerm, selectedPhase]);

  const toggleExpand = (day: number) => {
    setExpandedMilestone(expandedMilestone === day ? null : day);
  };

  const getPhaseIcon = (phase: string) => {
    if (phase.includes('Phase 1')) return <Database className="w-4 h-4 text-cyan-400" />;
    if (phase.includes('Phase 2')) return <Shield className="w-4 h-4 text-emerald-400" />;
    if (phase.includes('Phase 3')) return <PieChart className="w-4 h-4 text-amber-400" />;
    if (phase.includes('Phase 4')) return <Layers className="w-4 h-4 text-purple-400" />;
    return <Bot className="w-4 h-4 text-indigo-400" />;
  };

  const getPhaseBadgeColor = (phase: string) => {
    if (phase.includes('Phase 1')) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    if (phase.includes('Phase 2')) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (phase.includes('Phase 3')) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (phase.includes('Phase 4')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
  };

  return (
    <div className="space-y-6" id="milestone-planner">
      {/* Mini Dashboard Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-[#0B0F19] border border-slate-800 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-white font-mono">{stats.total}</div>
          <div className="text-[10px] text-slate-400 font-sans mt-0.5">Total Days</div>
        </div>
        <div className="bg-[#0B0F19]/60 border border-slate-800/80 p-3 rounded-lg text-center">
          <div className="text-md font-bold text-cyan-400 font-mono">{stats.ph1} d</div>
          <div className="text-[9px] text-slate-400 font-sans mt-0.5">1. Core DuckDB</div>
        </div>
        <div className="bg-[#0B0F19]/60 border border-slate-800/80 p-3 rounded-lg text-center">
          <div className="text-md font-bold text-emerald-400 font-mono">{stats.ph2} d</div>
          <div className="text-[9px] text-slate-400 font-sans mt-0.5">2. GitOps & SQL</div>
        </div>
        <div className="bg-[#0B0F19]/60 border border-slate-800/80 p-3 rounded-lg text-center">
          <div className="text-md font-bold text-amber-400 font-mono">{stats.ph3} d</div>
          <div className="text-[9px] text-slate-400 font-sans mt-0.5">3. Client & D3</div>
        </div>
        <div className="bg-[#0B0F19]/60 border border-slate-800/80 p-3 rounded-lg text-center">
          <div className="text-md font-bold text-purple-400 font-mono">{stats.ph4} d</div>
          <div className="text-[9px] text-slate-400 font-sans mt-0.5">4. SAML & Share</div>
        </div>
        <div className="bg-[#0B0F19]/60 border border-slate-800/80 p-3 rounded-lg text-center">
          <div className="text-md font-bold text-indigo-400 font-mono">{stats.ph5} d</div>
          <div className="text-[9px] text-slate-400 font-sans mt-0.5">5. ClickHouse & AI</div>
        </div>
      </div>

      {/* Control Filters Panel */}
      <div className="bg-[#0F1424]/90 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks, commits, objectives..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {phases.map((phase) => {
            const shortName = phase === 'All' ? 'All' : phase.split(':')[0];
            const isSelected = selectedPhase === phase;
            return (
              <button
                key={phase}
                onClick={() => setSelectedPhase(phase)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border transition-all whitespace-nowrap ${
                  isSelected 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Status */}
      <div className="flex justify-between items-center px-1">
        <p className="text-xs text-slate-400 font-mono">
          Showing <span className="text-indigo-400 font-bold">{filteredMilestones.length}</span> of <span className="text-slate-200">{milestonesData.length}</span> daily milestones
        </p>
        {searchTerm && (
          <button 
            onClick={() => { setSearchTerm(''); setSelectedPhase('All'); }}
            className="text-[10px] text-slate-500 hover:text-indigo-400 flex items-center space-x-1 font-mono transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Accordion List of Milestones */}
      <div className="space-y-3 max-h-[800px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {filteredMilestones.map((milestone) => {
          const isExpanded = expandedMilestone === milestone.day;
          return (
            <div 
              key={milestone.day}
              className={`border rounded-xl transition-all ${
                isExpanded 
                  ? 'bg-slate-900/45 border-indigo-500/50 shadow-lg shadow-indigo-950/10' 
                  : 'bg-slate-900/15 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900/25'
              }`}
            >
              {/* Header block click to toggle */}
              <div 
                onClick={() => toggleExpand(milestone.day)}
                className="p-4 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  {/* Day Indicator */}
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-950 border border-slate-800/80 shrink-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Day</span>
                    <span className="text-lg font-bold text-white font-mono leading-none">{milestone.day}</span>
                  </div>

                  {/* Title & Phase */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] uppercase font-bold border px-1.5 py-0.5 rounded font-mono flex items-center space-x-1 shrink-0 ${getPhaseBadgeColor(milestone.phase)}`}>
                        {getPhaseIcon(milestone.phase)}
                        <span className="ml-1">{milestone.phase.split(':')[0]}</span>
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1 truncate">{milestone.title}</h4>
                  </div>
                </div>

                {/* Chevron icon */}
                <div className="ml-4 text-slate-500 hover:text-slate-300 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Collapsed Detailed Body */}
              {isExpanded && (
                <div className="px-4 pb-6 pt-2 border-t border-slate-800/60 space-y-5 animate-slideDown text-xs leading-relaxed font-sans">
                  {/* Objective */}
                  <div className="space-y-1.5 bg-[#070A14] border border-slate-800/50 p-3 rounded-lg">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold block">Objective</span>
                    <p className="text-slate-300 font-sans">{milestone.objective}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Tasks List */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center space-x-1">
                        <Activity className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Core Tasks</span>
                      </span>
                      <ul className="space-y-1.5 pl-1">
                        {milestone.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start text-slate-300 gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                            <span className="font-sans text-[11px]">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center space-x-1">
                        <FileText className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Deliverables</span>
                      </span>
                      <ul className="space-y-1.5 pl-1">
                        {milestone.deliverables.map((del, idx) => (
                          <li key={idx} className="flex items-start text-slate-300 gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="font-sans text-[11px]">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-800/40">
                    {/* Definition of Done */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Definition of Done</span>
                      <ul className="space-y-1.5 pl-1">
                        {milestone.definitionOfDone.map((dod, idx) => (
                          <li key={idx} className="flex items-start text-slate-300 gap-2">
                            <span className="text-indigo-400 font-bold font-mono text-[11px] mt-0.5 shrink-0">DoD-{idx+1}:</span>
                            <span className="font-sans text-[11px] text-slate-300">{dod}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Testing Checklist */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Testing Checklist</span>
                      <ul className="space-y-1.5 pl-1">
                        {milestone.testingChecklist.map((tc, idx) => (
                          <li key={idx} className="flex items-start text-slate-300 gap-2">
                            <span className="w-4 h-4 rounded border border-slate-700 bg-slate-950 shrink-0 mt-0.5 flex items-center justify-center text-[8px] font-mono text-slate-500">✓</span>
                            <span className="font-sans text-[11px] text-slate-300">{tc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metadata: Dependencies & Git Commit */}
                  <div className="pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Dependencies:</span>
                      <span className="text-slate-300 font-semibold">
                        {milestone.dependencies.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-950/80 border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-mono max-w-full overflow-hidden">
                      <GitCommit className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="text-slate-400 shrink-0">Commit:</span>
                      <span className="text-rose-400 select-all truncate font-bold">{milestone.expectedGitCommit}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredMilestones.length === 0 && (
          <div className="bg-[#0B0F19] border border-slate-800 p-8 rounded-xl text-center space-y-2">
            <p className="text-sm text-slate-400 font-sans">No milestones found matching your search filters.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedPhase('All'); }}
              className="text-xs text-indigo-400 hover:underline font-mono"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
