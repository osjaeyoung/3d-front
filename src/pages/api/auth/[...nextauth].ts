import NextAuth from "next-auth";
import { AuthOptions, User } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

interface Credentials {
  name: string;
  username: string;
  password: string;
  email: string;
}

const signUp = async (credentials: Credentials) => {
  const { name, username, password, email } = credentials;
  const PRODUCT_URL = "http://localhost:3000/signup";
  try {
    const response = await axios.post(PRODUCT_URL, {
      name,
      username,
      password,
      email,
    });
    if (response.status !== 200) {
      return null;
    }
    const authenticatedUser: User = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    };
    return authenticatedUser;
  } catch (error) {
    console.error("Error during user authentication:", error);
    return null;
  }
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        name: { label: "이름", type: "text" },
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
        email: { label: "이메일", type: "email" },
      },
      async authorize(credentials, req) {
        const { name, username, password, email } = credentials as Credentials;
        console.log({ name, username, password, email });
        return signUp(credentials as Credentials);
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "kakao" || account?.provider === "google") {
        const response = await fetch(
          `http://3.38.72.210:4000/auth/${account.provider}/callback`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${account.access_token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          account.userId = data.userId;
          account.accessToken = data.access_token;
          account.refreshToken = data.refresh_token;
          account.accessTokenExpires = Date.now() + 3600 * 1000; // 1시간으로 가정
          account.isNewUser = data.isNewUser;
          return true;
        } else {
          return false;
        }
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.userId = account.userId!;
        token.accessToken = account.accessToken! as string;
        token.accessTokenExpires = account.accessTokenExpires! as number;
      }
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId as string;
      session.accessToken = token.accessToken as string;
      session.error = token.error as string | undefined;
      return session;
    },
  },
};

export default NextAuth(authOptions);
