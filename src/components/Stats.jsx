import { Users, Server, Clock, BarChart3 } from "lucide-react";

export default function Stats() {
  const statsData = [
    {
      icon: Users,
      value: "500+",
      label: "UMKM Terdaftar",
      desc: "Aktif mengevaluasi bisnis",
    },
    {
      icon: BarChart3,
      value: "98.5%",
      label: "Akurasi Diagnosa",
      desc: "Model 6 dimensi teruji",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Akses Real-time",
      desc: "Dashboard monitoring instan",
    },
    {
      icon: Server,
      value: "12M+",
      label: "Data Terproses",
      desc: "Analisis performa & risiko",
    },
  ];

  return (
    <section id="metrik" className="relative z-20 px-6 sm:px-10 lg:px-16 -mt-8 sm:-mt-12">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-200/70 border border-gray-100 p-6 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center ${
                  idx !== 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-3">
                  <Icon size={24} />
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  <span className="text-orange-500">{stat.value}</span>
                </h3>
                <p className="font-bold text-gray-800 text-sm sm:text-base mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
