export function SectionHeader({ title, subtitle, actions }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="section-header__actions">{actions}</div>}
    </div>
  );
}
