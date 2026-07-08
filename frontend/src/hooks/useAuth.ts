import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { getProfileApi } from '../api/auth.api';

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, initializeAuth, login, logout } =
    useAuthStore();

  useEffect(() => {
    const restoreSession = async () => {
      initializeAuth();

      const storedToken = localStorage.getItem('mandivision_token');
      if (storedToken) {
        try {
          const profile = await getProfileApi();
          login(profile, storedToken);
        } catch {
          // Token is invalid — clean up
          logout();
        }
      }
    };

    restoreSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { user, token, isAuthenticated, isLoading, logout };
};
