export const Footer = () => {
  return (
    <footer className="flex justify-between bg-gray-100 p-4 text-center text-sm">
      <div className="flex flex-col items-start">
        <p>경기 용인시 처인구 동부로 61 용인예술과학대 창의관 506-1호</p>
        <p>Email: boriocoder@gmail.com | FAX: 0507-1382-2518</p>
        <p>© 2024 DIYPAPER. All Rights Reserved.</p>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#" className="hover:opacity-75">🌐</a>
        <a href="#" className="hover:opacity-75">💬</a>
        <a href="#" className="hover:opacity-75">📸</a>
      </div>
    </footer>
  );
};