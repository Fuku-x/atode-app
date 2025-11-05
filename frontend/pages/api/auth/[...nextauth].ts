import NextAuth, { type DefaultSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// セッションの型を拡張
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

const handler = NextAuth({
  // Google認証プロバイダーのみ使用
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // セッションにユーザーIDを含める
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!; // Google認証ではsubは必ず存在する
      }
      return session;
    },
  },
  // セッションの設定
  session: {
    strategy: 'jwt', // JWTを使用したセッション管理
  },
});

export { handler as GET, handler as POST };
