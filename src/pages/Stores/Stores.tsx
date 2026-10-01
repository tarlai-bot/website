import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  Building2,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  X,
} from "lucide-react";
import Header from "../../components/layout/Header/Header";
import OptimizedImage from "../../components/common/OptimizedImage/OptimizedImage";

type StoreStatus = "open" | "joining";

type MallStore = {
  id: string;
  name: string;
  category: string;
  floor: string;
  status: StoreStatus;
  image: string;
  logo?: string;
  description: string;
  value: string;
  website: string;
};

export default function Stores() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState<MallStore | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: true } }));
  }, []);

  const stores: MallStore[] = useMemo(
    () => [
      {
        id: "alamer-market",
        name: isArabic ? "أسواق العامر" : "Al Amer Market",
        category: isArabic ? "هايبر ماركت" : "Hypermarket",
        floor: isArabic ? "الطابق الأرضي" : "Ground floor",
        status: "open",
        image: "/images/hypermarket/Entrance_Image02.JPG",
        logo: "/images/hypermarket/Hypermarket_Logo.png",
        description: isArabic
          ? "هايبر ماركت متكامل للمواد الغذائية الطازجة، الاحتياجات اليومية، منتجات المنزل، العناية، والمخبوزات."
          : "A full hypermarket for fresh food, daily essentials, home products, personal care and bakery items.",
        value: isArabic
          ? "مرساة يومية تجذب الزيارات المتكررة وتدعم حركة باقي المتاجر."
          : "A daily anchor that drives repeat visits and supports traffic for surrounding stores.",
        website: "https://www.alamer-market.com/",
      },
      {
        id: "beverly-hills-polo",
        name: "Beverly Hills Polo Club",
        category: isArabic ? "أزياء" : "Fashion",
        floor: isArabic ? "منطقة المتاجر" : "Retail zone",
        status: "open",
        image: "/images/alamerMall/Mall_image03.png",
        description: isArabic
          ? "علامة أزياء تضيف طابعًا عالميًا وخيارات جديدة لتجربة التسوق في المول."
          : "A fashion brand adding global character and new choices to the mall retail experience.",
        value: isArabic
          ? "تزيد جاذبية المول لفئة الأزياء وتدعم صورة الوجهة التجارية."
          : "Strengthens the fashion mix and enhances the mall's commercial destination image.",
        website: "https://www.beverlyhillspoloclub.com/",
      },
      {
        id: "bukhamseen",
        name: isArabic ? "بوخمسين للمفروشات" : "Bukhamseen Furniture",
        category: isArabic ? "مفروشات" : "Home & furniture",
        floor: isArabic ? "منطقة المتاجر" : "Retail zone",
        status: "joining",
        image: "/images/stores/bukhamseen/bukhamseen_image.JPG",
        logo: "/images/stores/bukhamseen/bukhamseen_logo.jpg",
        description: isArabic
          ? "وجهة مفروشات تضيف فئة تجارية قوية وتخدم احتياجات المنزل والذوق العصري."
          : "A furniture destination adding a strong commercial category for home needs and modern taste.",
        value: isArabic
          ? "توسع سبب الزيارة من التسوق اليومي إلى قرارات شراء منزلية أكبر."
          : "Expands visit reasons from daily shopping to higher-value home purchase decisions.",
        website: "https://www.bukhamseen.com/",
      },
      {
        id: "wacafe",
        name: "WaCafe",
        category: isArabic ? "مقهى" : "Cafe",
        floor: isArabic ? "منطقة المطاعم" : "Dining zone",
        status: "open",
        image: "/images/dining/Wacafe/Wacafe_image.JPG",
        logo: "/images/dining/Wacafe/Wacafe_Logo.png",
        description: isArabic
          ? "تجربة قهوة وضيافة بتصميم حديث تعزز الجلسات والوقت داخل المول."
          : "A modern coffee and hospitality experience that increases dwell time inside the mall.",
        value: isArabic
          ? "يدعم الرحلات الطويلة ويجعل المول مكانًا للقاء وليس للتسوق فقط."
          : "Supports longer visits and positions the mall as a meeting place, not only a shopping stop.",
        website: "https://www.linkedin.com/company/al-amer-mall",
      },
      {
        id: "smarvy",
        name: "Smarvy Spot",
        category: isArabic ? "ترفيه" : "Entertainment",
        floor: isArabic ? "منطقة الترفيه" : "Entertainment zone",
        status: "open",
        image: "/images/smarvy/Smarvy_banner.jpg",
        logo: "/images/smarvy/Smarvy_Logo.png",
        description: isArabic
          ? "تجربة ترفيهية عائلية تضيف سببًا قويًا لزيارة المول والعودة إليه."
          : "A family entertainment experience adding a strong reason to visit and return.",
        value: isArabic
          ? "ترفع مدة الزيارة وتدعم المطاعم والمتاجر خلال أوقات الذروة."
          : "Increases dwell time and supports dining and retail during peak periods.",
        website: "/entertainment/smarvy",
      },
      {
        id: "najmah",
        name: isArabic ? "نجمة للمجوهرات" : "Najmah Jewelry",
        category: isArabic ? "مجوهرات" : "Jewelry",
        floor: isArabic ? "الطابق الأرضي" : "Ground floor",
        status: "open",
        image: "/images/stores/najmahJewelry/Najmah_image.JPG",
        logo: "/images/stores/najmahJewelry/Najmah_Logo.png",
        description: isArabic
          ? "تشكيلة مجوهرات تضيف بعدًا فاخرًا لمزيج المتاجر."
          : "A jewelry offer adding a premium layer to the mall retail mix.",
        value: isArabic ? "يدعم تنوع الشرائح الشرائية." : "Supports a wider range of shopper segments.",
        website: "/contact",
      },
      {
        id: "dimi",
        name: "DIMI",
        category: isArabic ? "متجر متعدد" : "Multi-category",
        floor: isArabic ? "الطابق الأرضي" : "Ground floor",
        status: "open",
        image: "/images/stores/dimi/DIMI_image.JPG",
        logo: "/images/stores/dimi/DIMI_Logo.jpg",
        description: isArabic
          ? "متجر متنوع يقدم خيارات يومية وتجربة تسوق سريعة."
          : "A diversified store offering daily choices and a quick shopping experience.",
        value: isArabic ? "يعزز اكتمال رحلة الزائر." : "Strengthens the completeness of the visitor journey.",
        website: "/contact",
      },
      {
        id: "saffron",
        name: isArabic ? "خيوط الزعفران" : "Saffron Threads",
        category: isArabic ? "مواد غذائية" : "Food & spices",
        floor: isArabic ? "الطابق الأرضي" : "Ground floor",
        status: "open",
        image: "/images/stores/saffronThreads/SaffronThreads_Image.JPG",
        logo: "/images/stores/saffronThreads/SaffronThreads_Logo.jpg",
        description: isArabic
          ? "منتجات زعفران ونكهات مختارة تضيف تجربة متخصصة داخل المول."
          : "Selected saffron and flavor products adding a specialty retail experience.",
        value: isArabic ? "تضيف فئة متخصصة ومميزة." : "Adds a distinctive specialty category.",
        website: "/contact",
      },
    ],
    [isArabic]
  );

  const categories = ["all", ...Array.from(new Set(stores.map((store) => store.category)))];
  const filteredStores = stores.filter((store) => {
    const text = `${store.name} ${store.category} ${store.description}`.toLowerCase();
    return (category === "all" || store.category === category) && text.includes(query.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-[#f6efe8] text-[#21151f]" dir={isArabic ? "rtl" : "ltr"}>
      <Header />

      <section className="relative overflow-hidden bg-[#21151f] px-5 pb-16 pt-32 text-white md:px-8">
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage src="/images/alamerMall/ai-premium-mall-hero.png" alt="Al Amer Mall stores" className="h-full w-full" objectFit="cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-br from-[#21151f]/95 via-[#44273a]/85 to-[#ef7622]/45" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-black backdrop-blur">
              <ShoppingBag className="h-4 w-4 text-[#fedd3d]" />
              {isArabic ? "دليل العلامات والمتاجر" : "Brand and store directory"}
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              {isArabic ? "كل علامة تضيف قيمة للوجهة" : "Every brand adds destination value"}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-white/80">
              {isArabic
                ? "استكشف المتاجر، تفاصيلها، دورها داخل المول، وروابطها الرسمية أو قناة التواصل."
                : "Explore stores, their details, their role inside the mall, and official website or contact paths."}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-[#44273a]/10 bg-[#fffaf3]/95 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b7d86] ltr:left-4 rtl:right-4" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={isArabic ? "ابحث عن متجر أو فئة..." : "Search store or category..."}
              className="w-full rounded-full border border-[#44273a]/10 bg-white px-12 py-4 font-bold outline-none focus:border-[#ef7622]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                  category === item ? "bg-[#44273a] text-white" : "bg-white text-[#44273a]"
                }`}
              >
                {item === "all" ? (isArabic ? "الكل" : "All") : item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8 flex items-center gap-3 text-[#44273a]">
          <Filter className="h-5 w-5" />
          <span className="font-black">
            {filteredStores.length} {isArabic ? "علامة ومتجر" : "brands and stores"}
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStores.map((store) => (
            <article key={store.id} className="group overflow-hidden rounded-[2rem] bg-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage src={store.image} alt={store.name} className="h-full w-full transition duration-700 group-hover:scale-110" objectFit="cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                {store.logo && (
                  <div className="absolute left-5 top-5 rounded-2xl bg-white p-3 shadow-xl">
                    <img src={store.logo} alt={`${store.name} logo`} className="h-14 w-14 object-contain" />
                  </div>
                )}
                <span className="absolute bottom-5 left-5 rounded-full bg-[#fedd3d] px-3 py-1 text-xs font-black text-[#21151f]">
                  {store.status === "open" ? (isArabic ? "موجود الآن" : "Now active") : isArabic ? "ينضم للوجهة" : "Joining the destination"}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-2xl font-black">{store.name}</h2>
                  <Store className="h-6 w-6 text-[#ef7622]" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-[#44273a]">
                  <span className="rounded-full bg-[#f6efe8] px-3 py-1">{store.category}</span>
                  <span className="rounded-full bg-[#f6efe8] px-3 py-1">{store.floor}</span>
                </div>
                <p className="mt-4 leading-7 text-[#665963]">{store.description}</p>
                <button
                  type="button"
                  onClick={() => setSelectedStore(store)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#44273a] px-5 py-3 font-black text-white transition hover:bg-[#ef7622]"
                >
                  {isArabic ? "تفاصيل المتجر" : "Store details"}
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedStore && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur" onClick={() => setSelectedStore(null)}>
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-white text-[#21151f] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-72">
              <OptimizedImage src={selectedStore.image} alt={selectedStore.name} className="h-full w-full rounded-t-[2rem]" objectFit="cover" />
              <button className="absolute right-5 top-5 rounded-full bg-white p-3" onClick={() => setSelectedStore(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-7 md:p-10">
              <h2 className="text-4xl font-black">{selectedStore.name}</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f6efe8] px-4 py-2 font-black text-[#44273a]">
                  <MapPin className="h-4 w-4" />
                  {selectedStore.floor}
                </span>
                <span className="rounded-full bg-[#fedd3d]/40 px-4 py-2 font-black text-[#44273a]">
                  {selectedStore.category}
                </span>
              </div>
              <p className="mt-6 text-lg leading-8 text-[#665963]">{selectedStore.description}</p>
              <div className="mt-6 rounded-3xl bg-[#f6efe8] p-6">
                <h3 className="text-xl font-black">{isArabic ? "القيمة داخل المول" : "Value inside the mall"}</h3>
                <p className="mt-2 leading-8 text-[#665963]">{selectedStore.value}</p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={selectedStore.website} target={selectedStore.website.startsWith("/") ? "_self" : "_blank"} rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ef7622] px-6 py-3 font-black text-white">
                  {isArabic ? "زيارة الموقع / الصفحة" : "Visit website / page"}
                  <ExternalLink className="h-5 w-5" />
                </a>
                <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#44273a]/15 px-6 py-3 font-black text-[#44273a]">
                  {isArabic ? "تواصل للاستفسار" : "Contact for inquiry"}
                  <Building2 className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
