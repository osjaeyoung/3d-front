import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  return (
    <header className="bg-white shadow-md p-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">HOME</Link>
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link href="/intro" className={`${isActive('/intro') ? 'font-bold underline' : 'hover:text-orange-500'}`}>
              How It Works
            </Link>
          </li>
          <li>
            <Link href="/create" className={`${isActive('/create') ? 'font-bold underline' : 'hover:text-orange-500'}`}>
              Create 3D Model
            </Link>
          </li>
          <li>
            <Link href="/my" className={`${isActive('/my') ? 'font-bold underline' : 'hover:text-orange-500'}`}>
              My Models
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`${isActive('/contact') ? 'font-bold underline' : 'hover:text-orange-500'}`}>
              Contact
            </Link>
          </li>
        </ul>
        <button onClick={() => router.push("/signin")} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
            Login
        </button>
      </nav>
    </header>
  );
};
