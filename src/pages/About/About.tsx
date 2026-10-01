import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Building2, Users, Heart, Target, Sparkles, Clock, MapPin } from "lucide-react";
import Header from "../../components/layout/Header/Header";

export default function About() {
  const { t } = useTranslation(["pages", "common"]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500; // Approximate hero section height
      const scrollPosition = window.scrollY;

      if (scrollPosition >= heroHeight * 0.5) {
        window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: true } }));
      } else {
        window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: false } }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stats = useMemo(
    () => [
      { icon: Building2, value: "150+", label: t("pages:about.stats.stores") },
      { icon: Users, value: "7.3M+", label: t("pages:about.stats.visitors") },
      { icon: MapPin, value: "5", label: t("pages:about.stats.floors") },
      { icon: Clock, value: "20+", label: t("pages:about.stats.hours") },
    ],
    [t]
  );

  const values = useMemo(
    () => [
      {
        icon: Target,
        title: t("pages:about.whoWeAre.mission.title"),
        description: t("pages:about.whoWeAre.mission.description"),
      },
      {
        icon: Sparkles,
        title: t("pages:about.whoWeAre.vision.title"),
        description: t("pages:about.whoWeAre.vision.description"),
      },
      {
        icon: Heart,
        title: t("pages:about.whoWeAre.values.title"),
        description: t("pages:about.whoWeAre.values.description"),
      },
    ],
    [t]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-28 bg-linear-to-br from-primary to-primary-dark text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-[url('/images/alamerMall/placeholderAlamerMallBanner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-primary-dark/90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 animate-about-fade-in-up">
            {t("pages:about.hero.title")}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto opacity-95">
            {t("pages:about.hero.subtitle")}
          </p>
        </div>

        {/* Decorative Wave */}
        <div className="absolute -bottom-px left-0 right-0">
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 520L60 530C120 540 240 560 360 566.7C480 573 600 567 720 563.3C840 560 960 560 1080 566.7C1200 573 1320 587 1380 593.3L1440 600V600H1380C1320 600 1200 600 1080 600C960 600 840 600 720 600C600 600 480 600 360 600C240 600 120 600 60 600H0V520Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center animate-about-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-about-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-6 text-gray-800">
                {t("pages:about.ourStory.title")}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t("pages:about.ourStory.paragraph1")}</p>
                <p>{t("pages:about.ourStory.paragraph2")}</p>
                <p>{t("pages:about.ourStory.paragraph3")}</p>
              </div>
            </div>
            <div className="relative animate-about-fade-in-up">
              <img
                src="/images/alamerMall/alamerMall.png"
                alt="Alamer Mall"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-center mb-12 text-gray-800">
            {t("pages:about.whoWeAre.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow animate-about-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-6">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-normal mb-6">{t("pages:about.cta.title")}</h2>
          <p className="text-lg mb-8 opacity-95">{t("pages:about.cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://maps.app.goo.gl/duMw7y1F68JHAzFq8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              {t("pages:about.cta.findUs")}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t("pages:about.cta.getInTouch")}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes about-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes about-fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-about-fade-in {
          animation: about-fade-in 0.6s ease-out forwards;
        }

        .animate-about-fade-in-up {
          animation: about-fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
