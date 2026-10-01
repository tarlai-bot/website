import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BriefcaseBusiness,
  CalendarDays,
  Compass,
  Grid3X3,
  MapPin,
  Menu,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import LanguageSwitcher from "../../common/LanguageSwitcher";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language?.startsWith("ar");

  const navItems = useMemo(
    () => [
      { label: isArabic ? "الرئيسية" : "Home", path: "/", icon: Compass },
      { label: isArabic ? "المتاجر" : "Stores", path: "/stores", icon: ShoppingBag },
      { label: isArabic ? "المطاعم" : "Dining", path: "/restaurants", icon: Utensils },
      { label: isArabic ? "الترفيه" : "Entertainment", path: "/entertainment", icon: Sparkles },
      { label: isArabic ? "الأخبار" : "News", path: "/events", icon: CalendarDays },
      { label: isArabic ? "الخريطة" : "Map", path: "/maps", icon: MapPin },
      { label: isArabic ? "المعرض" : "Gallery", path: "/gallery", icon: Grid3X3 },
      { label: isArabic ? "للشركات" : "For Brands", path: "/rental", icon: BriefcaseBusiness },
      { label: isArabic ? "تواصل" : "Contact", path: "/contact", icon: MessageCircle },
    ],
    [isArabic]
  );

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 py-3">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
            isScrolled
              ? "border-white/15 bg-[#120b10]/86 shadow-2xl shadow-black/25 backdrop-blur-2xl"
              : "border-white/18 bg-white/10 shadow-xl shadow-black/10 backdrop-blur-xl"
          }`}
        >
          <Link to="/" className="group flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-lg">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#120b10]">
              <span className="absolute inset-0 rounded-full bg-linear-to-r from-[#ef7622] to-[#fedd3d] opacity-70 blur-md transition group-hover:opacity-100" />
              <img
                src="/images/alamerMall/alamerMallLogo.png"
                alt="Alamer Mall"
                className="relative h-7 w-auto"
              />
            </span>
            <span className="hidden text-sm font-black leading-tight text-[#21151d] sm:block">
              Al Amer
              <span className="block text-[11px] uppercase tracking-[0.24em] text-[#ef7622]">Mall</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 p-1 lg:flex">
            {navItems.slice(0, 8).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-3 py-2 text-sm font-black transition ${
                  isActive(item.path)
                    ? "bg-[#fedd3d] text-[#21151d]"
                    : "text-white/82 hover:bg-white/12 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {!isActive(item.path) && (
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-[#fedd3d] transition group-hover:scale-x-100" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              to="/maps"
              className="hidden rounded-full bg-[#ef7622] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#ef7622]/25 transition hover:-translate-y-0.5 hover:bg-[#d86518] md:inline-flex"
            >
              {isArabic ? "خطط الزيارة" : "Plan Visit"}
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/12 text-white lg:hidden"
              aria-label={isArabic ? "فتح القائمة" : "Open menu"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#120b10] text-white lg:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,118,34,0.35),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(254,221,61,0.18),transparent_30%)]" />
          <div className="relative flex h-full flex-col overflow-y-auto px-5 py-5">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <img src="/images/alamerMall/alamerMallLogo.png" alt="Alamer Mall" className="h-10 w-auto" />
                <span className="font-black">Al Amer Mall</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10"
                aria-label={isArabic ? "إغلاق القائمة" : "Close menu"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between rounded-3xl border p-4 transition ${
                    isActive(item.path)
                      ? "border-[#fedd3d] bg-[#fedd3d] text-[#21151d]"
                      : "border-white/10 bg-white/8 text-white hover:bg-white/14"
                  }`}
                  style={{ animation: `menuRise .42s ease ${index * 0.035}s both` }}
                >
                  <span className="flex items-center gap-3 text-lg font-black">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </span>
                  <span className="text-xs font-black opacity-60">{String(index + 1).padStart(2, "0")}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-white p-5 text-[#21151d]">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
                {isArabic ? "زيارة أسرع" : "Fast action"}
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href="https://tr.ee/H213pKxHc1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#21151d] px-4 py-3 text-center font-black text-white"
                >
                  {isArabic ? "الموقع" : "Location"}
                </a>
                <a
                  href="https://wa.me/966544439986"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-[#ef7622] px-4 py-3 text-center font-black text-white"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes menuRise {
              from { opacity: 0; transform: translateY(18px) scale(.98); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
