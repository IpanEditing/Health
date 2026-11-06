import { useState, useEffect } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Activity, 
  TrendingUp, 
  Users, 
  Award, 
  AlertCircle, 
  ArrowRight, 
  BarChart3
} from "lucide-react";

import rawData from "../data/raw_data.json";

import { Radar, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Beranda() {
  const profileData = JSON.parse(localStorage.getItem("profileData"));

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // =========================================================
  // 🔥 SINKRONISASI LUAR STATUS AKUN (URL RELATIF ANTI-CORS)
  // =========================================================
  useEffect(() => {
    const syncProfileStatus = async () => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser?.id_user) return;

      try {
        // Menggunakan URL Relatif agar mengikuti domain hosting secara otomatis
        const response = await fetch(`/api-sisehat/get_profile.php?id_user=${currentUser.id_user}`);
        if (!response.ok) return;

        const result = await response.json().catch(() => null);

        // Jika data profil memang belum ada (Akun Baru), set status false secara silent tanpa pop-up eror
        if (result && result.status === "error") {
          localStorage.setItem("profileComplete", "false");
          return;
        }

        // Jika data ada di database, sinkronkan ke local storage
        if (result && result.status === "success") {
          localStorage.setItem("profileComplete", "true");
        }
      } catch {
        console.warn("Sinkronisasi latar beranda aktif dalam mode lokal offline.");
      }
    };

    syncProfileStatus();
  }, []);

  // 🔥 TOTAL RESPONDEN
  const totalUMKM = rawData.length;

  // 🔥 HITUNG RATA-RATA
  const average = (keys) => {
    let total = 0;

    rawData.forEach((item) => {
      keys.forEach((key) => {
        total += Number(item[key]);
      });
    });

    return (total / (rawData.length * keys.length)).toFixed(2);
  };

  // 🔥 DATA DASHBOARD DARI JSON ASLI
  const data = {
    factors: [
      {
        code: "OV",
        value: Number(
          average(["OH1", "OH2", "OH3", "OH4", "OH5", "OH6", "OH7", "OH8", "OH9"])
        ),
      },
      {
        code: "LI",
        value: Number(average(["OH10", "OH11", "OH12", "OH13", "OH14", "OH15"])),
      },
      {
        code: "IR",
        value: Number(average(["OH16", "OH17", "OH18", "OH19", "OH20", "OH21"])),
      },
      {
        code: "OS",
        value: Number(average(["OH22", "OH23", "OH24", "OH25", "OH26"])),
      },
      {
        code: "QW",
        value: Number(average(["OH27", "OH28", "OH29", "OH30", "OH31"])),
      },
      {
        code: "EP",
        value: Number(average(["OH32", "OH33", "OH34", "OH35"])),
      },
    ],

    // 🔥 DISTRIBUSI SEMENTARA
    distribution: [25, 49, 29, 44],

    // 🔥 TOP 3
    rankingTop: [...rawData].sort((a, b) => b.TOTAL - a.TOTAL).slice(0, 3),

    // 🔥 BOTTOM 3
    rankingBottom: [...rawData].sort((a, b) => a.TOTAL - b.TOTAL).slice(0, 3),
  };

  // 🔥 VALUES
  const values = data.factors.map((f) => f.value);

  const total = values.reduce((a, b) => a + b, 0);
  const avg = total / values.length;
  const score = ((total * 100) / 30).toFixed(1);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
  const std = Math.sqrt(variance).toFixed(2);

  const highest = data.factors.find((f) => f.value === max);
  const lowest = data.factors.find((f) => f.value === min);

  // 🔥 STATUS
  const getStatus = (v) => {
    if (v >= 3.25) return ["Optimal", "bg-emerald-50 text-emerald-700 border border-emerald-200/80"];
    if (v >= 2.25) return ["Stabil", "bg-orange-50 text-orange-700 border border-orange-200/80"];
    return ["Perlu Perhatian", "bg-rose-50 text-rose-600 border border-rose-200/80"];
  };

  // 🔥 RADAR
  const radarData = {
    labels: data.factors.map((f) => f.code),
    datasets: [
      {
        label: "Rata-rata Skor",
        data: values,
        backgroundColor: "rgba(249, 115, 22, 0.18)",
        borderColor: "#f97316",
        pointBackgroundColor: "#ea580c",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4.5,
        borderWidth: 2.5,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: "transparent",
          color: "#9ca3af",
          font: { size: 10 },
        },
        grid: {
          color: "#f3f4f6",
        },
        angleLines: {
          color: "#e5e7eb",
        },
        pointLabels: {
          color: "#374151",
          font: {
            size: 13,
            weight: "600",
          },
        },
      },
    },
  };

  // 🔥 BAR
  const barData = {
    labels: ["Rentang 1-2", "Rentang 2-3", "Rentang 3-4", "Rentang 4-5"],
    datasets: [
      {
        label: "Jumlah UMKM",
        data: data.distribution,
        backgroundColor: "#f97316",
        hoverBackgroundColor: "#ea580c",
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          color: "#9ca3af",
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#4b5563",
          font: { size: 12, weight: "500" },
        },
      },
    },
  };

  // 🔥 BUTTON
  const handleStart = () => {
    const isComplete = localStorage.getItem("profileComplete");

    console.log("PROFILE COMPLETE:", isComplete);

    if (isComplete === "true") {
      navigate("/asesmen");
    } else {
      setShowModal(true);
    }
  };

  // Ambil data user login dari localStorage secara dinamis
  const currentUserObj = JSON.parse(localStorage.getItem("user"));
  
  // 🔥 PERBAIKAN SELESAI: Tambahkan .username agar tulisan "Pengguna" berubah menjadi nama akun rill yang masuk
  const currentDisplayName = profileData?.nama || currentUserObj?.username || currentUserObj?.name || "Pengguna";

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-gray-50/70 overflow-x-hidden text-gray-800 relative selection:bg-orange-500 selection:text-white">
      {/* Decorative blurred background shapes matching landing */}
      <div className="absolute top-16 -left-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -right-20 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl pointer-events-none" />

      <NavbarDashboard />

      {/* ================= MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-6 text-center shadow-2xl border border-gray-100 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center mb-4">
              <AlertCircle size={24} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              Profil UMKM Belum Lengkap
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
              Harap lengkapi profil usaha Anda terlebih dahulu sebelum memulai asesmen diagnosis kesehatan bisnis.
            </p>

            <button
              onClick={() => navigate("/profil")}
              className="mt-6 w-full rounded-xl bg-orange-500 hover:bg-orange-600 py-3 text-white font-bold shadow-lg shadow-orange-500/25 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Lengkapi Profil Sekarang</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8 md:py-10 lg:px-12 xl:px-16">
        {/* HEADER */}
        <section>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-700 text-xs font-semibold mb-3">
            <Sparkles size={14} className="text-orange-500" />
            <span>DASHBOARD ANALYTICS & BENCHMARK</span>
          </div>

          <h1 className="break-words text-2xl font-black text-gray-900 sm:text-3xl md:text-4xl tracking-tight">
            Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600">{currentDisplayName}</span> 👋
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
            Berikut adalah perbandingan data metrik terhadap basis data <strong className="text-gray-800 font-semibold">{totalUMKM} Responden UMKM</strong> di wilayah Jakarta dan Jawa Barat.
          </p>
        </section>

        {/* GRID */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* RADAR */}
          <div className="rounded-3xl border border-gray-100 bg-white p-5 sm:p-7 shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    Radar Chart 6 Dimensi Strategis
                  </h3>
                  <p className="text-xs text-gray-400">
                    Visualisasi profil skor operasional UMKM
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60 hidden sm:inline-block">
                Skala 1 - 5
              </span>
            </div>

            <div className="h-[290px] w-full sm:h-[360px] lg:h-[420px]">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          {/* SIDE */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-col lg:gap-4">
            {/* SCORE */}
            <div className="rounded-3xl bg-gradient-to-br from-gray-900 via-stone-900 to-gray-950 p-6 sm:p-7 text-white shadow-xl border border-gray-800 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-orange-500/25 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-bold text-orange-400">
                    Skor Keseluruhan
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    <TrendingUp size={12} />
                    Benchmark
                  </span>
                </div>
                
                <div className="mt-4 flex items-baseline gap-2">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                    {score}
                  </h2>
                  <span className="text-xl sm:text-2xl font-bold text-gray-400">/ 100</span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  +4.2% lebih tinggi dari benchmark
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <span>Status Vitalitas:</span>
                <span className="font-bold text-orange-400 text-sm">
                  {Number(score) >= 70 ? "Sangat Sehat" : Number(score) >= 50 ? "Kategori Stabil" : "Perlu Optimasi"}
                </span>
              </div>
            </div>

            {/* INSIGHT */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                <Award size={14} className="text-orange-500" />
                <span>Sorotan Faktor</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Faktor tertinggi berada pada <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-orange-50 text-orange-700 font-bold border border-orange-200/60 mx-1">{highest.code}</span> ({max.toFixed(2)}), 
                sedangkan faktor terendah adalah <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold border border-rose-200/60 mx-1">{lowest.code}</span> ({min.toFixed(2)}).
              </p>
            </div>

            {/* STAT */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Statistik Distribusi</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-xs text-gray-400 block">Rata-rata (Mean)</span>
                  <strong className="text-base font-bold text-gray-800">{avg.toFixed(2)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-xs text-gray-400 block">Nilai Minimum</span>
                  <strong className="text-base font-bold text-gray-800">{min.toFixed(2)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-xs text-gray-400 block">Nilai Maksimum</span>
                  <strong className="text-base font-bold text-gray-800">{max.toFixed(2)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-xs text-gray-400 block">Standar Deviasi</span>
                  <strong className="text-base font-bold text-gray-800">{std}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 SMALL STAT BOXES */}
        <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Users size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Responden</p>
              <p className="text-2xl font-black text-gray-900 mt-0.5">{totalUMKM}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Activity size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rata-rata Skor</p>
              <p className="text-2xl font-black text-gray-900 mt-0.5">{avg.toFixed(2)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Award size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Faktor Tertinggi</p>
              <p className="text-2xl font-black text-orange-600 mt-0.5">{highest.code}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-orange-200 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
              <AlertCircle size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Faktor Terendah</p>
              <p className="text-2xl font-black text-gray-700 mt-0.5">{lowest.code}</p>
            </div>
          </div>
        </section>

        {/* RINCIAN FAKTOR */}
        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Rincian 6 Dimensi Faktor
                </h3>
                <p className="text-xs text-gray-400">
                  Status per indikator berdasarkan standardisasi penilaian
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE CARD */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {data.factors.map((f, i) => {
              const s = getStatus(f.value);
              const skor = (f.value * 20).toFixed(1);

              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4 hover:border-orange-200 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400">Kode Faktor</p>
                      <p className="mt-0.5 text-xl font-black text-gray-900">
                        {f.code}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${s[1]}`}
                    >
                      {s[0]}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-xs text-gray-500 font-medium">Skor Vitalitas</span>
                      <span className="font-bold text-gray-900">
                        {skor} <span className="text-xs text-gray-400">/ 100</span>
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-gray-200/80 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                        style={{ width: `${skor}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                  <th className="py-3 text-left font-semibold">Dimensi Faktor</th>
                  <th className="py-3 text-center font-semibold">Status Evaluasi</th>
                  <th className="py-3 text-right font-semibold">Skor Vitalitas</th>
                  <th className="py-3 pl-8 text-left font-semibold">Visualisasi Progress</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data.factors.map((f, i) => {
                  const s = getStatus(f.value);
                  const skor = (f.value * 20).toFixed(1);

                  return (
                    <tr
                      key={i}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      <td className="py-4 text-left font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {f.code}
                      </td>

                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${s[1]}`}
                        >
                          {s[0]}
                        </span>
                      </td>

                      <td className="py-4 text-right font-black text-gray-900">
                        {skor} <span className="text-xs font-normal text-gray-400">/ 100</span>
                      </td>

                      <td className="py-4 pl-8">
                        <div className="h-2 w-48 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
                            style={{ width: `${skor}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* BAR */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  Distribusi Nilai Responden
                </h3>
                <p className="text-xs text-gray-400">
                  Sebaran frekuensi rentang skor 428 UMKM
                </p>
              </div>
            </div>

            <div className="h-[260px] w-full sm:h-[300px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* RANK */}
          <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">🏆</span>
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Top 3 Responden Tertinggi
                  </h3>
                </div>
                <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/50">
                  Benchmark Unggul
                </span>
              </div>

              <div className="space-y-2 mb-6">
                {rawData.length > 0 && data.rankingTop.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-orange-200 hover:bg-white transition-all text-sm"
                  >
                    <span className="font-medium text-gray-700 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      UMKM #{r.ID}
                    </span>
                    <span className="font-black text-gray-900 px-3 py-1 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                      {r.TOTAL}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Bottom 3 Responden Terbawah
                  </h3>
                </div>
                <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2.5 py-0.5 rounded-full">
                  Perlu Intervensi
                </span>
              </div>

              <div className="space-y-2">
                {rawData.length > 0 && data.rankingBottom.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-gray-50/70 border border-gray-100 text-sm"
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      UMKM #{r.ID}
                    </span>
                    <span className="font-bold text-gray-600 px-3 py-1 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                      {r.TOTAL}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BUTTON */}
        <div className="mt-12 text-center pb-8">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 mx-auto active:scale-95 text-base"
          >
            <span>Mulai Asesmen Baru</span>
            <ArrowRight size={18} />
          </button>
          <p className="mt-2.5 text-xs text-gray-400">
            Diagnosis mandiri 6 metrik bisnis UMKM dalam waktu ±3 menit.
          </p>
        </div>
      </main>
    </div>
  );
}