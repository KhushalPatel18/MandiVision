import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { getProfileApi } from '../api/auth.api';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { initializeAuth, login, logout, token } = useAuthStore();

  useEffect(() => {
    const bootstrap = async () => {
      // First, restore from localStorage synchronously
      initializeAuth();

      // Then validate the token against the server
      const storedToken = localStorage.getItem('mandivision_token');
      if (storedToken) {
        try {
          const profile = await getProfileApi();
          login(profile, storedToken);
        } catch {
          // Token invalid or server unreachable — keep local session
          // (don't logout if server is down, to support offline-first UX)
          console.warn('Could not validate token against server');
        }
      }
    };

    bootstrap();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>;
};

export default AuthProvider;
