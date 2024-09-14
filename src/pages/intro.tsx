import { Layout } from "@/components";

interface Props {}

const StepCard = ({ icon, title, description }: {icon:string, title:string, description: string}) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg text-center">
        <div className="text-gray-800 text-2xl mb-2">
          {icon}
        </div>
        <div className="font-bold text-lg mb-1">
          {title}
        </div>
        <div className="text-gray-600 text-sm">
          {description}
        </div>
      </div>
    );
  };
  
  

const IntroPage = () => {
    const steps = [
        {
          icon: "📤",
          title: "Upload your image",
          description: "2D 이미지 파일을 업로드 해주세요. 지원하는 형식자 (JPG, PNG, BMP)"
        },
        {
          icon: "🧠",
          title: "Let the AI Process your Model",
          description: "2D 이미지 파일을 넣고, AI 프로세스를 진행하세요."
        },
        {
          icon: "🔍",
          title: "Preview & Download",
          description: "시험 삼성된 단상의 3D 모델들을 미리 확인하고, 다운로드 받으세요."
        },
        {
          icon: "🛠️",
          title: "Create Paper Toys",
          description: "생성된 3D 모델들을 페이지 토이로 변환하세요."
        }
      ];
    
    return (
        <Layout className="min-h-screen flex flex-col">
            <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-10">
                <h1 className="text-3xl font-bold mb-6">How to create Paper Toys?</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl w-full px-4">
                    {steps.map((step, index) => (
                    <StepCard key={index} icon={step.icon} title={step.title} description={step.description} />
                    ))}
                </div>
            </div>
        </Layout>
    )
};

export default IntroPage;
