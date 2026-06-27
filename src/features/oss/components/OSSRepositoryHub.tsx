import React, { useState, useMemo } from 'react';
import { 
  Github, Star, GitFork, Eye, BookOpen, Cpu, Users, Layers, Shield, 
  Activity, FileText, Terminal, Copy, Check, CheckCircle, MessageSquare, 
  Plus, Search, Compass, Heart, Share2, ExternalLink, ChevronRight, 
  AlertCircle, Calendar, ArrowUpCircle, Sparkles, Filter, Code, Info
} from 'lucide-react';
import { 
  repoDocuments, 
  issueTemplates, 
  goodFirstIssues, 
  discussionThreads, 
  docStructureData, 
  communityStrategy, 
  demoStrategy,
  RepoDocument,
  IssueTemplate,
  DiscussionThread
} from '../constants/repoDocuments';

export default function OSSRepositoryHub() {
  // Navigation inside the OSS module
  const [activeSubTab, setActiveSubTab] = useState<'docs' | 'templates' | 'discussions' | 'issues' | 'playbooks'>('docs');
  
  // Document sub-selection
  const [selectedDocId, setSelectedDocId] = useState<string>('readme');
  
  // Template sub-selection
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('bug');
  
  // Copy state indicators
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Discussion filters & addition states
  const [selectedDiscCategory, setSelectedDiscCategory] = useState<string>('All');
  const [discSearchTerm, setDiscSearchTerm] = useState('');
  const [customDiscussions, setCustomDiscussions] = useState<DiscussionThread[]>(discussionThreads);
  const [showAddDiscModal, setShowAddDiscModal] = useState(false);
  const [newDiscTitle, setNewDiscTitle] = useState('');
  const [newDiscCategory, setNewDiscCategory] = useState<'General' | 'Ideas' | 'Q&A' | 'Show and Tell'>('General');
  const [newDiscContent, setNewDiscContent] = useState('');

  // Local community checklist state to make it interactive
  const [checkedCommunityItems, setCheckedCommunityItems] = useState<Record<string, boolean>>({
    'The 30-Minute triage commitment': true,
    'Automatic Slack/Discord alert streams': false,
    'Interactive video walkthroughs': false,
    'Contributor swag tiers': true
  });

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const selectedDoc = useMemo(() => {
    return repoDocuments.find(d => d.id === selectedDocId) || repoDocuments[0];
  }, [selectedDocId]);

  const selectedTemplate = useMemo(() => {
    const combined = [...issueTemplates];
    return combined.find(t => t.id === selectedTemplateId) || combined[0];
  }, [selectedTemplateId]);

  const getDocIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-4 h-4 text-slate-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Users': return <Users className="w-4 h-4 text-indigo-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-amber-400" />;
      case 'Shield': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-rose-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredDiscussions = useMemo(() => {
    return customDiscussions.filter(d => {
      const matchesCategory = selectedDiscCategory === 'All' || d.category === selectedDiscCategory;
      const matchesSearch = 
        d.title.toLowerCase().includes(discSearchTerm.toLowerCase()) ||
        d.content.toLowerCase().includes(discSearchTerm.toLowerCase()) ||
        d.author.toLowerCase().includes(discSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [customDiscussions, selectedDiscCategory, discSearchTerm]);

  const handleAddDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscTitle.trim() || !newDiscContent.trim()) return;

    const newThread: DiscussionThread = {
      id: `custom-disc-${Date.now()}`,
      category: newDiscCategory,
      title: newDiscTitle,
      author: 'aperture_enthusiast',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
      replies: 0,
      votes: 1,
      isPinned: false,
      content: newDiscContent
    };

    setCustomDiscussions([newThread, ...customDiscussions]);
    setNewDiscTitle('');
    setNewDiscContent('');
    setShowAddDiscModal(false);
  };

  const handleVoteDiscussion = (id: string) => {
    setCustomDiscussions(prev => 
      prev.map(d => d.id === id ? { ...d, votes: d.votes + 1 } : d)
    );
  };

  const toggleCommunityCheck = (title: string) => {
    setCheckedCommunityItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="oss-repository-hub">
      {/* 1. Repository Header Stats Card */}
      <div className="bg-gradient-to-br from-[#0F1424] to-[#0A0D18] border border-slate-800/90 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400 font-mono text-sm">github.com /</span>
              <span className="text-white font-extrabold text-lg tracking-tight">aperture-bi / aperture</span>
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded font-mono font-bold">Public</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">GitHub Repository Designer</h2>
            <p className="text-xs text-slate-400 max-w-xl font-sans">
              As an Open Source Maintainer, this hub provides ready-to-publish architectural code guidelines, community engagement playbooks, issue schemas, and documentation workflows for the Aperture project.
            </p>
          </div>

          {/* GitHub Action Metrics Bar */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-300">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
              <span>Stars</span>
              <span className="text-amber-400">1,482</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-300">
              <GitFork className="w-3.5 h-3.5 text-indigo-400" />
              <span>Forks</span>
              <span className="text-indigo-400">238</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-300">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Watchers</span>
              <span className="text-cyan-400">45</span>
            </div>
          </div>
        </div>

        {/* Major Segment Tabs Selector */}
        <div className="flex flex-wrap border-t border-slate-800/80 mt-6 pt-4 gap-1.5">
          <button
            onClick={() => setActiveSubTab('docs')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 border transition ${
              activeSubTab === 'docs'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Files & Architecture</span>
          </button>
          <button
            onClick={() => setActiveSubTab('templates')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 border transition ${
              activeSubTab === 'templates'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Issue & PR Templates</span>
          </button>
          <button
            onClick={() => setActiveSubTab('discussions')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 border transition ${
              activeSubTab === 'discussions'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>GitHub Discussions</span>
          </button>
          <button
            onClick={() => setActiveSubTab('issues')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 border transition ${
              activeSubTab === 'issues'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Good First Issues</span>
          </button>
          <button
            onClick={() => setActiveSubTab('playbooks')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center space-x-2 border transition ${
              activeSubTab === 'playbooks'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Growth & Demo Strategy</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Section Body */}

      {/* SUB-TAB A: FILES & ARCHITECTURE DOCS */}
      {activeSubTab === 'docs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="oss-subtab-docs">
          {/* File explorer panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-4 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Repository Documents</h3>
              <div className="space-y-1">
                {repoDocuments.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full flex items-start space-x-3 p-2.5 rounded-lg text-left transition ${
                      selectedDocId === doc.id
                        ? 'bg-slate-800/80 border border-slate-700 text-white'
                        : 'bg-transparent border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <span className="mt-0.5 shrink-0">{getDocIcon(doc.icon)}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-mono font-bold truncate">{doc.name}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{doc.filePath}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Folder layout explorer */}
            <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Documentation Structure</h3>
                <span className="text-[9px] text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded font-bold">docs/</span>
              </div>
              <div className="space-y-2.5 font-mono text-[11px]">
                {docStructureData.map((d, idx) => (
                  <div key={idx} className="flex items-start space-x-2 bg-slate-950/40 border border-slate-800/60 p-2.5 rounded-lg">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-200 font-semibold">{d.path}</span>
                      <p className="text-[10px] text-slate-500 font-sans mt-0.5 leading-normal">{d.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core File content viewer */}
          <div className="lg:col-span-8 flex flex-col bg-[#0B0F19] border border-slate-800 rounded-xl overflow-hidden min-h-[550px]">
            {/* Toolbar */}
            <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-300 font-mono font-semibold">{selectedDoc.filePath}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] text-slate-500 font-mono">{selectedDoc.content.split('\n').length} lines</span>
                <button
                  onClick={() => handleCopyText(selectedDoc.content, selectedDoc.id)}
                  className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 transition-colors cursor-pointer"
                >
                  {copiedId === selectedDoc.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Rendered content */}
            <div className="p-6 overflow-y-auto max-h-[600px] flex-grow text-xs leading-relaxed text-slate-300 font-sans whitespace-pre-wrap select-text scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {/* Highlight Headers visually for custom styled markdown look */}
              <div className="space-y-4">
                {selectedDoc.content.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-xl font-extrabold text-white border-b border-slate-800 pb-2 mt-4 first:mt-0 font-sans">{line.replace('# ', '')}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-md font-bold text-white border-b border-slate-800/60 pb-1.5 mt-5 font-sans">{line.replace('## ', '')}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-xs font-bold text-slate-200 mt-4 uppercase tracking-wider font-mono">{line.replace('### ', '')}</h3>;
                  }
                  if (line.startsWith('> ')) {
                    return <blockquote key={idx} className="border-l-2 border-indigo-500 pl-3 py-1 bg-indigo-500/5 text-indigo-300 rounded font-sans text-[11px] italic my-3">{line.replace('> ', '')}</blockquote>;
                  }
                  if (line.startsWith('- ') || line.startsWith('* ')) {
                    return (
                      <div key={idx} className="flex items-start space-x-2 pl-3">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        <span className="font-sans text-xs text-slate-300">{line.substring(2)}</span>
                      </div>
                    );
                  }
                  if (line.startsWith('`') && line.endsWith('`')) {
                    return <code key={idx} className="bg-slate-950 px-1.5 py-0.5 rounded text-rose-400 font-mono text-[10px] break-all">{line.replaceAll('`', '')}</code>;
                  }
                  return <p key={idx} className="text-slate-300 leading-normal font-sans text-xs">{line}</p>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB B: ISSUE & PR TEMPLATES */}
      {activeSubTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="oss-subtab-templates">
          {/* List templates selector */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-4 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Template Types</h3>
              <div className="space-y-1.5">
                {issueTemplates.map((temp) => (
                  <button
                    key={temp.id}
                    onClick={() => setSelectedTemplateId(temp.id)}
                    className={`w-full flex flex-col p-3 rounded-lg text-left border transition ${
                      selectedTemplateId === temp.id
                        ? 'bg-slate-800/80 border-slate-700 text-white'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{temp.name}</div>
                    <div className="text-[10px] text-slate-500 font-sans mt-1 leading-normal">{temp.description}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-2 bg-slate-950 px-1.5 py-0.5 rounded w-fit">{temp.filePath}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Continuous Integration Rules warning banner */}
            <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-amber-400 font-mono">GitHub Action Safeguard</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                These templates are automatically picked up by GitHub if stored inside the <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-400 font-mono text-[9px]">.github/</code> folder structure of your repository. Keeping these clean enforces standardized issue triage and guarantees correct pre-flight builds.
              </p>
            </div>
          </div>

          {/* Template preview content */}
          <div className="lg:col-span-8 flex flex-col bg-[#0B0F19] border border-slate-800 rounded-xl overflow-hidden min-h-[500px]">
            {/* Toolbar */}
            <div className="bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-slate-300 font-mono font-semibold">{selectedTemplate.filePath}</span>
              </div>
              <button
                onClick={() => handleCopyText(selectedTemplate.content, selectedTemplate.id)}
                className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 transition-colors cursor-pointer"
              >
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy Raw Template</span>
                  </>
                )}
              </button>
            </div>

            {/* Styled Code View Block */}
            <div className="p-4 bg-slate-950/80 font-mono text-[11px] text-slate-300 leading-relaxed overflow-auto max-h-[550px] flex-grow select-all scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {selectedTemplate.content.split('\n').map((line, idx) => (
                <div key={idx} className="table-row">
                  <span className="table-cell text-right pr-4 text-slate-600 select-none text-[9px] w-6">{idx + 1}</span>
                  <span className="table-cell break-all">{line || ' '}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB C: DISCUSSIONS PLATFORM */}
      {activeSubTab === 'discussions' && (
        <div className="space-y-6" id="oss-subtab-discussions">
          {/* Interactive filter & add bar */}
          <div className="bg-[#0B0F19] border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-3 w-full md:w-auto">
              {/* Category selector tags */}
              {['All', 'Ideas', 'Q&A', 'Show and Tell'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedDiscCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition ${
                    selectedDiscCategory === cat
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input and Add button */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-60">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search threads..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  value={discSearchTerm}
                  onChange={(e) => setDiscSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowAddDiscModal(true)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold rounded-lg flex items-center space-x-1.5 transition cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Thread</span>
              </button>
            </div>
          </div>

          {/* New Discussion Modal overlay */}
          {showAddDiscModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <form 
                onSubmit={handleAddDiscussion}
                className="bg-[#0B0F19] border border-slate-700 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-2xl animate-scaleUp"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white font-mono">Create New Discussion Thread</h3>
                  <button 
                    type="button" 
                    onClick={() => setShowAddDiscModal(false)}
                    className="text-slate-500 hover:text-slate-300 font-mono text-xs"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase">Category</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    value={newDiscCategory}
                    onChange={(e) => setNewDiscCategory(e.target.value as any)}
                  >
                    <option value="General">General</option>
                    <option value="Ideas">Ideas</option>
                    <option value="Q&A">Q&A</option>
                    <option value="Show and Tell">Show and Tell</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Is there any plan to support ClickHouse metrics?"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    value={newDiscTitle}
                    onChange={(e) => setNewDiscTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-mono uppercase">Content (Markdown supported)</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your ideas, questions, or show-and-tell topics in detail..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                    value={newDiscContent}
                    onChange={(e) => setNewDiscContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddDiscModal(false)}
                    className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-lg font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-indigo-600 text-white text-xs rounded-lg font-mono font-bold hover:bg-indigo-500"
                  >
                    Publish Thread
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List of active threads */}
          <div className="space-y-4">
            {filteredDiscussions.map((disc) => (
              <div 
                key={disc.id} 
                className={`bg-[#0B0F19]/90 border rounded-xl p-5 space-y-4 transition ${
                  disc.isPinned ? 'border-indigo-500/35 bg-indigo-950/5' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img 
                      src={disc.avatar} 
                      alt={disc.author} 
                      className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 shrink-0" 
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-200">{disc.author}</span>
                        <span className="text-[9px] text-slate-500 font-mono">posted recently</span>
                        {disc.isPinned && (
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 text-[8px] px-1.5 py-0.5 rounded font-mono font-bold">PINNED</span>
                        )}
                        <span className="bg-slate-900 text-slate-400 border border-slate-800 text-[8px] px-1.5 py-0.5 rounded font-mono">
                          {disc.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 leading-snug truncate">{disc.title}</h4>
                    </div>
                  </div>

                  {/* Upvote score button */}
                  <button 
                    onClick={() => handleVoteDiscussion(disc.id)}
                    className="flex flex-col items-center justify-center border border-slate-800 bg-slate-950/60 hover:bg-slate-900 rounded-lg py-1.5 px-3 min-w-[50px] shrink-0 transition"
                  >
                    <ArrowUpCircle className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white font-mono mt-1">{disc.votes}</span>
                  </button>
                </div>

                {/* Content body snippet */}
                <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap pl-11">
                  {disc.content}
                </p>

                {/* Footer details row */}
                <div className="flex items-center justify-between border-t border-slate-800/50 pt-3 pl-11">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{disc.replies} community responses</span>
                  </div>
                  <button 
                    onClick={() => handleVoteDiscussion(disc.id)}
                    className="text-[10px] text-indigo-400 hover:underline font-mono flex items-center space-x-1"
                  >
                    <span>▲ Upvote this thread</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredDiscussions.length === 0 && (
              <div className="bg-[#0B0F19] border border-slate-800 p-8 rounded-xl text-center">
                <p className="text-xs text-slate-400 font-mono">No discussions found matching your query criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB D: GOOD FIRST ISSUES */}
      {activeSubTab === 'issues' && (
        <div className="space-y-6" id="oss-subtab-issues">
          {/* Header alert */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 p-4 rounded-xl flex items-start space-x-3">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white font-mono">What are Good First Issues?</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans mt-1">
                Good First Issues are introductory tasks earmarked by core maintainers. They feature limited architectures, detailed debugging tips, and structured expectations to support new developers. This is the primary driver of open-source adoption.
              </p>
            </div>
          </div>

          {/* Grid catalog of issues */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {goodFirstIssues.map((issue) => (
              <div 
                key={issue.id} 
                className="bg-[#0B0F19] border border-slate-800 hover:border-indigo-500/30 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all hover:translate-y-[-2px]"
              >
                {/* Meta details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono font-semibold">{issue.id}</span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      issue.difficulty === 'Easy' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                    }`}>
                      {issue.difficulty}
                    </span>
                  </div>

                  <h4 className="text-xs font-mono font-bold text-white hover:text-indigo-400 leading-snug cursor-pointer transition-colors">
                    {issue.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    {issue.description}
                  </p>

                  {/* Expected deliverables block */}
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-900 space-y-1">
                    <span className="text-[9px] font-mono uppercase font-bold text-slate-500 block">Expected Output</span>
                    <p className="text-[10px] text-slate-300 leading-normal">{issue.expectedDeliverable}</p>
                  </div>

                  {/* Mentoring Tips */}
                  <div className="text-[10px] text-indigo-300 leading-relaxed bg-indigo-500/5 p-2.5 rounded border border-indigo-500/10">
                    <span className="font-bold font-mono text-[9px] text-indigo-400 uppercase tracking-widest block mb-0.5">Mentoring Advice</span>
                    {issue.mentoringTips}
                  </div>
                </div>

                {/* Bottom tags */}
                <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-1">
                  {issue.tags.map((tag) => (
                    <span key={tag} className="text-[8px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB E: GROWTH & DEMO PLAYBOOKS */}
      {activeSubTab === 'playbooks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="oss-subtab-playbooks">
          {/* Growth & Community checklists */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white font-mono">Community Building Playbook</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {communityStrategy.philosophy} Core developer relations (DevRel) triggers are tracked below. Check to toggle status:
              </p>

              <div className="space-y-3">
                {communityStrategy.devRelChecklist.map((item, idx) => {
                  const isChecked = checkedCommunityItems[item.title] || false;
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleCommunityCheck(item.title)}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition cursor-pointer ${
                        isChecked 
                          ? 'bg-indigo-950/10 border-indigo-500/30' 
                          : 'bg-slate-950 border-slate-900/60 opacity-60 hover:opacity-90'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'border-indigo-500 bg-indigo-600 text-white' 
                          : 'border-slate-700 bg-slate-950'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-white block leading-tight">{item.title}</span>
                        <p className="text-[10px] text-slate-400 leading-normal mt-1">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Discussion Channels Links list */}
              <div className="pt-3 border-t border-slate-800/60 space-y-2">
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold block">Configured Channels</span>
                <div className="grid grid-cols-1 gap-2">
                  {communityStrategy.channels.map((ch, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 p-2 rounded text-[11px] font-mono">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-slate-300 font-semibold">{ch.name}</span>
                      </div>
                      <span className="text-[9px] text-indigo-400 truncate max-w-[200px]">{ch.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Demo platform strategy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#0B0F19] border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">Aperture Demo Strategy</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {demoStrategy.overview}
              </p>

              <div className="space-y-4 font-sans">
                {demoStrategy.layers.map((layer, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-900 p-4 rounded-xl relative overflow-hidden">
                    {/* Decorative step index */}
                    <span className="absolute top-2 right-3 font-mono text-[24px] font-black text-slate-900 select-none">
                      0{idx + 1}
                    </span>

                    <h4 className="text-xs font-bold text-white flex items-center space-x-2 relative z-10">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{layer.name}</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-2 pl-6 relative z-10">
                      {layer.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Developer action call to action */}
              <div className="bg-gradient-to-r from-indigo-500/10 via-cyan-500/5 to-transparent border border-indigo-500/15 p-4 rounded-xl space-y-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs font-bold text-white font-mono">Simulate a Sandbox Rollout</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Click below to log a simulated deployment event. This tests our background synchronization routines to ensure the local analytical engine is prepared for remote webhook triggers.
                </p>
                <button
                  onClick={() => alert("Simulated Sandbox deployment successfully completed on local ports! Container memory logs check out green.")}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono font-bold rounded flex items-center space-x-1 transition cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Execute Sandbox Deploy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
