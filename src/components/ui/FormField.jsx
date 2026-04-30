export function FormField({ label, hint, error, children, htmlFor }) {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`.trim()}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {children}
      {error && <span className="form-hint" style={{ color: 'var(--color-danger)' }}>{error}</span>}
      {hint && !error && <span className="form-hint">{hint}</span>}
    </div>
  );
}
