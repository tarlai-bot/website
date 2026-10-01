import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Utensils, MapPin, LayoutGrid, List, Search, Filter, X } from "lucide-react";
import RestaurantCard, { Restaurant } from "../../components/features/RestaurantCard";

// Restaurant Banner Component - Stack View
function RestaurantBanner({
  restaurant,
  index,
  t,
}: {
  restaurant: Restaurant;
  index: number;
  t: any;
}) {
  const imageOnLeft = index % 2 === 0;

  return (
    <section className={`py-8 md:py-12 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto transition-shadow duration-300 ease-in-out hover:shadow-lg">
          <div className={`flex flex-col ${imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
            <div className="relative w-full md:w-1/2 h-[300px] md:h-[500px]">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              {restaurant.logo && (
                <div
                  className="absolute top-4 left-4 rounded-lg p-3 shadow-md"
                  style={{ backgroundColor: "#faf8f5" }}
                >
                  <img
                    src={restaurant.logo}
                    alt={`${restaurant.name} logo`}
                    className="w-16 h-16 object-contain"
                    style={{
                      filter:
                        restaurant.logo === "/images/dining/laCasaPasta/lacasapasta_Logo.svg" ||
                        restaurant.logo === "/images/dining/poshak/Poshak_Logo.png"
                          ? "invert(1)"
                          : "none",
                    }}
                  />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                {t(`common:categories.${restaurant.category}`)}
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center h-[300px] md:h-[500px]">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 leading-tight">
                  {restaurant.name}
                </h2>
                {restaurant.description && (
                  <p className="text-base font-normal text-gray-700 leading-relaxed">
                    {restaurant.description}
                  </p>
                )}
              </div>
              <div className="space-y-3 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-primary p-2 rounded-lg shadow-sm">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                      {t("common:common.location")}
                    </p>
                    <p className="text-sm font-medium text-gray-900">{restaurant.floor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="bg-secondary p-2 rounded-lg shadow-sm">
                    <Utensils className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                      {t("pages:restaurants.cuisine")}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {t(`common:categories.${restaurant.category}`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Restaurants() {
  const { t, i18n } = useTranslation(["pages", "common"]);
  const [viewMode, setViewMode] = useState<"stack" | "grid">("grid");
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 400; // Approximate hero section height
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

  const allRestaurants: Restaurant[] = useMemo(
    () => [
      {
        id: "1",
        name: t("pages:restaurantsData.poshak.name"),
        category: "indian",
        floor: t("common:floors.second"),
        image: "/images/dining/poshak/Poshak_image.JPG",
        logo: "/images/dining/poshak/Poshak_Logo.png",
        description: t("pages:restaurantsData.poshak.description"),
      },
      {
        id: "2",
        name: t("pages:restaurantsData.cornShack.name"),
        category: "fastFood",
        floor: t("common:floors.second"),
        image: "/images/dining/cornShack/CornShack_image.JPG",
        logo: "/images/dining/cornShack/CornShack_Logo.jpeg",
        description: t("pages:restaurantsData.cornShack.description"),
      },
      {
        id: "3",
        name: t("pages:restaurantsData.laCasaPasta.name"),
        category: "italian",
        floor: t("common:floors.second"),
        image: "/images/dining/laCasaPasta/lacasapasta_Image.JPG",
        logo: "/images/dining/laCasaPasta/lacasapasta_Logo.svg",
        description: t("pages:restaurantsData.laCasaPasta.description"),
      },
      {
        id: "4",
        name: t("pages:restaurantsData.taraf.name"),
        category: "cafe",
        floor: t("common:floors.ground"),
        image: "/images/dining/taraf/Taraf_image.JPG",
        logo: "/images/dining/taraf/TARAF_Logo.jpg",
        description: t("pages:restaurantsData.taraf.description"),
      },
      {
        id: "5",
        name: t("pages:restaurantsData.wacafe.name"),
        category: "cafe",
        floor: t("common:floors.ground"),
        image: "/images/dining/Wacafe/Wacafe_image.JPG",
        logo: "/images/dining/Wacafe/Wacafe_Logo.png",
        description: t("pages:restaurantsData.wacafe.description"),
      },
      {
        id: "6",
        name: t("pages:restaurantsData.shaiji.name"),
        category: "cafe",
        floor: t("common:floors.first"),
        image: "/images/dining/shaiji/Shaiji_image.JPG",
        logo: "/images/dining/shaiji/Shaiji_Logo.jpg",
        description: t("pages:restaurantsData.shaiji.description"),
      },
    ],
    [t, i18n.language]
  );

  const categories = ["all", ...Array.from(new Set(allRestaurants.map((r) => r.category)))];

  const floors = ["all", ...Array.from(new Set(allRestaurants.map((r) => r.floor)))];

  // Filter restaurants by category, floor, and search query
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory;
    const matchesFloor = selectedFloor === "all" || restaurant.floor === selectedFloor;
    const matchesSearch =
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (restaurant.description &&
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesFloor && matchesSearch;
  });

  const displayedRestaurants = filteredRestaurants.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRestaurants.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredRestaurants.length));
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-linear-to-r from-secondary to-secondary-light text-white pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            {t("pages:restaurants.hero.title")}
          </h1>
          <p className="text-lg md:text-xl font-normal text-gray-100 max-w-3xl mx-auto">
            {t("pages:restaurants.hero.subtitle")}
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
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Search Bar with Filter Icon */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 max-w-2xl mx-auto">
            {/* Compact Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t("pages:restaurants.filters.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compact Filter Icon Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 relative"
              title="Filters"
            >
              <Filter className="w-5 h-5" />
              {(selectedFloor !== "all" || searchQuery !== "") && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white w-4 h-4 rounded-full text-xs flex items-center justify-center">
                  {(selectedFloor !== "all" ? 1 : 0) + (searchQuery !== "" ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Floor Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 border-b border-gray-200 py-4 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {t("pages:restaurants.filters.filterByFloor")}
                </h3>
                {selectedFloor !== "all" && (
                  <button
                    onClick={() => setSelectedFloor("all")}
                    className="text-xs text-secondary hover:text-secondary-dark font-medium"
                  >
                    {t("common:common.clearFilter")}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {floors.map((floor) => (
                  <button
                    key={floor}
                    onClick={() => {
                      setSelectedFloor(floor);
                      setVisibleCount(12);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedFloor === floor
                        ? "bg-secondary text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {floor === "all" ? t("common:filters.allFloors") : floor}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cuisine Filter Pills - Original Style */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(12);
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                  selectedCategory === category
                    ? "bg-secondary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t(`common:categories.${category}`)}
              </button>
            ))}
          </div>

          {/* Results Count */}
          {(searchQuery || selectedFloor !== "all" || selectedCategory !== "all") && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-600">
                {t("common:common.showing")}{" "}
                <span className="font-semibold text-gray-900">{filteredRestaurants.length}</span>{" "}
                {filteredRestaurants.length === 1
                  ? t("pages:restaurants.filters.restaurant")
                  : t("pages:restaurants.filters.restaurants")}
              </p>
            </div>
          )}
        </div>
      </div>

      {displayedRestaurants.length > 0 ? (
        <div className="relative">
          <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
            <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
              <button
                onClick={() => setViewMode("stack")}
                className={`p-4 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                  viewMode === "stack"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Stack View"
              >
                <List className="w-6 h-6" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-4 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                  viewMode === "grid"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="lg:hidden bg-gray-50 py-6 border-b border-gray-200">
            <div className="container mx-auto px-4">
              <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow p-1 inline-flex gap-1">
                  <button
                    onClick={() => setViewMode("stack")}
                    className={`p-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                      viewMode === "stack"
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Stack View"
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                      viewMode === "grid"
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {viewMode === "stack" ? (
            <div>
              {displayedRestaurants.map((restaurant, index) => (
                <RestaurantBanner key={restaurant.id} restaurant={restaurant} index={index} t={t} />
              ))}
            </div>
          ) : (
            // Grid View - Flippable Restaurant Cards
            <div className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {hasMore && (
            <div className="py-12 text-center bg-gray-50">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-secondary hover:bg-secondary-hover text-white text-sm font-medium uppercase rounded shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {t("common:common.loadMore")}
              </button>
              <p className="text-sm font-normal text-gray-700 mt-4">
                {t("common:common.showing")} {displayedRestaurants.length} {t("common:common.of")}{" "}
                {filteredRestaurants.length} {t("pages:restaurants.filters.restaurants")}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="py-20 text-center bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Utensils className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-normal text-gray-900 mb-4">
                {t("pages:restaurants.filters.noRestaurantsFound")}
              </h2>
              <p className="text-base font-normal text-gray-700">
                {t("pages:restaurants.filters.tryDifferentCategory")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
