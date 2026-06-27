import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Layout, 
  Lock, 
  Terminal, 
  Database, 
  RefreshCw, 
  FileText, 
  Eye, 
  Target, 
  AlertTriangle, 
  Smartphone,
  Palette,
  Type,
  Grid,
  Menu,
  Shield,
  Copy,
  Check,
  Info,
  Bell,
  Settings,
  Activity,
  ChevronRight,
  Keyboard,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  FileCode,
  Users,
  Search,
  AlertOctagon,
  X,
  Loader2,
  Trash2,
  LockKeyhole,
  UserPlus,
  LogIn,
  Upload,
  Share2,
  Download,
  Clock,
  Cpu,
  Compass,
  ArrowDown,
  TrendingUp
} from 'lucide-react';
import { uxScreens } from '../../../shared/constants';
import { UXScreenSpec } from '../../../shared/types';
import { userFlowsData, UserFlowSpec } from '../../../shared/constants/userflows';

export default function UXDesignSystemView() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'foundations' | 'components' | 'blueprints' | 'user-flows'>('foundations');
  const [selectedFlowId, setSelectedFlowId] = useState<string>('signup');
  const [activeSimulatedStep, setActiveSimulatedStep] = useState<number>(1);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  // Foundations state
  const [activeFoundationSection, setActiveFoundationSection] = useState<'principles' | 'colors' | 'typography' | 'spacing' | 'grid' | 'accessibility'>('principles');
  
  // Component specification state
  const [activeComponentSection, setActiveComponentSection] = useState<'sidebar_nav' | 'cards' | 'charts' | 'tables' | 'buttons' | 'forms' | 'states'>('buttons');
  
  // Screens spec state
  const [selectedScreen, setSelectedScreen] = useState<UXScreenSpec>(uxScreens[2] || uxScreens[0]); // Default to Dashboard Canvas

  // States inside interactive components
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [buttonStateText, setButtonStateText] = useState<string>('Standard State');
  const [inputVal, setInputVal] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [isEmptyState, setIsEmptyState] = useState<boolean>(false);
  const [isErrorState, setIsErrorState] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const getFlowIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserPlus': return <UserPlus className="w-4 h-4 text-indigo-400" />;
      case 'LogIn': return <LogIn className="w-4 h-4 text-indigo-400" />;
      case 'Database': return <Database className="w-4 h-4 text-indigo-400" />;
      case 'Upload': return <Upload className="w-4 h-4 text-indigo-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-indigo-400" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-indigo-400" />;
      case 'Share2': return <Share2 className="w-4 h-4 text-indigo-400" />;
      case 'Download': return <Download className="w-4 h-4 text-indigo-400" />;
      case 'Users': return <Users className="w-4 h-4 text-indigo-400" />;
      case 'Bell': return <Bell className="w-4 h-4 text-indigo-400" />;
      case 'Clock': return <Clock className="w-4 h-4 text-indigo-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'Settings': return <Settings className="w-4 h-4 text-indigo-400" />;
      default: return <Compass className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getSimulationLog = (flowId: string, stepNum: number) => {
    switch (flowId) {
      case 'signup':
        if (stepNum === 1) return { action: "INPUT_EMAIL", payload: { email: "user@enterprise.com", method: "magic_link" }, response: "DOMAIN_SNIFF_COMPLETE", workspaceGroup: "enterprise" };
        if (stepNum === 2) return { action: "DISPATCH_LINK", payload: { transport: "smtp", token: "jwt_0x4F9B2" }, response: "EMAIL_QUEUED", deliveryLatency: "120ms" };
        return { action: "VALIDATE_TOKEN", payload: { token: "jwt_0x4F9B2", autoOnboard: true }, response: "WORKSPACE_MOUNTED", session: "active_0x11AB" };
      case 'login':
        if (stepNum === 1) return { action: "RESTORE_SESSION", payload: { hasCookie: true }, response: "SESSION_RESTORED", redirect: "/dashboard", latency: "1.2ms" };
        if (stepNum === 2) return { action: "OIDC_TRIGGER", payload: { provider: "okta" }, response: "HANDSHAKE_INITIATED", authUri: "https://okta.com/oauth" };
        return { action: "SET_AUTH_STATE", payload: { token: "jwt_0x33A2" }, response: "DASHBOARD_INITIALIZED", cacheAge: "0ms" };
      case 'connect-db':
        if (stepNum === 1) return { action: "SELECT_ENGINE", payload: { type: "clickhouse" }, response: "CREDENTIAL_FIELDS_READY", defaultPort: 8123 };
        if (stepNum === 2) return { action: "INPUT_METADATA", payload: { host: "ch.prod.internal", db: "analytics" }, response: "WHITELIST_COORDINATES_RENDERED" };
        return { action: "DISPATCH_TEST_PING", payload: { query: "SELECT 1" }, response: "PING_SUCCESSFUL", latency: "12.4ms", rows: 1 };
      case 'upload-csv':
        if (stepNum === 1) return { action: "DRAG_ENTER", payload: { fileName: "q2_sales.csv", sizeBytes: 12400000 }, response: "CLIENT_SIDE_READER_MOUNTED", progress: "0%" };
        if (stepNum === 2) return { action: "MAP_COLUMNS", payload: { timestamp: "DATETIME", amount: "DECIMAL" }, response: "SCHEMA_VALIDATION_PASSED" };
        return { action: "COMMIT_INGESTION", payload: { targetTable: "sales_q2_raw" }, response: "INGESTION_COMPLETED", rowsInserted: 492081, duration: "1.4s" };
      case 'create-dashboard':
        if (stepNum === 1) return { action: "TRIGGER_OVERLAY", payload: { shortcut: "Ctrl+N" }, response: "TEMPLATES_MANIFEST_LOADED", count: 8 };
        if (stepNum === 2) return { action: "APPLY_TEMPLATE", payload: { templateId: "saas_metrics" }, response: "LAYOUT_SYNTHESIZED", widgetsCount: 6 };
        return { action: "MOUNT_CANVAS", payload: { name: "Sales Q2 View", sourceId: "clickhouse" }, response: "LIVE_CANVAS_ACTIVE", routing: "/workspace/dash_991" };
      case 'build-charts':
        if (stepNum === 1) return { action: "DRAG_FIELDS", payload: { x: "created_at", y: "revenue" }, response: "QUERY_AGGREGATION_INITIATED" };
        if (stepNum === 2) return { action: "SELECT_VISUAL", payload: { type: "area_chart" }, response: "SVG_RENDER_COMPLETE", pointsParsed: 1200 };
        return { action: "SAVE_WIDGET", payload: { targetDashboard: "dash_991" }, response: "GRID_METADATA_COMMITTED", cell: "col_span_6" };
      case 'share-dashboard':
        if (stepNum === 1) return { action: "OPEN_MODAL", payload: { viewId: "dash_991" }, response: "SHARING_PARAMETERS_LOADED" };
        if (stepNum === 2) return { action: "SET_EXPIRATION", payload: { duration: "7d", allowedDomain: "stripe.com" }, response: "TOKEN_SIGNED" };
        return { action: "COPY_LINK", payload: { link: "https://aperture.dev/s/token_0x9FA1" }, response: "CLIPBOARD_WRITE_SUCCESS", format: "markdown" };
      case 'export-reports':
        if (stepNum === 1) return { action: "SELECT_EXPORT", payload: { format: "parquet" }, response: "COMPILATION_INITIALIZED" };
        if (stepNum === 2) return { action: "SET_SCOPE", payload: { range: "filtered_view" }, response: "BACKGROUND_JOB_SPAWNED", threadId: "bg_worker_81" };
        return { action: "DELIVER_DOWNLOAD", payload: { downloadId: "rep_992" }, response: "BROWSER_STREAM_SUCCESS", fileSize: "1.4MB" };
      case 'invite-users':
        if (stepNum === 1) return { action: "OPEN_INVITE_MODAL", payload: { workspaceId: "work_0x1" }, response: "INVITE_INTERFACE_MOUNTED" };
        if (stepNum === 2) return { action: "CONFIGURE_ROLE", payload: { emails: ["analyst@org.com"], role: "analyst" }, response: "PERMISSIONS_VERIFIED" };
        return { action: "DISPATCH_EMAILS", payload: { count: 1 }, response: "SSO_INVITATIONS_QUEUED", status: "PENDING_ACCEPT" };
      case 'notifications':
        if (stepNum === 1) return { action: "OBSERVE_BELL", payload: { badgeCount: 3 }, response: "NOTIFICATION_BADGE_ACTIVE" };
        if (stepNum === 2) return { action: "SLIDE_DRAWER", payload: { expanded: true }, response: "NOTIFICATIONS_RENDERED", activeAlerts: 1 };
        return { action: "ACKNOWLEDGE_WARN", payload: { alertId: "pg_conn_fail" }, response: "STATUS_ACKNOWLEDGED", redirect: "/settings/datasources" };
      case 'scheduling':
        if (stepNum === 1) return { action: "EDIT_PERIOD", payload: { base: "every_day" }, response: "WIDGETS_TIMELINE_ACTIVE" };
        if (stepNum === 2) return { action: "VALIDATE_TIMEZONE", payload: { targetTime: "04:00 AM", localTimezone: "America/Los_Angeles" }, response: "PRE_RUN_TIMES_CALCULATED" };
        return { action: "COMMIT_CRON", payload: { cronString: "0 4 * * *" }, response: "CRON_REGISTERED_SUCCESS", nextRun: "2026-06-28T04:00:00-07:00" };
      case 'ai-assistant':
        if (stepNum === 1) return { action: "LAUNCH_CO_PILOT", payload: { initialContext: "postgres" }, response: "DRAWER_VISIBLE" };
        if (stepNum === 2) return { action: "SEND_PROMPT", payload: { text: "Show weekly sales totals" }, response: "SQL_SYNTAX_VALIDATED_STREAMING" };
        return { action: "APPLY_WORKSHEET", payload: { targetEditor: "playground_tab_1" }, response: "SQL_INJECTED_AND_EXECUTED", codeLength: 142 };
      case 'settings':
        if (stepNum === 1) return { action: "OPEN_SETTINGS", payload: { activeSection: "profile" }, response: "SETTINGS_RENDERED" };
        if (stepNum === 2) return { action: "REVEAL_SECRET_KEY", payload: { tokenId: "tok_0x91F" }, response: "KEY_REVEALED_EXPIRES_30S" };
        return { action: "AUTO_SAVE_BLUR", payload: { field: "workspace_name", val: "Aperture Analytics" }, response: "METADATA_SYNCHRONIZED", databaseWrite: "SUCCESS" };
      default:
        return { status: "IDLE" };
    }
  };

  // Mock table data
  const mockTableData = [
    { id: '1081', service: 'clickhouse_prod', query_hash: '0x9E21A4', runtime: '12.4ms', rows: '492,081', status: 'cache_hit' },
    { id: '1082', service: 'duckdb_embedded', query_hash: '0x1F8AC2', runtime: '4.2ms', rows: '94,112', status: 'cache_hit' },
    { id: '1083', service: 'postgres_analytics', query_hash: '0x5C4D81', runtime: '142.8ms', rows: '1,208,443', status: 'live_query' },
    { id: '1084', service: 's3_parquet_logs', query_hash: '0x8B321F', runtime: '38.1ms', rows: '44,091', status: 'live_query' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn" id="ux-specifications-workspace">
      {/* Visual Header */}
      <div className="border-b border-slate-800/80 pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Shield className="w-4 h-4 animate-pulse" />
            <span>Product Design Specification Office</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">Enterprise Analytics Design Book</h2>
          <p className="text-sm text-slate-400 mt-1 font-sans">
            Minimal, dense, and keyboard-first system engineered with the design guidelines of Linear, Vercel, Stripe, and GitHub.
          </p>
        </div>

        {/* Global Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-xs font-mono self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveWorkspaceTab('foundations')}
            id="tab-btn-foundations"
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
              activeWorkspaceTab === 'foundations'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Foundations</span>
          </button>
          <button
            onClick={() => setActiveWorkspaceTab('components')}
            id="tab-btn-components"
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
              activeWorkspaceTab === 'components'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Components</span>
          </button>
          <button
            onClick={() => setActiveWorkspaceTab('blueprints')}
            id="tab-btn-blueprints"
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
              activeWorkspaceTab === 'blueprints'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Screen Blueprints</span>
          </button>
          <button
            onClick={() => {
              setActiveWorkspaceTab('user-flows');
              setSelectedFlowId('signup');
              setActiveSimulatedStep(1);
              setSimulationCompleted(false);
            }}
            id="tab-btn-user-flows"
            className={`px-4 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
              activeWorkspaceTab === 'user-flows'
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/10'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>User Flows (Research)</span>
          </button>
        </div>
      </div>

      {/* ==================== 1. SYSTEM FOUNDATIONS VIEW ==================== */}
      {activeWorkspaceTab === 'foundations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="foundations-section">
          {/* Sidebar Menu for Foundations */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2.5 font-mono block mb-2">Design Guidelines</span>
            {[
              { id: 'principles', label: 'Design Principles', icon: Sparkles },
              { id: 'colors', label: 'Color System', icon: Palette },
              { id: 'typography', label: 'Typography', icon: Type },
              { id: 'spacing', label: 'Spacing Rules', icon: Target },
              { id: 'grid', label: 'Grid Architecture', icon: Grid },
              { id: 'accessibility', label: 'Accessibility & Dark Mode', icon: Shield }
            ].map(sec => {
              const Icon = sec.icon;
              const isActive = activeFoundationSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveFoundationSection(sec.id as any)}
                  id={`found-btn-${sec.id}`}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold font-sans flex items-center space-x-3 transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/90 border-indigo-500/60 text-white shadow-md shadow-indigo-500/5'
                      : 'bg-[#0F1424]/40 border-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Core Foundations Details */}
          <div className="lg:col-span-9 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Design Principles Section */}
            {activeFoundationSection === 'principles' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Core Design Principles</h3>
                  <p className="text-xs text-slate-400 mt-1">Foundational constraints dictating every interaction and render cycle of the platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">01. SUB-100MS INTERACTION TIME</span>
                    <h4 className="text-sm font-bold text-slate-200">Speed is the Ultimate Feature</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Every mouse hover, filter selection, and sidebar collapse must execute immediately. We minimize layout reflows and restrict heavy virtual DOM reconciliations. For datasets exceeding 10k items, rendering falls back seamlessly from SVG to HTML5 Canvas.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">02. KEYBOARD-FIRST ACCESSIBILITY</span>
                    <h4 className="text-sm font-bold text-slate-200">Zero Mouse Dependency for Power Users</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Every panel, filter box, and data control maps to a consistent physical keyboard shortcut layout. Tab indexes are strictly structured, focus rings are highly visible with zero clipping, and primary buttons always have clear keyboard modifiers.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">03. ARCHITECTURAL HONESTY</span>
                    <h4 className="text-sm font-bold text-slate-200">Clean, Uncluttered, Pure Grids</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Absolutely zero tech-larping logs, telemetry lines, or glowing container pings in margins. Layout boundaries are created with precise 1px lines (`#1E293B`) and structural negative space rather than heavy color divisions, gradients, or shadows.
                    </p>
                  </div>

                  <div className="bg-slate-900/30 border border-slate-850 p-5 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">04. CONTEXT-AWARE SYSTEM DENSITY</span>
                    <h4 className="text-sm font-bold text-slate-200">Information Density Suited for Experts</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Avoid oversized consumer cards and generous margins. Data tables, dimensions list selectors, and telemetry indicators utilize tight, compact spacing scales (4px-12px) to maximize visible data points without inducing cognitive fatigue.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Color System Section */}
            {activeFoundationSection === 'colors' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">The Color System</h3>
                  <p className="text-xs text-slate-400 mt-1">High-contrast, eye-safe slate palette strictly matching WCAG AA and APCA requirements.</p>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Canvas Backdrops & Surfaces</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="h-10 w-full bg-[#06080F] border border-slate-900 rounded-md"></div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-white">Default Canvas</span>
                        <code className="text-indigo-300">#06080F</code>
                      </div>
                      <p className="text-[10px] text-slate-500">Root viewport backdrop. Absolute deep void.</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="h-10 w-full bg-[#0D111A] border border-slate-800 rounded-md"></div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-white">Elevated Surface</span>
                        <code className="text-indigo-300">#0D111A</code>
                      </div>
                      <p className="text-[10px] text-slate-500">Main cards, content blocks, sliding panels.</p>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="h-10 w-full bg-[#1A1F2E] border border-slate-700 rounded-md"></div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-bold text-white">Menu Dropdowns</span>
                        <code className="text-indigo-300">#1A1F2E</code>
                      </div>
                      <p className="text-[10px] text-slate-500">Active drop layers, inputs, and contextual menus.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Borders & Separators</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white">Standard structural line</div>
                        <p className="text-[10px] text-slate-500">Separates cards, grids, and sidebar columns.</p>
                      </div>
                      <code className="text-indigo-300 bg-slate-900 px-2 py-1 rounded text-[10px]">#1E293B (Slate 800)</code>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white">Interactive Focus line</div>
                        <p className="text-[10px] text-slate-500">For field active focus states and highlights.</p>
                      </div>
                      <code className="text-indigo-300 bg-slate-900 px-2 py-1 rounded text-[10px]">#6366F1 (Indigo 500)</code>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Semantic & Contextual Accents</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center space-y-2">
                      <div className="h-5 w-full bg-emerald-500/15 border border-emerald-500/20 rounded"></div>
                      <div className="text-xs font-bold text-emerald-400">Success</div>
                      <code className="text-[10px] text-slate-500">#10B981</code>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center space-y-2">
                      <div className="h-5 w-full bg-rose-500/15 border border-rose-500/20 rounded"></div>
                      <div className="text-xs font-bold text-rose-400">Error / Critical</div>
                      <code className="text-[10px] text-slate-500">#F43F5E</code>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center space-y-2">
                      <div className="h-5 w-full bg-amber-500/15 border border-amber-500/20 rounded"></div>
                      <div className="text-xs font-bold text-amber-400">Warning</div>
                      <code className="text-[10px] text-slate-500">#F59E0B</code>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center space-y-2">
                      <div className="h-5 w-full bg-blue-500/15 border border-blue-500/20 rounded"></div>
                      <div className="text-xs font-bold text-blue-400">Info / Blue</div>
                      <code className="text-[10px] text-slate-500">#3B82F6</code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Typography Section */}
            {activeFoundationSection === 'typography' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Typography Guidelines</h3>
                  <p className="text-xs text-slate-400 mt-1">Hierarchical type treatment balancing proportional visual weight, legibility, and technical density.</p>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Standard Font stacks</span>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <div className="border-b border-slate-900 pb-3">
                      <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest block">Primary Font Family (SANS-SERIF)</span>
                      <h4 className="text-base text-slate-200 font-sans mt-1">Inter, system-ui, -apple-system, blinkmacsystemfont, "Segoe UI"</h4>
                      <p className="text-xs text-slate-500 mt-1">Used for all interface controls, headers, body copy, and navigation tabs. Optimal anti-aliasing rendering in all modern browsers.</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest block">Metadata & Code Family (MONOSPACE)</span>
                      <h4 className="text-sm text-amber-400 font-mono mt-1">"JetBrains Mono", "Fira Code", Monaco, Consolas, monospace</h4>
                      <p className="text-xs text-slate-500 mt-1">Used strictly for query parameters, timestamps, numerical columns, code blocks, active keyboard helper triggers, and telemetry status lines.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">The Type Scale</span>
                  <div className="border border-slate-850 rounded-xl bg-slate-950 overflow-hidden font-mono text-xs">
                    <div className="grid grid-cols-12 bg-slate-900/40 p-3 border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                      <div className="col-span-3">Token</div>
                      <div className="col-span-2">Size / Line-height</div>
                      <div className="col-span-7">Application Case</div>
                    </div>
                    {[
                      { token: 'text-xs', size: '12px / 16px', case: 'Monospace labels, tables records list, micro helper, system description.' },
                      { token: 'text-sm', size: '14px / 20px', case: 'General body paragraphs, input fields text, sidebar navigation titles.' },
                      { token: 'text-base', size: '16px / 24px', case: 'Sub-headers, medium modal titles, small informational alerts.' },
                      { token: 'text-lg', size: '18px / 28px', case: 'Bento panel main title headers, quick actions section labels.' },
                      { token: 'text-2xl', size: '24px / 32px', case: 'Metric aggregate large values, page primary titles.' },
                      { token: 'text-3xl', size: '30px / 38px', case: 'Hero pitching head, splash screens landing focus titles.' }
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-12 p-3 border-b border-slate-900 hover:bg-slate-900/10 text-slate-300">
                        <div className="col-span-3 text-indigo-300 font-bold">{row.token}</div>
                        <div className="col-span-2 text-[11px] text-slate-500">{row.size}</div>
                        <div className="col-span-7 font-sans text-xs text-slate-400">{row.case}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Spacing Section */}
            {activeFoundationSection === 'spacing' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Spacing & Density Metrics</h3>
                  <p className="text-xs text-slate-400 mt-1">Our spacing scale is strictly based on a base-4 grid system to maintain absolute symmetry.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <div className="border border-slate-850 rounded-xl bg-slate-950 overflow-hidden font-mono text-xs">
                      <div className="grid grid-cols-12 bg-slate-900/40 p-3 border-b border-slate-900 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                        <div className="col-span-3">Unit Scale</div>
                        <div className="col-span-3">Value (Pixels)</div>
                        <div className="col-span-6">Primary Application Goal</div>
                      </div>
                      {[
                        { scale: 'space-0.5', px: '2px', use: 'Micro borders adjustment, subtle alignment pads.' },
                        { scale: 'space-1', px: '4px', use: 'Inner elements inside list rows, small badges.' },
                        { scale: 'space-2', px: '8px', use: 'Standard button padding, small gap lists.' },
                        { scale: 'space-3', px: '12px', use: 'Nested forms grid gap, list block items.' },
                        { scale: 'space-4', px: '16px', use: 'Card interior padding, general horizontal gap.' },
                        { scale: 'space-6', px: '24px', use: 'Major section breaks, content layouts gutter.' },
                        { scale: 'space-8', px: '32px', use: 'Top header padding, side gutter margin offsets.' }
                      ].map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 p-2.5 border-b border-slate-900 text-slate-300">
                          <div className="col-span-3 text-indigo-300 font-bold">{item.scale}</div>
                          <div className="col-span-3 text-slate-500">{item.px}</div>
                          <div className="col-span-6 font-sans text-xs text-slate-400">{item.use}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-850">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Visual Representation</span>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                        <div className="w-8 h-2 bg-indigo-500 rounded"></div>
                        <span>4px Gap (Input fields details)</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                        <div className="w-12 h-4 bg-indigo-500 rounded"></div>
                        <span>8px Padding (Button surfaces)</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                        <div className="w-16 h-6 bg-indigo-500 rounded"></div>
                        <span>12px Margin (Inner layout elements)</span>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                        <div className="w-24 h-8 bg-indigo-500 rounded"></div>
                        <span>16px Card Margin padding</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid Architecture Section */}
            {activeFoundationSection === 'grid' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">The Grid & Alignments</h3>
                  <p className="text-xs text-slate-400 mt-1">Structured 12-column layouts engineered to preserve perfect visual margins under resizing conditions.</p>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">The 12-Column Division Grid</span>
                  <div className="grid grid-cols-12 gap-2 text-center text-[10px] font-mono text-slate-500">
                    {Array.from({ length: 12 }).map((_, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-indigo-400">
                        col-{idx + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    A universal 12-column grid container (`grid grid-cols-12 gap-6 lg:gap-8`) coordinates content density. Columns adapt linearly as screen width changes, shifting elements into vertical rows on mobile layouts to respect active hit regions.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Unified Layout Templates</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                      <span className="font-bold text-slate-200">Standard Dashboard Grid:</span>
                      <code className="text-indigo-300 block text-[10px] font-mono">cols-12 (Sidebar: col-span-3, Canvas: col-span-9)</code>
                      <p className="text-[11px] text-slate-400">Restricts side elements to 250px-300px, allocating 100% of remaining viewport widths to analytical charts and records lists.</p>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
                      <span className="font-bold text-slate-200">Creation Studio Split:</span>
                      <code className="text-indigo-300 block text-[10px] font-mono">cols-12 (Config: col-span-4, Live Preview: col-span-8)</code>
                      <p className="text-[11px] text-slate-400">Organizes query parameters neatly on the left side, presenting high-fidelity layouts immediately on the right.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accessibility & Dark Mode Section */}
            {activeFoundationSection === 'accessibility' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Accessibility (a11y) & Contrast Balance</h3>
                  <p className="text-xs text-slate-400 mt-1">Our design system mandates that usability is never compromised for visual style. Strictly conforming to WCAG AA parameters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">WCAG AA Contrast Standards</span>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white">Minimum contrast target:</span>
                        <span className="text-emerald-400 font-bold font-mono">✔ 7.5:1 ratio (AA target 4.5:1)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Text element layers always utilize high contrast colors against default canvas backdrops. Hover transitions maintain readable labels, omitting any low contrast light grays or dark blues.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">Keyboard Focus Tracing</span>
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-white">Active Focus styles:</span>
                        <span className="text-indigo-400 font-bold font-mono">outline-none ring-1 ring-indigo-500</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Tabbing into buttons, inputs, or selectors draws a distinct high-contrast Indigo outline, highlighting focus targets to assistive screen readers instantly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-950/10 border border-indigo-500/10 p-5 rounded-xl space-y-2.5">
                  <h4 className="text-sm font-bold text-white">System Accessibility Guidelines Checklist</h4>
                  <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 font-sans">
                    <li>All non-decorative SVG icons include explicit `aria-hidden="true"` attributes to protect screen reader focus.</li>
                    <li>Semantic markup is mandatory: Tables use `thead` and `tbody` tags with appropriate alignment parameters.</li>
                    <li>Modals, side-drawers, and drop menus must trap keyboard focus, dismissing immediately on pressing `Escape`.</li>
                    <li>Color is never used as the sole indicator of system states; warnings or errors always append explicit helper labels or unique status indicator tags.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== 2. COMPONENT SPECIFICATIONS VIEW ==================== */}
      {activeWorkspaceTab === 'components' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="components-section">
          {/* Sidebar Menu for Components */}
          <div className="lg:col-span-3 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2.5 font-mono block mb-2">Platform Components</span>
            {[
              { id: 'buttons', label: 'Buttons', icon: Target },
              { id: 'forms', label: 'Forms & Inputs', icon: Type },
              { id: 'cards', label: 'Cards & Panels', icon: Layout },
              { id: 'sidebar_nav', label: 'Sidebar & Top Nav', icon: Menu },
              { id: 'tables', label: 'Monospace Tables', icon: Database },
              { id: 'charts', label: 'Minimal Charts', icon: Activity },
              { id: 'states', label: 'System States', icon: AlertOctagon }
            ].map(sec => {
              const Icon = sec.icon;
              const isActive = activeComponentSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveComponentSection(sec.id as any)}
                  id={`comp-btn-${sec.id}`}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold font-sans flex items-center space-x-3 transition cursor-pointer ${
                    isActive
                      ? 'bg-slate-800/90 border-indigo-500/60 text-white shadow-md shadow-indigo-500/5'
                      : 'bg-[#0F1424]/40 border-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Component Specifications Details with Interactive Render Previews */}
          <div className="lg:col-span-9 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Buttons Component Specification */}
            {activeComponentSection === 'buttons' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Buttons Spec</h3>
                  <p className="text-xs text-slate-400 mt-1">Our button system relies on solid flat shapes with pixel-perfect borders and precise, crisp interactions.</p>
                </div>

                {/* Interactive Preview Container */}
                <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Interactive Sandbox Preview</span>
                  
                  <div className="flex flex-wrap gap-3 items-center">
                    <button
                      onClick={() => setButtonStateText('Clicked Primary')}
                      id="spec-primary-btn"
                      className="px-4 py-2 text-xs font-bold font-sans rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/10 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    >
                      Primary Ingest (Press Enter)
                    </button>

                    <button
                      onClick={() => setButtonStateText('Clicked Secondary')}
                      id="spec-secondary-btn"
                      className="px-4 py-2 text-xs font-semibold font-sans rounded-lg bg-[#0D111A] border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white cursor-pointer outline-none focus:ring-1 focus:ring-indigo-500 transition"
                    >
                      Secondary Action
                    </button>

                    <button
                      onClick={() => setButtonStateText('Clicked Minimal')}
                      id="spec-minimal-btn"
                      className="px-3 py-1.5 text-xs font-semibold font-sans text-slate-400 hover:text-white hover:bg-slate-900/60 rounded-md cursor-pointer transition"
                    >
                      Minimal Action
                    </button>

                    <button
                      onClick={() => setButtonStateText('Clicked Destructive')}
                      id="spec-destructive-btn"
                      className="px-4 py-2 text-xs font-bold font-sans rounded-lg bg-rose-600/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-500 text-rose-400 hover:text-white cursor-pointer transition"
                    >
                      Delete Source
                    </button>

                    <button
                      disabled
                      id="spec-disabled-btn"
                      className="px-4 py-2 text-xs font-semibold font-sans rounded-lg bg-slate-900 border border-slate-900 text-slate-600 cursor-not-allowed"
                    >
                      Disabled State
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-3 border-t border-slate-900">
                    <span>Active Interactive Feedback:</span>
                    <span className="text-indigo-400 font-bold">{buttonStateText}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Button System Design Parameters</span>
                  <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-3 text-xs leading-relaxed text-slate-300">
                    <p>
                      <strong>1. Primary Action:</strong> Filled with our primary branding accent (<code className="text-indigo-300 bg-slate-950 px-1 rounded font-mono">#4F46E5</code>). Hover triggers a transition to Indigo 500. Shadow-glow is allowed exclusively on primary elements (<code className="text-indigo-300 font-mono">shadow-indigo-600/10</code>).
                    </p>
                    <p>
                      <strong>2. Secondary Outline:</strong> Uses a flat background identical to surface elevations (<code className="text-indigo-300 bg-slate-950 px-1 rounded font-mono">#0D111A</code>), bounded by our standard structural outline (<code className="text-indigo-300 bg-slate-950 px-1 rounded font-mono">#1E293B</code>). Hovering shifts the border to Slate 700 to provide a tactile feeling of depth.
                    </p>
                    <p>
                      <strong>3. Destructive Warning:</strong> Tinted low-opacity rose background. Actively shifts to solid red on hover to prevent accidental trigger clicks.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Forms & Inputs Component Specification */}
            {activeComponentSection === 'forms' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Forms & Input Fields</h3>
                  <p className="text-xs text-slate-400 mt-1">Inputs are designed for fast, frictionless typing with distinct error indicator gutters and automatic saving feedback.</p>
                </div>

                {/* Interactive Preview Container */}
                <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Interactive Sandbox Preview</span>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!inputVal) {
                      setFormError('Workspace URL field is required.');
                      setFormSubmitted(false);
                    } else {
                      setFormError(null);
                      setFormSubmitted(true);
                    }
                  }} className="space-y-3.5 max-w-sm">
                    <div className="space-y-1.5">
                      <label className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        <span>Database Endpoint URL</span>
                        <span className="text-slate-600 text-[9px]">Monospace Input (⌘ L)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="postgresql://user:pass@host:5432/db"
                          value={inputVal}
                          onChange={(e) => {
                            setInputVal(e.target.value);
                            if (e.target.value) setFormError(null);
                          }}
                          id="spec-form-input"
                          className={`w-full bg-[#0D111A] border rounded-lg py-2 pl-3 pr-10 text-xs font-mono text-slate-300 placeholder-slate-600 outline-none focus:ring-1 focus:ring-indigo-500 transition ${
                            formError ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                          }`}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[9px] bg-slate-900 border border-slate-850 px-1 py-0.5 rounded text-slate-500 font-mono">
                          Enter
                        </span>
                      </div>
                      
                      {formError && (
                        <div className="flex items-center space-x-1.5 text-rose-400 text-[10px] font-mono mt-1">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      id="spec-form-submit"
                      className="px-3 py-1.5 text-[11px] font-bold bg-indigo-600 text-white rounded hover:bg-indigo-500 transition cursor-pointer"
                    >
                      Connect Database
                    </button>
                  </form>

                  {formSubmitted && (
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-start space-x-2 text-[11px] text-slate-300 font-sans">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block">Connection Saved</span>
                        <span className="text-slate-400 block mt-0.5">Database parameters committed to workspace Git snapshot metadata successfully.</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2.5 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Form Input Architecture Rules</span>
                  <p>
                    <strong>A. Monospace Labeling:</strong> Inputs are always paired with labels rendered in JetBrains Mono at 10px size. They utilize uppercase tracking-widest metrics to differentiate control fields from generic layout copy.
                  </p>
                  <p>
                    <strong>B. Highlight Rings:</strong> We never use default browser outline rings. On active focus, the field border transitions to Indigo 500, applying a subtle inset ring to clearly define the active cursor target.
                  </p>
                </div>
              </div>
            )}

            {/* Cards & Panels Component Specification */}
            {activeComponentSection === 'cards' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Cards & View Surfaces</h3>
                  <p className="text-xs text-slate-400 mt-1">Cards are structured as flat elevated containers that avoid heavy shadows and unnecessary visual clutter.</p>
                </div>

                {/* Interactive Preview Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#0D111A] border border-slate-800 rounded-2xl shadow-xl hover:border-indigo-500/30 transition duration-150 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">TELEMETRY Snaps</span>
                        <h4 className="text-base font-bold text-white mt-1">Database Cache Ratio</h4>
                      </div>
                      <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono rounded">
                        Active SLA
                      </span>
                    </div>

                    <div className="text-2xl font-extrabold text-white tracking-tight font-sans">
                      98.42% <span className="text-xs text-emerald-400 font-mono font-normal">↑ 1.2%</span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Process cache reads executed locally inside embedded memory regions without network transit.
                    </p>
                  </div>

                  <div className="p-5 bg-[#0D111A] border border-slate-800 rounded-2xl shadow-xl hover:border-rose-500/30 transition duration-150 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">PIPELINE MONITOR</span>
                        <h4 className="text-base font-bold text-white mt-1">Ingestion Failure Rate</h4>
                      </div>
                      <span className="px-1.5 py-0.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-mono rounded">
                        Warning Zone
                      </span>
                    </div>

                    <div className="text-2xl font-extrabold text-white tracking-tight font-sans">
                      0.84% <span className="text-xs text-rose-400 font-mono font-normal">↑ 0.14%</span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                      Sync pipelines interrupted by third-party transactional rate-limiting locks.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2.5 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Panel Styling Constraints</span>
                  <p>
                    <strong>1. Inner Paddings:</strong> Symmetrical `p-5` or `p-6` cards padding. Standardize corner roundings at exactly `rounded-2xl` (16px) to maintain consistent visual alignment across our 12-column grid.
                  </p>
                  <p>
                    <strong>2. Hover affordances:</strong> Cards slightly shift their borders toward the semantic indicator color (e.g., Indigo for normal features, Rose for alerts) to represent clickable target coordinates clearly.
                  </p>
                </div>
              </div>
            )}

            {/* Sidebar & Top Navigation Component Specification */}
            {activeComponentSection === 'sidebar_nav' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Sidebar & Top Navigation Navigation</h3>
                  <p className="text-xs text-slate-400 mt-1">High-density collapsible navigation rails that preserve analytical real estate.</p>
                </div>

                {/* Combined Navigation Wireframe Layout */}
                <div className="border border-slate-850 rounded-2xl bg-[#06080F] overflow-hidden text-xs">
                  {/* Sticky Top Nav Mock */}
                  <div className="border-b border-slate-900 bg-slate-950 p-3 flex justify-between items-center px-4 font-sans text-slate-400">
                    <div className="flex items-center space-x-3">
                      <span className="font-extrabold text-white flex items-center space-x-1.5">
                        <Activity className="w-4 h-4 text-indigo-400 animate-pulse" />
                        <span>Aperture</span>
                      </span>
                      <span className="text-slate-700">/</span>
                      <span className="text-[11px] font-mono text-slate-500 flex items-center space-x-1">
                        <span>us-west-1</span>
                        <ChevronDown className="w-3 h-3" />
                      </span>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Search Indicator */}
                      <div className="bg-[#0D111A] border border-slate-850 px-3 py-1 rounded-lg flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                        <Search className="w-3.5 h-3.5" />
                        <span>Search metrics...</span>
                        <span className="bg-slate-950 px-1 py-0.5 border border-slate-800 rounded font-bold">⌘K</span>
                      </div>

                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-[10px] font-mono text-emerald-400">99.9% SLA</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 min-h-[160px]">
                    {/* Collapsible Left Sidebar Mock */}
                    <div className="col-span-4 bg-[#0D111A] border-r border-slate-900 p-3 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">WORKSPACE CONSOLE</span>
                        <span className="text-[8px] bg-slate-900 border border-slate-850 px-1 rounded text-slate-500 font-mono">⌘B</span>
                      </div>

                      <div className="space-y-1 text-slate-400 font-medium">
                        <div className="flex items-center space-x-2 text-white bg-slate-950 p-1.5 rounded-lg cursor-pointer">
                          <Layout className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Platform Dashboards</span>
                        </div>
                        <div className="flex items-center space-x-2 hover:text-white p-1.5 rounded-lg cursor-pointer">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>SQL Playground</span>
                        </div>
                        <div className="flex items-center space-x-2 hover:text-white p-1.5 rounded-lg cursor-pointer flex justify-between">
                          <div className="flex items-center space-x-2">
                            <Database className="w-3.5 h-3.5" />
                            <span>Warehouse Setup</span>
                          </div>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-8 p-4 flex flex-col justify-center items-center text-center text-slate-500 text-[11px] font-sans">
                      <p>Main canvas workspace region adjusts margins automatically to 100% width when Sidebar collapses via ⌘B trigger.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Monospace Tables Component Specification */}
            {activeComponentSection === 'tables' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Monospace Row-Level Tables</h3>
                  <p className="text-xs text-slate-400 mt-1">Our tables are designed for rapid scanning of numerical and hash values in monospace alignments.</p>
                </div>

                {/* Interactive Preview Container */}
                <div className="border border-slate-850 rounded-2xl bg-slate-950 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px] font-mono">
                      <thead>
                        <tr className="border-b border-slate-900 bg-slate-900/40 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                          <th className="p-3">Query ID</th>
                          <th className="p-3">Analytical Target</th>
                          <th className="p-3">Signature Hash</th>
                          <th className="p-3">Run Latency</th>
                          <th className="p-3">Record count</th>
                          <th className="p-3">Evaluation Code</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300">
                        {mockTableData.map(row => (
                          <tr key={row.id} className="hover:bg-slate-900/30 transition duration-100">
                            <td className="p-3 text-slate-500">{row.id}</td>
                            <td className="p-3 text-white font-sans font-semibold">{row.service}</td>
                            <td className="p-3 text-slate-400 font-mono">{row.query_hash}</td>
                            <td className="p-3 text-indigo-300 font-bold">{row.runtime}</td>
                            <td className="p-3 text-slate-400">{row.rows}</td>
                            <td className="p-3">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                row.status === 'cache_hit' 
                                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                                  : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Table Layout Metrics</span>
                  <p>
                    <strong>A. Text and Number alignments:</strong> Text is always aligned left. Numerical columns, hashes, datetimes, and code statuses utilize strict right-alignment options to maximize row-by-row readability.
                  </p>
                  <p>
                    <strong>B. Sizing Bounds:</strong> Table column partitions include draggable boundaries, helping data analysts resize and read long SQL query logs cleanly.
                  </p>
                </div>
              </div>
            )}

            {/* Charts Component Specification */}
            {activeComponentSection === 'charts' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Minimalist Charts & Visualization</h3>
                  <p className="text-xs text-slate-400 mt-1">We omit heavy legends, colored panels, and 3D graphs, opting for single-pixel lines and micro-crosshairs.</p>
                </div>

                {/* Interactive Chart Preview */}
                <div className="p-5 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>LIVE OLAP COMPRESSION FEED (DUCKDB Snap)</span>
                    <span className="text-indigo-400">Active Crosshair: Enabled</span>
                  </div>

                  {/* Pure CSS Plot mockup representing a high-contrast chart */}
                  <div className="h-28 flex items-end justify-between border-b border-l border-slate-800 pb-1.5 pl-1.5 relative">
                    {/* Grid horizontal guidelines */}
                    <div className="absolute inset-0 border-b border-dashed border-slate-900/60 top-1/3"></div>
                    <div className="absolute inset-0 border-b border-dashed border-slate-900/60 top-2/3"></div>

                    {/* Metric Bars */}
                    {[
                      { h: 'h-1/3', label: '12ms' },
                      { h: 'h-1/2', label: '18ms' },
                      { h: 'h-2/3', label: '24ms' },
                      { h: 'h-5/6', label: '30ms' },
                      { h: 'h-2/5', label: '14ms' },
                      { h: 'h-3/5', label: '21ms' },
                      { h: 'h-full', label: '36ms' }
                    ].map((item, idx) => (
                      <div key={idx} className="w-10 flex flex-col items-center group relative cursor-pointer z-10">
                        <span className="absolute -top-6 text-[9px] font-mono text-indigo-400 opacity-0 group-hover:opacity-100 transition duration-100 bg-slate-900 border border-slate-800 px-1 rounded">
                          {item.label}
                        </span>
                        <div className={`w-full bg-indigo-500/10 border-t-2 border-indigo-500 group-hover:bg-indigo-500/25 transition duration-150 ${item.h}`}></div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] font-mono text-center text-slate-500">Hover over bars to test pixel-perfect contextual tooltips.</p>
                </div>

                <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-2 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Visual Formatting Directives</span>
                  <p>
                    <strong>A. Guide grid lines:</strong> Grid separator alignments utilize single-pixel dashed outlines (`#1E293B`) to maintain canvas clarity without intersecting data trends.
                  </p>
                  <p>
                    <strong>B. Inline tooltips:</strong> We avoid persistent legends. On cursor hover, the chart draws vertical guide lines directly to the coordinate index, plotting values instantly inside a small dark label card.
                  </p>
                </div>
              </div>
            )}

            {/* System States Component Specification */}
            {activeComponentSection === 'states' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">System States (Empty, Loading, Error)</h3>
                  <p className="text-xs text-slate-400 mt-1">Our platform handles asynchronous data triggers with highly descriptive visual states.</p>
                </div>

                {/* State Toggles */}
                <div className="flex space-x-2 bg-slate-950 p-1 rounded-lg border border-slate-850 font-mono text-[10px]">
                  <button
                    onClick={() => {
                      setIsLoadingState(true);
                      setIsEmptyState(false);
                      setIsErrorState(false);
                    }}
                    className={`px-3 py-1 rounded transition ${isLoadingState ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    1. Loading State
                  </button>
                  <button
                    onClick={() => {
                      setIsLoadingState(false);
                      setIsEmptyState(true);
                      setIsErrorState(false);
                    }}
                    className={`px-3 py-1 rounded transition ${isEmptyState ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    2. Empty State
                  </button>
                  <button
                    onClick={() => {
                      setIsLoadingState(false);
                      setIsEmptyState(false);
                      setIsErrorState(true);
                    }}
                    className={`px-3 py-1 rounded transition ${isErrorState ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    3. RFC 7807 Error
                  </button>
                </div>

                {/* State Display Canvas */}
                <div className="p-8 bg-slate-950 border border-slate-850 rounded-2xl min-h-[180px] flex flex-col items-center justify-center text-center animate-fadeIn">
                  
                  {/* Default State */}
                  {!isLoadingState && !isEmptyState && !isErrorState && (
                    <div className="space-y-2 text-slate-500 text-xs">
                      <p>Select a state button above to run real-time visual specifications previews.</p>
                    </div>
                  )}

                  {/* Loading State */}
                  {isLoadingState && (
                    <div className="space-y-4 max-w-sm w-full animate-pulse">
                      <div className="flex items-center space-x-3 justify-center mb-2">
                        <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
                        <span className="text-xs text-slate-400 font-mono">Reconciling localized Parquet caches...</span>
                      </div>
                      
                      {/* Skeleton Lines */}
                      <div className="space-y-2.5">
                        <div className="h-4 bg-slate-900 rounded border border-slate-850 w-full"></div>
                        <div className="h-3 bg-slate-900 rounded border border-slate-850 w-5/6 mx-auto"></div>
                        <div className="h-3 bg-slate-900 rounded border border-slate-850 w-2/3 mx-auto"></div>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {isEmptyState && (
                    <div className="space-y-3 max-w-xs animate-fadeIn">
                      <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                        <X className="w-4.5 h-4.5" />
                      </div>
                      <h4 className="text-sm font-bold text-white">No query results found</h4>
                      <p className="text-[11px] text-slate-400">
                        No transactions match your global filter parameters. Try clearing date selections to query older caches.
                      </p>
                      <button className="px-3 py-1.5 text-[10px] font-mono bg-indigo-600 text-white rounded hover:bg-indigo-500 cursor-pointer transition">
                        Reset Filters (Press C)
                      </button>
                    </div>
                  )}

                  {/* RFC 7807 Error State */}
                  {isErrorState && (
                    <div className="space-y-4 max-w-md text-left bg-rose-500/5 border border-rose-500/10 p-5 rounded-xl animate-fadeIn">
                      <div className="flex items-start space-x-3">
                        <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                            HTTP 422: RFC 7807 Problem details
                          </h4>
                          <span className="text-[10px] text-rose-400 font-mono block">
                            Type: https://api.aperture.sh/v1/errors/invalid_parameters
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-rose-500/10">
                        <p><strong>Detail:</strong> Validation failed during columnar query execution. The requested group-by parameter is not indexed in the active schema catalog.</p>
                      </div>

                      <div className="p-2 bg-slate-950 border border-slate-900 rounded font-mono text-[9px] text-slate-400 flex justify-between">
                        <span>Trace ID: err_trace_8f231d</span>
                        <span className="text-indigo-400 cursor-pointer font-bold hover:underline" onClick={() => triggerCopy('err_trace_8f231d', 'error-trace')}>
                          {copiedText === 'error-trace' ? 'Copied' : 'Copy Trace'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ==================== 3. SCREEN-BY-SCREEN DIRECTORY ==================== */}
      {activeWorkspaceTab === 'blueprints' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="blueprints-section">
          {/* Sidebar Menu - Selecting Screens */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">Screen Specification Index</h3>
            
            <div className="space-y-2 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar">
              {uxScreens.map((screen) => {
                const ScreenIcon = screen.icon;
                const isSelected = selectedScreen.id === screen.id;
                return (
                  <button
                    key={screen.id}
                    id={`blueprint-btn-${screen.id}`}
                    onClick={() => setSelectedScreen(screen)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-500 text-white shadow-md shadow-indigo-500/5'
                        : 'bg-[#0F1424]/40 border-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                        <ScreenIcon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="font-semibold text-xs truncate font-sans">{screen.name}</div>
                        <div className="text-[9px] uppercase tracking-wider text-slate-500 font-medium font-mono">{screen.category}</div>
                      </div>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'translate-x-1 text-indigo-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Screen Blueprints Panel */}
          <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl relative">
            
            {/* Screen Header Details */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 shadow-lg shrink-0">
                  {React.createElement(selectedScreen.icon, { className: "w-6 h-6" })}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono">{selectedScreen.category}</span>
                  <h3 className="text-xl font-extrabold text-white tracking-tight mt-0.5">{selectedScreen.name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-start md:self-center bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold font-mono">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>SPEC-VERIFIED</span>
              </div>
            </div>

            {/* Core Design Concept */}
            <div className="space-y-2 bg-slate-900/40 border border-slate-800 p-5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">CORE SPECIFICATION CONCEPT</span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">{selectedScreen.concept}</p>
            </div>

            {/* INTERACTIVE TEXT WIREFRAME COMPILER (Visual purely with CSS grids) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <Layout className="w-4 h-4 text-indigo-400" />
                <span>Visual Layout Anatomy Wireframe (Pure CSS CSS grids)</span>
              </h4>

              <div className="border border-slate-800 rounded-2xl bg-slate-950 p-1 overflow-hidden">
                {/* Landing Screen Wireframe */}
                {selectedScreen.id === 'landing' && (
                  <div className="p-4 space-y-4 font-sans text-xs animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                      <div className="font-bold flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Aperture</span>
                      </div>
                      <div className="flex space-x-4 text-slate-500 text-[10px] font-medium">
                        <span>Changelog</span>
                        <span>Docs</span>
                        <span className="text-white hover:text-indigo-400 cursor-pointer transition">Sign In →</span>
                      </div>
                    </div>
                    
                    <div className="text-center py-8 space-y-3 max-w-lg mx-auto">
                      <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[9px] font-mono border border-indigo-500/20 uppercase tracking-widest">
                        Aperture Ingest Daemon
                      </span>
                      <h4 className="text-base font-extrabold text-white leading-tight">DuckDB Analytical Power, Locally Orchestrated.</h4>
                      <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                        Compile business aggregates into highly compressed, local Parquet stores with sub-30ms execution profiles.
                      </p>
                      <div className="flex justify-center space-x-2 pt-2">
                        <span className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded text-[10px] transition cursor-pointer shadow-md shadow-indigo-600/10">
                          Start Sandbox (Press G)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Login Screen Wireframe */}
                {selectedScreen.id === 'login' && (
                  <div className="p-6 flex flex-col justify-center items-center min-h-[200px] animate-fadeIn">
                    <div className="w-full max-w-xs space-y-4 text-xs">
                      <div className="text-center space-y-1.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <h4 className="font-extrabold text-white text-sm">Welcome to Aperture</h4>
                        <p className="text-[10px] text-slate-500">Magic passwordless authentication links</p>
                      </div>

                      <div className="space-y-2">
                        <div className="p-2 bg-[#0D111A] border border-slate-850 rounded flex justify-between items-center text-slate-400">
                          <span>workplace@company.com</span>
                          <span className="text-[9px] bg-slate-900 text-slate-500 px-1 py-0.5 rounded font-mono">⌘L</span>
                        </div>
                        <span className="block w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded text-center cursor-pointer text-[10px]">
                          Send Link
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dashboard Canvas Wireframe */}
                {selectedScreen.id === 'dashboard' && (
                  <div className="p-4 space-y-4 font-sans text-xs animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2.5">
                      <h4 className="font-bold text-white text-xs">Active Telemetry Cluster</h4>
                      <span className="px-2 py-0.5 bg-slate-900 border border-slate-850 rounded text-[9px] text-slate-400">
                        Last 24 Hours
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { title: 'Ingestion Speed', val: '84.2K rows/s' },
                        { title: 'Cache Hit Rate', val: '98.4%' },
                        { title: 'Avg Latency', val: '14.2ms' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-[#0D111A] border border-slate-850 rounded-xl">
                          <span className="text-[8px] uppercase tracking-wider text-slate-500 font-bold font-mono">{item.title}</span>
                          <div className="font-extrabold text-white text-xs mt-0.5">{item.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border border-slate-850 bg-slate-900/10 rounded-xl h-20 flex items-end justify-between">
                      <div className="h-10 w-1/4 bg-indigo-500/10 border-t border-indigo-500"></div>
                      <div className="h-14 w-1/4 bg-indigo-500/15 border-t border-indigo-500"></div>
                      <div className="h-8 w-1/4 bg-indigo-500/5 border-t border-indigo-500"></div>
                      <div className="h-16 w-1/4 bg-indigo-500/20 border-t border-indigo-500"></div>
                    </div>
                  </div>
                )}

                {/* Sidebar Wireframe */}
                {selectedScreen.id === 'sidebar' && (
                  <div className="grid grid-cols-12 min-h-[180px] animate-fadeIn text-xs">
                    <div className="col-span-5 bg-[#0D111A] border-r border-slate-900 p-3 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <span className="font-bold text-white">Aperture Devs</span>
                        <span className="text-[8px] text-slate-500 font-mono">⌘B</span>
                      </div>
                      <div className="space-y-1 text-slate-500 font-semibold text-[10px]">
                        <div className="p-1 bg-slate-950 rounded text-white flex items-center space-x-1.5">
                          <Activity className="w-3 h-3 text-indigo-400" />
                          <span>Telemetry</span>
                        </div>
                        <div className="p-1">SQL Editor</div>
                        <div className="p-1">Data Warehouses</div>
                      </div>
                    </div>
                    <div className="col-span-7 bg-[#06080F] p-4 flex items-center justify-center text-center text-slate-500 text-[10px]">
                      Main viewport occupies 100% space when Sidebar slides out via ⌘B.
                    </div>
                  </div>
                )}

                {/* Chart Builder Wireframe */}
                {selectedScreen.id === 'chart-builder' && (
                  <div className="grid grid-cols-12 gap-2 text-[10px] p-3 min-h-[180px] animate-fadeIn">
                    <div className="col-span-5 bg-[#0D111A] border border-slate-850 p-3 rounded-xl space-y-3">
                      <span className="text-[8px] uppercase font-bold text-slate-500 font-mono tracking-wider block">Dimensions catalog</span>
                      <div className="space-y-1">
                        <div className="p-1.5 bg-slate-950 border border-slate-900 rounded text-slate-300">
                          X-Axis: timestamp
                        </div>
                        <div className="p-1.5 bg-slate-950 border border-slate-900 rounded text-slate-300">
                          Y-Axis: query_lat
                        </div>
                      </div>
                    </div>
                    <div className="col-span-7 bg-slate-900/10 border border-slate-850 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[8px] font-mono text-slate-500">PREVIEW PORT</span>
                      <div className="h-16 flex items-end space-x-1.5 border-b border-l border-slate-900 pb-1">
                        <div className="w-1/4 bg-indigo-500/10 h-8"></div>
                        <div className="w-1/4 bg-indigo-500/20 h-12"></div>
                        <div className="w-1/4 bg-indigo-500/5 h-4"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SQL Playground Wireframe */}
                {selectedScreen.id === 'sql-editor' && (
                  <div className="p-3 bg-slate-950 text-[10px] font-mono text-slate-400 space-y-3 animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                      <span className="text-white">query_logs.sql</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1 py-0.5 rounded">
                        Run (⌘ Enter)
                      </span>
                    </div>
                    <div className="text-slate-300 space-y-1 py-1">
                      <p><span className="text-indigo-400 font-bold">SELECT</span> region, <span className="text-indigo-400 font-bold">avg</span>(latency)</p>
                      <p><span className="text-indigo-400 font-bold">FROM</span> telemetry_cache</p>
                      <p><span className="text-indigo-400 font-bold">GROUP BY</span> region;</p>
                    </div>
                  </div>
                )}

                {/* AI Console Drawer Wireframe */}
                {selectedScreen.id === 'ai-assistant' && (
                  <div className="grid grid-cols-12 min-h-[180px] text-[10px] animate-fadeIn">
                    <div className="col-span-5 bg-slate-900/10 flex items-center justify-center text-slate-500 p-2 text-center">
                      Main dashboard elements are overlayed by sliding panels when ⌘K is focused.
                    </div>
                    <div className="col-span-7 bg-[#0D111A] border-l border-slate-900 p-3 flex flex-col justify-between">
                      <span className="text-[9px] font-mono font-bold text-white block pb-1 border-b border-slate-900">
                        Aperture AI Copilot
                      </span>
                      <div className="bg-slate-950 p-2 rounded border border-slate-900 text-slate-400 leading-relaxed text-[9px]">
                        "Write a query calculating cumulative cache hit rates..."
                      </div>
                      <div className="p-1 bg-slate-950 border border-slate-900 rounded text-slate-600 font-mono text-[9px]">
                        Ask Copilot...
                      </div>
                    </div>
                  </div>
                )}

                {/* Workspace Settings Wireframe */}
                {selectedScreen.id === 'settings' && (
                  <div className="grid grid-cols-12 gap-3 p-3 min-h-[180px] text-[10px] animate-fadeIn">
                    <div className="col-span-4 bg-slate-900/20 p-2 rounded-xl text-slate-500 space-y-1 border border-slate-900">
                      <div className="p-1 bg-slate-950 rounded text-white">General Config</div>
                      <div className="p-1">API Credentials</div>
                    </div>
                    <div className="col-span-8 bg-[#0D111A] border border-slate-850 rounded-xl p-3 space-y-2">
                      <h4 className="font-bold text-white">Cache watermark rules</h4>
                      <div className="flex justify-between items-center text-[9px] text-slate-400">
                        <span>Auto sync cache watermark</span>
                        <span className="px-1.5 py-0.5 bg-slate-950 border border-slate-900 rounded font-mono text-indigo-300">
                          30 Seconds
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Data Source Hub Wireframe */}
                {selectedScreen.id === 'data-source' && (
                  <div className="p-4 space-y-3 text-xs animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                      <span className="font-bold text-white text-xs">Connected Warehouses</span>
                      <span className="text-[9px] text-indigo-400 font-mono">Press N for New</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-[#0D111A] border border-slate-850 rounded-xl space-y-1">
                        <div className="font-bold text-white flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>prod_clickhouse_cloud</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono">Sync Interval: 1h • SLA: 100%</p>
                      </div>
                      <div className="p-3 bg-[#0D111A] border border-slate-850 rounded-xl space-y-1">
                        <div className="font-bold text-white flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>regional_postgres_db</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono">Sync Interval: 24h • SLA: 100%</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Import Wizard Wireframe */}
                {selectedScreen.id === 'import-wizard' && (
                  <div className="p-4 space-y-3 text-xs animate-fadeIn">
                    <div className="flex justify-between text-[9px] font-mono text-slate-500 pb-1.5 border-b border-slate-900">
                      <span className="text-indigo-400">1. CHOOSE FILES</span>
                      <span>2. DEFINE ALIGNMENT</span>
                    </div>
                    <div className="border border-dashed border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-6 text-center space-y-1">
                      <h4 className="font-bold text-white text-[11px]">Drag columnar .parquet or .csv files here</h4>
                      <p className="text-[9px] text-slate-500">Max size single transaction: 1.2GB</p>
                    </div>
                  </div>
                )}

                {/* Share Workspace Wireframe */}
                {selectedScreen.id === 'share-dashboard' && (
                  <div className="p-4 flex items-center justify-center min-h-[160px] animate-fadeIn">
                    <div className="w-full max-w-sm bg-[#0D111A] border border-slate-800 rounded-2xl p-4 space-y-3">
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Invite Workspace Members</span>
                      <div className="flex space-x-2">
                        <div className="flex-grow p-1.5 bg-slate-950 border border-slate-850 rounded text-[10px] text-slate-600">
                          teammate@company.com
                        </div>
                        <span className="px-3 py-1.5 bg-indigo-600 text-white rounded text-[10px] font-bold">Invite</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Export Studio Wireframe */}
                {selectedScreen.id === 'export' && (
                  <div className="grid grid-cols-12 gap-3 p-3 min-h-[180px] text-[10px] animate-fadeIn">
                    <div className="col-span-5 bg-[#0D111A] border border-slate-850 p-2.5 rounded-xl space-y-1.5 text-slate-400">
                      <span className="text-[8px] font-mono font-bold text-slate-500 block uppercase tracking-wider">Formats studio</span>
                      <div className="p-1 bg-indigo-600/10 border border-indigo-500/25 rounded text-white">
                        High-Fidelity PDF
                      </div>
                      <div className="p-1 bg-slate-950 border border-slate-900 rounded">
                        Raw CSV stream
                      </div>
                    </div>
                    <div className="col-span-7 bg-[#06080F] border border-slate-850 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[8px] text-slate-500">A4 PAPER PREVIEW MODEL</span>
                      <div className="w-16 h-20 bg-slate-950 border border-indigo-500/20 shadow-xl rounded mx-auto p-1.5 space-y-1">
                        <div className="h-1.5 w-8 bg-slate-900 rounded"></div>
                        <div className="h-8 w-full bg-indigo-500/5 border border-indigo-500/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dark Mode Specifications Wireframe */}
                {selectedScreen.id === 'dark-mode' && (
                  <div className="p-4 space-y-3 text-xs animate-fadeIn">
                    <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase tracking-widest">
                      CONTRAST-BALANCED HEX CODE TILES
                    </span>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                        <div className="h-4 bg-[#06080F] rounded border border-slate-900 mb-1"></div>
                        <span className="text-white block">#06080F</span>
                      </div>
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                        <div className="h-4 bg-[#0D111A] rounded border border-slate-900 mb-1"></div>
                        <span className="text-white block">#0D111A</span>
                      </div>
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                        <div className="h-4 bg-[#1E293B] rounded border border-slate-900 mb-1"></div>
                        <span className="text-white block">#1E293B</span>
                      </div>
                      <div className="p-2 bg-slate-950 border border-slate-850 rounded-xl">
                        <div className="h-4 bg-[#818CF8] rounded border border-slate-900 mb-1"></div>
                        <span className="text-white block">#818CF8</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Responsive Wireframe */}
                {selectedScreen.id === 'mobile' && (
                  <div className="p-4 flex justify-center items-center min-h-[220px] animate-fadeIn">
                    {/* Device bezel mockup */}
                    <div className="w-36 h-48 bg-slate-950 border-4 border-slate-900 rounded-3xl relative shadow-2xl flex flex-col justify-between text-[8px] overflow-hidden font-sans">
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-slate-900 rounded-full z-10"></div>
                      <div className="bg-[#0D111A] border-b border-slate-900 pt-4 pb-1 px-2 flex justify-between items-center text-slate-500 font-bold">
                        <span className="text-white">Aperture Ingest</span>
                        <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                      </div>
                      <div className="flex-grow p-2 space-y-1 overflow-y-auto">
                        <div className="p-1 bg-slate-900 border border-slate-850 rounded space-y-0.5">
                          <span className="text-[6px] text-slate-500">Pipeline latency</span>
                          <div className="font-extrabold text-white">14.2ms</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Layout Anatomy & Style Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Layout Anatomy breakdown</span>
                </h4>
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {selectedScreen.anatomyDescription}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>Typography & Colors Pairing rules</span>
                </h4>
                <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                  {selectedScreen.typographyAndColors}
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts for Screen */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <Keyboard className="w-4 h-4 text-indigo-400" />
                <span>Screen Keyboard Shortcuts</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedScreen.keyboardShortcuts.map((sh, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 border border-slate-900 rounded-lg flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-400">{sh.action}</span>
                    <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded font-bold">
                      {sh.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edge Cases & Usability */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <AlertOctagon className="w-4 h-4 text-indigo-400" />
                <span>Usability Edge cases</span>
              </h4>
              <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-2">
                {selectedScreen.usabilityEdgeCases.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-400 text-xs font-bold font-mono">•</span>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Responsive Adaptation Rules */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-2 font-mono">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Handheld responsive adaptation rules</span>
              </h4>
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed font-sans">
                {selectedScreen.mobileResponsive}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ==================== 4. RESEARCHED USER FLOWS VIEW ==================== */}
      {activeWorkspaceTab === 'user-flows' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn" id="user-flows-section">
          {/* Left Sidebar - Flows Directory */}
          <div className="lg:col-span-4 space-y-2 max-h-[850px] overflow-y-auto pr-2 custom-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2.5 font-mono block mb-2">
              Analyzed Flows ({userFlowsData.length})
            </span>
            {userFlowsData.map(flow => {
              const isSelected = selectedFlowId === flow.id;
              return (
                <button
                  key={flow.id}
                  onClick={() => {
                    setSelectedFlowId(flow.id);
                    setActiveSimulatedStep(1);
                    setSimulationCompleted(false);
                    setCopiedText(null);
                  }}
                  id={`flow-btn-${flow.id}`}
                  className={`w-full text-left p-3.5 rounded-xl border flex flex-col transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/95 border-indigo-500/60 text-white shadow-lg shadow-indigo-500/5'
                      : 'bg-[#0F1424]/40 border-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800/20'
                  }`}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-900 text-slate-500'}`}>
                      {getFlowIcon(flow.iconName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold font-sans truncate">{flow.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">{flow.objective}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800/40 w-full text-[9px] font-mono text-slate-400">
                    <span className="text-indigo-400 font-semibold">{flow.cognitiveLoadReduction}</span>
                    <span className="text-slate-500">{flow.interactionMetrics.averageTimeToComplete}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Area - Detailed UX Spec of Chosen Flow */}
          {(() => {
            const currentFlow = userFlowsData.find(f => f.id === selectedFlowId);
            if (!currentFlow) return null;
            return (
              <div className="lg:col-span-8 bg-[#0F1424] border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl relative overflow-hidden">
                {/* Header Block */}
                <div className="border-b border-slate-800 pb-5">
                  <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono">
                    <Compass className="w-4 h-4" />
                    <span>Usability Flow Chart Spec</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-1.5 tracking-tight flex items-center space-x-2">
                    <span>{currentFlow.name}</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 font-sans italic leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                    "{currentFlow.objective}"
                  </p>
                </div>

                {/* Usability Bento Matrix Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col justify-between space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Cognitive Impact</span>
                    <span className="text-base font-extrabold text-emerald-400 tracking-tight font-sans">
                      {currentFlow.cognitiveLoadReduction.split(' ')[0]}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-snug">Reduction in friction parameters</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col justify-between space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Duration Target</span>
                    <span className="text-base font-extrabold text-white tracking-tight font-sans">
                      {currentFlow.interactionMetrics.averageTimeToComplete}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-snug">Average speed to success</p>
                  </div>

                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl flex flex-col justify-between space-y-1.5">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Physical Input Cost</span>
                    <span className="text-base font-extrabold text-indigo-400 tracking-tight font-sans">
                      {currentFlow.interactionMetrics.clicksRequired} Click{currentFlow.interactionMetrics.clicksRequired > 1 ? 's' : ''}
                    </span>
                    <p className="text-[10px] text-slate-400 leading-snug">Average interactive input actions</p>
                  </div>
                </div>

                {/* UX Researcher's Thesis Section */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Usability Thesis (Why This Works)</span>
                  </h4>
                  <div className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl space-y-3">
                    <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                      {currentFlow.usabilityThesis}
                    </p>
                    <div className="space-y-2 pt-2 border-t border-slate-800/60">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Key Friction Mitigation Measures:</span>
                      <ul className="space-y-1.5">
                        {currentFlow.whyItWorks.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-[11px] text-slate-400 font-sans">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Vertical Interactive Step Node Path */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center space-x-2">
                    <Activity className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Interactive Flow Simulator Sequence</span>
                  </h4>
                  
                  <div className="relative pl-6 space-y-5 border-l border-slate-850">
                    {currentFlow.steps.map((st) => {
                      const isActive = activeSimulatedStep === st.stepNumber;
                      return (
                        <div key={st.stepNumber} className="relative">
                          {/* Left node dot marker */}
                          <div className={`absolute -left-9 top-1.5 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold font-mono transition-all ${
                            isActive
                              ? 'bg-indigo-600 border-indigo-400 text-white scale-110 shadow-lg shadow-indigo-600/40'
                              : activeSimulatedStep > st.stepNumber
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                                : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}>
                            {activeSimulatedStep > st.stepNumber ? <Check className="w-3 h-3" /> : st.stepNumber}
                          </div>

                          {/* Step Content Card */}
                          <div className={`p-4 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-[#151B2E] border-indigo-500/50 shadow-md'
                              : 'bg-slate-950/20 border-slate-850 opacity-60'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-bold text-white font-sans">{st.title}</span>
                              <span className="text-[9px] font-mono bg-slate-900 px-1.5 py-0.5 border border-slate-850 rounded text-slate-400">
                                Step {st.stepNumber} of {currentFlow.steps.length}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-2.5 border-t border-slate-850">
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">Actor Action</span>
                                <p className="text-[11px] text-slate-200 font-sans">{st.actorAction}</p>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block">System Automation Response</span>
                                <p className="text-[11px] text-slate-300 font-mono bg-slate-950/40 px-2 py-1 rounded border border-slate-900">{st.systemResponse}</p>
                              </div>
                            </div>

                            <p className="text-[10px] text-slate-500 font-sans mt-2.5 leading-relaxed italic border-t border-slate-900/40 pt-2">
                              <strong>Usability Impact:</strong> {st.usabilityDetail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Simulation Controls & Live Logging Console */}
                <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Flow Sandbox Integration Simulator</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">Step through this flow sequence as a UX researcher to verify active system latency and interface states.</p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setActiveSimulatedStep(prev => prev > 1 ? prev - 1 : 1);
                          setSimulationCompleted(false);
                        }}
                        disabled={activeSimulatedStep === 1}
                        className={`px-3 py-1 text-xs font-mono rounded border ${
                          activeSimulatedStep === 1
                            ? 'bg-slate-900 border-slate-900 text-slate-700 cursor-not-allowed'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white cursor-pointer'
                        }`}
                      >
                        ← Prev Step
                      </button>

                      <button
                        onClick={() => {
                          if (activeSimulatedStep < currentFlow.steps.length) {
                            setActiveSimulatedStep(prev => prev + 1);
                          } else {
                            setSimulationCompleted(true);
                          }
                        }}
                        className="px-3 py-1 text-xs font-bold font-sans bg-indigo-600 hover:bg-indigo-500 text-white rounded shadow-md shadow-indigo-600/15 cursor-pointer transition"
                      >
                        {activeSimulatedStep === currentFlow.steps.length ? 'Finalize Flow' : 'Next Step →'}
                      </button>

                      <button
                        onClick={() => {
                          setActiveSimulatedStep(1);
                          setSimulationCompleted(false);
                        }}
                        className="px-2 py-1 text-xs text-slate-500 hover:text-slate-300 font-mono cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Simulation Output Terminal */}
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl font-mono text-[10.5px] space-y-2.5 relative">
                    <div className="absolute right-3 top-3 flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${simulationCompleted ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500 animate-pulse'}`}></span>
                      <span className="text-[9px] text-slate-500 uppercase font-bold">
                        {simulationCompleted ? 'Flow Finalized' : `Simulation Active`}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-slate-500 border-b border-slate-900 pb-2">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                      <span>UX_STATE_SIMULATOR_TELEMETRY</span>
                    </div>

                    <div className="space-y-1.5 text-slate-300">
                      <div><span className="text-slate-600">&gt; CURRENT_SEQUENCE_NAME:</span> <span className="text-white">"{currentFlow.name}"</span></div>
                      <div><span className="text-slate-600">&gt; SEQUENCE_REDUCTION_SCORE:</span> <span className="text-emerald-400 font-bold">"{currentFlow.cognitiveLoadReduction}"</span></div>
                      
                      <div className="mt-3 text-slate-600">STATE_SNAPSHOT:</div>
                      <pre className="text-indigo-300 bg-slate-900/50 p-2.5 rounded border border-slate-900 overflow-x-auto custom-scrollbar leading-relaxed">
                        {JSON.stringify(getSimulationLog(currentFlow.id, activeSimulatedStep), null, 2)}
                      </pre>
                    </div>

                    {simulationCompleted && (
                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-center space-x-2 text-[11px] text-slate-300 font-sans mt-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-white">User Flow Simulation Verified.</strong> 
                          <span className="text-slate-400 ml-1">Cognitive barriers mitigated successfully. Flow respects keyboard focus rules and keeps clicks under {currentFlow.interactionMetrics.clicksRequired}.</span>
                        </div>
                      </div>
                    )}
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
