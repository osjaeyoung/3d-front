import { Progress } from "@/components/ui/progress";

interface ProgressViewerProps {
  progress: number;
  processingStep: number;
}

export const ProgressViewer: React.FC<ProgressViewerProps> = ({
  progress,
  processingStep,
}: ProgressViewerProps) => {
  return (
    <div className="w-full max-w-[710px] mx-auto flex flex-col items-start gap-y-[14px] mt-9">
      <Progress
        value={progress}
        className="w-full max-w-[710px] mx-auto h-[18px] bg-white rounded-[27px] shadow mt-[53px]"
      />

      <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
        ✓ Your 3D model is being generated, this may take a few moments.
      </p>
      <p className="text-[#2f2c3f] text-base font-medium font-['SUIT Variable']">
        <span className="font-['Helvetica Neue']">✓</span> 3D 모델을 생성하는
        중입니다. 잠시만 기다려주세요.
      </p>
      <p className="text-[#2f2c3f] text-base font-medium font-['SUIT Variable']">
        현재 진행 단계: {processingStep} / 13
      </p>
      {/* <div
                id="btn_group"
                className="flex justify-center gap-4 mt-[66px]"
              >
                <button className="w-[122px] h-11 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex">
                  <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                    Continue
                  </p>
                </button>
                <button onClick={} className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex">
                  <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                    CANCEL
                  </p>
                </button>
              </div> */}
    </div>
  );
};
