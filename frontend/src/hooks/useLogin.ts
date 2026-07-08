import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import type { LoginRequest } from '../types/auth.types';
import type { AxiosError } from 'axios';

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success('Welcome back! Redirecting to dashboard...', {
        icon: '🌾',
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    },
  });
};
