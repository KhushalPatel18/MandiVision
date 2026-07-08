import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import AuthFooter from '../components/auth/AuthFooter';

const AuthFormPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');
  const mode = modeParam === 'signup' ? 'signup' : 'login';

  const toggleMode = () => {
    setSearchParams({ mode: mode === 'login' ? 'signup' : 'login' });
  };

  useEffect(() => {
    document.title = mode === 'signup' 
      ? 'Create Account | MandiVision' 
      : 'Sign In | MandiVision';
  }, [mode]);

  return (
    <AuthLayout mode={mode}>
      {mode === 'login' ? (
        <LoginForm onToggleMode={toggleMode} />
      ) : (
        <SignupForm onToggleMode={toggleMode} />
      )}
      <AuthFooter />
    </AuthLayout>
  );
};

export default AuthFormPage;
export { AuthFormPage };

