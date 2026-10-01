import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  CalendarDays,
  Coffee,
  Newspaper,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";
import Header from "../../components/layout/Header/Header";
import OptimizedImage from "../../components/common/OptimizedImage/OptimizedImage";
import SEO from "../../components/common/SEO";

type NewsCategory = "all" | "openings" | "coming" | "events" | "social";

export default function Events() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const [category, setCategory] = useState<NewsCategory>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: true } }));
  }, []);

  const copy = {
    title: isArabic ? "أخبار العامر مول" : "Al Amer Mall Newsroom",
    subtitle: isArabic
      ? "كل جديد في المول: افتتاحات، علامات قادمة، فعاليات، ومحتوى التواصل الاجتماعي في مكان واحد."
      : "Openings, upcoming brands, events and social highlights in one destination hub.",
    search: isArabic ? "ابحث في الأخبار..." : "Search news...",
    latest: isArabic ? "آخر التحديثات" : "Latest updates",
    follow: isArabic ? "تابعنا مباشرة" : "Follow live channels",
  };

  const categories = [
    { id: "all" as const, label: isArabic ? "الكل" : "All" },
    { id: "openings" as const, label: isArabic ? "افتتاحات" : "Openings" },
    { id: "coming" as const, label: isArabic ? "قريبًا" : "Coming soon" },
    { id: "events" as const, label: isArabic ? "فعاليات" : "Events" },
    { id: "social" as const, label: isArabic ? "سوشيال" : "Social" },
  ];

  const newsItems = useMemo(
    () => [
      {
        category: "openings" as NewsCategory,
        title: isArabic ? "افتتاح تجريبي لـ Beverly Hills Polo Club" : "Beverly Hills Polo Club soft opening",
        date: isArabic ? "أحدث افتتاح" : "Latest opening",
        text: isArabic
          ? "إضافة جديدة تثري خيارات الأزياء وتقدم تجربة تجمع بين الأناقة والجودة والطابع العالمي."
          : "A new fashion addition enriching the mall mix with style, quality and a global brand feel.",
        image: "/images/alamerMall/Mall_image02.JPG",
        icon: ShoppingBag,
      },
      {
        category: "coming" as NewsCategory,
        title: isArabic ? "بوخمسين للمفروشات قريبًا في العامر مول" : "Bukhamseen Furniture coming soon",
        date: isArabic ? "قريبًا" : "Coming soon",
        text: isArabic
          ? "تعاون استراتيجي يضيف وجهة مفروشات قوية داخل المول ويزيد تنوع تجربة الزائر."
          : "A strategic collaboration bringing a strong home furnishing destination into the mall.",
        image: "/images/stores/bukhamseen/bukhamseen_image.JPG",
        icon: Star,
      },
      {
        category: "openings" as NewsCategory,
        title: isArabic ? "WaCafe تجربة قهوة بتصميم حديث" : "WaCafe coffee experience",
        date: isArabic ? "مفتوح الآن" : "Now open",
        text: isArabic
          ? "تجربة مقهى تجمع الضيافة العربية، التصميم الأنيق، والمشروبات المختصة."
          : "A cafe experience combining Arabian hospitality, refined interiors and specialty drinks.",
        image: "/images/dining/Wacafe/Wacafe_image.JPG",
        icon: Coffee,
      },
      {
        category: "events" as NewsCategory,
        title: isArabic ? "احتفاء اليوم الوطني السعودي" : "Saudi National Day celebration",
        date: isArabic ? "موسمي" : "Seasonal",
        text: isArabic
          ? "محتوى وطني يعزز ارتباط المول بالمجتمع ويخلق سببًا عاطفيًا للزيارة والمشاركة."
          : "National content strengthening community connection and creating an emotional reason to visit and share.",
        image: "/images/alamerMall/ai-premium-mall-hero.png",
        icon: Sparkles,
      },
      {
        category: "events" as NewsCategory,
        title: isArabic ? "تجارب ترفيهية عائلية في سمارفي" : "Family entertainment at Smarvy",
        date: isArabic ? "مستمر" : "Ongoing",
        text: isArabic
          ? "وجهة ترفيهية تزيد وقت الزيارة وتمنح العائلة سببًا إضافيًا للعودة."
          : "An entertainment anchor that extends visit time and gives families a reason to return.",
        image: "/images/smarvy/Smarvy_banner.jpg",
        icon: Ticket,
      },
      {
        category: "events" as NewsCategory,
        title: isArabic ? "فعاليات العيد وتجارب العائلة" : "Eid events and family moments",
        date: isArabic ? "موسمي" : "Seasonal",
        text: isArabic
          ? "فعاليات العيد تجعل المول مساحة للفرحة، العروض، وتجارب الأطفال والعائلة."
          : "Eid moments turn the mall into a place for joy, offers and family experiences.",
        image: "/images/smarvy/Smarvy_image (24).JPG",
        icon: CalendarDays,
      },
      {
        category: "social" as NewsCategory,
        title: isArabic ? "تابع آخر المحتوى على Instagram وTikTok وSnapchat" : "Follow the latest on Instagram, TikTok and Snapchat",
        date: isArabic ? "مباشر" : "Live channels",
        text: isArabic
          ? "الصفحة تجمع روابط القنوات الرسمية ليبقى الزائر قريبًا من العروض والافتتاحات."
          : "Official social links keep visitors close to offers, openings and mall moments.",
        image: "/images/alamerMall/Mall_image03.png",
        icon: Share2,
      },
    ],
    [isArabic]
  );

  const filteredItems = newsItems.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesQuery = `${item.title} ${item.text}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-[#f6efe8] text-[#24151f]" dir={isArabic ? "rtl" : "ltr"}>
      <SEO
        title={isArabic ? "أخبار العامر مول" : "Al Amer Mall News"}
        description={copy.subtitle}
      />
      <Header />

      <section className="relative overflow-hidden bg-[#24151f] px-5 pb-20 pt-32 text-white md:px-8">
        <div className="absolute inset-0 opacity-25">
          <OptimizedImage
            src="/images/alamerMall/mall_image01.JPG"
            alt="Al Amer Mall"
            className="h-full w-full"
            objectFit="cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-br from-[#24151f] via-[#44273a]/90 to-[#ef7622]/70" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur">
              <Newspaper className="h-4 w-4 text-[#fedd3d]" />
              {isArabic ? "مركز الأخبار والتحديثات" : "News and updates center"}
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">{copy.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-white/82">{copy.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-7xl px-5 md:px-8">
        <div className="rounded-[2rem] bg-white p-4 shadow-2xl md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#8c7d86] ltr:left-4 rtl:right-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search}
                className="w-full rounded-full border border-[#44273a]/10 bg-[#f6efe8] px-12 py-4 font-bold outline-none focus:border-[#ef7622]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                    category === item.id
                      ? "bg-[#44273a] text-white"
                      : "bg-[#f6efe8] text-[#44273a] hover:bg-[#fedd3d]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ef7622]">
              {copy.latest}
            </p>
            <h2 className="mt-2 text-4xl font-black">{isArabic ? "تحديثات المول" : "Mall updates"}</h2>
          </div>
          <CalendarDays className="hidden h-12 w-12 text-[#44273a] md:block" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map((item, index) => (
            <article
              key={item.title}
              className={`group overflow-hidden rounded-[2rem] bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`grid ${index === 0 ? "md:grid-cols-[1.2fr_0.8fr]" : ""}`}>
                <div className="relative h-72 overflow-hidden">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full transition duration-700 group-hover:scale-105"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#fedd3d] px-3 py-1 text-xs font-black text-[#24151f]">
                      <item.icon className="h-4 w-4" />
                      {item.date}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-3xl font-black leading-tight">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-[#5d5159]">{item.text}</p>
                  <a
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 font-black text-[#ef7622]"
                  >
                    {isArabic ? "للتواصل والاستفسار" : "Contact for details"}
                    <ArrowUpRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-[#24151f] p-8 text-white md:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <Sparkles className="h-10 w-10 text-[#fedd3d]" />
                <h2 className="mt-4 text-4xl font-black">{copy.follow}</h2>
                <p className="mt-3 leading-8 text-white/75">
                  {isArabic
                    ? "روابط مباشرة لكل قنوات العامر مول الرسمية لتحديثات أسرع ومحتوى أحدث."
                    : "Direct links to official Al Amer Mall channels for faster updates and richer content."}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Instagram", "https://www.instagram.com/alamermall/"],
                  ["LinkedIn", "https://www.linkedin.com/company/al-amer-mall"],
                  ["TikTok", "https://www.tiktok.com/@alamermall?_t=zs-8yxj3x0fjvn&_r=1"],
                  [
                    "Snapchat",
                    "https://www.snapchat.com/@alamermall?share_id=NkU4MkJE&locale=ar_SA@calendar=gregorian",
                  ],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-white/10 p-5 text-center font-black transition hover:bg-[#ef7622]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
