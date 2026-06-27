import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#0F1424]/90 py-8 px-6 mt-16 text-center text-xs text-slate-400" id="applet-footer">
      <div className="max-w-7xl mx-auto space-y-2">
        <p>© 2026 Aperture Analytics OSS. Designed & Spec'd by the Co-founding Team.</p>
        <p className="text-[10px] text-slate-600 font-mono">Principal Architect Blueprint 1.0 • Built with React 19 + Tailwind v4 + TypeScript</p>
      </div>
    </footer>
  );
}
