import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Activity, ArrowRight } from "lucide-react";

export default function LoginMobile({
  form,
  setForm,
  showPassword,
  setShowPassword,
  handleLogin,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-100 flex flex-col justify-between px-6 py-10">
      
      {/* BRAND HEADER */}
      <div className="flex flex-col items-center">
        <Link to="/" className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 mb-2">
          <Activity size={26} className="stroke-[2.5]" />
        </Link>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          HEALTH<span className="text-orange-500">.</span>
        </h1>
        <p className="text-xs text-gray-400 font-medium mt-0.5">
          Panel Kesehatan Digital Pelaku UMKM
        </p>
      </div>

      {/* FORM CARD */}
      <div className="w-full bg-white rounded-3xl shadow-xl shadow-gray-200/70 border border-gray-100 p-6 sm:p-8 my-6">
        
        {/* TABS */}
        <div className="flex gap-4 border-b border-gray-100 pb-3 mb-6 text-sm">
          <span className="font-bold text-orange-600 border-b-2 border-orange-500 pb-3 -mb-3">
            Masuk
          </span>
          <Link to="/registrasi" className="text-gray-400 hover:text-orange-600 font-medium pb-3 -mb-3">
            Daftar Baru
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-900">
          Selamat Datang
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Masukkan email & kata sandi Anda untuk melanjutkan.
        </p>

        <div className="space-y-4 mt-6">
          {/* EMAIL */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Email
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

          {/* PASSWORD */}
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
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Masuk Sekarang</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Belum punya akun?{" "}
          <Link
            to="/registrasi"
            className="text-orange-600 font-bold hover:underline"
          >
            Daftar di sini
          </Link>
        </p>

      </div>

      <div className="text-center text-xs text-gray-400">
        © 2026 Health Enterprise Suite
      </div>

    </div>
  );
}
