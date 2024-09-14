import { Header, Footer } from "@/components";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="flex flex-col items-center min-h-screen">
        <div className="relative w-full h-[760px]">
          <Image 
            src="https://via.placeholder.com/1440x1080" 
            alt="Main Image" 
            layout="fill" // 이미지가 div 영역에 꽉 차도록 설정
            objectFit="cover" // 이미지가 영역을 커버하도록 설정
            priority // 페이지 로드 시 우선 로드
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white">
            <h1 className="text-4xl font-bold">Turn Your 2D Art into 3D Models<br/> with a Single Click</h1>
            <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-md text-xl">
              Get started
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
