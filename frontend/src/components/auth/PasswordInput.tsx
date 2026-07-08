import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Input from '../ui/Input';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  success?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = 'Password', error, success, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <Input
        ref={ref}
        label={label}
        type={showPassword ? 'text' : 'password'}
        error={error}
        success={success}
        icon={<Lock className="h-5 w-5 text-muted" />}
        className="pr-12"
        suffix={
          <button
            type="button"
            onClick={toggleVisibility}
            className="text-muted hover:text-text-dark focus:outline-none transition-colors duration-150 cursor-pointer flex items-center justify-center"
          >
            {showPassword ? (
              <EyeOff className="h-4.5 w-4.5" />
            ) : (
              <Eye className="h-4.5 w-4.5" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
export { PasswordInput };
