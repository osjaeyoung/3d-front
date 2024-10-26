import { useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const OAuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { code, provider } = router.query;

      if (!code || !provider) return;

      try {
        const response = await axiosInstance.post(`/proxy/auth/login`, {
          provider: provider,
          code: code,
        });
        const { accessToken, name, email } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        router.push("/");
      } catch (error) {
        console.error("OAuth login failed:", error);
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
