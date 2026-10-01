import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ShoppingCart,
  Apple,
  Leaf,
  Package,
  Sparkles,
  Baby,
  Home,
  Zap,
  ExternalLink,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";
import Header from "../../components/layout/Header/Header";

export default function Hypermarket() {
  const { t } = useTranslation(["common", "pages"]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll event for header color change
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const isDark = scrollPosition >= heroHeight * 0.5;

      window.dispatchEvent(new CustomEvent("navColorChange", { detail: { isDark } }));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const categories = [
    {
      icon: Apple,
      name: t("pages:hypermarket.categories.freshFood.name"),
      description: t("pages:hypermarket.categories.freshFood.description"),
      color: "from-green-500 to-emerald-600",
      image: "/images/hypermarket/fresh_meat- signboard.JPG",
    },
    {
      icon: Package,
      name: t("pages:hypermarket.categories.bakery.name"),
      description: t("pages:hypermarket.categories.bakery.description"),
      color: "from-amber-500 to-orange-600",
      image: "/images/hypermarket/bakery.JPG",
    },
    {
      icon: ShoppingCart,
      name: t("pages:hypermarket.categories.grocery.name"),
      description: t("pages:hypermarket.categories.grocery.description"),
      color: "from-blue-500 to-indigo-600",
      image: "/images/hypermarket/spices - image01.JPG",
    },
    {
      icon: Leaf,
      name: t("pages:hypermarket.categories.organic.name"),
      description: t("pages:hypermarket.categories.organic.description"),
      color: "from-lime-500 to-green-600",
      image: "/images/hypermarket/fresh_fruits - image.JPG",
    },
    {
      icon: Sparkles,
      name: t("pages:hypermarket.categories.beauty.name"),
      description: t("pages:hypermarket.categories.beauty.description"),
      color: "from-pink-500 to-rose-600",
      image: "/images/hypermarket/Beauty & Personal Care - image01.JPG",
    },
    {
      icon: Baby,
      name: t("pages:hypermarket.categories.babyCare.name"),
      description: t("pages:hypermarket.categories.babyCare.description"),
      color: "from-cyan-500 to-blue-600",
      image: "/images/hypermarket/baby care - image.JPG",
    },
    {
      icon: Home,
      name: t("pages:hypermarket.categories.household.name"),
      description: t("pages:hypermarket.categories.household.description"),
      color: "from-purple-500 to-violet-600",
      image: "/images/hypermarket/households.JPG",
    },
    {
      icon: Zap,
      name: t("pages:hypermarket.categories.electronics.name"),
      description: t("pages:hypermarket.categories.electronics.description"),
      color: "from-yellow-500 to-amber-600",
      image: "/images/hypermarket/electronics - signboard.JPG",
    },
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: t("pages:hypermarket.features.quality.title"),
      description: t("pages:hypermarket.features.quality.description"),
    },
    {
      icon: Apple,
      title: t("pages:hypermarket.features.fresh.title"),
      description: t("pages:hypermarket.features.fresh.description"),
    },
    {
      icon: Package,
      title: t("pages:hypermarket.features.variety.title"),
      description: t("pages:hypermarket.features.variety.description"),
    },
    {
      icon: Sparkles,
      title: t("pages:hypermarket.features.prices.title"),
      description: t("pages:hypermarket.features.prices.description"),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-orange-600 via-orange-500 to-amber-600 text-white pt-[15vh] pb-[10vh] md:pt-[20vh] md:pb-[12vh] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <img
                src="/images/hypermarket/Hypermarket_Logo.png"
                alt="Alamer Hypermarket"
                className="w-8 h-8 object-contain"
              />
              <span className="text-sm font-medium">{t("pages:hypermarket.hero.badge")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t("pages:hypermarket.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl font-light text-orange-50 max-w-3xl mx-auto mb-8">
              {t("pages:hypermarket.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-700 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {t("pages:hypermarket.hero.exploreCTA")}
              </a>
              <a
                href="https://shop.alamer-market.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500/20 backdrop-blur-sm text-white border-2 border-white/30 text-base font-semibold rounded-lg hover:bg-white/30 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
                {t("pages:hypermarket.hero.shopOnlineCTA")}
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
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
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("pages:hypermarket.features.sectionTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("pages:hypermarket.features.sectionSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-linear-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-orange-500 to-amber-600 text-white rounded-full mb-4">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="categories" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("pages:hypermarket.categories.sectionTitle")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("pages:hypermarket.categories.sectionSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                  ></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg">
                      <category.icon className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Online Shopping Section */}
      <div
        id="online-shop"
        className="py-20 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src="/images/hypermarket/Entrance_Image02.JPG"
                    alt="Shop Online"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-orange-600/80 to-amber-600/80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold">
                        {t("pages:hypermarket.onlineShop.imageTitle")}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {t("pages:hypermarket.onlineShop.title")}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {t("pages:hypermarket.onlineShop.description")}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-1 rounded-full mt-1">
                        <ShoppingCart className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">
                        {t("pages:hypermarket.onlineShop.benefit1")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-1 rounded-full mt-1">
                        <Package className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">
                        {t("pages:hypermarket.onlineShop.benefit2")}
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-orange-100 p-1 rounded-full mt-1">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700">
                        {t("pages:hypermarket.onlineShop.benefit3")}
                      </span>
                    </li>
                  </ul>
                  <a
                    href="https://shop.alamer-market.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-orange-600 to-amber-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>{t("pages:hypermarket.onlineShop.cta")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("pages:hypermarket.gallery.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("pages:hypermarket.gallery.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/fresh_vegetables.JPG"
                alt="Fresh Vegetables"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/bakery -cake.JPG"
                alt="Bakery - Cakes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/bakery-packaged prducts - image.JPG"
                alt="Grocery - Packaged Products"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/dairy - image02.JPG"
                alt="Dairy Products"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/Beauty & Personal Care - image02.JPG"
                alt="Beauty & Personal Care"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/frozen - image02.JPG"
                alt="Frozen Foods"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/kidstoys - image.JPG"
                alt="Kids Toys"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/images/hypermarket/sweats - image.JPG"
                alt="Sweets & Treats"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t("pages:hypermarket.contact.title")}
              </h2>
              <p className="text-lg text-gray-600">{t("pages:hypermarket.contact.subtitle")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-600 rounded-full mb-4">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("pages:hypermarket.contact.location")}
                </h3>
                <p className="text-gray-600 text-sm">{t("pages:hypermarket.contact.address")}</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-600 rounded-full mb-4">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("pages:hypermarket.contact.hours")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t("pages:hypermarket.contact.hoursDetail")}
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-600 rounded-full mb-4">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {t("pages:hypermarket.contact.phone")}
                </h3>
                <p className="text-gray-600 text-sm" dir="ltr">
                  0135822220
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
