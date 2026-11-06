import { Link } from "react-router-dom";
import { Activity, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6 sm:px-10 lg:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
                <Activity size={22} className="stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Health<span className="text-orange-500">.</span>
              </span>
            </Link>

            <p className="text-gray-400 mt-4 max-w-sm text-sm leading-relaxed">
              Platform analisis dan diagnosa kesehatan bisnis terdepan untuk mendukung transformasi digital UMKM dan korporasi secara terukur dan berkelanjutan.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistem Operasional 99.9% Online</span>
            </div>
          </div>

          {/* COLUMN 2: NAVIGASI */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#beranda" className="hover:text-orange-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-orange-400 transition-colors">
                  Fitur Unggulan
                </a>
              </li>
              <li>
                <a href="#metrik" className="hover:text-orange-400 transition-colors">
                  Metrik Asesmen
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-400 transition-colors">
                  Masuk Akun
                </Link>
              </li>
              <li>
                <Link to="/registrasi" className="hover:text-orange-400 transition-colors">
                  Pendaftaran Baru
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: LEGAL & SUPPORT */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Bantuan & Kebijakan
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privasi" className="hover:text-orange-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link to="/syarat-ketentuan" className="hover:text-orange-400 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:text-orange-400 transition-colors flex items-center gap-1">
                  <span>Hubungi Kami</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li className="pt-2 text-xs text-gray-500">
                Email Dukungan:
                <span className="block text-gray-300 font-medium mt-0.5">support@health.id</span>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Health Analytics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Dirancang dengan kombinasi Oren, Putih & Abu</span>
            <span>Versi 2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
