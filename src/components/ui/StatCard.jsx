export function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="row-flex" style={{ justifyContent: 'space-between' }}>
        <span className="stat-card__label">{label}</span>
        {Icon && <Icon size={18} color="#94a3b8" />}
      </div>
      <div className="stat-card__value">{value}</div>
    </div>
  );
}
