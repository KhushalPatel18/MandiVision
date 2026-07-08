import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <label className={`flex items-start gap-2.5 cursor-pointer text-left select-none ${className}`}>
        <div className="relative flex items-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className={`
            h-5.5 w-5.5 rounded-lg border bg-white transition-all duration-150 flex items-center justify-center shrink-0
            peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40
            peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white
            ${error ? 'border-rose-400' : 'border-gray-250/80 hover:border-gray-350'}
          `}>
            <svg 
              className="h-3.5 w-3.5 stroke-[3] fill-none stroke-current opacity-0 peer-checked:opacity-100 transition-opacity duration-100" 
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-gray-600 select-none">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
export { Checkbox };
