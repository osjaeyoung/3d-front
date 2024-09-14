import { Layout } from '@/components';
import { ImageUploadZone, ProgressViewer, Viewer3D } from '@/components/domain';
import { useState } from 'react';

const Create3DModel = () => {
  // 상태 관리
  const [file, setFile] = useState<File | null>(null);  // 업로드할 파일
  const [progress, setProgress] = useState(0);          // 진행률
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
      setModelData({ /* 3D 모델 데이터 */ });
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  return (
    <Layout className='min-h-screen flex flex-col'>
      {!file && !isUploading && (
        <ImageUploadZone onFileUpload={handleUpload} />
      )}
      {file && isUploading && (
        <ProgressViewer progress={progress} />
      )}
      {isCompleted && modelData && (
        <Viewer3D modelData={modelData} />
      )}
    </Layout>
  );
};

export default Create3DModel;
