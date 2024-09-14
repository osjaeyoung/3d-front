import { Layout } from '@/components';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from "react-hook-form";


const SignInPage = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data:any) => {
      console.log(data);
  }
    
  return (
    <Layout className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="relative w-full h-[300px]">
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Main Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full mt-8">
          <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
          
          {/* 아이디 및 비밀번호 입력 필드 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                아이디
              </label>
              <input 
                type="text"
                {...register("id", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input 
                type="password"
                {...register("password", { required: true })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md"
              >
                로그인
              </button>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-md"
              >
                카카오 계정으로 로그인
              </button>
            </div>
          </form>

          <div className="flex justify-center items-center mt-6 text-center space-x-4">
            <Link href="/signup">
              <p className="text-sm text-gray-600 hover:underline">회원가입</p>
            </Link>
            <span>|</span>
            <Link href="/forgot-id">
              <p className="text-sm text-gray-600 hover:underline">다른 SNS 계정으로 로그인</p>
            </Link>
            <span>|</span>
            <Link href="/forgot-password">
              <p className="text-sm text-gray-600 hover:underline">아이디/비밀번호 찾기</p>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SignInPage;
