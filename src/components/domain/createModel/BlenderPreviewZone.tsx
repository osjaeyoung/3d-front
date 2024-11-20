import { useEffect, useState } from "react";
import { ThreeDModelViewer } from "./Viewer3D";
import { useModal } from "@/hooks/useModal";
import { MailSenderModal } from "./MailSenderModal";
import axios from "axios";
import { iModels } from "../types";
import { MODELS } from "../constants";
import { RotateIcon } from "@/components/icons";
import { Loader } from "lucide-react";
import axiosInstance from "@/lib/axios";

interface Props {
  onRecreate: () => void;
  meshUrl: string;
}

export const BlenderPreviewZone: React.FC<Props> = ({
  onRecreate,
  meshUrl,
}) => {
  console.log({ meshUrl });

  const [modelData, setModelData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    isOpen: isMailSenderOpen,
    onOpen: onMailSenderOpen,
    onClose: onMailSenderClose,
  } = useModal();

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const blenderResponse = await axiosInstance.post(
          "/proxy/blender/run",
          { meshUrl: meshUrl },
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (blenderResponse.status === 201) {
          const response = await axiosInstance(
            `/proxy/file/download?type=blender`,
            {
              responseType: "blob",
            }
          );
          const originalResponse = await axiosInstance(
            `/proxy/file/download?type=blender`
          );
          const base64Content = btoa(originalResponse.data);
          const blob = new Blob([response.data], { type: "text/plain" });
          const file = new File([blob], "model.obj", { type: "text/plain" });
          const fileUrl = URL.createObjectURL(file);

          setModelData({
            file: file,
            url: fileUrl,
            content: originalResponse.data,
            base64Content: base64Content,
          });
        }
      } catch (error) {
        console.error("Error fetching model data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModelData();
  }, []);

  const handleMailSenderClose = async (content: string) => {
    if (!modelData) return;
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    try {
      const response = await axios.post(`/api/sendWithFile`, {
        from: email,
        title: name + "님의 모델 오브젝트 요청 파일입니다.",
        content: content,
        file: {
          name: "model.obj",
          content: `data:text/plain;base64,${modelData.base64Content}`,
        },
      });

      if (response.status === 200) {
        onMailSenderClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      onMailSenderClose();
    }
  };

  const handleDownload = () => {
    if (modelData && modelData.file) {
      const downloadUrl = URL.createObjectURL(modelData.file);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "model.obj";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    }
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
