import imageCustom from "../assets/images.png";
import { BarChart3, Zap, TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function Features() {
  return (
    <section id="fitur" className="py-24 px-6 sm:px-10 lg:px-16 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100/90 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
            Solusi Terintegrasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Instrumen Lengkap untuk Diagnosa Bisnis
          </h2>
          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            Health menyediakan tolok ukur terpadu untuk memantau setiap indikator vitalitas bisnis Anda secara berkala dan akurat.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          
          {/* CARD 1: ANALITIK BISNIS (WHITE CARD WITH ORANGE ACCENT) */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                Analitik Bisnis Komprehensif
              </h3>
              <p className="text-gray-500 text-sm sm:text-base mt-3 leading-relaxed">
                Visualisasikan tren pasar, kesehatan finansial, dan performa produk melalui diagram radar dan metrik yang mudah dipahami oleh pemilik usaha.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-orange-600 transition-colors">
              <span>6 Dimensi Evaluasi</span>
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* CARD 2: OPTIMASI AI (CHARCOAL SLATE WITH ORANGE ACCENTS) */}
          <div className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 text-white p-8 rounded-3xl shadow-xl shadow-gray-900/10 flex flex-col justify-between overflow-hidden group">
            {/* AMBIENT ORANGE GLOW */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-500/25 transition-all duration-500" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={28} />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  AI Powered
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Optimasi Operasional Cerdas
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                Identifikasi inefisiensi alur operasional dan dapatkan rekomendasi berbasis kecerdasan buatan untuk mereduksi beban biaya secara presisi.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 relative z-10 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-orange-400 transition-colors">
              <span>Rekomendasi Terarah</span>
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* CARD 3: PERTUMBUHAN UMKM (WHITE CARD) */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                Benchmark Industri UMKM
              </h3>
              <p className="text-gray-500 text-sm sm:text-base mt-3 leading-relaxed">
                Bandingkan performa usaha Anda dengan rata-rata industri sejenis untuk mengetahui posisi kompetitif dan peluang penetrasi pasar baru.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-orange-600 transition-colors">
              <span>Perbandingan Riil</span>
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* CARD 4: KEAMANAN DATA (IMAGE OVERLAY WITH CHARCOAL & ORANGE) */}
          <div className="relative rounded-3xl overflow-hidden group min-h-[220px] shadow-sm hover:shadow-xl transition-all duration-300">
            {/* BACKGROUND IMAGE */}
            <img
              src={imageCustom}
              alt="Security Infrastructure"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-gray-900/40" />

            {/* CONTENT */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md text-orange-400 flex items-center justify-center border border-white/20">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  Keamanan Data Enterprise
                </h3>
                <p className="text-gray-200 text-sm mt-2 max-w-md leading-relaxed">
                  Enkripsi berlapis untuk menjamin setiap data profil, omzet, dan hasil evaluasi usaha Anda tetap terlindungi dan berintegritas.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
