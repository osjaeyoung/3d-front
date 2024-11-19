import { useEffect, useState } from "react";
import { ThreeDModelViewer } from "./Viewer3D";
import { useModal } from "@/hooks/useModal";
import { MailSenderModal } from "./MailSenderModal";
import axios from "axios";
import { iModels } from "../types";
import { MODELS } from "../constants";
import { RotateIcon } from "@/components/icons";
import { Loader } from "lucide-react";

interface Props {
  onRecreate: () => void;
  selectedFile: File;
}

export const BlenderPreviewZone: React.FC<Props> = ({
  onRecreate,
  selectedFile,
}) => {
  const [modelData, setModelData] = useState<iModels | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    isOpen: isMailSenderOpen,
    onOpen: onMailSenderOpen,
    onClose: onMailSenderClose,
  } = useModal();

  const pollingCSMStatus = async (sessionCode: string) => {
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
          return status.data.data.preview_mesh_url_glb;
        }
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      } catch (error) {
        console.error("Error polling Meshroom status:", error);
        return null;
      }
    }
  };

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        setIsLoading(true);
        const file = selectedFile;
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
            preview_mesh: "fast_sculpt",
            texture_resolution: 128,
            topology: "quads",
            resolution: "low_poly",
            creativity: "lowest",
          },
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_CSM_API_KEY!,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.statusCode === 201) {
          const sessionCode = response.data.data.session_code;
          const glbUrl = await pollingCSMStatus(sessionCode);
          setModelData({
            type: "glb",
            url: glbUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching model data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    // fetchModelData();
  }, [modelData]);

  const handleMailSenderClose = async (content: string) => {
    if (!modelData) return;
    // const email = localStorage.getItem("email");
    // const name = localStorage.getItem("name");
    // try {
    //   const response = await axios.post(`/api/sendWithFile`, {
    //     from: email,
    //     title: name + "님의 모델 오브젝트 요청 파일입니다.",
    //     content: content,
    //     file: {
    //       name: "model.obj",
    //       content: `data:text/plain;base64,${modelData.base64Content}`,
    //     },
    //   });

    //   if (response.status === 200) {
    //     onMailSenderClose();
    //   }
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   onMailSenderClose();
    // }
  };

  const handleDownload = () => {
    // if (modelData && modelData.file) {
    //   const downloadUrl = URL.createObjectURL(modelData.file);
    //   const link = document.createElement("a");
    //   link.href = downloadUrl;
    //   link.download = "model.obj";
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(downloadUrl);
    // }
  };

  return (
    <>
      {isMailSenderOpen && (
        <MailSenderModal
          isOpen={isMailSenderOpen}
          onClose={onMailSenderClose}
          onSend={handleMailSenderClose}
        />
      )}
      <div className="w-full max-w-[710px] mx-auto flex flex-col items-center gap-y-[14px] mt-9">
        <div className="flex flex-col">
          <div className="flex gap-x-7 justify-start items-start mt-7">
            {isLoading ? (
              <div className="bg-[#f4f4f4] relative w-[375px] h-[192px] flex justify-center items-center">
                <div className="absolute z-10 left-[333px] top-[13px]">
                  <Loader className="animate-spin" />
                </div>
              </div>
            ) : (
              modelData && <ThreeDModelViewer modelData={modelData!} />
            )}
          </div>
          <div
            id="btn_group"
            className="flex justify-center gap-4 mt-[15px] mb-[25px]"
          >
            <button
              onClick={onRecreate}
              className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex"
            >
              <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase text-nowrap">
                RE CREATE
              </p>
            </button>
            <button
              onClick={handleDownload}
              className="w-[122px] h-11 px-6 py-3.5 bg-[#c9c9c9] rounded justify-center items-center gap-2.5 inline-flex"
            >
              <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                DOWNLOAD
              </p>
            </button>
            <button
              onClick={onMailSenderOpen}
              className="w-[122px] h-11 px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex"
            >
              <p className="text-[#2f2c3f] text-sm font-bold font-['Helvetica'] uppercase">
                SEND
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
