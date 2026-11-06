import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import LogoutModal from "./LogoutModal";
import { Activity, Settings, User, LogOut, X, Menu, Sparkles } from "lucide-react";

export default function NavbarDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const [gateModal, setGateModal] = useState({
    open: false,
    title: "",
    message: "",
    primaryText: "",
    primaryPath: "",
  });

  const dropdownRef = useRef();

  const safeParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  };

  const profileData = safeParse(localStorage.getItem("profileData"));
  const userData = safeParse(localStorage.getItem("user"));

  // =========================================================
  // 🔥 AUTOMATIC BACKEND SYNC (MENCEGAH ERROR REFUSED DI NAVBAR)
  // =========================================================
  useEffect(() => {
    const syncUserSession = async () => {
      if (!userData?.id_user) return;

      try {
        // Menggunakan URL Relatif agar adaptif dengan domain hosting
        const response = await fetch(`/api-sisehat/get_profile.php?id_user=${userData.id_user}`);
        if (!response.ok) return;

        const result = await response.json().catch(() => null);

        if (result && result.status === "success" && result.data) {
          localStorage.setItem("profileData", JSON.stringify(result.data));
          localStorage.setItem("profileComplete", "true");
        } else if (result && result.status === "error") {
          localStorage.setItem("profileComplete", "false");
        }
      } catch {
        console.warn("Koneksi Navbar berjalan dalam mode offline lokal.");
      }
    };

    syncUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Melakukan pemeriksaan aman setiap kali halaman berpindah

  const menu = [
    { name: "Beranda", path: "/beranda" },
    { name: "Asesmen", path: "/asesmen" },
    { name: "Perbandingan", path: "/perbandingan" },
    { name: "Rekomendasi", path: "/rekomendasi" },
    { name: "Eksplorasi", path: "/eksplorasi" },
  ];

  // 🔥 PERBAIKAN: Ditambahkan 'userData?.username' agar nama user tidak kembali menjadi "Pengguna" di menu sidebar/navbar
  const displayName = profileData?.nama || userData?.username || userData?.name || "Pengguna";
  const displayEmail = userData?.email || "user@email.com";
  const avatarLetter = (displayName || "U").charAt(0).toUpperCase();

  const isProfileComplete = () => {
    const profileComplete = localStorage.getItem("profileComplete");
    const currentProfileData = safeParse(localStorage.getItem("profileData"));

    if (profileComplete === "true") {
      return true;
    }

    const hasCompleteProfile =
      (currentProfileData?.namaUsaha || currentProfileData?.nama_usaha) &&
      (currentProfileData?.jenisUsaha || currentProfileData?.jenis_usaha) &&
      currentProfileData?.kategori &&
      (currentProfileData?.lamaUsaha || currentProfileData?.lama_usaha) &&
      (currentProfileData?.usia || currentProfileData?.usia_pemilik) &&
      (currentProfileData?.role || currentProfileData?.posisi);

    return Boolean(hasCompleteProfile);
  };

  const isAssessmentComplete = () => {
    const assessmentComplete = localStorage.getItem("assessmentComplete");
    const hasilAnalisis = safeParse(localStorage.getItem("hasilAnalisis"));

    if (assessmentComplete === "true") {
      return true;
    }

    if (hasilAnalisis?.factors?.length > 0) {
      return true;
    }

    return false;
  };

  const showGatePopup = ({
    title,
    message,
    primaryText,
    primaryPath,
  }) => {
    setGateModal({
      open: true,
      title,
      message,
      primaryText,
      primaryPath,
    });
  };

  const closeGatePopup = () => {
    setGateModal({
      open: false,
      title: "",
      message: "",
      primaryText: "",
      primaryPath: "",
    });
  };

  const handleMenuClick = (item) => {
    const profileReady = isProfileComplete();
    const assessmentReady = isAssessmentComplete();

    if (item.path === "/asesmen") {
      if (!profileReady) {
        showGatePopup({
          title: "Profil UMKM Belum Lengkap",
          message:
            "Anda belum mengisi profil. Jika ingin melakukan asesmen, silakan lengkapi profil usaha terlebih dahulu.",
          primaryText: "Lengkapi Profil",
          primaryPath: "/profil",
        });
        return;
      }

      navigate("/asesmen");
      return;
    }

    if (item.path === "/perbandingan") {
      if (!profileReady && !assessmentReady) {
        showGatePopup({
          title: "Profil dan Asesmen Belum Lengkap",
          message:
            "Anda belum mengisi profil dan belum melakukan asesmen. Lengkapi profil terlebih dahulu, lalu isi asesmen agar bisa membuka perbandingan.",
          primaryText: "Lengkapi Profil",
          primaryPath: "/profil",
        });
        return;
      }

      if (!profileReady) {
        showGatePopup({
          title: "Profil UMKM Belum Lengkap",
          message:
            "Anda belum mengisi profil. Jika ingin membuka perbandingan, silakan lengkapi profil usaha terlebih dahulu.",
          primaryText: "Lengkapi Profil",
          primaryPath: "/profil",
        });
        return;
      }

      if (!assessmentReady) {
        showGatePopup({
          title: "Asesmen Belum Diisi",
          message:
            "Anda belum mengisi asesmen. Silakan isi asesmen terlebih dahulu agar data perbandingan bisa ditampilkan.",
          primaryText: "Ke Asesmen",
          primaryPath: "/asesmen",
        });
        return;
      }

      navigate("/perbandingan");
      return;
    }

    if (item.path === "/rekomendasi") {
      if (!profileReady) {
        showGatePopup({
          title: "Profil UMKM Belum Lengkap",
          message:
            "Anda belum mengisi profil. Jika ingin melihat rekomendasi, silakan lengkapi profil usaha terlebih dahulu.",
          primaryText: "Lengkapi Profil",
          primaryPath: "/profil",
        });
        return;
      }

      if (!assessmentReady) {
        showGatePopup({
          title: "Asesmen Belum Diisi",
          message:
            "Rekomendasi belum bisa ditampilkan karena Anda belum mengisi asesmen. Silakan isi asesmen terlebih dahulu.",
          primaryText: "Ke Asesmen",
          primaryPath: "/asesmen",
        });
        return;
      }

      navigate("/rekomendasi");
      return;
    }

    navigate(item.path);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-12 lg:py-4 transition-all">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          {/* LOGO */}
          <div
            onClick={() => navigate("/beranda")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
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
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden items-center gap-2 text-sm lg:flex xl:gap-3">
            {menu.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-orange-50 text-orange-600 border border-orange-200/80 shadow-xs"
                      : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* RIGHT DESKTOP */}
          <div
            className="relative hidden items-center gap-3 lg:flex"
            ref={dropdownRef}
          >
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl text-gray-500 hover:text-orange-600 hover:bg-orange-50/70 transition-all border border-transparent hover:border-orange-200/60"
              type="button"
              title="Pengaturan"
            >
              <Settings size={20} />
            </button>

            <div
              onClick={() => navigate("/profil")}
              className="flex max-w-[240px] cursor-pointer items-center gap-2.5 rounded-full border border-gray-200/80 bg-gray-50/70 hover:bg-white hover:border-orange-200 py-1 pl-3.5 pr-1.5 transition-all shadow-xs group"
            >
              <span className="truncate text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                {displayName}
              </span>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-xs font-bold text-white shadow-sm shadow-orange-500/30">
                {avatarLetter}
              </div>
            </div>

            {open && (
              <div className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="mb-3 px-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-orange-500">AKUN SAYA</p>

                  <p className="mt-1 truncate text-sm font-bold text-gray-900">
                    {displayName}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {displayEmail}
                  </p>
                </div>

                <div className="mb-2 border-t border-gray-100"></div>

                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profil");
                    }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    type="button"
                  >
                    <User size={16} className="text-gray-400" />
                    <span>Edit Profil</span>
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/settings");
                    }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    type="button"
                  >
                    <Settings size={16} className="text-gray-400" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowLogout(true);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    type="button"
                  >
                    <LogOut size={16} className="text-red-400" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BUTTON MOBILE */}
          <button
            onClick={() => setMobileMenu(true)}
            className="block p-2 text-gray-700 hover:text-orange-600 focus:outline-none lg:hidden"
            type="button"
            aria-label="Buka menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden">
          <button
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setMobileMenu(false)}
            type="button"
            aria-label="Tutup menu"
          ></button>

          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-[320px] flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-sm">
                  <Activity size={18} />
                </div>
                <h2 className="text-lg font-extrabold text-gray-900">
                  Health<span className="text-orange-500">.</span>
                </h2>
              </div>

              <button
                onClick={() => setMobileMenu(false)}
                className="p-1 rounded-lg text-gray-500 hover:text-gray-800"
                type="button"
                aria-label="Tutup menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-orange-50/70 border border-orange-100 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-sm font-bold text-white shadow-sm shadow-orange-500/30">
                  {avatarLetter}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {displayName}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {displayEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {menu.map((item) => {
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      setMobileMenu(false);
                      handleMenuClick(item);
                    }}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-orange-50 text-orange-600 border border-orange-200/60"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto border-t border-gray-100 pt-4 flex flex-col gap-1">
              <button
                onClick={() => {
                  setMobileMenu(false);
                  navigate("/profil");
                }}
                className="flex items-center gap-2.5 w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                type="button"
              >
                <User size={16} />
                <span>Edit Profil</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenu(false);
                  navigate("/settings");
                }}
                className="flex items-center gap-2.5 w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                type="button"
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenu(false);
                  setShowLogout(true);
                }}
                className="flex items-center gap-2.5 w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                type="button"
              >
                <LogOut size={16} />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP BLOKIR NAVIGASI */}
      {gateModal.open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
          <div className="w-full max-w-[420px] rounded-3xl bg-white p-6 text-center shadow-2xl border border-gray-100 sm:p-8 animate-in zoom-in-95 duration-150">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-100/80 text-orange-600 flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              {gateModal.title}
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-gray-500">
              {gateModal.message}
            </p>

            <button
              onClick={() => {
                const targetPath = gateModal.primaryPath;
                closeGatePopup();
                navigate(targetPath);
              }}
              className="mt-6 w-full rounded-xl bg-orange-500 py-3 text-white font-bold shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition active:scale-95"
              type="button"
            >
              {gateModal.primaryText}
            </button>

            <button
              onClick={closeGatePopup}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
              type="button"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      )}

      <LogoutModal
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          localStorage.clear();
          navigate("/");
        }}
      />
    </>
  );
}