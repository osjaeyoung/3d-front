import { useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { PlusIcon } from "@/components/icons";

interface ImageUploadZoneProps {
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  selectedPreviewFiles: string[];
  setSelectedPreviewFiles: React.Dispatch<React.SetStateAction<string[]>>;
  removeFile: (index: number) => void;
  handleUpload: () => void;
  isUploading: boolean;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({
  selectedFiles,
  setSelectedFiles,
  selectedPreviewFiles,
  setSelectedPreviewFiles,
  removeFile,
  handleUpload,
  isUploading,
}: ImageUploadZoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setSelectedPreviewFiles((prevFiles) => [
          ...prevFiles,
          ...acceptedFiles.map((file) => URL.createObjectURL(file)),
        ]);
      }
    },
    [setSelectedFiles, setSelectedPreviewFiles]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...(files as any)]);
      setSelectedPreviewFiles((prevFiles) => [
        ...prevFiles,
        ...Array.from(files).map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: { "image/*": [".jpeg", ".png", ".bmp"] },
  });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div title="Upload Your Image">
      {selectedFiles.length === 0 && (
        <div className="flex flex-col justify-center items-center w-full h-[254px] pl-[54px] pt-[45px] pb-[35px] rounded-[20px] border border-dashed border-[#c9c9c9] mt-6">
          <div className="w-full flex flex-col justify-center items-start gap-y-[14px]">
            <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
              ✓ Drag {"&"} Drop your image here or click to upload
            </p>
            <p className="text-[#2f2c3f] text-base font-medium font-['Helvetica Neue']">
              ✓ 이미지 파일을 이곳에 끌어넣거나, 업로드 버튼을 클릭해
              업로드하세요.
            </p>
            <p className="text-[#ff8800] text-xs font-bold font-['SUIT Variable'] pl-[19px]">
              지원하는 확장자 : JPG, PNG, BMP (최대 6개 파일)
            </p>
            <label
              htmlFor="fileInput"
              className="w-full max-w-[162px] h-[45px] px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex mt-12 mx-auto cursor-pointer"
            >
              <p className="text-[#2f2c3f] text-sm font-bold font-['SUIT Variable'] whitespace-nowrap">
                업로드 파일 선택
              </p>
              <PlusIcon />
            </label>
          </div>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="flex flex-col justify-center items-center w-full h-[254px] pt-[45px] pb-[35px] rounded-[20px] border border-dashed border-[#c9c9c9] mt-6">
          <div className="flex w-full justify-center items-center gap-x-[30px]">
            {selectedPreviewFiles.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full max-h-[150px] object-cover rounded"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div
            id="btn_group"
            className="flex justify-center items-center gap-x-4"
          >
            <label
              htmlFor="fileInput"
              className="w-full max-w-[162px] h-[45px] px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex mt-12 mx-auto cursor-pointer"
            >
              <p className="text-[#2f2c3f] text-sm font-bold font-['SUIT Variable'] whitespace-nowrap">
                업로드 파일 선택
              </p>
              <PlusIcon />
            </label>
            <button
              onClick={handleUpload}
              className="w-full max-w-[162px] h-[45px] px-6 py-3.5 bg-[#ffb600] rounded justify-center items-center gap-2.5 inline-flex mt-12 mx-auto cursor-pointer"
            >
              <p className="text-[#2f2c3f] text-sm font-bold font-['SUIT Variable'] whitespace-nowrap">
                업로드
              </p>
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        id="fileInput"
        accept=".jpg,.png,.bmp,.jpeg"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};
