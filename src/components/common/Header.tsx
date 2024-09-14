import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">HOME</Link>
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link href="/intro" className="hover:text-orange-500">How It Works</Link>
          </li>
          <li>
            <Link href="/create" className="hover:text-orange-500">Create 3D Model</Link>
          </li>
          <li>
            <Link href="/my" className="hover:text-orange-500">My Models</Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange-500">Contact</Link>
          </li>
        </ul>
        <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
            Login
        </button>
      </nav>
    </header>
  );
};
