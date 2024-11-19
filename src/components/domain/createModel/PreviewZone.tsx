import { useEffect, useState } from "react";
import { ThreeDModelViewer } from "./Viewer3D";
import { iModels } from "../types";

interface Props {
  onRecreate: () => void;
  onContinue: () => void;
  glbUrl: string;
}

export const PreviewZone: React.FC<Props> = ({
  onRecreate,
  onContinue,
  glbUrl,
}) => {
  const [modelData, setModelData] = useState<iModels | null>(null);
  console.log(modelData);
  useEffect(() => {
    if (modelData) return;

    const fetchModelData = async () => {
      try {
        setModelData({
          type: "glb",
          url: glbUrl,
        });
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };

    fetchModelData();
  }, []);

  return (
    <div className="w-full max-w-[710px] mx-auto flex flex-col items-center gap-y-[14px] mt-9">
      <div className="flex flex-col">
        <div className="flex gap-x-7 justify-start items-start mt-7">
          {!!modelData?.url && <ThreeDModelViewer modelData={modelData!} />}
        </div>
        <div
          id="btn_group"
          className="flex justify-center gap-4 mt-[15px] mb-[25px]"
        >
          <button
            onClick={onRecreate}
            className="w-[122px] h-11 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex"
          >
            <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase text-nowrap">
              RE CREATE
            </p>
          </button>
          <button
            onClick={onContinue}
            className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex"
          >
            <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
              BLENDER
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
