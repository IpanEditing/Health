import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Activity,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function RegistrasiMobile({
  form,
  setForm,
  showPassword,
  setShowPassword,
  handleRegister,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-100 flex flex-col justify-between px-6 py-10">
      
      {/* BRAND HEADER */}
      <div className="flex items-center justify-between">
        <Link
          to="/login"
          className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-700 flex items-center justify-center shadow-sm"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold">
            <Activity size={18} />
          </div>
          <span className="font-extrabold text-lg text-gray-900">
            HEALTH<span className="text-orange-500">.</span>
          </span>
        </div>
        <div className="w-10" />
      </div>

      {/* FORM CARD */}
      <div className="w-full bg-white rounded-3xl shadow-xl shadow-gray-200/70 border border-gray-100 p-6 sm:p-8 my-6">
        
        {/* TABS */}
        <div className="flex gap-4 border-b border-gray-100 pb-3 mb-6 text-sm">
          <Link to="/login" className="text-gray-400 hover:text-orange-600 font-medium pb-3 -mb-3">
            Masuk
          </Link>
          <span className="font-bold text-orange-600 border-b-2 border-orange-500 pb-3 -mb-3">
            Daftar Baru
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          Buat Akun Health
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Mulai langkah awal evaluasi vitalitas bisnis Anda hari ini.
        </p>

        <div className="space-y-4 mt-6">
          {/* NAMA LENGKAP */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Nama Lengkap
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3.5 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
              <User size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Nama Lengkap Pemilik Usaha"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="bg-transparent outline-none ml-2.5 w-full text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Email Usaha
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3.5 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
              <Mail size={18} className="text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="nama@perusahaan.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="bg-transparent outline-none ml-2.5 w-full text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* WHATSAPP */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Nomor WhatsApp
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3.5 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
              <Phone size={18} className="text-gray-400 shrink-0" />
              <input
                type="tel"
                placeholder="08123456789"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="bg-transparent outline-none ml-2.5 w-full text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* KATA SANDI */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Kata Sandi
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl flex items-center px-3.5 py-3 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/10 transition-all">
              <Lock size={18} className="text-gray-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="bg-transparent outline-none ml-2.5 w-full text-sm text-gray-800 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-orange-500 p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Daftar Sekarang</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Sudah memiliki akun?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-bold hover:underline"
          >
            Masuk di sini
          </Link>
        </p>

      </div>

      <div className="text-center text-xs text-gray-400">
        © 2026 Health Enterprise Suite • GDPR Compliant
      </div>

    </div>
  );
}
