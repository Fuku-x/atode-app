import apiClient from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  // ログイン
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // 新規登録
  async register(userData: RegisterData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // ログアウト
  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // ユーザー情報の取得
  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // リフレッシュトークン
  async refreshToken(refreshToken: string) {
    const response = await apiClient.post('/auth/refresh', { refreshToken });
    return response.data;
  },
};
