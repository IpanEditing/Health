import { Link } from "react-router-dom";
import { useState } from "react";
import { Activity, Menu, X, ArrowRight } from "lucide-react";

export default function NavbarLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
            <Activity size={22} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
              Health<span className="text-orange-500">.</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 -mt-1">
              Analytics Suite
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#beranda" className="text-orange-600 font-semibold transition-colors">
            Beranda
          </a>
          <a href="#fitur" className="hover:text-orange-600 transition-colors">
            Fitur
          </a>
          <a href="#metrik" className="hover:text-orange-600 transition-colors">
            Metrik Asesmen
          </a>
          <a href="#langkah" className="hover:text-orange-600 transition-colors">
            Cara Kerja
          </a>
          <Link to="/kontak" className="hover:text-orange-600 transition-colors">
            Kontak
          </Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-gray-700 hover:text-orange-600 font-medium px-4 py-2 text-sm transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/registrasi"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition-all hover:shadow-orange-500/40 active:scale-95 flex items-center gap-1.5"
          >
            <span>Daftar Gratis</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-orange-600 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 shadow-xl flex flex-col gap-3">
          <a
            href="#beranda"
            onClick={() => setMobileOpen(false)}
            className="text-orange-600 font-semibold py-2"
          >
            Beranda
          </a>
          <a
            href="#fitur"
            onClick={() => setMobileOpen(false)}
            className="text-gray-600 hover:text-orange-600 py-2"
          >
            Fitur
          </a>
          <a
            href="#metrik"
            onClick={() => setMobileOpen(false)}
            className="text-gray-600 hover:text-orange-600 py-2"
          >
            Metrik Asesmen
          </a>
          <a
            href="#langkah"
            onClick={() => setMobileOpen(false)}
            className="text-gray-600 hover:text-orange-600 py-2"
          >
            Cara Kerja
          </a>
          <Link
            to="/kontak"
            onClick={() => setMobileOpen(false)}
            className="text-gray-600 hover:text-orange-600 py-2"
          >
            Kontak
          </Link>
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/login"
              className="text-center text-gray-700 py-2 font-medium"
            >
              Masuk
            </Link>
            <Link
              to="/registrasi"
              className="text-center bg-orange-500 text-white py-2.5 rounded-xl font-semibold shadow-md shadow-orange-500/20"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
