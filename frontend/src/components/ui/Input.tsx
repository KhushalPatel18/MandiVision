import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, icon, helperText, className = '', disabled, ...props }, ref) => {
    const isError = !!error;

    return (
      <div className="flex flex-col w-full text-left">
        {label && (
          <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-4 text-muted flex items-center justify-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              w-full py-3.5 rounded-2xl bg-white border text-sm font-medium transition-all duration-200
              placeholder-gray-400 text-text-dark focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-50/70 disabled:text-gray-400 disabled:cursor-not-allowed
              ${icon ? 'pl-11 pr-4' : 'px-4'}
              ${isError 
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200/50' 
                : success 
                  ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-200/50' 
                  : 'border-gray-200/90 focus:border-primary focus:ring-primary/20'
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <span className="text-[11px] font-bold text-rose-500 mt-1.5 leading-none">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-[10px] font-semibold text-muted mt-1.5 leading-none">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
export { Input };
