import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authService } from '@/services/authService';

// カスタムユーザー型
type CustomUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken: string;
  refreshToken: string;
};

// 型定義の拡張
declare module 'next-auth' {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken: string;
    refreshToken: string;
  }
}

// JWTの型定義
type JWT = {
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
  };
};

// @ts-nocheck
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードを入力してください');
        }

        try {
          const user = await authService.login({
            email: String(credentials.email),
            password: String(credentials.password),
          });

          if (user) {
            return {
              id: user.id,
              name: user.name || null,
              email: user.email || null,
              image: user.image || null,
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            } as any; // 型アサーションで対応
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'ログインに失敗しました');
        }
              accessToken: user.accessToken,
              refreshToken: user.refreshToken,
            } as any; // 型アサーションで対応
          }
          return null;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'ログインに失敗しました');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // JWTを使用したセッション管理
    maxAge: 24 * 60 * 60, // 24時間
  },
  pages: {
    signIn: '/login', // カスタムログインページ
    error: '/login', // エラー時のリダイレクト先
  },
  callbacks: {
    // @ts-ignore
    async jwt({ token, user, account }) {
      // 初回サインイン時
      if (account && user) {
        return {
          ...token,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        };
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.refreshToken = token.refreshToken;
      session.user = {
        ...session.user,
        id: token.sub || '',
        ...(token.user || {}),
      };
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development', // 開発環境でのみデバッグを有効化
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

