import { useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/router';

interface ImageUploadZoneProps {
  onFileUpload: (file: File) => void;
}

export const ImageUploadZone: React.FC<ImageUploadZoneProps> = ({ onFileUpload }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]); // 첫 번째 파일을 상위 컴포넌트로 전달
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    accept: { 'image/*': ['.jpeg', '.png', '.bmp'] },
  });

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="text-2xl mr-4">←</button>
        <h1 className="text-3xl font-bold">Create 3D Model</h1>
      </div>
      <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg">
        <input {...getInputProps()} />
        <div className="mb-4">
          <div className="text-5xl">📤</div>
          <p className="text-lg font-semibold">Upload your image</p>
        </div>
        {isDragActive ? (
          <p className="text-orange-500">이미지를 여기에 드롭하세요...</p>
        ) : (
          <p className="text-gray-500">
            Drag & Drop your image here or click to upload<br />
            이미지 파일을 이곳에 끌어놓거나, 업로드 버튼을 클릭해 업로드하세요.
          </p>
        )}
        <p className="mt-2 text-orange-500 font-bold">
          지원하는 확장자: JPG, PNG, BMP
        </p>
      </div>

      <button onClick={handleClick} className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
        업로드 파일 선택 +
      </button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onFileUpload(files[0]);
          }
        }}
        accept="image/jpeg, image/png, image/bmp"
      />
    </div>
  );
};
