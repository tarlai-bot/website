import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Utensils } from "lucide-react";
import OptimizedImage from "../../common/OptimizedImage/OptimizedImage";

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  floor: string;
  image: string;
  logo?: string;
  description?: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { t } = useTranslation(["common"]);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card h-[400px]" onClick={handleClick}>
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        {/* Front Side - Image with overlay info */}
        <div className="flip-card-front">
          <div
            className="relative w-full h-full rounded-lg overflow-hidden shadow-md cursor-pointer"
            style={{
              backgroundImage: `url(${restaurant.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20"></div>

            {/* Content overlaid on image */}
            <div className="relative h-full flex flex-col justify-between p-6">
              {/* Logo/Icon at top */}
              {restaurant.logo ? (
                <div
                  className="rounded-lg p-3 shadow-md w-fit"
                  style={{ backgroundColor: "#faf8f5" }}
                >
                  <OptimizedImage
                    src={restaurant.logo}
                    alt={`${restaurant.name} logo`}
                    aspectRatio="1/1"
                    objectFit="contain"
                    className={`w-12 h-12 object-contain ${
                      restaurant.logo === "/lacasapasta_Logo.svg" ||
                      restaurant.logo === "/Poshak_Logo.png"
                        ? "invert"
                        : ""
                    }`}
                  />
                </div>
              ) : (
                <div className="bg-secondary rounded-lg p-3 shadow-md w-fit">
                  <Utensils className="w-12 h-12 text-white" />
                </div>
              )}

              {/* Name and Location at bottom */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-normal text-white drop-shadow-lg">
                  {restaurant.name}
                </h3>

                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{restaurant.floor}</span>
                </div>

                <div className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest shadow-sm">
                  {t(`categories.${restaurant.category}`)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Description */}
        <div className="flip-card-back">
          <div className="relative w-full h-full bg-linear-to-br from-secondary to-[#d86518] rounded-lg overflow-hidden shadow-md p-6 flex flex-col justify-center cursor-pointer">
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1 w-fit shadow-sm">
                <Utensils className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-normal text-white">{restaurant.name}</h3>

              {restaurant.description && (
                <p className="text-white/95 text-base font-normal leading-relaxed">
                  {restaurant.description}
                </p>
              )}

              <div className="pt-4 border-t border-white/30 space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{restaurant.floor}</span>
                </div>
                <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest shadow-sm">
                  {t(`categories.${restaurant.category}`)}
                </div>
              </div>

              {/* Tap to flip hint on mobile */}
              <p className="text-white/70 text-xs text-center mt-4 lg:hidden">
                {t("common.tapToFlip")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .flip-card {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        /* Hover flip for desktop only */
        @media (hover: hover) and (pointer: fine) {
          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }
        }

        /* Click/tap flip - applies to all devices */
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
