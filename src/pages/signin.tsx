import { Layout } from "@/components";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";

const KakaoLogo = () => {
  return (
    <svg
      width="48"
      height="46"
      viewBox="0 0 48 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="23" r="22.56" fill="#FEE500" />
      <path
        d="M23.7676 12.44C16.4562 12.44 10.56 17.1569 10.56 22.8834C10.56 26.6004 13.0128 29.8551 16.6921 31.7136L15.4468 36.3646C15.4233 36.4343 15.4197 36.5091 15.4364 36.5807C15.453 36.6524 15.4893 36.718 15.5411 36.7702C15.6167 36.8368 15.714 36.8737 15.8147 36.8739C15.8983 36.8672 15.9775 36.8342 16.0411 36.7796L21.3996 33.1664C22.1906 33.2756 22.988 33.3323 23.7864 33.3362C31.0884 33.3362 36.994 28.6192 36.994 22.8834C36.994 17.1475 31.0695 12.44 23.7676 12.44Z"
        fill="#392020"
      />
      <path
        d="M15.1828 21.2323H13.7394C13.5605 21.2375 13.3838 21.1917 13.2299 21.1002C13.1616 21.0574 13.1029 21.0009 13.0574 20.9344C13.012 20.8678 12.9808 20.7926 12.9658 20.7134C12.9612 20.6632 12.9612 20.6127 12.9658 20.5625C12.9613 20.4686 12.9795 20.3749 13.0189 20.2895C13.0584 20.2041 13.1178 20.1295 13.1922 20.0719C13.3567 19.9528 13.5552 19.8899 13.7582 19.8926H18.1073C18.2876 19.8863 18.4655 19.9357 18.6167 20.0342C18.6866 20.0751 18.7466 20.131 18.7923 20.1979C18.838 20.2648 18.8682 20.341 18.8809 20.421C18.8855 20.468 18.8855 20.5155 18.8809 20.5625C18.8853 20.6578 18.8671 20.7528 18.8278 20.8397C18.7884 20.9266 18.729 21.0029 18.6545 21.0624C18.494 21.1814 18.2974 21.2414 18.0979 21.2323H16.7016V26.1946C16.7073 26.3003 16.6909 26.406 16.6536 26.5051C16.6162 26.6041 16.5587 26.6944 16.4847 26.77C16.4136 26.8424 16.3283 26.8991 16.234 26.9365C16.1398 26.9738 16.0388 26.991 15.9375 26.987C15.7603 26.9921 15.5869 26.9354 15.4469 26.8267C15.3137 26.7205 15.2232 26.5697 15.1922 26.4021C15.1829 26.3332 15.1829 26.2635 15.1922 26.1946L15.1828 21.2323Z"
        fill="#FEE500"
      />
      <path
        d="M19.2963 20.2605C19.3378 20.1053 19.4352 19.9708 19.5699 19.8831C19.7133 19.8018 19.8768 19.7626 20.0416 19.7699H20.4001C20.5749 19.7636 20.748 19.8061 20.9001 19.8926C21.0612 20.0009 21.1757 20.1659 21.2208 20.3548L23.1076 25.685C23.1565 25.8241 23.1975 25.9659 23.2303 26.1096C23.2335 26.1693 23.2335 26.2291 23.2303 26.2888C23.2335 26.3808 23.2165 26.4723 23.1807 26.557C23.1448 26.6418 23.0909 26.7177 23.0227 26.7794C22.9566 26.8472 22.8773 26.9006 22.7896 26.9363C22.702 26.972 22.6079 26.9892 22.5133 26.9869C22.3678 27.0014 22.2216 26.9665 22.0984 26.8878C21.9752 26.8091 21.8821 26.6911 21.834 26.553L21.4378 25.3926H18.9567L18.5604 26.553C18.5136 26.6939 18.4193 26.8141 18.2937 26.8932C18.1682 26.9723 18.019 27.0054 17.8718 26.9869C17.7122 26.9911 17.556 26.9412 17.4284 26.8454C17.304 26.7465 17.2201 26.6057 17.1925 26.4493C17.1875 26.3959 17.1875 26.3422 17.1925 26.2888C17.1763 26.1952 17.1763 26.0995 17.1925 26.0059C17.1925 25.9021 17.2585 25.7888 17.2963 25.685L19.2963 20.2605ZM20.2397 21.4964L19.3435 24.3266H21.1265L20.2397 21.4964Z"
        fill="#FEE500"
      />
      <path
        d="M23.4473 20.5624C23.4377 20.3507 23.5123 20.1438 23.6548 19.9869C23.7273 19.9138 23.8143 19.8567 23.9101 19.8193C24.006 19.782 24.1087 19.7651 24.2114 19.7698C24.3882 19.7678 24.5606 19.8242 24.702 19.9302C24.833 20.0409 24.9201 20.1948 24.9473 20.3642C24.9566 20.4299 24.9566 20.4967 24.9473 20.5624V25.5247H27.5416C27.7215 25.5223 27.8982 25.5713 28.0511 25.6661C28.1198 25.7084 28.1788 25.7648 28.2243 25.8314C28.2698 25.8981 28.3008 25.9735 28.3152 26.0529C28.3152 26.0529 28.3152 26.1473 28.3152 26.1944C28.3197 26.2884 28.3015 26.382 28.2621 26.4674C28.2226 26.5528 28.1632 26.6275 28.0888 26.685C27.9243 26.8041 27.7258 26.8669 27.5228 26.8642H24.3341C24.131 26.8773 23.9291 26.8244 23.7586 26.7133C23.6061 26.5993 23.5045 26.4299 23.4756 26.2416C23.4687 26.138 23.4687 26.0339 23.4756 25.9303L23.4473 20.5624Z"
        fill="#FEE500"
      />
      <path
        d="M28.4847 20.5628C28.479 20.3517 28.5531 20.1462 28.6922 19.9873C28.8336 19.8589 29.015 19.783 29.2057 19.7727C29.3965 19.7624 29.585 19.8182 29.7394 19.9307C29.8733 20.0404 29.9636 20.1942 29.9941 20.3646C29.9988 20.4306 29.9988 20.4968 29.9941 20.5628V22.8741L32.3809 20.1193C32.4729 20.0253 32.5705 19.9372 32.6734 19.8552C32.7703 19.7975 32.8814 19.768 32.9941 19.7703C33.159 19.7694 33.3203 19.8187 33.4564 19.9118C33.5205 19.955 33.5753 20.0107 33.6175 20.0755C33.6596 20.1404 33.6882 20.213 33.7017 20.2892C33.7055 20.3078 33.7055 20.3272 33.7017 20.3458C33.6971 20.3676 33.6971 20.39 33.7017 20.4118C33.7013 20.5111 33.6753 20.6086 33.6262 20.6949C33.5761 20.7862 33.516 20.8716 33.447 20.9495L31.8809 22.6666L33.7677 25.5911V25.6854C33.8657 25.8206 33.942 25.9702 33.9941 26.1289V26.176C34.005 26.2853 33.9893 26.3956 33.9482 26.4975C33.9071 26.5994 33.8419 26.6897 33.7583 26.7609C33.6009 26.8798 33.4084 26.943 33.2111 26.9402C33.08 26.9456 32.9499 26.9162 32.8337 26.8552C32.7081 26.7709 32.6046 26.6577 32.5319 26.525L30.7771 23.6948L29.9375 24.5722V26.1476C29.9432 26.3587 29.8691 26.5642 29.73 26.7231C29.6554 26.796 29.5667 26.8529 29.4694 26.8902C29.372 26.9275 29.2681 26.9445 29.1639 26.9402C28.9898 26.9438 28.8199 26.8871 28.6828 26.7798C28.5495 26.6735 28.4591 26.5228 28.4281 26.3553C28.4188 26.2864 28.4188 26.2165 28.4281 26.1476L28.4847 20.5628Z"
        fill="#FEE500"
      />
    </svg>
  );
};

const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Layout className="flex flex-col">
      <main className="bg-background flex-grow flex justify-center items-center">
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
        <div className="flex flex-col items-center justify-center h-screen">
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
                <button
                  id="kakao_login"
                  type="button"
                  className="w-[520px] h-[50px] relative"
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
              </form>
              <div className="flex justify-center items-center mt-[18px] text-center space-x-4">
                <Link href="/signup">
                  <p className="text-center text-[#5b5b5b] text-base font-semibold font-['Pretendard']">
                    회원가입
                  </p>
                </Link>
                <span>|</span>
                <Link href="/forgot-id">
                  <p className="text-center text-[#5b5b5b] text-base font-semibold font-['Pretendard']">
                    다른 SNS 계정으로 로그인
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
