export function Button({ variant = 'primary', size, className = '', type = 'button', ...props }) {
  const v = variant === 'ghost' ? 'btn btn--ghost' : `btn btn--${variant}`;
  const s = size ? `btn--${size}` : '';
  return <button type={type} className={`${v} ${s} ${className}`.trim()} {...props} />;
}
