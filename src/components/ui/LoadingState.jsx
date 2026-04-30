import { Loader2 } from 'lucide-react';

export function LoadingState({ label = 'Učitavanje...' }) {
  return (
    <div className="loading-state">
      <Loader2 className="spin" size={32} strokeWidth={1.5} style={{ margin: '0 auto 12px', color: '#0d9488' }} />
      <p className="text-muted" style={{ margin: 0 }}>{label}</p>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.9s linear infinite; display: block; }
      `}</style>
    </div>
  );
}
