import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';

// カスタム設定を含む拡張リクエスト設定の型
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

// セッションの型を定義
interface CustomSession {
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// リクエストインターセプター
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession() as CustomSession | null;
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    // 401エラーかつリトライ前の場合
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const session = await getSession() as CustomSession | null;
        if (session?.refreshToken) {
          // リフレッシュトークンで新しいアクセストークンを取得
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken: session.refreshToken,
          });
          
          const { accessToken } = response.data;
          
          // 新しいトークンでリクエストを再試行
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return apiClient(originalRequest);
        }
      } catch (error) {
        // リフレッシュに失敗した場合はログイン画面にリダイレクト
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
