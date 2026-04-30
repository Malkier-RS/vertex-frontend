import { Search } from 'lucide-react';

export function ToolbarSearch({ label, value, onChange, placeholder, id, 'aria-label': ariaLabel }) {
  return (
    <div className="toolbar-search-field">
      {label && (
        <label className="shop-filters__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="toolbar-search">
        <Search size={18} className="toolbar-search__icon" aria-hidden />
        <input
          id={id}
          type="search"
          className="toolbar-search__input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={ariaLabel || label || placeholder}
        />
      </div>
    </div>
  );
}
