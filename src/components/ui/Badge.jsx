export function Badge({ children, tone = 'neutral', className = '', style }) {
  return <span className={`badge badge--${tone} ${className}`.trim()} style={style}>{children}</span>;
}
