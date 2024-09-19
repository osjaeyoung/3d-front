import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const handleSigninPage = () => router.push("/signin");

  return (
    <header className="bg-background shadow-md px-10 pt-10 pb-[30px] border-b border-white ">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link
            href="/"
            className="text-white text-xl font-bold font-['Helvetica Neue']"
          >
            HOME
          </Link>
        </div>
        <div className="flex gap-x-10">
          <ul className="flex gap-x-10">
            <li>
              <Link href="/intro" className="text-white text-xl">
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="text-white text-xl font-medium font-['Helvetica Neue']"
              >
                Create 3D Model
              </Link>
            </li>
          </ul>
          <button
            onClick={handleSigninPage}
            className="w-[76px] h-[26px] bg-gradient px-2.5 py-0.5 rounded-[20px] justify-center items-center gap-2.5 inline-flex"
          >
            <div className="text-white text-sm font-bold font-['Helvetica Neue']">
              LOGIN
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};
