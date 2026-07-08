import api from './axios';
import type { LoginRequest, SignupRequest, AuthResponse, User } from '../types/auth.types';

export const loginApi = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/login', data);
  return response.data;
};

export const signupApi = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/api/auth/register', data);
  return response.data;
};

export const getProfileApi = async (): Promise<User> => {
  const response = await api.get<User>('/api/auth/profile');
  return response.data;
};
