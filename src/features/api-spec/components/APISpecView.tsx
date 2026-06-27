import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Terminal,
  Code,
  Copy,
  Check,
  Search,
  Database,
  ShieldCheck,
  Layout,
  BarChart2,
  Palette,
  Download,
  Users,
  UserCheck,
  Settings,
  Webhook,
  Clock,
  Bell,
  AlertTriangle,
  ListFilter,
  Eye,
  FileCode,
  HelpCircle
} from 'lucide-react';
import { apiEndpoints, apiCategories, openApiSpecYAML, errorSchemaExample, APIEndpoint } from '../../../shared/constants/openapi';

export default function APISpecView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint>(apiEndpoints[0]);
  const [activeTab, setActiveTab] = useState<'success' | 'request' | 'error' | 'curl'>('request');
  const [viewMode, setViewMode] = useState<'explorer' | 'openapi'>('explorer');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Map category IDs to lucide icons for custom sidebar visual rendering
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'auth': return ShieldCheck;
      case 'dashboards': return Layout;
      case 'charts': return BarChart2;
      case 'visualizations': return Palette;
      case 'query': return Database;
      case 'exports': return Download;
      case 'users': return Users;
      case 'roles': return UserCheck;
      case 'settings': return Settings;
      case 'webhooks': return Webhook;
      case 'scheduler': return Clock;
      case 'notifications': return Bell;
      default: return Database;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'POST': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'PUT': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DELETE': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'PATCH': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  // Filter endpoints
  const filteredEndpoints = apiEndpoints.filter(ep => {
    const matchesCategory = selectedCategory === 'all' || ep.category === selectedCategory;
    const matchesSearch = ep.path.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ep.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-10 animate-fadeIn animate-duration-150" id="rest-api-specifications-view">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Database className="w-4 h-4 animate-pulse" />
            <span>Aperture Analytics API Blueprint</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">Enterprise REST API Reference</h2>
          <p className="text-sm text-slate-400 mt-2 font-sans">
            Strictly versioned (v1), pagination-enabled, metadata-driven interfaces utilizing RFC 7807 Problem Details error responses.
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={() => setViewMode('explorer')}
            id="view-explorer-btn"
            className={`px-4 py-2 text-xs font-semibold font-mono rounded-lg border transition-all cursor-pointer ${
              viewMode === 'explorer'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            API Explorer
          </button>
          <button
            onClick={() => setViewMode('openapi')}
            id="view-openapi-btn"
            className={`px-4 py-2 text-xs font-semibold font-mono rounded-lg border transition-all cursor-pointer ${
              viewMode === 'openapi'
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            OpenAPI Spec
          </button>
        </div>
      </div>

      {/* Core Architectural Patterns Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#0F1424] border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">1. VERSIONING PATH</span>
          <h4 className="text-sm font-bold text-white font-sans">URL Prefixes</h4>
          <p className="text-xs text-slate-400 leading-normal font-sans">
            Every resource query is mounted under a mandatory versioned path prefix (e.g. <code className="text-indigo-300 font-mono text-[10px]">/api/v1/*</code>) ensuring zero breaking alterations.
          </p>
        </div>
        <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-4">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">2. PAGINATION & FILTERING</span>
          <h4 className="text-sm font-bold text-white font-sans">Standardized Querying</h4>
          <p className="text-xs text-slate-400 leading-normal font-sans">
            Unifies pagination (<code className="text-indigo-300 font-mono text-[10px]">page</code>, <code className="text-indigo-300 font-mono text-[10px]">limit</code>), multi-field sorting (<code className="text-indigo-300 font-mono text-[10px]">sort_by</code>), and filtering patterns.
          </p>
        </div>
        <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-4">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">3. INPUT VALIDATION</span>
          <h4 className="text-sm font-bold text-white font-sans">Declarative Constraints</h4>
          <p className="text-xs text-slate-400 leading-normal font-sans">
            All POST/PUT requests run synchronous JSON-Schema parsing with strict regex format binders, returning detailed validation array lists.
          </p>
        </div>
        <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-4">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">4. ERROR ENVELOPS</span>
          <h4 className="text-sm font-bold text-white font-sans">RFC 7807 Standard</h4>
          <p className="text-xs text-slate-400 leading-normal font-sans">
            Errors bypass generic envelopes, returning RFC 7807-compliant Problem Details objects with context traces and unique codes.
          </p>
        </div>
      </div>

      {viewMode === 'explorer' ? (
        /* ==================== API EXPLORER MODE ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="api-search-input"
                className="w-full bg-[#0F1424] border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition font-sans"
              />
            </div>

            {/* Category Quick Filter */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-1 font-mono">Filter by Module</span>
              <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                <button
                  onClick={() => setSelectedCategory('all')}
                  id="cat-filter-all"
                  className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  All Modules
                </button>
                {apiCategories.map(cat => (
                  <button
                    key={cat.id}
                    id={`cat-filter-${cat.id}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg border transition-all cursor-pointer flex items-center space-x-1 ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {React.createElement(getCategoryIcon(cat.id), { className: 'w-3 h-3' })}
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Endpoint Menu List */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-1 font-mono">Endpoints ({filteredEndpoints.length})</span>
              <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredEndpoints.length === 0 ? (
                  <div className="p-4 bg-[#0F1424] border border-slate-850/60 rounded-xl text-center text-slate-500 text-xs font-sans">
                    No matching endpoints found.
                  </div>
                ) : (
                  filteredEndpoints.map(ep => {
                    const isSelected = selectedEndpoint.id === ep.id;
                    const CatIcon = getCategoryIcon(ep.category);
                    return (
                      <button
                        key={ep.id}
                        id={`ep-btn-${ep.id}`}
                        onClick={() => {
                          setSelectedEndpoint(ep);
                          // Reset JSON view tab to appropriate option
                          if (ep.method === 'GET' || ep.method === 'DELETE') {
                            setActiveTab('success');
                          } else {
                            setActiveTab('request');
                          }
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-slate-800/90 border-indigo-500/60 shadow-md shadow-indigo-500/5'
                            : 'bg-[#0F1424]/40 border-slate-800/80 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold font-mono border ${getMethodColor(ep.method)}`}>
                            {ep.method}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold text-white truncate font-sans">{ep.summary}</div>
                            <div className="text-[9px] font-mono text-slate-500 truncate mt-0.5">{ep.path}</div>
                          </div>
                        </div>
                        <ArrowRight className={`w-3 h-3 text-slate-600 transition-transform ${isSelected ? 'translate-x-1 text-indigo-400' : ''}`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Endpoint Detail Specification Panel */}
          <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden">
            {/* Detail Panel Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-5 gap-4">
              <div className="flex items-start space-x-3.5 min-w-0">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shrink-0">
                  {React.createElement(getCategoryIcon(selectedEndpoint.category), { className: 'w-5 h-5' })}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono">
                      {apiCategories.find(c => c.id === selectedEndpoint.category)?.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">
                      v1 core endpoint
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">{selectedEndpoint.summary}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-start md:self-center">
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  OAuth Scope: Required
                </span>
              </div>
            </div>

            {/* Path and Route Indicator Block */}
            <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
              <div className="flex items-center space-x-2.5 min-w-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border shrink-0 ${getMethodColor(selectedEndpoint.method)}`}>
                  {selectedEndpoint.method}
                </span>
                <span className="text-slate-200 text-xs font-bold truncate select-all">{selectedEndpoint.path}</span>
              </div>
              <button
                onClick={() => handleCopy(`https://api.aperture.sh${selectedEndpoint.path}`, selectedEndpoint.id + '-path')}
                className="self-end sm:self-auto px-2.5 py-1 text-[10px] bg-slate-900 border border-slate-800 rounded hover:border-slate-750 text-slate-400 hover:text-white transition flex items-center space-x-1.5 cursor-pointer"
              >
                {copiedText === selectedEndpoint.id + '-path' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Route</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">ENDPOINT DESCRIPTION</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedEndpoint.description}</p>
            </div>

            {/* Headers, Parameters, Constraints Accordion Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-850">
              {/* Request Headers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>Request Headers</span>
                </h4>
                <div className="bg-slate-900/30 border border-slate-850 rounded-xl p-3.5 space-y-2.5 max-h-[180px] overflow-y-auto custom-scrollbar">
                  {selectedEndpoint.headers.map((h, i) => (
                    <div key={i} className="flex justify-between items-start text-[11px] border-b border-slate-900 last:border-0 pb-1.5 last:pb-0">
                      <div>
                        <div className="font-mono text-slate-200 flex items-center space-x-1.5">
                          <span>{h.name}</span>
                          {h.required && <span className="text-rose-500 font-sans font-bold text-[9px]">*</span>}
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans mt-0.5 leading-normal">{h.description}</div>
                      </div>
                      <span className="bg-slate-950 px-1.5 py-0.5 rounded text-[9px] font-mono text-indigo-300">
                        {h.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Validation Constraints */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <AlertTriangle className="w-4 h-4 text-indigo-400" />
                  <span>Validation Constraints</span>
                </h4>
                <div className="bg-indigo-950/5 border border-indigo-500/10 rounded-xl p-3.5 space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar">
                  {selectedEndpoint.validationRules && selectedEndpoint.validationRules.length > 0 ? (
                    selectedEndpoint.validationRules.map((rule, idx) => {
                      const splitRule = rule.split(':');
                      return (
                        <div key={idx} className="text-[11px] leading-relaxed">
                          <span className="font-bold font-mono text-slate-300 block">{splitRule[0]}:</span>
                          <span className="text-slate-400 block">{splitRule[1]}</span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex items-center space-x-2 text-slate-500 text-[11px]">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>No validation constraint constraints required on this resource query structure.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Query Parameters Table (Only visible when parameters are present) */}
            {selectedEndpoint.queryParams && selectedEndpoint.queryParams.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-850">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <ListFilter className="w-4 h-4 text-indigo-400" />
                  <span>Query Parameters (Pagination, Sort & Filter)</span>
                </h4>
                <div className="border border-slate-850 rounded-xl bg-slate-950 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-900 bg-slate-900/40 text-slate-400 font-mono">
                          <th className="p-2.5 font-bold">Parameter</th>
                          <th className="p-2.5 font-bold">Type</th>
                          <th className="p-2.5 font-bold">Required</th>
                          <th className="p-2.5 font-bold">Description</th>
                          <th className="p-2.5 font-bold">Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300 font-sans">
                        {selectedEndpoint.queryParams.map((qp, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/20">
                            <td className="p-2.5 font-mono text-indigo-300 font-medium">{qp.name}</td>
                            <td className="p-2.5 font-mono text-[10px]">{qp.type}</td>
                            <td className="p-2.5 font-mono text-[10px] font-bold">
                              {qp.required ? <span className="text-rose-400">YES</span> : <span className="text-slate-500">NO</span>}
                            </td>
                            <td className="p-2.5 text-slate-400 leading-normal">{qp.description}</td>
                            <td className="p-2.5 font-mono text-slate-500 text-[10px]">{qp.example || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Code/JSON Payload Switcher Tab */}
            <div className="space-y-3 pt-4 border-t border-slate-850">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-2 gap-3">
                <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-900 text-[11px] font-mono">
                  {selectedEndpoint.requestBody && (
                    <button
                      onClick={() => setActiveTab('request')}
                      id="view-request-tab"
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        activeTab === 'request'
                          ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Request Body JSON
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('success')}
                    id="view-success-tab"
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'success'
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                        : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    Success Response (200 OK)
                  </button>
                  <button
                    onClick={() => setActiveTab('error')}
                    id="view-error-tab"
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'error'
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    RFC 7807 Error Response
                  </button>
                  <button
                    onClick={() => setActiveTab('curl')}
                    id="view-curl-tab"
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'curl'
                        ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    cURL Command
                  </button>
                </div>
                
                {/* Copy JSON Button */}
                <button
                  onClick={() => {
                    let text = '';
                    if (activeTab === 'request') text = selectedEndpoint.requestBody || '';
                    else if (activeTab === 'success') text = selectedEndpoint.responseSuccess;
                    else if (activeTab === 'error') text = selectedEndpoint.responseError;
                    else if (activeTab === 'curl') text = selectedEndpoint.curlExample;
                    handleCopy(text, selectedEndpoint.id + '-' + activeTab);
                  }}
                  className="px-2.5 py-1 text-[10px] bg-slate-900 border border-slate-800 rounded hover:border-slate-750 text-slate-400 hover:text-white transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
                >
                  {copiedText === selectedEndpoint.id + '-' + activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono font-bold">Copied payload</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono">Copy payload</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tab Display Panel */}
              <div className="border border-slate-850 rounded-xl bg-slate-950 p-4 overflow-hidden relative">
                {activeTab === 'request' && selectedEndpoint.requestBody && (
                  <pre className="text-[10.5px] text-indigo-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar select-all">
                    {selectedEndpoint.requestBody}
                  </pre>
                )}
                {activeTab === 'success' && (
                  <pre className="text-[10.5px] text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar select-all">
                    {selectedEndpoint.responseSuccess}
                  </pre>
                )}
                {activeTab === 'error' && (
                  <div className="space-y-4">
                    <pre className="text-[10.5px] text-rose-400 font-mono whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto custom-scrollbar select-all">
                      {selectedEndpoint.responseError}
                    </pre>
                    <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg flex items-start space-x-2.5 text-[10px] leading-relaxed">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-white block font-sans">Strict RFC 7807 Compliance:</span>
                        <span className="text-slate-400 block font-sans mt-0.5">
                          Every error payload yields standard parameter validation arrays under <code className="text-indigo-300 font-mono text-[9px]">invalid_params</code>, distinct schema trace codes, and explicit URI descriptor references.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'curl' && (
                  <pre className="text-[10.5px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto custom-scrollbar select-all">
                    {selectedEndpoint.curlExample}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== OPENAPI FULL YAML MODE ==================== */
        <div className="bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl animate-fadeIn">
          {/* OpenAPI Spec Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-850 pb-5 gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">OpenAPI 3.1.0 Specification</h3>
                <p className="text-xs text-slate-400 font-sans">Full raw YAML representation describing workspace routing architectures.</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(openApiSpecYAML, 'openapi-full-yaml')}
              className="px-4 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg hover:border-slate-750 text-slate-400 hover:text-white transition flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
            >
              {copiedText === 'openapi-full-yaml' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-mono font-bold">Specification copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="font-mono">Copy OpenAPI YAML</span>
                </>
              )}
            </button>
          </div>

          {/* Full YAML Block */}
          <div className="border border-slate-850 rounded-xl bg-slate-950 p-5 overflow-hidden">
            <pre className="text-[10.5px] text-indigo-300 font-mono whitespace-pre-wrap leading-relaxed max-h-[640px] overflow-y-auto custom-scrollbar select-all">
              {openApiSpecYAML}
            </pre>
          </div>

          {/* Guidelines on integrating this specification */}
          <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed font-sans">
            <div className="space-y-1">
              <span className="text-indigo-400 font-bold block">1. CLI MAPPING</span>
              <p className="text-slate-400">Inject this raw YAML structure into active microservices using Swagger or OpenAPI CLI tools to synthesize strong TypeScript models.</p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-6">
              <span className="text-indigo-400 font-bold block">2. MOCK INGESTION</span>
              <p className="text-slate-400">Configure stopgaps with mock utilities (e.g. Prism or Stoplight) to parse execution pathways inside sandbox filesystems instantly.</p>
            </div>
            <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-6">
              <span className="text-indigo-400 font-bold block">3. SEMANTIC VALIDATION</span>
              <p className="text-slate-400">Integrate testing layers ensuring query inputs strictly adhere to validation boundaries defined under OpenAPI schema elements.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
