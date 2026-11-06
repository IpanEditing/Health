import heroImg from "../assets/Container.png";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-gray-50/60 py-16 md:py-24 px-6 sm:px-10 lg:px-16">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {/* LEFT COLUMN - TEXT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-700 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles size={16} className="text-orange-500" />
            <span>PLATFORM DIAGNOSIS KESEHATAN UMKM</span>
          </div>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
            Kendalikan & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600">
              Tingkatkan Kesehatan
            </span> <br />
            Bisnis Anda.
          </h1>

          {/* SUBTITLE */}
          <p className="text-gray-600 text-base sm:text-lg mt-6 leading-relaxed max-w-xl">
            <strong className="text-gray-800 font-semibold">Health Analytics</strong> menyederhanakan data operasional kompleks menjadi wawasan strategis berbasis 6 dimensi utama untuk mendorong efisiensi dan laba maksimal.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap items-center gap-4 mt-8 w-full sm:w-auto">
            <Link to="/registrasi" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 group active:scale-95">
                <span>Mulai Asesmen Gratis</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <a href="#fitur" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white hover:bg-gray-100 text-gray-700 font-semibold px-6 py-3.5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-all text-center">
                Pelajari Fitur
              </button>
            </a>
          </div>

          {/* TRUST POINTS */}
          <div className="flex flex-wrap items-center gap-5 mt-10 pt-6 border-t border-gray-200/80 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-orange-500" />
              <span>Diagnosis 3 Menit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-orange-500" />
              <span>Rekomendasi Cerdas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-orange-500" />
              <span>Data Terenkripsi</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - VISUAL SHOWCASE */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[500px]">
            {/* AMBIENT GLOW */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-3xl blur-xl" />

            {/* MAIN IMAGE CONTAINER */}
            <div className="relative bg-white p-3 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <img
                src={heroImg}
                alt="Health Dashboard Preview"
                className="w-full h-auto rounded-2xl object-cover hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* FLOATING CARD 1: DIAGNOSIS SCORE */}
            <div className="hidden sm:flex items-center gap-3 absolute -top-4 -left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gray-100 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Skor Kesehatan</p>
                <p className="text-sm font-black text-gray-800">92/100 <span className="text-orange-600 text-xs font-semibold">(Sangat Sehat)</span></p>
              </div>
            </div>

            {/* FLOATING CARD 2: REALTIME EFFICIENCY */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Efisiensi Usaha</p>
                <p className="text-sm font-black text-gray-800">+34% <span className="text-gray-500 text-xs font-medium">Bulan Ini</span></p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
