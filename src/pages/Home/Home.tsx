import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  CalendarDays,
  Coffee,
  Compass,
  Crown,
  Handshake,
  Info,
  Landmark,
  LineChart,
  MapPin,
  Megaphone,
  MessageCircle,
  Newspaper,
  ParkingCircle,
  PlayCircle,
  Route,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import Header from "../../components/layout/Header";
import OptimizedImage from "../../components/common/OptimizedImage/OptimizedImage";
import SEO from "../../components/common/SEO";

export default function Home() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const [visitorCount, setVisitorCount] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      window.dispatchEvent(
        new CustomEvent("navColorChange", { detail: { isDark: window.scrollY > 120 } })
      );
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isArabic]);

  const visitorModel = useMemo(() => {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const day = now.getDay();
    const isWeekend = day === 5 || day === 6;
    const isEventWindow = [9, 10, 11, 12].includes(now.getMonth()) || isWeekend;
    let base = 0;

    if (hour >= 6 && hour < 11.5) {
      base = 1900 * ((hour - 6) / 5.5);
    } else if (hour >= 11.5 && hour < 16) {
      base = 1900 + 1300 * ((hour - 11.5) / 4.5);
    } else if (hour >= 16 && hour < 24) {
      base = 3200 + 6000 * ((hour - 16) / 8);
    } else {
      base = hour < 6 ? 180 + hour * 35 : 9200;
    }

    const multiplier = isEventWindow ? (isWeekend ? 1.35 : 1.18) : 1;
    const target = Math.max(220, Math.round(base * multiplier));
    const peak = isEventWindow ? (isWeekend ? 12400 : 10800) : 9200;
    const status = isEventWindow
      ? isWeekend
        ? isArabic
          ? "نهاية أسبوع نشطة"
          : "Active weekend"
        : isArabic
          ? "موسم / فعالية"
          : "Season / event mode"
      : isArabic
        ? "يوم عادي"
        : "Normal day";
    return { target, peak, isWeekend, isEventWindow, status };
  }, [isArabic]);

  useEffect(() => {
    let frame = 0;
    const duration = 1800;
    const start = performance.now();
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVisitorCount(Math.round(visitorModel.target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visitorModel.target]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % 4);
    }, 3500);
    return () => window.clearInterval(interval);
  }, []);

  const copy = {
    eyebrow: isArabic ? "منصة نمو للعلامات في الأحساء" : "A growth platform for brands in Al Ahsa",
    title: isArabic ? "العامر مول" : "Al Amer Mall",
    subtitle: isArabic
      ? "ليست وجهة تسوق فقط. العامر مول منصة تجارية تجمع حركة الزوار، العلامات، المطاعم، الترفيه، المحتوى الاجتماعي، وفرص النمو في موقع واحد."
      : "Not just a shopping destination. Al Amer Mall is a commercial platform connecting footfall, brands, dining, entertainment, social content and growth opportunities in one place.",
    primary: isArabic ? "اكتشف الفرصة" : "Discover the opportunity",
    secondary: isArabic ? "شاهد الأخبار" : "See latest news",
    commercial: isArabic ? "القيمة التجارية" : "Commercial value",
    vision: isArabic ? "رؤيتنا" : "Our vision",
    contact: isArabic ? "ابدأ التواصل" : "Start the conversation",
  };

  const socialChannels = [
    ["LinkedIn", "https://www.linkedin.com/company/al-amer-mall", "Business updates"],
    ["Instagram", "https://www.instagram.com/alamermall/", "Visual stories"],
    ["TikTok", "https://www.tiktok.com/@alamermall?_t=zs-8yxj3x0fjvn&_r=1", "Short videos"],
    [
      "Snapchat",
      "https://www.snapchat.com/@alamermall?share_id=NkU4MkJE&locale=ar_SA@calendar=gregorian",
      "Daily moments",
    ],
  ];

  const brandStories = [
    {
      title: "Beverly Hills Polo Club",
      tag: isArabic ? "افتتاح تجريبي" : "Soft opening",
      text: isArabic
        ? "علامة أزياء تضيف قيمة جديدة لتجربة الزائر وتثري مزيج المتاجر."
        : "A fashion brand adding new value to visitor experience and retail mix.",
      image: "/images/alamerMall/Mall_image03.png",
    },
    {
      title: isArabic ? "بوخمسين للمفروشات" : "Bukhamseen Furniture",
      tag: isArabic ? "قريبًا" : "Coming soon",
      text: isArabic
        ? "شراكة تجارية قوية تضيف فئة مفروشات مهمة داخل المول."
        : "A strong commercial partnership adding an important furniture category.",
      image: "/images/stores/bukhamseen/bukhamseen_image.JPG",
    },
    {
      title: "WaCafe",
      tag: isArabic ? "تجربة ضيافة" : "Hospitality experience",
      text: isArabic
        ? "مقهى بتصميم حديث يعزز وقت بقاء الزائر داخل المول."
        : "A modern cafe concept increasing visitor dwell time inside the mall.",
      image: "/images/dining/Wacafe/Wacafe_image.JPG",
    },
  ];

  const growthReasons = [
    {
      title: isArabic ? "حركة زوار متنوعة" : "Diverse visitor flow",
      text: isArabic
        ? "عائلات، متسوقون، مطاعم، ترفيه، ومناسبات موسمية في وجهة واحدة."
        : "Families, shoppers, dining, entertainment and seasonal moments in one place.",
      icon: Users,
    },
    {
      title: isArabic ? "مزيج تجاري متكامل" : "Balanced commercial mix",
      text: isArabic
        ? "تجزئة، هايبر ماركت، مقاهي، مطاعم وترفيه تدعم بعضهم البعض."
        : "Retail, hypermarket, cafes, restaurants and entertainment reinforce each other.",
      icon: Store,
    },
    {
      title: isArabic ? "محتوى اجتماعي نشط" : "Active social presence",
      text: isArabic
        ? "تحديثات وافتتاحات وقصص مرئية تساعد العلامات على الظهور."
        : "Updates, openings and visual stories help brands get noticed.",
      icon: Megaphone,
    },
    {
      title: isArabic ? "موقع يخدم الشراكات" : "Partnership-ready destination",
      text: isArabic
        ? "الموقع يعرض القيمة التجارية قبل طلب التواصل."
        : "The website communicates business value before asking for contact.",
      icon: Handshake,
    },
  ];

  const destinationCards = [
    {
      title: isArabic ? "المتاجر" : "Stores",
      href: "/stores",
      image: "/images/alamerMall/Mall_image02.JPG",
      icon: ShoppingBag,
    },
    {
      title: isArabic ? "المطاعم" : "Dining",
      href: "/restaurants",
      image: "/images/dining/Wacafe/Wacafe_image.JPG",
      icon: Coffee,
    },
    {
      title: isArabic ? "الترفيه" : "Entertainment",
      href: "/entertainment",
      image: "/images/smarvy/Smarvy_banner.jpg",
      icon: Ticket,
    },
    {
      title: isArabic ? "الهايبر ماركت" : "Hypermarket",
      href: "/hypermarket",
      image: "/images/hypermarket/fountain view_Image01.JPG",
      icon: Store,
    },
  ];

  const experienceSlides = [
    {
      title: isArabic ? "التسوق" : "Shop",
      text: isArabic ? "علامات ومتاجر تخدم الزيارة اليومية والموسمية." : "Brands and stores serving daily and seasonal visits.",
      image: "/images/alamerMall/Mall_image02.JPG",
    },
    {
      title: isArabic ? "المطاعم والمقاهي" : "Dine",
      text: isArabic ? "جلسات تجعل الزيارة أطول وأكثر اجتماعية." : "Dining moments that make visits longer and more social.",
      image: "/images/dining/Wacafe/Wacafe_image.JPG",
    },
    {
      title: isArabic ? "الترفيه" : "Play",
      text: isArabic ? "فيديو وتجارب عائلية ترفع التفاعل." : "Motion and family experiences that lift engagement.",
      image: "/images/smarvy/Smarvy_banner.jpg",
    },
    {
      title: isArabic ? "الزيارة" : "Plan",
      text: isArabic ? "موقع، مواقف، خريطة، وأخبار تجعل القرار أسهل." : "Location, parking, map and news make planning easier.",
      image: "/images/parking/Parking_image.JPG",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#120b10] text-white" dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={isArabic ? "العامر مول | وجهة تجارية وترفيهية" : "Al Amer Mall | Commercial Destination"}
        description={copy.subtitle}
      />
      <Header />

      <style>{`
        @keyframes mallFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes mallGlow { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: .95; transform: scale(1.08); } }
        @keyframes mallMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes mallPulseRing { 0% { transform: scale(.88); opacity: .85; } 100% { transform: scale(1.45); opacity: 0; } }
        @keyframes mallShimmer { from { transform: translateX(-120%); } to { transform: translateX(120%); } }
        .mall-float { animation: mallFloat 5s ease-in-out infinite; }
        .mall-glow { animation: mallGlow 4s ease-in-out infinite; }
        .mall-marquee { animation: mallMarquee 22s linear infinite; }
        .mall-pulse-ring { animation: mallPulseRing 1.8s ease-out infinite; }
        .mall-shimmer::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent, rgba(255,255,255,.2), transparent); animation: mallShimmer 3.4s ease-in-out infinite; }
      `}</style>

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="/images/alamerMall/ai-premium-mall-hero.png"
            alt="Premium Al Amer Mall concept"
            className="h-full w-full scale-105"
            objectFit="cover"
            priority
            showSkeleton={false}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#120b10]/95 via-[#2b1730]/72 to-[#ef7622]/20" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-[#120b10] to-transparent" />
        </div>

        <div className="mall-glow absolute right-[-10rem] top-20 h-96 w-96 rounded-full bg-[#ef7622]/35 blur-3xl" />
        <div className="mall-glow absolute bottom-20 left-[-8rem] h-80 w-80 rounded-full bg-[#fedd3d]/20 blur-3xl" />

        <div className="relative mx-auto grid min-h-screen max-w-7xl gap-10 px-5 pb-20 pt-32 md:px-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
              <Crown className="h-4 w-4 text-[#fedd3d]" />
              {copy.eyebrow}
            </div>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-normal md:text-8xl lg:text-9xl">
              {copy.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-white/84 md:text-2xl md:leading-10">
              {copy.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#commercial"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef7622] px-7 py-4 font-black text-white shadow-2xl shadow-[#ef7622]/25 transition hover:-translate-y-1 hover:bg-[#d86518]"
              >
                {copy.primary}
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <a
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                <Newspaper className="h-5 w-5" />
                {copy.secondary}
              </a>
            </div>
          </div>

          <div className="mall-float rounded-[2rem] border border-white/18 bg-white/12 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-[#120b10]/80 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-[#fedd3d]">
                    {isArabic ? "لوحة الفرصة" : "Opportunity board"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    {isArabic ? "لماذا العلامات هنا؟" : "Why brands come here"}
                  </h2>
                </div>
                <BarChart3 className="h-9 w-9 text-[#ef7622]" />
              </div>
              <div className="grid gap-3">
                {[
                  [isArabic ? "زوار" : "Visitors", isArabic ? "عائلات + تسوق + ترفيه" : "Families + shopping + entertainment"],
                  [isArabic ? "محتوى" : "Content", isArabic ? "افتتاحات وقصص مرئية" : "Openings and visual stories"],
                  [isArabic ? "قيمة" : "Value", isArabic ? "وقت زيارة أطول وفرص ظهور" : "Longer dwell time and visibility"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4">
                    <div className="text-sm text-white/60">{label}</div>
                    <div className="mt-1 text-lg font-black">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 max-w-7xl px-5 md:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-white/12 bg-white/12 p-5 shadow-2xl backdrop-blur-xl lg:grid-cols-[1fr_0.85fr_0.85fr]">
          <div className="rounded-[1.5rem] bg-[#f6efe8] p-6 text-[#21151d]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
                  {isArabic ? "عداد الزوار اليومي" : "Daily visitor counter"}
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-5xl font-black md:text-6xl">
                    {visitorCount.toLocaleString(isArabic ? "ar-SA" : "en-US")}
                  </span>
                  <span className="mb-2 animate-pulse rounded-full bg-[#ef7622] px-3 py-1 text-xs font-black text-white">
                    + {isArabic ? "زوار" : "visitors"}
                  </span>
                </div>
              </div>
              <Users className="h-14 w-14 text-[#44273a]" />
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e8dcd2]">
              <div
                className="h-full rounded-full bg-linear-to-r from-[#ef7622] to-[#fedd3d] transition-all duration-700"
                style={{ width: `${Math.min((visitorCount / visitorModel.peak) * 100, 100)}%` }}
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#44273a] px-4 py-2 text-sm font-black text-white shadow-lg">
                <span className="h-2 w-2 animate-ping rounded-full bg-[#fedd3d]" />
                {visitorModel.status}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#44273a]">
                <Info className="h-4 w-4 text-[#ef7622]" />
                {isArabic ? "زوار اليوم، وليس عدد الموجودين داخل المول الآن" : "Daily visitors, not people currently inside"}
              </span>
            </div>
          </div>
          {[
            [
              isArabic ? "الذروة المتوقعة" : "Expected peak",
              visitorModel.peak.toLocaleString(isArabic ? "ar-SA" : "en-US"),
              isArabic ? "مساءً ونهاية الأسبوع" : "Evenings and weekends",
            ],
            [
              isArabic ? "حالة اليوم" : "Today mode",
              visitorModel.isWeekend ? (isArabic ? "نهاية أسبوع" : "Weekend") : isArabic ? "يوم عادي" : "Normal day",
              visitorModel.isEventWindow ? (isArabic ? "طلب مرتفع" : "High demand") : isArabic ? "حركة طبيعية" : "Steady flow",
            ],
          ].map(([title, value, note]) => (
            <div key={title} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-6">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#fedd3d]">{title}</p>
              <div className="mt-3 text-4xl font-black">{value}</div>
              <p className="mt-3 text-white/65">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5 py-4 backdrop-blur">
        <div className="mall-marquee flex w-[200%] gap-4 whitespace-nowrap text-sm font-black uppercase tracking-[0.18em] text-white/72">
          {[
            "Beverly Hills Polo Club",
            "Bukhamseen Furniture",
            "WaCafe",
            "Smarvy Spot",
            "Al Amer Hypermarket",
            "Restaurants",
            "Entertainment",
            "Leasing",
            "Investment",
          ]
            .concat([
              "Beverly Hills Polo Club",
              "Bukhamseen Furniture",
              "WaCafe",
              "Smarvy Spot",
              "Al Amer Hypermarket",
              "Restaurants",
              "Entertainment",
              "Leasing",
              "Investment",
            ])
            .map((item, index) => (
              <span key={`${item}-${index}`} className="mx-5 inline-flex items-center gap-4">
                <Sparkles className="h-4 w-4 text-[#fedd3d]" />
                {item}
              </span>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-2xl">
            {experienceSlides.map((slide, index) => (
              <div
                key={slide.title}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === slideIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <OptimizedImage src={slide.image} alt={slide.title} className="h-full w-full" objectFit="cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[#120b10] via-[#120b10]/35 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="rounded-full bg-[#fedd3d] px-4 py-2 text-sm font-black text-[#21151d]">
                    {isArabic ? "تجربة الزائر" : "Visitor experience"}
                  </span>
                  <h2 className="mt-5 text-5xl font-black">{slide.title}</h2>
                  <p className="mt-3 max-w-xl text-xl leading-9 text-white/78">{slide.text}</p>
                </div>
              </div>
            ))}
            <div className="absolute right-6 top-6 flex gap-2">
              {experienceSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setSlideIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === slideIndex ? "w-10 bg-[#fedd3d]" : "w-3 bg-white/60"
                  }`}
                  aria-label={slide.title}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] bg-[#f6efe8] p-7 text-[#21151d]">
              <Route className="h-10 w-10 text-[#ef7622]" />
              <h2 className="mt-5 text-4xl font-black">
                {isArabic ? "خطط زيارتك بسرعة" : "Plan your visit fast"}
              </h2>
              <p className="mt-4 leading-8 text-[#665963]">
                {isArabic
                  ? "الموقع، المواقف، الخريطة، الأخبار، والمتاجر كلها مرتبطة لتقود الزائر للخطوة التالية."
                  : "Location, parking, map, news and stores are connected to move visitors to the next step."}
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  [isArabic ? "افتح الخريطة" : "Open map", "/maps", Compass],
                  [isArabic ? "شاهد المتاجر" : "Browse stores", "/stores", ShoppingBag],
                  [isArabic ? "آخر الأخبار" : "Latest news", "/events", Newspaper],
                  [isArabic ? "الوصول والموقع" : "Location", "https://tr.ee/H213pKxHc1", MapPin],
                ].map(([label, href, Icon]) => (
                  <a
                    key={label as string}
                    href={href as string}
                    target={(href as string).startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-2xl bg-white p-4 font-black text-[#44273a] transition hover:bg-[#44273a] hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-[#ef7622]" />
                      {label as string}
                    </span>
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="commercial" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
              {copy.commercial}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              {isArabic ? "موقع يبيع التجربة والفرصة قبل المساحة" : "A website that sells the experience before the space"}
            </h2>
            <p className="mt-5 text-lg leading-9 text-white/70">
              {isArabic
                ? "لرجل الأعمال أو العلامة، المهم ليس فقط وجود محل. المهم أن تكون داخل منظومة تجذب الزوار، تصنع محتوى، وتزيد احتمالية تكرار الزيارة."
                : "For businesses, the value is not only a unit. It is being inside an ecosystem that attracts visitors, creates content and increases repeat visits."}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {growthReasons.map((item) => (
              <div key={item.title} className="rounded-[1.7rem] border border-white/10 bg-white/8 p-6 transition hover:-translate-y-1 hover:bg-white/12">
                <item.icon className="h-9 w-9 text-[#fedd3d]" />
                <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/68">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6efe8] px-5 py-20 text-[#21151d] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
                {isArabic ? "شركاء وقصص نمو" : "Partners and growth stories"}
              </p>
              <h2 className="mt-3 text-4xl font-black md:text-6xl">
                {isArabic ? "كل افتتاح يضيف سببًا جديدًا للزيارة" : "Every opening adds a new reason to visit"}
              </h2>
            </div>
            <a href="/events" className="inline-flex items-center gap-2 font-black text-[#ef7622]">
              {isArabic ? "كل الأخبار" : "All news"}
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {brandStories.map((story) => (
              <article key={story.title} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <OptimizedImage
                    src={story.image}
                    alt={story.title}
                    className="h-full w-full transition duration-700 group-hover:scale-110"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-5 left-5 rounded-full bg-[#fedd3d] px-3 py-1 text-xs font-black text-[#21151d]">
                    {story.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black">{story.title}</h3>
                  <p className="mt-3 leading-7 text-[#655762]">{story.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
              {isArabic ? "فيديو وسوشيال" : "Video and social wall"}
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">
              {isArabic ? "فيديو تلقائي + قنوات السوشيال الرسمية" : "Autoplay motion + official social channels"}
            </h2>
            <p className="mt-5 text-lg leading-9 text-white/70">
              {isArabic
                ? "وضعت الفيديو في مقدمة التجربة كواجهة متحركة، ومعه روابط TikTok وLinkedIn وInstagram وSnapchat حتى ينتقل الزائر مباشرة إلى آخر المحتوى الرسمي."
                : "The page now carries motion like a social stage, with direct paths to TikTok, LinkedIn, Instagram and Snapchat for the latest official content."}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-2xl">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ef7622]/35 blur-3xl" />
            <div className="grid gap-4 lg:grid-cols-[0.78fr_1fr]">
              <div className="relative mx-auto w-full max-w-[22rem] rounded-[2.2rem] border border-white/14 bg-[#060406] p-3 shadow-2xl">
                <span className="mall-pulse-ring absolute -inset-2 rounded-[2.7rem] border border-[#fedd3d]/50" />
                <div className="relative overflow-hidden rounded-[1.7rem]">
                  <video
                    className="h-[34rem] w-full object-cover"
                    src="/images/smarvy/Smarvy-video.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/smarvy/Smarvy_banner.jpg"
                  />
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-linear-to-b from-black/75 to-transparent p-4">
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-[0.14em]">
                      Live motion
                    </span>
                    <PlayCircle className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/70 to-transparent p-5">
                    <p className="text-2xl font-black">{isArabic ? "زيارة تتحرك" : "A visit in motion"}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">
                      {isArabic
                        ? "فيديو يبدأ تلقائياً ليعطي إحساس الطاقة والحركة داخل الوجهة."
                        : "Autoplay video gives the homepage instant energy and movement."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {socialChannels.map(([label, href, role]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mall-shimmer group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 transition hover:-translate-y-1 hover:bg-[#ef7622]"
                  >
                    <div className="absolute right-4 top-4 opacity-20 transition group-hover:scale-125">
                      <PlayCircle className="h-20 w-20" />
                    </div>
                    <PlayCircle className="h-10 w-10 text-[#fedd3d]" />
                    <h3 className="mt-6 text-3xl font-black">{label}</h3>
                    <p className="mt-2 text-white/70">{role}</p>
                    <span className="mt-6 inline-flex items-center gap-2 font-black">
                      {isArabic ? "فتح القناة" : "Open channel"}
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-[#21151d] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {destinationCards.map((card) => (
                <a key={card.title} href={card.href} className="group overflow-hidden rounded-[2rem] bg-[#f6efe8] shadow-lg transition hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage src={card.image} alt={card.title} className="h-full w-full transition duration-700 group-hover:scale-110" objectFit="cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                      <card.icon className="h-7 w-7 text-[#fedd3d]" />
                      <h3 className="text-2xl font-black">{card.title}</h3>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
                {copy.vision}
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
                {isArabic ? "نبني وجهة تعطي الزائر سببًا للعودة" : "Building a destination that gives visitors a reason to return"}
              </h2>
              <p className="mt-5 text-lg leading-9 text-[#655762]">
                {isArabic
                  ? "رؤيتنا أن يكون العامر مول مساحة للتسوق والترفيه والشراكات، حيث تجد العلامات بيئة جاهزة للنمو، ويجد الزائر تجربة متجددة في كل زيارة."
                  : "Our vision is to make Al Amer Mall a place for retail, entertainment and partnerships, where brands find a ready growth environment and visitors find a renewed experience every time."}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  [Target, isArabic ? "تجربة زائر أفضل" : "Better visitor experience"],
                  [LineChart, isArabic ? "قيمة أعلى للعلامات" : "Higher value for brands"],
                  [Landmark, isArabic ? "وجهة قوية للأحساء" : "A stronger Al Ahsa destination"],
                  [Building2, isArabic ? "شراكات قابلة للنمو" : "Scalable partnerships"],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-3 rounded-2xl bg-[#f6efe8] p-4 font-black text-[#44273a]">
                    <Icon className="h-6 w-6 text-[#ef7622]" />
                    {label as string}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 text-white shadow-2xl backdrop-blur lg:grid-cols-[1fr_0.75fr]">
          <div className="p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#fedd3d]">
              {isArabic ? "للشركاء والعلامات" : "For partners and brands"}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              {isArabic ? "إذا كانت علامتك تبحث عن نمو، ابدأ من هنا" : "If your brand is looking for growth, start here"}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-white/72">
              {isArabic
                ? "الموقع لا يطلب الاستثمار مباشرة، بل يعرض البيئة والقيمة ثم يفتح باب التواصل بطريقة احترافية."
                : "The site does not push investment directly. It presents the environment and value, then opens a professional conversation."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/rental" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef7622] px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-[#d86518]">
                <TrendingUp className="h-5 w-5" />
                {isArabic ? "استكشف فرص المواقع" : "Explore locations"}
              </a>
              <a href="https://wa.me/966544439986" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
                <MessageCircle className="h-5 w-5" />
                {copy.contact}
              </a>
            </div>
          </div>
          <div className="relative min-h-96">
            <OptimizedImage src="/images/alamerMall/ai-business-partnership.png" alt="Al Amer Mall commercial growth" className="h-full w-full" objectFit="cover" />
            <div className="absolute inset-0 bg-linear-to-t from-[#120b10] via-transparent to-transparent" />
            <a href="https://tr.ee/H213pKxHc1" target="_blank" rel="noopener noreferrer" className="absolute bottom-6 left-6 right-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-black text-[#44273a]">
              <MapPin className="h-5 w-5 text-[#ef7622]" />
              {isArabic ? "موقع العامر مول" : "Al Amer Mall location"}
              <ParkingCircle className="h-5 w-5 text-[#ef7622]" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
