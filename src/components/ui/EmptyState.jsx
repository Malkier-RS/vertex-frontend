import { Package } from 'lucide-react';

export function EmptyState({ title, description, icon: Icon = Package, action }) {
  return (
    <div className="empty-state">
      {Icon && <Icon size={40} strokeWidth={1.5} style={{ margin: '0 auto 12px', color: '#94a3b8' }} />}
      <h3 style={{ margin: '0 0 8px' }}>{title}</h3>
      {description && <p className="text-muted" style={{ margin: '0 0 16px' }}>{description}</p>}
      {action}
    </div>
  );
}
