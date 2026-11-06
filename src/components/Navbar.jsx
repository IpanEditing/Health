import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Navbar({ active }) {
  const location = useLocation();

  // 🔥 CEK HALAMAN AUTH ATAU DASHBOARD
  const isAuthPage =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/registrasi";

  // Ambil data user secara aman untuk ekstraksi username
  const currentUser = (() => {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })();

  const displayName = currentUser?.username || currentUser?.name || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
          <Activity size={20} className="stroke-[2.5]" />
        </div>
        <h1 className="font-extrabold text-xl tracking-tight text-gray-900">
          Health<span className="text-orange-500">.</span>
        </h1>
      </Link>

      {/* MENU */}
      <div className="hidden sm:flex gap-4 md:gap-8 text-sm text-gray-600 font-medium">
        <span className="text-orange-600 font-semibold cursor-pointer">Beranda</span>
        <span className="hover:text-orange-600 transition-colors cursor-pointer">Asesmen</span>
        <span className="hover:text-orange-600 transition-colors cursor-pointer">Perbandingan</span>
        <span className="hover:text-orange-600 transition-colors cursor-pointer">Rekomendasi</span>
        <span className="hover:text-orange-600 transition-colors cursor-pointer">Eksplorasi</span>
      </div>

      {/* CONDITIONAL */}
      {isAuthPage ? (
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-gray-700 hover:text-orange-600 text-sm font-medium transition-colors">
            Masuk
          </Link>
          <Link
            to="/registrasi"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-all"
          >
            Daftar
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <span className="text-xs font-semibold text-gray-700">
              {displayName}
            </span>
            <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
              {avatarLetter}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
