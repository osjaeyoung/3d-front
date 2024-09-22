import { Layout } from "@/components";
import { ImageUploadZone, ProgressViewer, Viewer3D } from "@/components/domain";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  SmallUploadIcon,
  SmallDocumentIcon,
  SmallObjectIcon,
  SmallWheelIcon,
  ArrowBackIcon,
  PlusIcon,
  RotateIcon,
} from "@/components/icons";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface TabContentWrapperProps {
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const TabContentWrapper: React.FC<TabContentWrapperProps> = ({
  title,
  onClick,
  children,
}) => {
  return (
    <div className="flex flex-col min-w-[897px] min-h-[356px] bg-white rounded-[20px] px-[31px] pt-7">
      <div className="flex justify-center items-center">
        <button type="button" onClick={onClick}>
          <ArrowBackIcon />
        </button>
        <p className="w-[calc(100%-20px)] text-center text-[#2f2c3f] text-xl font-medium font-['Helvetica Neue']">
          {title}
        </p>
      </div>
      {children}
    </div>
  );
};

const Create3DModel = () => {
  // 상태 관리
  const [file, setFile] = useState<File | null>(null); // 업로드할 파일
  const [progress, setProgress] = useState(0); // 진행률
  const [isUploading, setIsUploading] = useState(false); // 업로드 중 여부
  const [isCompleted, setIsCompleted] = useState(false); // 다운로드 완료 여부
  const [modelData, setModelData] = useState<any>(null); // 다운로드된 3D 객체

  const handleUpload = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);

    try {
      // 여기에 axios 업로드 요청을 넣을 수 있습니다
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 모의 업로드 (2초)

      // 업로드가 완료되면 진행률을 100%로 설정하고 완료 처리
      setProgress(100);
      setIsUploading(false);
      setIsCompleted(true);

      // 3D 모델 데이터 (가정)
      setModelData({
        /* 3D 모델 데이터 */
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  const tabTriggerStyle =
    "gap-x-[9px] rounded-[27px] data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-[#262433]";
  return (
    <Layout className="min-h-screen flex flex-col">
      <main className="flex flex-col items-center bg-background">
        <p className="text-center text-white text-[32px] font-medium font-['Helvetica Neue'] mt-10">
          Create 3D Model
        </p>
        <Tabs
          defaultValue="upload"
          className="flex flex-col justify-center items-center gap-y-[23px]"
        >
          <div className="bg-white rounded-[27px] shadow mt-[51px]">
            <TabsList>
              <TabsTrigger
                value="upload"
                className={`pl-[31px] pr-[20px] py-[14px] ${tabTriggerStyle}`}
              >
                <SmallUploadIcon isActive={true} />
                <p className="w-[123px] text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                  Upload Your Image
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className={`px-[16px] py-[14px] ${tabTriggerStyle}`}
              >
                <SmallWheelIcon isActive={true} />
                <p className="w-44 text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                  Let the AI Process Your Model
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="preview_download"
                className={`px-[23px]  py-[14px] ${tabTriggerStyle}`}
              >
                <SmallDocumentIcon isActive={true} />
                <p className="w-[123px] text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                  {"Preview & Download"}
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="object"
                className={`px-[31px] py-[14px] ${tabTriggerStyle}`}
              >
                <SmallObjectIcon isActive={true} />
                <p className="w-[123px] text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                  Create Paper Toys
                </p>
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="upload" className="w-full">
            <TabContentWrapper title="Upload Your Image" onClick={() => {}}>
              <div className="flex flex-col justify-center items-ceter w-full h-[254px] pl-[54px] pt-[45px] pb-[35px] rounded-[20px] border border-dashed border-[#c9c9c9] mt-6">
                <div className="w-full flex flex-col justify-center items-start gap-y-[14px]">
                  <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
                    ✓ Drag {"&"} Drop your image here or click to upload
                  </p>
                  <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
                    ✓ 이미지 파일을 이곳에 끌어넣거나, 업로드 버튼을 클릭해
                    업로드하세요.
                  </p>
                  <p className="text-[#ff8800] text-xs font-bold font-['SUIT Variable'] pl-[19px]">
                    지원하는 확장자 : JPG, PNG, BMP
                  </p>
                </div>
                <button
                  onClick={() => {}}
                  className="w-full max-w-[162px] h-[45px] px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex mt-12 mx-auto"
                >
                  <p className="text-[#2f2c3f] text-sm font-bold font-['SUIT Variable'] whitespace-nowrap">
                    업로드 파일 선택
                  </p>
                  <PlusIcon />
                </button>
              </div>
            </TabContentWrapper>
          </TabsContent>
          <TabsContent value="progress">
            <TabContentWrapper title="AI Process Your Model" onClick={() => {}}>
              <Progress
                value={60}
                className="w-full max-w-[710px] mx-auto h-[18px] bg-white rounded-[27px] shadow mt-[53px]"
              />
              <div className="w-full max-w-[710px] mx-auto flex flex-col items-start gap-y-[14px] mt-9">
                <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
                  ✓ Your 3D model is being generated, this may take a few
                  moments.
                </p>
                <p className="text-[#2f2c3f] text-base font-medium font-['SUIT Variable']">
                  <span className="font-['Helvetica Neue']">✓</span> Your 3D ✓
                  3D 모델을 생성하는 중입니다. 잠시만 기다려주세요.
                </p>
              </div>
              <div
                id="btn_group"
                className="flex justify-center gap-4 mt-[66px]"
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
            </TabContentWrapper>
          </TabsContent>
          <TabsContent value="preview_download">
            <TabContentWrapper title={"Preview & Download"} onClick={() => {}}>
              <div className="flex flex-col">
                <div className="flex gap-x-7 justify-start items-start mt-7">
                  <Viewer3D />
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
            </TabContentWrapper>
          </TabsContent>
          <TabsContent value="object">
            <TabContentWrapper title="Create Paper Toys" onClick={() => {}}>
              <div className="flex flex-col">
                <div className="flex gap-x-7 justify-start items-start mt-7">
                  <Viewer3D />
                  <div className="h-full pt-3">
                    <p className="text-center text-[#2f2c3f] text-sm font-medium font-['Helvetica Neue'] uppercase">
                      Created file option
                    </p>
                    <Separator className="bg-[#c9c9c9] my-4" />
                    <div className="flex flex-col h-full items-start gap-y-2 pl-[5px]">
                      <div className="flex justify-center items-center">
                        <label className="w-[50px] text-[#2f2c3f] text-xs font-medium font-['SUIT Variable'] uppercase">
                          파일형식
                        </label>
                        <Separator
                          orientation="vertical"
                          className="bg-[#2f2c3f] mx-[14px]"
                        />
                        <p className="w-[47px] text-[#2f2c3f] text-xs font-bold font-['SUIT Variable'] uppercase">
                          OBJ
                        </p>
                      </div>
                      {/*  */}
                      <div className="flex justify-center items-center">
                        <label className="w-[50px] text-[#2f2c3f] text-xs font-medium font-['SUIT Variable'] uppercase">
                          폴리곤 수
                        </label>
                        <Separator
                          orientation="vertical"
                          className="bg-[#2f2c3f] mx-[14px]"
                        />
                        <p className="w-[47px] text-[#2f2c3f] text-xs font-bold font-['SUIT Variable'] uppercase">
                          적음(23)
                        </p>
                      </div>
                      {/*  */}
                      <div className="flex justify-center items-center">
                        <label className="w-[50px] text-[#2f2c3f] text-xs font-medium font-['SUIT Variable'] uppercase">
                          모델 크기
                        </label>
                        <Separator
                          orientation="vertical"
                          className="bg-[#2f2c3f] mx-[14px]"
                        />
                        <p className="w-[79px] text-[#2f2c3f] text-xs font-bold font-['SUIT Variable'] uppercase">
                          적음(35MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="btn_group"
                  className="flex justify-center gap-4 mt-[15px] mb-[25px]"
                >
                  <button className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex">
                    <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                      NEW
                    </p>
                  </button>
                  <button className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex">
                    <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase whitespace-nowrap">
                      RE CREATE
                    </p>
                  </button>
                  <button className="w-[122px] h-11 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex">
                    <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                      Continue
                    </p>
                  </button>
                </div>
              </div>
            </TabContentWrapper>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
};

export default Create3DModel;

{
  /* {!file && !isUploading && (
        <ImageUploadZone onFileUpload={handleUpload} />
      )}
      {file && isUploading && (
        <ProgressViewer progress={progress} />
      )}
      {isCompleted && modelData && (
        <Viewer3D modelData={modelData} />
      )} */
}
