import { api } from '@/services/api/api';
import type { AuthUser } from '@/services/auth/session';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export const LoginService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', payload);
    return response.data;
  },
};
