import { Layout } from "@/components";
import { useForm } from "react-hook-form";
import Image from "next/image";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
              className=" bg-white rounded-[10px] px-[46px] py-6"
            >
              <p className="text-center text-[#2f2c3f] text-2xl font-medium font-['Helvetica Neue']">
                SIGN UP
              </p>
              <div
                id="input_box"
                className="flex flex-col justify-center items-center gap-y-[13px] py-5"
              >
                <div className="h-12 justify-start items-center gap-4 inline-flex">
                  <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                    이름
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="이름을 입력해주세요"
                    className="w-[432px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 flex placeholder:text-[#5b5b5b]/60 placeholder:text-base placeholder:font-medium placeholder:font-['SUIT Variable']"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="h-12 justify-start items-center gap-4 inline-flex">
                  <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                    아이디
                  </label>
                  <input
                    id="id"
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    className="w-[432px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 flex placeholder:text-[#5b5b5b]/60 placeholder:text-base placeholder:font-medium placeholder:font-['SUIT Variable']"
                    {...register("id", { required: true })}
                  />
                </div>
                {/* TOOD: pw , email input 맞춤 설정 */}
                <div className="h-12 justify-start items-center gap-4 inline-flex">
                  <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="영문 숫자 혼합 8자리 이상의 비밀번호를 입력해주세요"
                    className="w-[432px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 flex placeholder:text-[#5b5b5b]/60 placeholder:text-base placeholder:font-medium placeholder:font-['SUIT Variable']"
                    {...register("password", { required: true })}
                  />
                </div>
                <div className="h-12 justify-start items-center gap-4 inline-flex">
                  <label className="w-[62px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                    이메일
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="이메일 주소를 입력해주세요"
                    className="w-[432px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f] justify-start items-center gap-2.5 flex placeholder:text-[#5b5b5b]/60 placeholder:text-base placeholder:font-medium placeholder:font-['SUIT Variable']"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-[151px] h-12 px-5 py-2.5  bg-[#ffb600] rounded border justify-center items-center gap-2.5 inline-flex"
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
