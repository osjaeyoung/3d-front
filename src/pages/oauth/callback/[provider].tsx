import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { code, provider } = router.query;

      if (!code || !provider) return;

      try {
        const response = await axios.post(
          "http://3.38.72.210:3000/auth/login",
          {
            provider: provider,
            code: code,
          }
        );

        // 받은 액세스 토큰을 로컬 스토리지에 저장
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

        // 로그인 성공 후 메인 페이지로 리다이렉션
        router.push("/");
      } catch (error) {
        console.error("OAuth login failed:", error);
        // 에러 발생 시 로그인 페이지로 리다이렉션
        router.push("/signin");
      }
    };

    handleOAuthCallback();
  }, [router.query]);

  return (
    <div className="flex justify-center items-center h-screen">
      로그인 처리중...
    </div>
  );
};

export default OAuthCallback;
