import NextAuth from "next-auth";
import { AuthOptions, User } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface Credentials {
  name: string;
  username: string;
  password: string;
  email: string;
}
// Simulated database lookup
const testSignUp = (credentials: Credentials) => {
  const { name, username, password, email } = credentials;
  // Simulated database lookup
  // Replace this with your own database logic, for example querying a DB
  if (
    name &&
    username === "testuser" &&
    password === "testpass" &&
    email === "test@example.com"
  ) {
    // Return the User object matching the NextAuth User type
    const user: User = {
      id: "1",
      name: name,
      email: email,
    };
    return user;
  } else {
    return null; // If credentials are invalid
  }
};
const signUp = async (credentials: Credentials) => {
  const { name, username, password, email } = credentials;
  // API request to your server to authenticate the user
  const PRODUCT_URL = "http://localhost:3000/signup";
  try {
    const res = await fetch(PRODUCT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
        email,
      }),
    });
    const user = await res.json();
    if (!res.ok || !user) {
      return null;
    }
    const authenticatedUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
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
        // return signUp(credentials as Credentials);
        return testSignUp(credentials as Credentials);
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
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
