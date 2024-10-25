import { Layout } from "@/components";
import {
  ImageUploadZone,
  ProgressViewer,
  PreviewZone,
  BlenderPreviewZone,
  MailSenderModal,
} from "@/components/domain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthenticationModal } from "@/components/domain";
import {
  SmallUploadIcon,
  SmallDocumentIcon,
  SmallObjectIcon,
  SmallWheelIcon,
  ArrowBackIcon,
  PlusIcon,
} from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { useAuth, useModal } from "@/hooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

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

const tabTriggerStyle =
  "gap-x-[9px] rounded-[27px] data-[state=active]:shadow data-[state=active]:border data-[state=active]:border-[#262433]";

const Create3DModel = () => {
  const router = useRouter();

  const [tab, setTab] = useState<
    "upload" | "progress" | "preview_download" | "object"
  >("upload");
  const [progress, setProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPreviewFiles, setSelectedPreviewFiles] = useState<string[]>(
    []
  );
  const { isAuthenticated } = useAuth();
  const { isOpen, onOpen, onClose } = useModal();

  useEffect(() => {
    if (!isAuthenticated) {
      onOpen();
    }
  }, [isAuthenticated]);

  const handleUpload = async () => {
    setTab("progress");
    setIsUploading(true);
    setProgress(0);

    try {
      const validFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/bmp",
      ];
      const validFiles = selectedFiles.filter((file) =>
        validFileTypes.includes(file.type)
      );

      if (validFiles.length === 0) {
        throw new Error(
          "유효한 이미지 파일을 선택해주세요. (jpg, jpeg, png, bmp)"
        );
      }

      if (validFiles.length > 6) {
        throw new Error("최대 6개의 파일만 업로드할 수 있습니다.");
      }

      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append(`files`, file);
      });
      const response = await axiosInstance.post(`/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201 && response.data === "ok") {
        await axiosInstance.post(`/meshroom/run`, null, {
          headers: {
            Accept: "application/json",
          },
        });
        await pollMeshroomStatus();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const pollMeshroomStatus = async () => {
    const pollInterval = 3000;
    const maxSteps = 13;
    while (true) {
      try {
        const status = await axiosInstance("/meshroom/state");
        const currentStep = status.data.step;
        setProcessingStep(currentStep);
        setProgress((currentStep / maxSteps) * 100);
        if (currentStep === maxSteps) {
          setTab("preview_download");
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      } catch (error) {
        console.error("Error polling Meshroom status:", error);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setSelectedPreviewFiles((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleClose = () => {
    onClose();
    router.push("/signin");
  };

  const handleReCreate = () => {
    setTab("upload");
    setSelectedFiles([]);
  };

  return (
    <>
      {isOpen && <AuthenticationModal isOpen={isOpen} onClose={handleClose} />}
      <Layout className="min-h-screen flex flex-col">
        <main className="flex flex-col items-center bg-background h-[calc(100vh-178px)]">
          <p className="text-center text-white text-[32px] font-medium font-['Helvetica Neue'] mt-10">
            Create 3D Model
          </p>
          <Tabs
            value={tab}
            className="flex flex-col justify-center items-center gap-y-[23px]"
          >
            <div className="bg-white rounded-[27px] shadow mt-[51px]">
              <TabsList>
                <TabsTrigger
                  value="upload"
                  className={`pl-[31px] pr-[20px] py-[14px] ${tabTriggerStyle}`}
                  onClick={() => {
                    setTab("upload");
                  }}
                >
                  <SmallUploadIcon isActive={tab === "upload"} />
                  <p className="w-[123px] text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                    Upload Your Image
                  </p>
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className={`px-[16px] py-[14px] ${tabTriggerStyle}`}
                >
                  <SmallWheelIcon isActive={tab === "progress"} />
                  <p className="w-44 text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                    Let the AI Process Your Model
                  </p>
                </TabsTrigger>
                <TabsTrigger
                  value="preview_download"
                  className={`px-[23px]  py-[14px] ${tabTriggerStyle}`}
                  onClick={() => {
                    setTab("preview_download");
                  }}
                >
                  <SmallDocumentIcon isActive={tab === "preview_download"} />
                  <p className="w-[123px] text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                    {"Preview & Download"}
                  </p>
                </TabsTrigger>
                <TabsTrigger
                  value="object"
                  className={`px-[31px] py-[14px] ${tabTriggerStyle}`}
                >
                  <SmallObjectIcon isActive={tab === "object"} />
                  <p className="w-[123px] text-[#c9c9c9] text-xs font-bold font-['Helvetica Neue']">
                    Create Paper Toys
                  </p>
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="upload" className="w-full">
              <TabContentWrapper title="Upload Your Image" onClick={() => {}}>
                <ImageUploadZone
                  selectedFiles={selectedFiles}
                  setSelectedFiles={setSelectedFiles}
                  selectedPreviewFiles={selectedPreviewFiles}
                  setSelectedPreviewFiles={setSelectedPreviewFiles}
                  removeFile={removeFile}
                  handleUpload={handleUpload}
                  isUploading={isUploading}
                />
              </TabContentWrapper>
            </TabsContent>
            <TabsContent value="progress">
              <TabContentWrapper
                title="AI Process Your Model"
                onClick={() => {}}
              >
                <ProgressViewer
                  progress={progress}
                  processingStep={processingStep}
                />
              </TabContentWrapper>
            </TabsContent>
            <TabsContent value="preview_download">
              <TabContentWrapper title="Preview & Download" onClick={() => {}}>
                <PreviewZone
                  onRecreate={handleReCreate}
                  onContinue={() => {
                    setTab("object");
                  }}
                />
              </TabContentWrapper>
            </TabsContent>
            <TabsContent value="object">
              <TabContentWrapper title="Create Paper Toys" onClick={() => {}}>
                <BlenderPreviewZone onRecreate={handleReCreate} />
              </TabContentWrapper>
            </TabsContent>
          </Tabs>
        </main>
      </Layout>
    </>
  );
};

export default Create3DModel;
