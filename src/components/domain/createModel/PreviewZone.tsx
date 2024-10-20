import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDModelViewer } from "./Viewer3D";
import { MODELS } from "../constants";
import { iModels } from "../types";

export const PreviewZone: React.FC = () => {
  const [modelData, setModelData] = useState<any | null>(null);

  useEffect(() => {
    if (modelData) return;

    const fetchModelData = async () => {
      try {
        const response = await axios(`/proxy/file/download`, {
          responseType: "blob",
        });
        const blob = new Blob([response.data], { type: "text/plain" });
        const file = new File([blob], "model.obj", { type: "text/plain" });
        const fileUrl = URL.createObjectURL(file);
        setModelData({
          file: file,
          url: fileUrl,
        });
      } catch (error) {
        console.error("Error fetching model data:", error);
      }
    };

    fetchModelData();
  }, []);

  return (
    <div className="w-full max-w-[710px] mx-auto flex flex-col items-start gap-y-[14px] mt-9">
      <div className="flex flex-col">
        <div className="flex gap-x-7 justify-start items-start mt-7">
          {modelData && <ThreeDModelViewer modelData={modelData!} />}
          <div className="h-full pt-3">
            <p className="text-[#2f2c3f] text-sm font-medium font-['Helvetica Neue'] uppercase mb-7">
              Created file option
            </p>
            <form
              id="options"
              className="flex flex-col h-full items-start gap-y-2 pl-[5px]"
            >
              <div className="flex gap-x-4 justify-center items-center">
                <label className="w-[50px] text-[#2f2c3f] text-xs font-medium font-['SUIT Variable'] uppercase">
                  파일형식
                </label>
                <Select>
                  <SelectTrigger className="w-[180px] h-[26px] px-2 py-[5px] bg-[#c9c9c9]/20 rounded justify-between items-center inline-flex">
                    <SelectValue placeholder="OBJ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OBJ">OBJ</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/*  */}
              <div className="flex gap-x-4 justify-center items-center">
                <label className="w-[50px] text-[#2f2c3f] text-xs font-medium font-['SUIT Variable'] uppercase">
                  폴리곤 수
                </label>
                <Select>
                  <SelectTrigger className="w-[180px] h-[26px] px-2 py-[5px] bg-[#c9c9c9]/20 rounded justify-between items-center inline-flex">
                    <SelectValue placeholder="적음(23)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OBJ">OBJ</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/*  */}
              <div className="flex gap-x-4 justify-center items-center">
                <label className="w-[50px] text-[#2f2c3f] text-xs font-medium font-['SUIT Variable'] uppercase">
                  모델 크기
                </label>
                <Select>
                  <SelectTrigger className="w-[180px] h-[26px] px-2 py-[5px] bg-[#c9c9c9]/20 rounded justify-between items-center inline-flex">
                    <SelectValue placeholder="적음 (35MB)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OBJ">OBJ</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
        </div>
        <div
          id="btn_group"
          className="flex justify-center gap-4 mt-[15px] mb-[25px]"
        >
          <button className="w-[122px] h-11 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex">
            <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
              Continue
            </p>
          </button>
          <button className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex">
            <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
              CANCEL
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
