import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Clock,
  Gamepad2,
  Sparkles,
  PartyPopper,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Header from "../../components/layout/Header/Header";

const CONFETTI_COUNT = 50;
const CONFETTI_COLORS = ["#ef7622", "#44273a", "#FFD700", "#FF6B9D", "#4ECDC4", "#95E1D3"];

const GALLERY_IMAGES = Array.from(
  { length: 36 },
  (_, i) => `/images/smarvy/Smarvy_image (${i + 1}).JPG`
);

export default function Smarvy() {
  const { t } = useTranslation(["pages", "common"]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const isDark = scrollPosition >= heroHeight * 0.8;

      window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark } }));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Resume auto-play after 10 seconds of inactivity
  useEffect(() => {
    if (isAutoPlaying) return;

    const resumeTimer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000); // Resume after 10 seconds

    return () => clearTimeout(resumeTimer);
  }, [isAutoPlaying]);

  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-b from-black via-purple-900 to-black">
      <Header />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(CONFETTI_COUNT)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Floating Party Icons */}
      <div className="fixed top-28 right-10 animate-bounce-slow opacity-30 pointer-events-none hidden lg:block z-40">
        <PartyPopper className="w-16 h-16 text-secondary" />
      </div>
      <div
        className="fixed bottom-20 left-10 animate-bounce-slow opacity-30 pointer-events-none hidden lg:block z-40"
        style={{ animationDelay: "1s" }}
      >
        <Sparkles className="w-16 h-16 text-accent" />
      </div>

      {/* Hero Section */}
      <div className="hero-section relative isolate overflow-hidden h-screen snap-start snap-always pt-0">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/images/smarvy/Smarvy-video.webm" type="video/webm" />
          <img
            src="/images/smarvy/Smarvy_banner.jpg"
            alt={t("pages:smarvy.hero.title")}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </video>

        <div className="absolute inset-0 bg-black/50 -z-10" />

        {/* RGB Light Strips */}
        <div className="absolute top-0 left-0 right-0 h-2 rgb-glow z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-2 rgb-glow z-10" />
        <div className="absolute top-0 left-0 bottom-0 w-2 rgb-glow z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-2 rgb-glow z-10" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-br from-pink-500/20 via-purple-500/10 to-cyan-500/20 -z-10" />
        <div className="absolute inset-0 bg-linear-to-tl from-yellow-400/10 via-transparent to-pink-500/10 -z-10" />

        {/* Hero Content */}
        <div className="relative px-6 pt-14 lg:px-8 h-full flex items-center z-20">
          <div className="mx-auto max-w-3xl text-center w-full">
            <h1
              className="relative z-30 pb-6 text-7xl font-black tracking-tight text-balance text-transparent bg-clip-text bg-linear-to-r from-pink-400 via-purple-400 to-cyan-400 sm:text-9xl mb-8 drop-shadow-2xl neon-text uppercase"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.3)",
              }}
            >
              {t("pages:smarvy.hero.title")}
            </h1>

            <p className="text-3xl font-bold text-pretty text-yellow-300 sm:text-4xl mb-12 drop-shadow-2xl uppercase tracking-wide">
              🎮 {t("pages:smarvy.hero.subtitle")} 🎢
            </p>

            <div className="flex items-center justify-center gap-x-6 flex-wrap gap-y-4 mb-20">
              <a
                href="#gallery"
                className="rounded-2xl bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 px-10 py-5 text-xl font-black uppercase tracking-wide text-white shadow-2xl hover:shadow-pink-500/50 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-400 transition-all duration-300 ease-in-out transform border-4 border-yellow-300"
              >
                🎨 {t("pages:smarvy.cta.gallery")}
              </a>
              <a
                href="#features"
                className="rounded-2xl bg-linear-to-r from-yellow-400 to-orange-500 px-10 py-5 text-xl font-black uppercase tracking-wide text-black shadow-2xl hover:shadow-yellow-400/50 hover:scale-110 transition-all duration-300 ease-in-out transform border-4 border-white"
              >
                🎪 {t("pages:smarvy.cta.explore")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Location */}
            <div className="bg-linear-to-br from-pink-500/90 to-purple-600/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl flex items-center gap-4 border-4 rgb-border hover:scale-105 transition-transform">
              <div className="bg-white p-4 rounded-xl shrink-0">
                <MapPin className="w-7 h-7 text-pink-600" />
              </div>
              <div>
                <p className="text-xs font-black text-yellow-300 uppercase tracking-wider">
                  📍 {t("pages:smarvy.info.location")}
                </p>
                <p className="text-lg font-black text-white">
                  {t("pages:smarvy.info.locationValue")}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-linear-to-br from-cyan-500/90 to-blue-600/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl flex items-center gap-4 border-4 rgb-border hover:scale-105 transition-transform">
              <div className="bg-white p-4 rounded-xl shrink-0">
                <Clock className="w-7 h-7 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs font-black text-pink-300 uppercase tracking-wider">
                  ⏰ {t("pages:smarvy.info.hours")}
                </p>
                <p className="text-sm font-black text-white">{t("pages:smarvy.info.hoursValue")}</p>
              </div>
            </div>

            {/* Category */}
            <div className="bg-linear-to-br from-yellow-400/90 to-orange-500/90 backdrop-blur-md rounded-2xl p-5 shadow-2xl flex items-center gap-4 border-4 rgb-border hover:scale-105 transition-transform">
              <div className="bg-white p-4 rounded-xl shrink-0">
                <Gamepad2 className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-black text-purple-800 uppercase tracking-wider">
                  🎮 {t("pages:smarvy.info.category")}
                </p>
                <p className="text-lg font-black text-black">
                  {t("pages:smarvy.info.categoryValue")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About & Features Section */}
      <div className="py-16" id="features">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* About */}
            <div className="text-center mb-16">
              <h2 className="relative z-10 pb-5 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-6 uppercase tracking-wider drop-shadow-2xl">
                🎪 {t("pages:smarvy.about.title")} 🎪
              </h2>
              <p className="text-2xl text-white leading-relaxed max-w-3xl mx-auto font-bold bg-black/40 backdrop-blur-sm px-8 py-6 rounded-3xl border-4 rgb-border shadow-2xl">
                {t("pages:smarvy.about.description")}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-linear-to-br from-pink-500 to-purple-600 rounded-3xl p-8 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border-4 rgb-border">
                <div className="text-6xl mb-4 animate-bounce">🎢</div>
                <h3 className="text-2xl font-black text-yellow-300 mb-3 uppercase">
                  {t("pages:smarvy.features.rides.title")}
                </h3>
                <p className="text-white font-bold">
                  {t("pages:smarvy.features.rides.description")}
                </p>
              </div>

              <div className="bg-linear-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border-4 rgb-border">
                <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: "0.2s" }}>
                  🎮
                </div>
                <h3 className="text-2xl font-black text-pink-300 mb-3 uppercase">
                  {t("pages:smarvy.features.arcade.title")}
                </h3>
                <p className="text-white font-bold">
                  {t("pages:smarvy.features.arcade.description")}
                </p>
              </div>

              <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border-4 rgb-border">
                <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: "0.4s" }}>
                  👨‍👩‍👧‍👦
                </div>
                <h3 className="text-2xl font-black text-purple-800 mb-3 uppercase">
                  {t("pages:smarvy.features.family.title")}
                </h3>
                <p className="text-black font-black">
                  {t("pages:smarvy.features.family.description")}
                </p>
              </div>

              <div className="bg-linear-to-br from-green-400 to-emerald-600 rounded-3xl p-8 shadow-2xl hover:shadow-green-400/50 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 border-4 rgb-border">
                <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: "0.6s" }}>
                  🏆
                </div>
                <h3 className="text-2xl font-black text-yellow-300 mb-3 uppercase">
                  {t("pages:smarvy.features.prizes.title")}
                </h3>
                <p className="text-white font-bold">
                  {t("pages:smarvy.features.prizes.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <div className="py-16" id="gallery">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-linear-to-r from-yellow-400 to-orange-500 px-8 py-4 rounded-full mb-6 border-4 rgb-border shadow-2xl">
                <Sparkles className="w-7 h-7 text-purple-800 animate-spin" />
                <span className="text-black font-black uppercase text-2xl tracking-wider">
                  📸 {t("pages:smarvy.gallery.title")} 📸
                </span>
              </div>
              <h2 className="relative z-10 pb-5 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-pink-300 via-yellow-300 to-cyan-300 mb-6 uppercase tracking-wider drop-shadow-2xl neon-text">
                {t("pages:smarvy.gallery.subtitle")} 🎮
              </h2>
            </div>

            {/* Compact Carousel Gallery */}
            <div className="relative max-w-5xl mx-auto">
              {/* Main Display */}
              <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-3xl shadow-2xl border-4 rgb-border group">
                <img
                  src={GALLERY_IMAGES[currentImageIndex]}
                  alt={`${t("pages:smarvy.gallery.title")} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-linear-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full font-black text-sm border-2 border-yellow-300">
                  {currentImageIndex + 1} / {GALLERY_IMAGES.length}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => {
                    handleUserInteraction();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-yellow-300"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={() => {
                    handleUserInteraction();
                    setCurrentImageIndex((prev) =>
                      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-yellow-300"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="mt-6 relative">
                <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-black/30">
                  {GALLERY_IMAGES.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleUserInteraction();
                        setCurrentImageIndex(index);
                      }}
                      className={`relative shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden transition-all duration-300 border-4 ${
                        currentImageIndex === index
                          ? "border-yellow-300 scale-110 shadow-2xl shadow-yellow-300/50"
                          : "border-purple-500/50 hover:border-pink-500 hover:scale-105"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 bg-linear-to-br from-yellow-300/30 via-pink-500/30 to-cyan-500/30" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Lightbox Modal */}
            {showLightbox && (
              <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                <button
                  onClick={() => {
                    handleUserInteraction();
                    setShowLightbox(false);
                  }}
                  className="absolute top-4 right-4 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-yellow-300 z-10"
                  aria-label="Close lightbox"
                >
                  <X className="w-8 h-8" />
                </button>

                <button
                  onClick={() => {
                    handleUserInteraction();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-yellow-300 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <div className="relative max-w-7xl max-h-[90vh] w-full">
                  <img
                    src={GALLERY_IMAGES[currentImageIndex]}
                    alt={`${t("pages:smarvy.gallery.title")} ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain rounded-2xl border-4 rgb-border"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-black border-4 border-yellow-300">
                    {currentImageIndex + 1} / {GALLERY_IMAGES.length}
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleUserInteraction();
                    setCurrentImageIndex((prev) =>
                      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-yellow-300 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            )}

            {/* Fun Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-8 bg-linear-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 rgb-border">
                <div className="text-6xl font-bold mb-4 animate-bounce">🎢</div>
                <div className="text-5xl font-black text-yellow-300 mb-2">5</div>
                <div className="text-lg text-white font-black uppercase">
                  {t("pages:smarvy.stats.rides")}
                </div>
              </div>

              <div className="text-center p-8 bg-linear-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 rgb-border">
                <div
                  className="text-6xl font-bold mb-4 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                >
                  🎮
                </div>
                <div className="text-5xl font-black text-pink-300 mb-2">50+</div>
                <div className="text-lg text-white font-black uppercase">
                  {t("pages:smarvy.stats.arcade")}
                </div>
              </div>

              <div className="text-center p-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 rgb-border">
                <div
                  className="text-6xl font-bold mb-4 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                >
                  🏆
                </div>
                <div className="text-5xl font-black text-purple-800 mb-2">100s</div>
                <div className="text-lg text-black font-black uppercase">
                  {t("pages:smarvy.stats.prizes")}
                </div>
              </div>

              <div className="text-center p-8 bg-linear-to-br from-green-400 to-emerald-600 rounded-3xl shadow-2xl transform hover:scale-110 transition-all border-4 rgb-border">
                <div
                  className="text-6xl font-bold mb-4 animate-bounce"
                  style={{ animationDelay: "0.6s" }}
                >
                  ⭐
                </div>
                <div className="text-5xl font-black text-yellow-300 mb-2">5/5</div>
                <div className="text-lg text-white font-black uppercase">
                  {t("pages:smarvy.stats.guests")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-full mb-8 border-4 rgb-border shadow-2xl animate-pulse">
              <Sparkles className="w-7 h-7 text-yellow-300 animate-spin" />
              <span className="text-white font-black uppercase text-xl tracking-wider">
                🌐 {t("pages:smarvy.comingSoon.badge")} 🌐
              </span>
              <Sparkles className="w-7 h-7 text-yellow-300 animate-spin" />
            </div>

            <h2 className="relative z-10 pb-5 text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-pink-300 to-yellow-300 mb-6 uppercase tracking-wider drop-shadow-2xl neon-text">
              {t("pages:smarvy.comingSoon.title")} 🚀
            </h2>

            <p className="text-2xl text-white leading-relaxed mb-10 font-bold bg-black/40 backdrop-blur-sm px-8 py-6 rounded-3xl border-4 rgb-border shadow-2xl">
              {t("pages:smarvy.comingSoon.description")}
            </p>

            <button
              disabled
              className="inline-block bg-linear-to-r from-gray-600 to-gray-700 text-gray-400 px-12 py-6 text-xl font-black uppercase tracking-wide rounded-2xl shadow-2xl cursor-not-allowed opacity-60 border-4 border-gray-500 relative"
            >
              <span className="relative z-10">🌐 {t("pages:smarvy.comingSoon.button")}</span>
              <div className="absolute inset-0 bg-linear-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl animate-pulse" />
            </button>

            {/* Feature Hints */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-linear-to-br from-pink-500/30 to-purple-600/30 backdrop-blur-sm rounded-2xl p-6 border-4 rgb-border">
                <div className="text-4xl mb-2">🎟️</div>
                <div className="text-white font-black text-sm uppercase">
                  {t("pages:smarvy.comingSoon.features.booking")}
                </div>
              </div>
              <div className="bg-linear-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-sm rounded-2xl p-6 border-4 rgb-border">
                <div className="text-4xl mb-2">⏱️</div>
                <div className="text-white font-black text-sm uppercase">
                  {t("pages:smarvy.comingSoon.features.updates")}
                </div>
              </div>
              <div className="bg-linear-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-sm rounded-2xl p-6 border-4 rgb-border">
                <div className="text-4xl mb-2">🎁</div>
                <div className="text-white font-black text-sm uppercase">
                  {t("pages:smarvy.comingSoon.features.prizes")}
                </div>
              </div>
              <div className="bg-linear-to-br from-green-400/30 to-emerald-600/30 backdrop-blur-sm rounded-2xl p-6 border-4 rgb-border">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-white font-black text-sm uppercase">
                  {t("pages:smarvy.comingSoon.features.rewards")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
