import 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the built-in session types
   */
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

  /**
   * Extend the built-in user types
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the built-in JWT types
   */
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
