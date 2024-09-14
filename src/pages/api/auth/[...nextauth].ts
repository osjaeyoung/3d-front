import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    // TODO: 참고
    // https://velog.io/@j_wisdom_h/next-auth  
    // https://github.com/Sangkun-svg/career-note/blob/main/src/pages/api/auth/%5B...nextauth%5D.ts
    CredentialsProvider({} as any),
    KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID!,
        clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    })
  ],
}

export default NextAuth(authOptions)