import { Progress } from "@/components/ui/progress";

interface ProgressViewerProps {
  progress: number;
}

export const ProgressViewer: React.FC<ProgressViewerProps> = ({ progress }) => {
  return (
    <div className="w-full max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">AI Process your Model</h2>
      <p className="text-gray-600 mb-2">Your 3D model is being generated, this may take a few moments.</p>
      <p className="text-gray-600 mb-6">3D 모델을 생성하는 중입니다. 잠시만 기다려주세요.</p>
      <Progress value={progress} className="h-4 bg-gray-200" />
    </div>
  );
};
