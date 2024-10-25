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
        const response = await axiosInstance.post("/auth/login", {
          provider: provider,
          code: code,
        });

        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);

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
