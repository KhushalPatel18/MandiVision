import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import type { SignupRequest } from '../types/auth.types';
import type { AxiosError } from 'axios';

export const useSignup = () => {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);

  return useMutation({
    mutationFn: (data: SignupRequest) => signupApi(data),
    onSuccess: (data) => {
      signup(data.user, data.token);
      toast.success('Account created! Redirecting to dashboard...', {
        icon: '🎉',
        duration: 2000,
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message || 'Signup failed. Please try again.';
      toast.error(message);
    },
  });
};
