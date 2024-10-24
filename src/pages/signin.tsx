import { Layout } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { KakaoLogo, GoogleLogo } from "@/components/icons";
import axiosInstance from "@/lib/axios";
const SignInPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleGetAuthUrl = async (provider: "kakao" | "google") => {
    const response = await axiosInstance.get(
      `/proxy/auth/url?provider=${provider}`
    );
    console.log(response.data);
    return response.data;
  };

  const handleKakaoLogin = async () => {
    const authUrl = await handleGetAuthUrl("kakao");
    console.log({ kakaoAuthUrl: authUrl });
    window.location.href = authUrl.url;
  };

  const handleGoogleLogin = async () => {
    const authUrl = await handleGetAuthUrl("google");
    console.log({ googleAuthUrl: authUrl });
    window.location.href = authUrl.url;
  };

  return (
    <Layout className="flex flex-col">
      <main className="bg-background flex-grow flex justify-center items-center h-[calc(100vh-178px)]">
        <div className="flex flex-col pl-10 pr-[60px] pt-[27px]">
          <p className="text-white text-4xl font-medium font-['Helvetica Neue'] mb-[27px]">
            Turn Your 2D Art <br />
            into <span className="gradient-text">3D Models</span> <br />
            with a <span className="gradient-text">Single Click</span>
          </p>
          <Image
            src="/image/signin_img_1.png"
            alt="img"
            width={488}
            height={282}
            className="mb-5"
          />
          <Image
            src="/image/signin_img_2.png"
            alt="img"
            width={488}
            height={282}
          />
        </div>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-178px)]">
          <div className="relative w-[692px] h-full">
            <Image
              src="/image/main_img.png"
              alt="Main Image"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[612px] bg-white rounded-[10px] pt-6 pb-10 pl-10">
              <p className="text-center text-[#2f2c3f] text-2xl font-medium font-['Helvetica Neue'] mb-[30px]">
                LOG IN
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  id="id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  className="w-full max-w-[360px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 inline-flex placeholder:text-[#5b5b5b] placeholder:text-base placeholder:font-medium placeholder:font-['Helvetica Neue']"
                  {...register("id", { required: true })}
                />
                <div className="flex gap-x-2.5">
                  <input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full max-w-[360px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 inline-flex placeholder:text-[#5b5b5b] placeholder:text-base placeholder:font-medium placeholder:font-['Helvetica Neue']"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="submit"
                    className="w-[151px] h-12 px-5 py-2.5  bg-[#ffb600] rounded border justify-center items-center gap-2.5 inline-flex"
                  >
                    <p className="text-center text-[#2f2c3f] text-base font-bold font-['Helvetica Neue']">
                      로그인
                    </p>
                  </button>
                </div>
                <div className="flex flex-col gap-y-4">
                  <button
                    id="kakao_login"
                    type="button"
                    className="w-[520px] h-[50px] relative"
                    onClick={handleKakaoLogin}
                  >
                    <div className="w-[520px] h-[50px] py-2.5 left-0 top-0 absolute bg-[#fee500] rounded-[10px] justify-center items-center gap-2.5 inline-flex">
                      <p className="text-center text-[#392020] text-base font-semibold font-['Pretendard']">
                        카카오 계정으로 로그인
                      </p>
                    </div>
                    <div className="w-12 h-11 left-[75px] top-[3px] absolute justify-center items-center gap-[9.40px] inline-flex">
                      <KakaoLogo />
                    </div>
                  </button>
                  <button
                    id="kakao_login"
                    type="button"
                    className="w-[520px] h-[50px] relative"
                    onClick={handleGoogleLogin}
                  >
                    <div className="w-[520px] h-[50px] py-2.5 bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex border border-[#c9c9c9] ">
                      <p className="text-center text-[#392020] text-base font-semibold font-['Pretendard']">
                        구글 계정으로 로그인
                      </p>
                      <div className="w-12 h-11 left-[75px] top-[3px] absolute justify-center items-center gap-[9.40px] inline-flex">
                        <GoogleLogo />
                      </div>
                    </div>
                  </button>
                </div>
              </form>
              <div className="flex justify-center items-center mt-[18px] text-center space-x-4">
                <Link href="/signup">
                  <p className="text-center text-[#5b5b5b] text-base font-semibold font-['Pretendard']">
                    회원가입
                  </p>
                </Link>
                <span>|</span>
                <Link href="/forgot-password">
                  <p className="text-center text-[#5b5b5b] text-base font-semibold font-['Pretendard']">
                    아이디/비밀번호 찾기
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SignInPage;
