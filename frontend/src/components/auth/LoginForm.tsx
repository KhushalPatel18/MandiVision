import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import PasswordInput from './PasswordInput';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import Divider from '../ui/Divider';
import SocialButtons from './SocialButtons';
import { useLogin } from '../../hooks/useLogin';

interface LoginFormProps {
  onToggleMode?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Status and Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const loginMutation = useLogin();
  const isLoading = loginMutation.isPending;

  const validate = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setFormError('');

    if (!email) {
      setEmailError('Email address is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormError('');
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || 'Login failed. Please check your credentials.';
          setFormError(message);
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="login-form-fields"
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="text-left mb-6">
              <h2 className="text-2xl font-extrabold text-text-dark tracking-tight">
                Sign in to MandiVision
              </h2>
              <p className="text-xs font-semibold text-muted mt-1">
                Enter your credentials to access your forecasting account.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-2.5 text-xs text-rose-700 font-medium mb-5">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Address */}
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                icon={<Mail className="h-5 w-5 text-muted" />}
              />

              {/* Password */}
              <PasswordInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <Checkbox
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-bold text-primary hover:text-emerald-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                className="w-full py-3.5 font-bold cursor-pointer"
                icon={isLoading ? (
                  <div className="h-4.5 w-4.5 border-2 border-t-transparent border-white rounded-full animate-spin mr-1.5" />
                ) : <ArrowRight className="h-4 w-4" />}
              >
                {isLoading ? 'Verifying Account...' : 'Sign In'}
              </Button>
            </form>

            <Divider>Or continue with</Divider>

            <SocialButtons isLoading={isLoading} />

            <div className="mt-6 text-center">
              <span className="text-xs font-semibold text-gray-500">
                Don't have an account?{' '}
                {onToggleMode ? (
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="font-bold text-primary hover:text-emerald-700 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    Create Account
                  </button>
                ) : (
                  <Link
                    to="/authform?mode=signup"
                    className="font-bold text-primary hover:text-emerald-700 transition-colors"
                  >
                    Create Account
                  </Link>
                )}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login-form-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-5">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-extrabold text-text-dark">Authentication Secure</h3>
            <p className="text-xs font-semibold text-muted mt-2 max-w-[280px]">
              Access tokens compiled. Redirecting to forecasting dashboard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginForm;
export { LoginForm };
