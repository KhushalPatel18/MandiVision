import React from 'react';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: { value: string; label: string }[] | string[];
  icon?: React.ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  icon,
  value,
  onChange,
  className = '',
  placeholder,
  disabled,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && (
        <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-4 text-muted pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`
            w-full py-3.5 rounded-2xl bg-white border border-gray-200/90 text-sm font-medium
            focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30
            disabled:bg-gray-50/70 disabled:text-gray-400 transition-all duration-200 cursor-pointer appearance-none
            ${icon ? 'pl-11 pr-4' : 'px-4'}
          `}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => {
            const isString = typeof opt === 'string';
            const optVal = isString ? opt : opt.value;
            const optLabel = isString ? opt : opt.label;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        {/* custom arrow indicator */}
        <div className="absolute right-4 pointer-events-none flex items-center text-muted">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
