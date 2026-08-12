'use client';

import React, { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime error caught by error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0806] text-[#F5F1E8] flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="w-12 h-12 rounded-2xl bg-[#D97706]/10 border border-[#D97706]/40 flex items-center justify-center mb-4 text-[#D97706]">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold font-space mb-2 text-[#F5F1E8]">
        [SYSTEM NOTICE] Runtime Sync Event
      </h2>
      <p className="text-sm text-[#A69A87] max-w-md mb-6 leading-relaxed">
        The application encountered a client module re-sync request. Re-initializing view modules...
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0A0806] text-xs font-bold font-mono transition-all shadow-[0_0_15px_rgba(217,119,6,0.4)]"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Re-Sync Application</span>
      </button>
    </div>
  );
}
