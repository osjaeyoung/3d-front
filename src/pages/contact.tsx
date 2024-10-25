import { Layout } from "@/components";
import { FacebookIcon, InstagramIcon, KakaoIcon } from "@/components/icons";
import Image from "next/image";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import { useModal } from "@/hooks";
import { SuccessContactModal } from "@/components/domain";

const ContactPage = () => {
  const { register, handleSubmit } = useForm();
  const {
    isOpen: isMailSenderOpen,
    onOpen: onMailSenderOpen,
    onClose: onMailSenderClose,
  } = useModal();
  const sendContactEmail = async (emailForm: any) => {
    const newForm = {
      from: emailForm.email,
      title: emailForm.name,
      content: emailForm.message,
    };
    try {
      const response = await axiosInstance.post("/api/contact", newForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        onMailSenderOpen();
      }
    } catch (error) {
      console.error({ error });
      throw error;
    }
  };

  const onSubmit = (data: any) => {
    sendContactEmail(data);
  };

  return (
    <>
      <SuccessContactModal
        isOpen={isMailSenderOpen}
        onClose={onMailSenderClose}
      />
      <Layout>
        <main className="flex flex-col items-center h-[calc(100vh-178px)]">
          <div className="relative w-full h-[calc(100vh-178px)]">
            <Image
              src="/image/main_img.png"
              alt="Main Image"
              layout="fill"
              objectFit="cover"
              priority
            />
            <div className="w-full flex flex-col justify-center items-center bg-black pt-10 pb-[65px]">
              <p className="text-center text-white text-[32px] font-medium font-['Helvetica Neue'] mb-10 z-10">
                Contact
              </p>
              <div className="flex gap-4 bg-[#C4C0C2]">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col justify-start items-center px-[53px] pt-[30px] pb-[24px] w-[554px] bg-white rounded-xl backdrop-blur-sm"
                >
                  <div
                    id="input_box"
                    className="flex flex-col justify-center items-center gap-y-[13px]"
                  >
                    <div className="w-full h-12 justify-between items-center gap-2.5 inline-flex">
                      <label className="w-[72px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                        이름
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-[360px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f]"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div className="h-12 justify-start items-center gap-4 inline-flex">
                      <label className="w-[72px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                        이메일
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-[360px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f]"
                        {...register("email")}
                      />
                    </div>
                    <div className="h-12 justify-start items-center gap-4 inline-flex">
                      <label className="w-[72px] text-[#2f2c3f] text-base font-bold font-['SUIT Variable']">
                        Web URL
                      </label>
                      <input
                        id="webUrl"
                        type="text"
                        className="w-[360px] h-12 px-5 py-2.5 rounded border border-[#2f2c3f]"
                        {...register("webUrl", { required: true })}
                      />
                    </div>
                    <div
                      id="message_box"
                      className="flex flex-col w-full items-start"
                    >
                      <p className="text-[#2f2c3f] text-base font-bold font-['Helvetica'] uppercase">
                        Message
                      </p>
                      <textarea
                        className="w-full h-[180px]"
                        {...register("message")}
                      />
                    </div>
                    <button className="px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex">
                      <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                        send
                      </p>
                    </button>
                  </div>
                </form>

                <div className="w-[364px] bg-white rounded-xl backdrop-blur-sm flex flex-col items-center pt-[100px]">
                  <div id="icon_list" className="flex gap-x-7 mb-[66px]">
                    <KakaoIcon />
                    <InstagramIcon />
                    <FacebookIcon />
                  </div>
                  <div className="flex flex-col gap-y-6">
                    <p className="text-[#2f2c3f] text-base font-medium font-['SUIT Variable']">
                      <span className="mr-1">•</span>
                      주소 : 경기 용인시 처인구 동부로 61
                      <br /> 용인예술과학대 창의관 506-1호
                    </p>
                    <p className="text-[#2f2c3f] text-base font-normal font-['Helvetica']">
                      <span className="mr-1">•</span>
                      Email : boricolder@gmail.com
                    </p>
                    <p className="text-[#2f2c3f] text-base font-normal font-['Helvetica']">
                      <span className="mr-1">•</span>
                      FAX : 0507-1382-2518
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default ContactPage;
