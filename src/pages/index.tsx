import { Layout } from "@/components";
import { ArrowIcon } from "@/components/icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";
import { useState, useEffect } from "react";
const Home = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [clientSideAuth, setClientSideAuth] = useState(false);

  useEffect(() => {
    setClientSideAuth(isAuthenticated);
  }, [isAuthenticated]);

  const handleClickStarted = () => {
    if (clientSideAuth) {
      router.push("/intro");
    } else {
      router.push("/signin");
    }
  };

  return (
    <Layout>
      <main className="flex flex-col items-center h-[calc(100vh-178px)]">
        <div className="relative w-full h-full">
          <Image
            src="/image/main_img.png"
            alt="Main Image"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white gap-y-[45px]">
            <p className="text-center text-white text-4xl font-medium font-['Helvetica Neue']">
              Turn Your 2D Art into 3D Models <br />
              with a Single Click
            </p>
            <button
              onClick={handleClickStarted}
              className="h-12 px-6 py-3 bg-gradient rounded-[10px] justify-center items-center gap-3 inline-flex"
            >
              <p className="text-white text-xl font-bold font-['Helvetica Neue']">
                GET STARTED
              </p>
              <ArrowIcon />
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
