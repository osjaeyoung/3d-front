import { Progress } from "@/components/ui/progress";

interface ProgressViewerProps {
  uploadProgress: number;
  processProgress: number;
  status: "uploading" | "processing" | "completed" | "error";
}

export const ProgressViewer: React.FC<ProgressViewerProps> = ({
  uploadProgress,
  processProgress,
  status,
}: ProgressViewerProps) => {
  const totalProgress =
    status === "uploading"
      ? uploadProgress * 0.5 // 업로드는 전체 진행률의 50%
      : 50 + processProgress * 0.5; // 다운로드 처리는 전체 진행률의 50%

  return (
    <div className="w-full max-w-[710px] mx-auto flex flex-col items-start gap-y-[14px] mt-9">
      <Progress
        value={totalProgress}
        className="w-full max-w-[710px] mx-auto h-[18px] bg-white rounded-[27px] shadow mt-[53px]"
      />

      <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
        {status === "uploading"
          ? "✓ Uploading your image..."
          : "✓ Your 3D model is being generated, this may take a few moments."}
      </p>
      <p className="text-[#2f2c3f] text-base font-medium font-['SUIT Variable']">
        <span className="font-['Helvetica Neue']">✓</span>
        {status === "uploading"
          ? " 이미지를 업로드하는 중입니다..."
          : " 3D 모델을 생성하는 중입니다. 잠시만 기다려주세요."}
      </p>
    </div>
  );
};
