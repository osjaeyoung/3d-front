import { Layout } from "@/components";
import {
  ImageUploadZone,
  ProgressViewer,
  PreviewZone,
  BlenderPreviewZone,
} from "@/components/domain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthenticationModal } from "@/components/domain";
import {
  SmallUploadIcon,
  SmallDocumentIcon,
  SmallObjectIcon,
  SmallWheelIcon,
  ArrowBackIcon,
} from "@/components/icons";
import { useAuth, useModal } from "@/hooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
  const [glbUrl, setGlbUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPreviewFiles, setSelectedPreviewFiles] = useState<string[]>(
    []
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [status, setStatus] = useState<
    "uploading" | "processing" | "completed" | "error"
  >("uploading");
  const [meshUrl, setMeshUrl] = useState<string | null>(null);
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
    setUploadProgress(0);
    setProcessProgress(0);
    setStatus("uploading");

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

      if (validFiles.length > 1) {
        throw new Error("한 번에 하나의 이미지만 처리할 수 있습니다.");
      }

      const file = validFiles[0];
      const base64WithMimeType = await new Promise<string>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        }
      );

      const response = await axios.post(
        "https://api.csm.ai/image-to-3d-sessions",
        {
          image_url: base64WithMimeType,
          refine_speed: "slow",
          // preview_mesh: "turbo",
          preview_mesh: "fast_sculpt",
          texture_resolution: 2048,
          topology: "tris",
          resolution: "high_poly",
          creativity: "highest",
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CSM_API_KEY!,
            "Content-Type": "application/json",
          },
          onUploadProgress: (progressEvent) => {
            setStatus("processing");
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 100)
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      if (response.data.statusCode === 201) {
        const sessionCode = response.data.data.session_code;
        const { glbUrl, meshUrl } = await pollingCSMStatus(sessionCode);
        setGlbUrl(glbUrl);
        setMeshUrl(meshUrl);
        setTab("preview_download");
      }
    } catch (error) {
      setStatus("error");
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setSelectedPreviewFiles((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const getPreviewMesh = async (
    sessionCode: string,
    base64WithMimeType: unknown
  ) => {
    try {
      const response = await axios.post(
        `https://api.csm.ai/image-to-3d-sessions/get-3d/preview/${sessionCode}`,
        {
          selected_spin_index: 0,
          selected_spin: base64WithMimeType,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CSM_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data.status;
    } catch (error) {
      console.error("Error getting preview mesh:", error);
      throw error;
    }
  };

  const pollingCSMStatus = async (
    sessionCode: string
  ): Promise<{ glbUrl: string | null; meshUrl: string | null }> => {
    const pollInterval = 5000;
    while (true) {
      try {
        const status = await axios.get(
          `https://api.csm.ai/image-to-3d-sessions/${sessionCode}`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_CSM_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );
        if (status.data.data.status === "preview_done") {
          setProcessProgress(100);
          return {
            glbUrl: status.data.data.preview_mesh_url_glb,
            meshUrl: status.data.data.preview_mesh_url,
          };
        }
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      } catch (error) {
        console.error("Error polling Meshroom status:", error);
        return { glbUrl: null, meshUrl: null };
      }
    }
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
                  onClick={() => {
                    setTab("progress");
                  }}
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
                  onClick={() => {
                    setTab("object");
                  }}
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
              <TabContentWrapper title="AI Process Your Model">
                <ProgressViewer
                  uploadProgress={uploadProgress}
                  processProgress={processProgress}
                  status={status}
                />
              </TabContentWrapper>
            </TabsContent>
            <TabsContent value="preview_download">
              <TabContentWrapper title="Preview & Download" onClick={() => {}}>
                <PreviewZone
                  glbUrl={glbUrl!}
                  onRecreate={handleReCreate}
                  onContinue={() => {
                    setTab("object");
                  }}
                />
              </TabContentWrapper>
            </TabsContent>
            <TabsContent value="object">
              <TabContentWrapper title="Create Paper Toys">
                <BlenderPreviewZone
                  onRecreate={handleReCreate}
                  meshUrl={meshUrl!}
                />
              </TabContentWrapper>
            </TabsContent>
          </Tabs>
        </main>
      </Layout>
    </>
  );
};

export default Create3DModel;
