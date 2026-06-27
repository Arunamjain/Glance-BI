import React, { useState, lazy, Suspense } from 'react';
import Header from './shared/components/layout/Header';
import Footer from './shared/components/layout/Footer';

// Code splitting: Lazy load all major layout panels to optimize initial bundle size and FCP
const MarketAnalysisView = lazy(() => import('./features/market/components/MarketAnalysisView'));
const PRDView = lazy(() => import('./features/prd/components/PRDView'));
const TechArchitectureView = lazy(() => import('./features/tech/components/TechArchitectureView'));
const SoftwareArchitectureView = lazy(() => import('./features/software-arch/components/SoftwareArchitectureView'));
const DataflowVisualizerView = lazy(() => import('./features/visualizer/components/DataflowVisualizerView'));
const UXDesignSystemView = lazy(() => import('./features/ux-spec/components/UXDesignSystemView'));
const APISpecView = lazy(() => import('./features/api-spec/components/APISpecView'));
const OSSRepositoryHub = lazy(() => import('./features/oss/components/OSSRepositoryHub'));
const PerfOptimizerHub = lazy(() => import('./features/perf/components/PerfOptimizerHub'));

// Elegant theme-matching skeleton loader for seamless view transition states
function TabSkeleton() {
  return (
    <div className="space-y-6 animate-pulse w-full max-w-7xl mx-auto px-1 py-4" id="view-loading-skeleton">
      <div className="flex items-center space-x-2">
        <div className="h-3 bg-slate-800/80 rounded w-24"></div>
      </div>
      <div className="h-9 bg-slate-800/80 rounded-lg w-1/2"></div>
      <div className="h-4 bg-slate-800/60 rounded w-2/3"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="h-32 bg-slate-800/40 rounded-xl border border-slate-800/60"></div>
        <div className="h-32 bg-slate-800/40 rounded-xl border border-slate-800/60"></div>
        <div className="h-32 bg-slate-800/40 rounded-xl border border-slate-800/60"></div>
      </div>
      <div className="h-64 bg-slate-800/30 rounded-2xl border border-slate-800/40 w-full"></div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'market' | 'prd' | 'tech' | 'software-arch' | 'visualizer' | 'ux-spec' | 'api-spec' | 'oss' | 'perf'>('market');

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-sans" id="applet-root">
      {/* Global Header Layout */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Container with Suspense boundary */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 w-full" id="main-content">
        <Suspense fallback={<TabSkeleton />}>
          {activeTab === 'market' && <MarketAnalysisView />}
          {activeTab === 'prd' && <PRDView />}
          {activeTab === 'tech' && <TechArchitectureView />}
          {activeTab === 'software-arch' && <SoftwareArchitectureView />}
          {activeTab === 'visualizer' && <DataflowVisualizerView />}
          {activeTab === 'ux-spec' && <UXDesignSystemView />}
          {activeTab === 'api-spec' && <APISpecView />}
          {activeTab === 'oss' && <OSSRepositoryHub />}
          {activeTab === 'perf' && <PerfOptimizerHub />}
        </Suspense>
      </main>

      {/* Global Footer Layout */}
      <Footer />
    </div>
  );
}

