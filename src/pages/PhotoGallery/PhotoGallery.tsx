import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Camera, Grid3X3, Images, Sparkles, X } from "lucide-react";
import Header from "../../components/layout/Header/Header";
import OptimizedImage from "../../components/common/OptimizedImage/OptimizedImage";

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  role: string;
};

export default function PhotoGallery() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language?.startsWith("ar");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark: true } }));
  }, []);

  const items: PortfolioItem[] = useMemo(
    () => [
      {
        id: "mall",
        title: isArabic ? "العامر مول" : "Al Amer Mall",
        category: isArabic ? "الوجهة" : "Destination",
        image: "/images/alamerMall/ai-premium-mall-hero.png",
        description: isArabic
          ? "وجهة تجارية وترفيهية تجمع التجارب اليومية، العائلية، والموسمية في مكان واحد."
          : "A retail and entertainment destination bringing daily, family and seasonal experiences together.",
        role: isArabic ? "الهوية الرئيسية للوجهة" : "Main destination identity",
      },
      {
        id: "market",
        title: isArabic ? "أسواق العامر" : "Al Amer Market",
        category: isArabic ? "هايبر ماركت" : "Hypermarket",
        image: "/images/hypermarket/fountain view_Image01.JPG",
        description: isArabic
          ? "محرك زيارة يومي يخدم العائلات ويعزز الحركة المستمرة داخل المول."
          : "A daily traffic driver serving families and supporting steady movement inside the mall.",
        role: isArabic ? "مرساة الزيارة اليومية" : "Daily anchor",
      },
      {
        id: "smarvy",
        title: "Smarvy Spot",
        category: isArabic ? "ترفيه" : "Entertainment",
        image: "/images/smarvy/Smarvy_banner.jpg",
        description: isArabic
          ? "تجربة ترفيهية عائلية تدعم زيارات نهاية الأسبوع والمناسبات."
          : "A family entertainment experience supporting weekend and event visits.",
        role: isArabic ? "رفع مدة الزيارة" : "Dwell-time driver",
      },
      {
        id: "wacafe",
        title: "WaCafe",
        category: isArabic ? "مقهى" : "Cafe",
        image: "/images/dining/Wacafe/Wacafe_image.JPG",
        description: isArabic
          ? "جلسة قهوة حديثة تربط التسوق بالتجربة الاجتماعية."
          : "A modern coffee stop connecting shopping with social experience.",
        role: isArabic ? "ضيافة وتجربة" : "Hospitality layer",
      },
      {
        id: "polo",
        title: "Beverly Hills Polo Club",
        category: isArabic ? "أزياء" : "Fashion",
        image: "/images/alamerMall/Mall_image03.png",
        description: isArabic
          ? "إضافة أزياء عالمية تعزز صورة المول التجارية."
          : "A global fashion addition strengthening the mall's commercial image.",
        role: isArabic ? "إضافة أزياء" : "Fashion addition",
      },
      {
        id: "bukhamseen",
        title: isArabic ? "بوخمسين للمفروشات" : "Bukhamseen Furniture",
        category: isArabic ? "مفروشات" : "Home & furniture",
        image: "/images/stores/bukhamseen/bukhamseen_image.JPG",
        description: isArabic
          ? "فئة مفروشات تضيف سبب زيارة جديد وتوسع مزيج المتاجر."
          : "A furniture category adding a new reason to visit and expanding the retail mix.",
        role: isArabic ? "ينضم للوجهة" : "Joining the destination",
      },
      {
        id: "najmah",
        title: isArabic ? "نجمة للمجوهرات" : "Najmah Jewelry",
        category: isArabic ? "مجوهرات" : "Jewelry",
        image: "/images/stores/najmahJewelry/Najmah_image.JPG",
        description: isArabic
          ? "فئة تضيف قيمة للمتسوقين الباحثين عن خيارات فاخرة."
          : "A category adding value for shoppers seeking premium choices.",
        role: isArabic ? "تسوق فاخر" : "Premium retail",
      },
      {
        id: "parking",
        title: isArabic ? "الوصول والمواقف" : "Access and parking",
        category: isArabic ? "خدمات" : "Services",
        image: "/images/parking/Parking_image.JPG",
        description: isArabic
          ? "تجربة الوصول جزء مهم من قرار الزيارة وراحة العائلة."
          : "Access experience is part of the visit decision and family convenience.",
        role: isArabic ? "راحة الزائر" : "Visitor convenience",
      },
    ],
    [isArabic]
  );

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))];
  const filteredItems = category === "all" ? items : items.filter((item) => item.category === category);

  return (
    <main className="min-h-screen bg-[#120b10] text-white" dir={isArabic ? "rtl" : "ltr"}>
      <Header />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8">
        <div className="absolute inset-0 opacity-25">
          <OptimizedImage src="/images/alamerMall/mall_image01.JPG" alt="Gallery" className="h-full w-full" objectFit="cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-br from-[#120b10]/95 via-[#44273a]/80 to-[#ef7622]/35" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-black backdrop-blur">
              <Images className="h-4 w-4 text-[#fedd3d]" />
              {isArabic ? "معرض الوجهة والشركات" : "Destination and company portfolio"}
            </div>
            <h1 className="text-5xl font-black md:text-7xl">
              {isArabic ? "كل صورة تحكي قيمة تجارية" : "Every image tells a commercial story"}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-white/75">
              {isArabic
                ? "المعرض يعرض الشركات والتجارب الموجودة والمنضمة للوجهة بطريقة تساعد الزائر والشريك على فهم قوة المول."
                : "The gallery presents active and joining companies as destination stories for visitors and partners."}
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-y border-white/10 bg-[#120b10]/80 px-5 py-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-black transition ${
                category === item ? "bg-[#fedd3d] text-[#21151f]" : "bg-white/10 text-white"
              }`}
            >
              {item === "all" ? (isArabic ? "الكل" : "All") : item}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="mb-8 flex items-center gap-3 text-[#fedd3d]">
          <Grid3X3 className="h-5 w-5" />
          <span className="font-black">
            {filteredItems.length} {isArabic ? "قصص مصورة" : "visual stories"}
          </span>
        </div>
        <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
          {filteredItems.map((item, index) => (
            <article
              key={item.id}
              className="group mb-5 break-inside-avoid overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl backdrop-blur transition hover:-translate-y-1"
              onClick={() => setSelected(item)}
            >
              <div className={`${index % 3 === 0 ? "h-96" : "h-72"} relative overflow-hidden`}>
                <OptimizedImage src={item.image} alt={item.title} className="h-full w-full transition duration-700 group-hover:scale-110" objectFit="cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="rounded-full bg-[#fedd3d] px-3 py-1 text-xs font-black text-[#21151f]">
                    {item.role}
                  </span>
                  <h2 className="mt-3 text-3xl font-black">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-white/75">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur" onClick={() => setSelected(null)}>
          <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white text-[#21151f]" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[28rem]">
              <OptimizedImage src={selected.image} alt={selected.title} className="h-full w-full" objectFit="cover" />
              <button className="absolute right-5 top-5 rounded-full bg-white p-3" onClick={() => setSelected(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f6efe8] px-4 py-2 font-black text-[#44273a]">
                <Camera className="h-5 w-5 text-[#ef7622]" />
                {selected.category}
              </div>
              <h2 className="text-4xl font-black">{selected.title}</h2>
              <p className="mt-4 text-lg leading-8 text-[#665963]">{selected.description}</p>
              <a href="/stores" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ef7622] px-6 py-3 font-black text-white">
                {isArabic ? "عرض المتاجر" : "View stores"}
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
