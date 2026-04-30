import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormField } from './FormField.jsx';

export function SelectField({
  label,
  hint,
  error,
  htmlFor,
  id,
  value,
  onChange,
  options,
  emptyLabel = null,
  disabled,
  required,
  className,
  wrapClassName
}) {
  const uid = useId();
  const fid = id || htmlFor || `sel-${uid.replace(/:/g, '')}`;

  const normalized = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));

  return (
    <FormField label={label} hint={hint} error={error} htmlFor={fid}>
      <div className={`form-select-wrap ${wrapClassName || ''}`.trim()}>
        <select
          id={fid}
          className={`form-select ${className || ''}`.trim()}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          {emptyLabel != null && <option value="">{emptyLabel}</option>}
          {normalized.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="form-select__chevron" aria-hidden />
      </div>
    </FormField>
  );
}
