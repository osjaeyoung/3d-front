import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
    expires: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    isNewUser: boolean;
    error?: string;
  }
}
