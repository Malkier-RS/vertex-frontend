export function PageHero({ title, subtitle, variant = 'dark', children }) {
  return (
    <div className={`page-hero ${variant === 'light' ? 'page-hero--light' : ''}`.trim()}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {children && <div className="page-hero__actions">{children}</div>}
    </div>
  );
}
