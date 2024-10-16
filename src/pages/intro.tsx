import { Layout } from "@/components";
import {
  WheelIcon,
  DocumentIcon,
  ObjectIcon,
  UploadIcon,
} from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { ArrowIcon } from "@/components/icons";
import { useRouter } from "next/router";

interface Props {
  Icon: React.ComponentType;
  title: string;
  description: string;
  precautions?: string;
}

const steps = [
  {
    Icon: UploadIcon,
    title: "Upload Your <br/> Image",
    description: "2D 이미지 파일을<br/>업로드 해주세요.",
    precautions: "지원하는 형식자 <br/>(JPG, PNG, BMP)",
  },
  {
    Icon: WheelIcon,
    title: "Let the AI Process your Model",
    description: "2D 이미지 파일을 넣고, <br/>AI 프로세스를 진행하세요. ",
  },
  {
    Icon: DocumentIcon,
    title: "Preview <br/> & Download",
    description:
      "AI로 생성된 당신의 3D <br/>오브젝트를 미리 확인하고, <br/>다운로드 받으세요.",
  },
  {
    Icon: ObjectIcon,
    title: "Create Paper <br/>Toys",
    description: "생성된 3D 오브젝트를 <br/>페이퍼 토이로 변환하세요. ",
  },
];

const StepCard = ({ Icon, title, description, precautions }: Props) => {
  return (
    <div className="w-[238px] h-[479px] px-[30px] py-[67px] bg-white rounded-[10px] flex-col justify-start items-center gap-[25px] inline-flex">
      <Icon />
      <p
        className="text-center text-[#2f2c3f] text-lg font-bold font-['Helvetica Neue']"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <Separator className="bg-[#c03b97]" />
      <p
        className="text-center text-[#2f2c3f] text-base font-medium font-['SUIT Variable'] leading-tight"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {precautions && (
        <p
          className="w-[154px] text-center text-[#ff8800] text-base font-bold font-['SUIT Variable']"
          dangerouslySetInnerHTML={{ __html: precautions }}
        />
      )}
    </div>
  );
};

const IntroPage = () => {
  const router = useRouter();

  return (
    <Layout className="min-h-screen flex flex-col">
      <div className="bg-background flex flex-col justify-center items-center pt-10 gap-y-[49px] pb-[69px] h-[calc(100vh-178px)]">
        <p className="text-center text-white text-[32px] font-medium font-['Helvetica Neue']">
          How to Create Paper Toys?
        </p>
        <div className="flex justify-center items-start h-full w-full px-4 gap-x-[27px]">
          {steps.slice(0, 3).map((step, index) => (
            <StepCard
              key={index}
              Icon={step.Icon}
              title={step.title}
              description={step.description}
              precautions={step.precautions}
            />
          ))}
          <div className="flex flex-col gap-y-[15px]">
            <StepCard
              Icon={steps[3].Icon}
              title={steps[3].title}
              description={steps[3].description}
              precautions={steps[3].precautions}
            />
            <button
              onClick={() => router.push("/create")}
              className="h-12 px-6 py-3 bg-gradient rounded-[10px] justify-center items-center gap-3 inline-flex max-w-[214px] mx-auto"
            >
              <p className="text-white text-xl font-bold font-['Helvetica Neue']">
                GET STARTED
              </p>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IntroPage;
