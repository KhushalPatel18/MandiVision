import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../ui/Input';
import PasswordInput from './PasswordInput';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import Divider from '../ui/Divider';
import SocialButtons from './SocialButtons';
import { useSignup } from '../../hooks/useSignup';

interface SignupFormProps {
  onToggleMode?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);

  // Validation and Status states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [agreeError, setAgreeError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const signupMutation = useSignup();
  const isLoading = signupMutation.isPending;

  const validate = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setAgreeError(false);
    setFormError('');

    if (!name.trim()) {
      setNameError('Full name is required');
      isValid = false;
    }

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

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (!agree) {
      setAgreeError(true);
      setFormError('You must agree to the Terms of Service & Privacy Policy');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormError('');
    signupMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || 'Registration failed. Please try again.';
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
            key="signup-form-fields"
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="text-left mb-6">
              <h2 className="text-2xl font-extrabold text-text-dark tracking-tight">
                Create your Account
              </h2>
              <p className="text-xs font-semibold text-muted mt-1">
                Register to gain access to crop forecasts and APMC insights.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 flex items-start gap-2.5 text-xs text-rose-700 font-medium mb-5">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <Input
                label="Full Name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                icon={<User className="h-5 w-5 text-muted" />}
              />

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

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={confirmPasswordError}
              />

              {/* Agree Checkbox */}
              <div className="pt-1">
                <Checkbox
                  label={
                    <span>
                      I agree to the{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline font-bold">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline font-bold">Privacy Policy</a>
                    </span>
                  }
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  error={agreeError}
                />
              </div>

              {/* Submit Button */}
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
                {isLoading ? 'Registering Account...' : 'Create Account'}
              </Button>
            </form>

            <Divider>Or continue with</Divider>

            <SocialButtons isLoading={isLoading} />

            <div className="mt-6 text-center">
              <span className="text-xs font-semibold text-gray-500">
                Already have an account?{' '}
                {onToggleMode ? (
                  <button
                    type="button"
                    onClick={onToggleMode}
                    className="font-bold text-primary hover:text-emerald-700 transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none"
                  >
                    Sign In
                  </button>
                ) : (
                  <Link
                    to="/authform?mode=login"
                    className="font-bold text-primary hover:text-emerald-700 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="signup-form-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-5">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-extrabold text-text-dark">Account Created Successfully</h3>
            <p className="text-xs font-semibold text-muted mt-2 max-w-[280px]">
              Profile registered. Redirecting to forecasting dashboard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupForm;
export { SignupForm };
