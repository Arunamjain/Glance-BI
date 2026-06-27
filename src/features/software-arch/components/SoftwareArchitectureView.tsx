import React, { useState } from 'react';
import { 
  Code, 
  ArrowRight, 
  CheckCircle, 
  Settings, 
  Workflow, 
  Target, 
  GitBranch,
  Folder,
  FolderOpen,
  Server,
  Terminal,
  Activity,
  FileText,
  BookOpen,
  Wrench,
  Package,
  Cpu,
  Cloud,
  Layers,
  Globe,
  Check,
  AlertCircle,
  FileCode,
  Sparkles
} from 'lucide-react';
import { archModules } from '../../../shared/constants';
import { ArchModule } from '../../../shared/types';
import { repositoryTreeData, RepoNode } from '../../../shared/constants/repositoryTree';

export default function SoftwareArchitectureView() {
  const [selectedArchModule, setSelectedArchModule] = useState<ArchModule>(archModules[0]);
  const [activeSubTab, setActiveSubTab] = useState<'components' | 'repo-layout'>('components');
  const [selectedRepoNodeId, setSelectedRepoNodeId] = useState<string>('frontend');

  const getRepoIcon = (iconName: string, isSelected: boolean) => {
    const size = "w-4 h-4 shrink-0";
    const colorClass = isSelected ? "text-indigo-400" : "text-slate-400";
    switch (iconName) {
      case 'github': return <GitBranch className={`${size} text-pink-400`} />;
      case 'config': return <Settings className={`${size} text-cyan-400`} />;
      case 'assets': return <Folder className={`${size} text-emerald-400`} />;
      case 'public': return <Globe className={`${size} text-teal-400`} />;
      case 'script': return <Terminal className={`${size} text-amber-400`} />;
      case 'docs': return <FileText className={`${size} text-indigo-400`} />;
      case 'infra': return <Cloud className={`${size} text-blue-400`} />;
      case 'docker': return <Cpu className={`${size} text-sky-400`} />;
      case 'test': return <Activity className={`${size} text-rose-400`} />;
      case 'package': return <Package className={`${size} text-purple-400`} />;
      case 'frontend': return <Code className={`${size} text-emerald-300`} />;
      case 'backend': return <Server className={`${size} text-indigo-300`} />;
      case 'examples': return <BookOpen className={`${size} text-amber-300`} />;
      default: return <Folder className={`${size} ${colorClass}`} />;
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn" id="software-arch-view">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Code className="w-4 h-4" />
            <span>Enterprise Design Specification</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">Software Architecture & Boundaries</h2>
          <p className="text-sm text-slate-400 mt-2 font-sans">Meticulously drafted component blueprints detailing boundaries, responsibilities, pipelines, and sequence flows.</p>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#0A0E1A] p-1 rounded-lg border border-slate-800 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('components')}
            id="subtab-btn-components"
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'components'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Component Specifications</span>
          </button>
          <button
            onClick={() => setActiveSubTab('repo-layout')}
            id="subtab-btn-repolayout"
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'repo-layout'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/15'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Repository Layout Design</span>
          </button>
        </div>
      </div>

      {/* ==================== SUBTAB 1: COMPONENT BLUEPRINTS ==================== */}
      {activeSubTab === 'components' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn" id="components-view-grid">
          {/* Left Selector Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-1">Architectural Components</h3>
            <div className="space-y-2 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
              {archModules.map((mod) => {
                const IconComp = mod.icon;
                const isSelected = selectedArchModule.id === mod.id;
                return (
                  <button
                    key={mod.id}
                    id={`arch-mod-${mod.id}`}
                    onClick={() => setSelectedArchModule(mod)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-500 shadow-md shadow-indigo-500/5'
                        : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-semibold text-sm text-white font-sans">{mod.name}</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium font-mono">{mod.category}</div>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-indigo-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">
            {/* Panel Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-lg shrink-0 animate-fadeIn">
                  {React.createElement(selectedArchModule.icon, { className: "w-7 h-7" })}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono">{selectedArchModule.category}</span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">{selectedArchModule.name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-start md:self-center bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="font-sans">Component-Ready Design Spec</span>
              </div>
            </div>

            {/* Core Responsibility */}
            <div className="space-y-2 bg-slate-900/40 border border-slate-800 p-5 rounded-xl">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">CORE RESPONSIBILITY</div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">{selectedArchModule.responsibility}</p>
            </div>

            {/* Grid: Subsystems & Inputs/Outputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subsystems List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <span>Key Sub-systems & Blocks</span>
                </h4>
                <div className="space-y-3">
                  {selectedArchModule.subsystems.map((sub, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
                      <div className="font-semibold text-xs text-white flex items-center space-x-1.5 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span>{sub.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">{sub.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boundaries Inputs/Outputs */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <Workflow className="w-4 h-4 text-indigo-400" />
                  <span>Boundary Interfaces (I/O)</span>
                </h4>
                <div className="p-5 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-5">
                  {/* Inputs Column */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-mono">INPUT BOUNDARIES</span>
                    <div className="space-y-2 font-sans">
                      {selectedArchModule.inputsOutputs.filter(io => io.type === 'input').map((io, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-emerald-400 text-xs mt-0.5 font-bold font-mono">→</span>
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{io.data}</div>
                            <div className="text-[10px] text-slate-400 leading-tight">{io.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-slate-800/85"></div>

                  {/* Outputs Column */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20 font-mono">OUTPUT BOUNDARIES</span>
                    <div className="space-y-2 font-sans">
                      {selectedArchModule.inputsOutputs.filter(io => io.type === 'output').map((io, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <span className="text-indigo-400 text-xs mt-0.5 font-bold font-mono">←</span>
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{io.data}</div>
                            <div className="text-[10px] text-slate-400 leading-tight">{io.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Design Patterns */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <Target className="w-4 h-4 text-indigo-400" />
                <span>Architectural Patterns & Guarantees</span>
              </h4>
              <div className="flex flex-wrap gap-2 font-mono">
                {selectedArchModule.designPatterns.map((pat, idx) => (
                  <span key={idx} className="text-[10px] font-mono font-semibold bg-indigo-500/5 text-indigo-300 border border-indigo-500/15 px-3 py-1 rounded-full">
                    {pat}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Flow Timeline */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <GitBranch className="w-4 h-4 text-indigo-400" />
                <span>Sequence / Execution Dataflow</span>
              </h4>
              <div className="relative pl-6 space-y-5 border-l border-slate-800">
                {selectedArchModule.dataFlowSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Circle */}
                    <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-[8px] font-bold text-indigo-300 font-mono">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUBTAB 2: REPOSITORY LAYOUT DESIGN ==================== */}
      {activeSubTab === 'repo-layout' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn" id="repo-layout-grid">
          {/* Left Sidebar - Folder Directory Tree Structure */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0F1424]/40 border border-slate-800/60 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Repository Workspace Directory
                </span>
                <span className="text-[9px] font-mono bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded">
                  Monorepo Root
                </span>
              </div>
              
              <div className="space-y-1 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar text-xs font-mono">
                {/* Virtual Root Folder */}
                <div className="flex items-center space-x-2 p-1.5 text-slate-400 font-bold border-b border-slate-900 mb-2">
                  <FolderOpen className="w-4 h-4 text-indigo-400" />
                  <span>aperture-analytics-platform/</span>
                </div>

                {repositoryTreeData.map(node => {
                  const isSelected = selectedRepoNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedRepoNodeId(node.id)}
                      id={`repo-node-btn-${node.id}`}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-800/70 border-indigo-500/50 text-white font-bold'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-slate-800/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate w-full">
                        {getRepoIcon(node.iconName, isSelected)}
                        <span className="truncate">{node.path}</span>
                      </div>
                      <ArrowRight className={`w-3 h-3 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 text-indigo-400' : 'text-slate-700'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design Callout */}
            <div className="p-4 bg-indigo-950/5 border border-indigo-500/10 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold font-sans">Engineering Rationale</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                This repository design models a scalable enterprise-grade analytical monorepo. It cleanly isolates executable apps from shared codebases, optimizes production image size via multi-stage compiling, and establishes robust linting gates.
              </p>
            </div>
          </div>

          {/* Right Content Area - Detailed Folder Specification */}
          {(() => {
            const currentNode = repositoryTreeData.find(n => n.id === selectedRepoNodeId);
            if (!currentNode) return null;
            return (
              <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl animate-fadeIn">
                {/* Section Header */}
                <div className="border-b border-slate-800 pb-5">
                  <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono">
                    <FolderOpen className="w-4 h-4" />
                    <span>Lead Engineer Repository Spec</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-1.5 tracking-tight flex items-center space-x-2.5">
                    {getRepoIcon(currentNode.iconName, true)}
                    <span>{currentNode.name}</span>
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 font-sans italic leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                    "{currentNode.shortDesc}"
                  </p>
                </div>

                {/* Sub-block 1: Why it Exists & Architectural Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">Why This Folder Exists</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {currentNode.whyItExists}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider block">Architectural Boundary Role</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {currentNode.architecturalRole}
                    </p>
                  </div>
                </div>

                {/* Sub-block 2: Core Engineering & Clean Design Principles */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Core Design Patterns & Engineering Rules</span>
                  <div className="flex flex-wrap gap-2">
                    {currentNode.designPrinciples.map((rule, idx) => (
                      <div key={idx} className="text-xs font-sans font-semibold bg-indigo-500/5 text-indigo-300 border border-indigo-500/15 px-3 py-1.5 rounded-lg w-full flex items-start space-x-2">
                        <span className="text-indigo-400 font-mono mt-0.5">•</span>
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-block 3: Suggested Operational Files */}
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Recommended Layout Files & Configurations</span>
                  <div className="space-y-3">
                    {currentNode.suggestedFiles.map((file, idx) => (
                      <div key={idx} className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2">
                        <div className="flex items-center justify-between border-b border-slate-800/40 pb-1.5">
                          <span className="text-xs font-bold text-white font-mono flex items-center space-x-1.5">
                            <FileCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                            <span>{file.name}</span>
                          </span>
                          <span className="text-[9px] font-mono bg-slate-900 px-1.5 py-0.5 border border-slate-850 rounded text-slate-500">
                            Spec Config
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">{file.description}</p>
                        <div className="text-[10px] text-slate-400 font-sans italic border-t border-slate-900/20 pt-1.5">
                          <strong>Operational Role:</strong> {file.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-block 4: Best Practices & Delivery Rules */}
                <div className="p-5 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">Production Deployment & Dev Best Practices</span>
                  <ul className="space-y-2">
                    {currentNode.bestPractices.map((bp, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300 font-sans">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sub-block 5: Cognitive Reduction Benefit */}
                <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg flex items-center space-x-2.5 text-xs text-slate-300 font-sans mt-2">
                  <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div>
                    <strong className="text-white">Developer Flow Benefit:</strong> {currentNode.cognitiveBenefit}
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
}
