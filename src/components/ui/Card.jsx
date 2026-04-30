export function Card({ children, className = '', interactive = false, ...rest }) {
  const cls = `card ${interactive ? 'card--interactive' : ''} ${className}`.trim();
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}
