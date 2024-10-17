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


interface PreviewZoneProps {
  modelData: any;
}

export const PreviewZone: React.FC = () => {
  const [modelData, setModelData] = useState<string | null>(null);

  useEffect(() => {
    const fetchModelData = async () => {
      const response = await axios(`http://3.38.72.210:4000/file/download`);
      console.log({ response: response.data });
      setModelData(response.data);  // 필요한 경로로 데이터 조정
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