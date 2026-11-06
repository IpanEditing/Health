import { Link } from "react-router-dom";
import { Activity, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function MobileLanding() {
  return (
    <div className="min-h-screen flex flex-col justify-between px-6 py-12 bg-gradient-to-b from-orange-50 via-white to-gray-100">
      
      {/* HEADER / LOGO */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/30 mb-3">
          <Activity size={32} className="stroke-[2.5]" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-gray-900">
          HEALTH<span className="text-orange-500">.</span>
        </h1>
        <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mt-0.5">
          Analytics & Growth Ecosystem
        </p>
      </div>

      {/* HERO COPY */}
      <div className="my-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-4">
          <Sparkles size={14} />
          <span>Platform Diagnosis Bisnis UMKM</span>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
          Evaluasi Vitalitas Usaha Lebih <span className="text-orange-500">Cerdas</span>
        </h2>

        <p className="mt-4 text-sm text-gray-600 leading-relaxed px-2">
          Transformasi data operasional menjadi wawasan strategis 6 dimensi untuk mempercepat pertumbuhan bisnis Anda.
        </p>

        {/* HIGHLIGHT POINTS */}
        <div className="mt-6 flex flex-col gap-2.5 text-xs text-gray-600 items-start max-w-xs mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
            <span>Diagnosis cepat dalam 3 menit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
            <span>Visualisasi skor kesehatan otomatis</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
            <span>Rekomendasi pertumbuhan berbasis AI</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="space-y-3 w-full max-w-sm mx-auto">
        <Link
          to="/registrasi"
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all active:scale-95 text-center"
        >
          <span>Daftar Akun Baru</span>
          <ArrowRight size={18} />
        </Link>

        <Link
          to="/login"
          className="w-full block text-center bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-semibold py-3.5 rounded-2xl shadow-sm transition-all"
        >
          Masuk ke Dashboard
        </Link>

        <p className="text-center text-[11px] text-gray-400 pt-2">
          © 2026 Health Analytics Suite
        </p>
      </div>

    </div>
  );
}
