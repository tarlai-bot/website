import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Map,
  MapPin,
  Search,
  Navigation,
  Info,
  ShoppingBag,
  Utensils,
  Car,
  AlertCircle,
  Construction,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../components/layout/Header/Header";

type FloorLevel = "basement" | "ground" | "first" | "second" | "roof";

interface StoreLocation {
  id: string;
  name: string;
  category: string;
  floor: FloorLevel;
  zone: string;
}

export default function MallMaps() {
  const { t } = useTranslation(["pages", "common"]);
  const [selectedFloor, setSelectedFloor] = useState<FloorLevel>("ground");
  const [searchQuery, setSearchQuery] = useState("");

  // Set to true to show full page, false to show "Coming Soon"
  const SHOW_FULL_PAGE = true;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Coming Soon View
  if (!SHOW_FULL_PAGE) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="w-10 h-10 text-indigo-600" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("pages:maps.hero.title")}
            </h1>

            <div className="mb-8">
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Coming Soon
              </div>

              <p className="text-lg sm:text-xl text-gray-600 mb-4">
                Interactive floor maps are on the way!
              </p>

              <p className="text-gray-500">{t("pages:maps.hero.subtitle")}</p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            Have questions?{" "}
            <Link to="/contact" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Full Page Content (hidden when SHOW_FULL_PAGE = false)
  const floors = [
    { id: "roof" as FloorLevel, name: "Roof", icon: "🏢" },
    { id: "second" as FloorLevel, name: "2nd Floor", icon: "2️⃣" },
    { id: "first" as FloorLevel, name: "1st Floor", icon: "1️⃣" },
    { id: "ground" as FloorLevel, name: "Ground Floor", icon: "G" },
    { id: "basement" as FloorLevel, name: "Basement", icon: "B" },
  ];

  // Sample store locations (replace with real data later)
  const storeLocations: StoreLocation[] = [
    {
      id: "1",
      name: "Fashion Store A",
      category: "Fashion",
      floor: "ground",
      zone: "Zone A",
    },
    {
      id: "2",
      name: "Electronics Hub",
      category: "Electronics",
      floor: "first",
      zone: "Zone B",
    },
    {
      id: "3",
      name: "Food Court",
      category: "Dining",
      floor: "second",
      zone: "Zone C",
    },
    // Add more stores as needed
  ];

  const categories = [
    { icon: ShoppingBag, name: "Shopping", color: "bg-purple-500" },
    { icon: Utensils, name: "Dining", color: "bg-orange-500" },
    { icon: Car, name: "Parking", color: "bg-blue-500" },
    { icon: AlertCircle, name: "Services", color: "bg-green-500" },
  ];

  const filteredStores = storeLocations.filter(
    (store) =>
      store.floor === selectedFloor && store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-linear-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/alamerMall/placeholderAlamerMallBanner.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-primary-dark/90"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Map className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 animate-fade-in-up">
            Mall Directory & Maps
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto opacity-95">
            Navigate through Alamer Mall with interactive floor maps
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for stores, restaurants, or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Floor Selector */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Select Floor</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => setSelectedFloor(floor.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedFloor === floor.id
                      ? "border-primary bg-primary text-white shadow-lg scale-105"
                      : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:shadow-md"
                  }`}
                >
                  <div className="text-3xl mb-2">{floor.icon}</div>
                  <div className="font-semibold">{floor.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Map Display Area */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {floors.find((f) => f.id === selectedFloor)?.name} Map
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Navigation className="w-4 h-4" />
                <span>Interactive Map</span>
              </div>
            </div>

            {/* Map Placeholder - Replace with actual floor plan image */}
            <div
              className="relative bg-gray-100 rounded-lg overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <Map className="w-24 h-24 mb-4" />
                <p className="text-lg font-medium">Floor Plan Image Coming Soon</p>
                <p className="text-sm mt-2">
                  {floors.find((f) => f.id === selectedFloor)?.name} layout will be displayed here
                </p>
              </div>

              {/* Sample overlay zones - remove when real map is added */}
              <div className="absolute inset-0 grid grid-cols-3 gap-2 p-4 opacity-20">
                <div className="bg-purple-500 rounded flex items-center justify-center text-white font-bold">
                  Zone A
                </div>
                <div className="bg-orange-500 rounded flex items-center justify-center text-white font-bold">
                  Zone B
                </div>
                <div className="bg-blue-500 rounded flex items-center justify-center text-white font-bold">
                  Zone C
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`${category.color} w-4 h-4 rounded`}></div>
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Store Directory for Selected Floor */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-gray-800">
                Stores on {floors.find((f) => f.id === selectedFloor)?.name}
              </h3>
            </div>

            {filteredStores.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                  >
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{store.name}</h4>
                      <p className="text-sm text-gray-600">{store.category}</p>
                      <p className="text-xs text-gray-500 mt-1">{store.zone}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No stores found on this floor</p>
                {searchQuery && <p className="text-sm mt-2">Try adjusting your search</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
            Important Locations
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Car className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">Parking</h3>
              <p className="text-gray-600 text-sm">Basement level with 500+ parking spaces</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h3 className="text-lg font-semibold mb-2">Emergency Exits</h3>
              <p className="text-gray-600 text-sm">Located on all floors for your safety</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Info className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">Information Desk</h3>
              <p className="text-gray-600 text-sm">Ground floor, main entrance</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
