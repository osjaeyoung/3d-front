import { Layout } from "@/components";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { authService } from "@/service/auth";

type SignUpFormData = {
  name: string;
  userId: string;
  pwd: string;
  email: string;
};

const inputStyle =
  "text-black w-[432px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 flex placeholder:text-[#5b5b5b]/60 placeholder:text-base placeholder:font-medium";

const Signup = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpFormData>();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authService.signup({
        name: data.name,
        userId: data.userId,
        pwd: data.pwd,
        email: data.email,
      });
      router.push("/signin");
    } catch (error: any) {
      console.log({ "SIGNUP ERROR": error });
    }
  };

  return (
    <Layout>
      <main className="flex flex-col items-start h-[calc(100vh-178px)]">
        <div className="relative w-full h-full">
          <Image
            src="/image/main_img.png"
            alt="Main Image"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white gap-y-[45px]">
            <p className="text-center text-white text-4xl font-medium font-['Helvetica Neue']">
              Turn Your 2D Art into 3D Models <br />
              with a Single Click
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-[10px] px-[46px] py-6"
            >
              <p className="text-center text-[#2f2c3f] text-2xl font-medium font-['Helvetica Neue'] mb-5">
                SIGN UP
              </p>
              <div className="flex flex-col justify-center items-center gap-y-[13px] py-5">
                <div className="flex flex-col w-full">
                  <div className="h-12 justify-start items-center gap-4 inline-flex">
                    <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                      이름
                    </label>
                    <input
                      type="text"
                      placeholder="이름을 입력해주세요"
                      className={inputStyle}
                      {...register("name", {
                        required: "이름을 입력해주세요",
                        minLength: {
                          value: 2,
                          message: "이름은 2자 이상이어야 합니다",
                        },
                      })}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="h-12 justify-start items-center gap-4 inline-flex">
                    <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                      아이디
                    </label>
                    <input
                      type="text"
                      placeholder="아이디를 입력해주세요"
                      className={inputStyle}
                      {...register("userId", {
                        required: "아이디를 입력해주세요",
                      })}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="h-12 justify-start items-center gap-4 inline-flex">
                    <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      placeholder="영문 숫자 혼합 8자리 이상의 비밀번호를 입력해주세요"
                      className={inputStyle}
                      {...register("pwd", {
                        required: "비밀번호를 입력해주세요",
                      })}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div className="h-12 justify-start items-center gap-4 inline-flex">
                    <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                      이메일
                    </label>
                    <input
                      type="email"
                      placeholder="이메일 주소를 입력해주세요"
                      className={inputStyle}
                      {...register("email", {
                        required: "이메일을 입력해주세요",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "올바른 이메일 형식이 아닙니다",
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-[151px] h-12 px-5 py-2.5 bg-[#ffb600] rounded border justify-center items-center gap-2.5 inline-flex"
              >
                <p className="text-center text-[#2f2c3f] text-base font-bold font-['Helvetica Neue']">
                  가입 완료
                </p>
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Signup;
