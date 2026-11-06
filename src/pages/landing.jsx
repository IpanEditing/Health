import NavbarLanding from "../components/NavbarLanding";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Footer from "../components/Footer";
import MobileLanding from "./MobileLanding";
import { Link } from "react-router-dom";
import { ClipboardList, PieChart, Lightbulb, ArrowRight } from "lucide-react";

export default function Landing() {
  const steps = [
    {
      num: "01",
      icon: ClipboardList,
      title: "Isi Asesmen Singkat",
      desc: "Lengkapi 6 metrik utama seputar keuangan, pasar, operasional, dan organisasi dalam 3 menit.",
    },
    {
      num: "02",
      icon: PieChart,
      title: "Analisis Skor Instan",
      desc: "Sistem mengkalkulasi skor vitalitas usaha secara komprehensif lengkap dengan diagram radar.",
    },
    {
      num: "03",
      icon: Lightbulb,
      title: "Terapkan Solusi Strategis",
      desc: "Dapatkan rekomendasi berbasis data dan benchmark industri untuk percepatan pertumbuhan bisnis.",
    },
  ];

  return (
    <>
      {/* MOBILE SPECIFIC LANDING */}
      <div className="block md:hidden">
        <MobileLanding />
      </div>

      {/* FULL DESKTOP & TABLET LANDING */}
      <div className="hidden md:block bg-white text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
        <NavbarLanding />
        <Hero />
        <Stats />
        <Features />

        {/* WORKFLOW / CARA KERJA SECTION */}
        <section id="langkah" className="py-24 px-6 sm:px-10 lg:px-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100/90 text-orange-700 text-xs font-bold uppercase tracking-wider mb-3">
                Alur Kerja Praktis
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                3 Langkah Mudah Menuju Bisnis Sehat
              </h2>
              <p className="mt-4 text-gray-600 text-base leading-relaxed">
                Tingkatkan kapabilitas pengambilan keputusan strategis tanpa proses rumit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 relative">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="relative bg-gray-50/70 p-8 rounded-3xl border border-gray-100 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 group"
                  >
                    {/* STEP NUMBER */}
                    <span className="text-4xl font-black text-gray-200 group-hover:text-orange-200 transition-colors">
                      {step.num}
                    </span>

                    {/* ICON CONTAINER */}
                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 text-orange-500 flex items-center justify-center my-6 shadow-sm group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300">
                      <Icon size={26} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CALL TO ACTION BANNER */}
            <div className="mt-16 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-xl">
                <span className="text-orange-400 font-bold text-xs uppercase tracking-wider">
                  Siap Melangkah Lebih Jauh?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
                  Uji Vitalitas Bisnis Anda Sekarang Bersama Health.
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mt-2">
                  Daftarkan organisasi Anda gratis dan nikmati akses instan ke seluruh modul diagnostik.
                </p>
              </div>

              <div className="relative z-10 shrink-0">
                <Link
                  to="/registrasi"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/30 transition-all active:scale-95"
                >
                  <span>Daftar Sekarang — Gratis</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
