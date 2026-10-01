import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Maximize2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface RentalSpace {
  id: string;
  name: string;
  floor: string;
  size: number; // in sqm
  category: "retail" | "food" | "kiosk" | "office" | "event";
  price: string; // "contact" or actual price
  status: "available" | "coming-soon";
  image: string;
  features: string[];
  location: string;
}

export default function Rental() {
  const { t } = useTranslation(["pages", "common", "forms"]);
  const navigate = useNavigate();
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([]);
  const [filterFloor, setFilterFloor] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSize, setFilterSize] = useState<string>("all");

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample rental spaces data
  const rentalSpaces: RentalSpace[] = [
    {
      id: "r1",
      name: "Premium Retail Space A1",
      floor: "Ground Floor",
      size: 150,
      category: "retail",
      price: "Contact for pricing",
      status: "available",
      image: "/alamerMallGallery03.jpg",
      features: [
        "High foot traffic",
        "Corner location",
        "Large display window",
      ],
      location: "Main entrance area",
    },
    {
      id: "r2",
      name: "Fashion Boutique Space",
      floor: "First Floor",
      size: 80,
      category: "retail",
      price: "Contact for pricing",
      status: "available",
      image: "/alamerMallGallery04.jpg",
      features: ["Fashion district", "Modern design", "Fitting rooms included"],
      location: "Fashion wing",
    },
    {
      id: "r3",
      name: "Food Court Unit F12",
      floor: "Second Floor",
      size: 60,
      category: "food",
      price: "Contact for pricing",
      status: "available",
      image: "/alamerMallGallery05.jpg",
      features: ["Food court access", "Kitchen setup ready", "Exhaust system"],
      location: "Food court section",
    },
    {
      id: "r4",
      name: "Kiosk Space K5",
      floor: "Ground Floor",
      size: 20,
      category: "kiosk",
      price: "Contact for pricing",
      status: "available",
      image: "/alamerMallGallery06.jpg",
      features: ["High visibility", "Quick setup", "Power & water access"],
      location: "Central atrium",
    },
    {
      id: "r5",
      name: "Large Retail Space B8",
      floor: "First Floor",
      size: 200,
      category: "retail",
      price: "Contact for pricing",
      status: "available",
      image: "/alamerMallGallery01.jpg",
      features: ["Premium location", "Two entrances", "Storage area included"],
      location: "Entertainment wing",
    },
    {
      id: "r6",
      name: "Office Space O3",
      floor: "Second Floor",
      size: 100,
      category: "office",
      price: "Contact for pricing",
      status: "coming-soon",
      image: "/alamerMallGallery02.jpg",
      features: ["Quiet location", "Meeting room", "Parking included"],
      location: "Administrative area",
    },
  ];

  // Filter spaces
  const filteredSpaces = rentalSpaces.filter((space) => {
    const floorMatch = filterFloor === "all" || space.floor === filterFloor;
    const categoryMatch =
      filterCategory === "all" || space.category === filterCategory;
    const sizeMatch =
      filterSize === "all" ||
      (filterSize === "small" && space.size < 50) ||
      (filterSize === "medium" && space.size >= 50 && space.size < 150) ||
      (filterSize === "large" && space.size >= 150);
    return floorMatch && categoryMatch && sizeMatch;
  });

  const toggleSpaceSelection = (spaceId: string) => {
    setSelectedSpaces((prev) =>
      prev.includes(spaceId)
        ? prev.filter((id) => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  const handleRequestInfo = () => {
    if (selectedSpaces.length === 0) {
      alert("Please select at least one space to request information.");
      return;
    }
    // Navigate to form with selected spaces
    navigate("/rental/inquiry", { state: { selectedSpaces } });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-linear-to-r from-indigo-600 to-purple-600 text-white pt-24 pb-12 md:pt-28 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl sm:text-6xl font-light mb-6">
              {t("pages:rental.hero.title")}
            </h1>
            <p className="text-lg md:text-xl font-normal text-gray-100 max-w-3xl mx-auto mb-8">
              {t("pages:rental.hero.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>{t("pages:rental.hero.features.premium")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>{t("pages:rental.hero.features.traffic")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span>{t("pages:rental.hero.features.flexible")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-normal text-gray-900 mb-4">
            Filter Spaces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Floor Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                Floor
              </label>
              <select
                value={filterFloor}
                onChange={(e) => setFilterFloor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
              >
                <option value="all">All Floors</option>
                <option value="Ground Floor">Ground Floor</option>
                <option value="First Floor">First Floor</option>
                <option value="Second Floor">Second Floor</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
              >
                <option value="all">All Categories</option>
                <option value="retail">Retail</option>
                <option value="food">Food & Beverage</option>
                <option value="kiosk">Kiosk</option>
                <option value="office">Office</option>
                <option value="event">Event Space</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-widest">
                Size
              </label>
              <select
                value={filterSize}
                onChange={(e) => setFilterSize(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (&lt; 50 sqm)</option>
                <option value="medium">Medium (50-150 sqm)</option>
                <option value="large">Large (&gt; 150 sqm)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Floating Request Information Button */}
        {selectedSpaces.length > 0 && (
          <>
            {/* Desktop Button */}
            <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
              <div className="bg-white rounded-lg shadow-lg p-2">
                <button
                  onClick={handleRequestInfo}
                  className="p-4 rounded-lg font-medium transition-all duration-300 ease-in-out bg-indigo-600 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex flex-col items-center gap-2"
                  title="Request Information"
                >
                  <ArrowRight className="w-6 h-6" />
                  <span className="text-xs font-medium uppercase tracking-widest writing-vertical rotate-180">
                    Request Info
                  </span>
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                    {selectedSpaces.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Mobile Button */}
            <div className="lg:hidden fixed right-4 bottom-4 z-40">
              <button
                onClick={handleRequestInfo}
                className="relative p-4 rounded-lg font-medium transition-all duration-300 ease-in-out bg-indigo-600 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                title="Request Information"
              >
                <ArrowRight className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 border-white">
                  {selectedSpaces.length}
                </span>
              </button>
            </div>
          </>
        )}

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => {
            const isSelected = selectedSpaces.includes(space.id);
            return (
              <div
                key={space.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out cursor-pointer ${
                  isSelected
                    ? "ring-4 ring-indigo-500 shadow-lg transform scale-105"
                    : "hover:shadow-lg hover:scale-102"
                }`}
                onClick={() => toggleSpaceSelection(space.id)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  />
                  {space.status === "coming-soon" && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      Coming Soon
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white p-2 rounded-full shadow-md">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-normal text-gray-900 mb-3">
                    {space.name}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm">
                        {space.floor} - {space.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Maximize2 className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm">{space.size} sqm</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm capitalize">
                        {space.category}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {space.features.map((feature, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-lg font-medium text-indigo-600">
                      {space.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-normal text-gray-700 mb-2">
              No spaces found
            </h3>
            <p className="text-base font-normal text-gray-700">
              Try adjusting your filters to see more options
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {filteredSpaces.length > 0 && selectedSpaces.length === 0 && (
          <div className="mt-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center text-white shadow-md">
            <h3 className="text-2xl font-normal mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-base font-normal mb-6 text-indigo-100">
              Select the spaces you're interested in and request more
              information
            </p>
            <p className="text-sm text-indigo-200">
              Click on any space card to select it, then use the "Request
              Information" button
            </p>
          </div>
        )}
      </div>

      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}

