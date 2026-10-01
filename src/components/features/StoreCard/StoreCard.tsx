import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowRight } from "lucide-react";
import OptimizedImage from "../../common/OptimizedImage/OptimizedImage";

export interface Store {
  id: string;
  name: string;
  category: string;
  floor: string;
  image: string;
  logo?: string;
  description?: string;
}

interface StoreCardProps {
  store: Store;
  layout?: "vertical" | "horizontal";
  onClick?: (store: Store) => void;
  showButton?: boolean;
}

export default function StoreCard({
  store,
  layout = "vertical",
  onClick,
  showButton = true,
}: StoreCardProps) {
  const { t } = useTranslation(["common"]);

  const handleClick = () => {
    if (onClick) {
      onClick(store);
    }
  };

  const isVertical = layout === "vertical";

  const content = (
    <>
      {/* Image */}
      <div
        className={isVertical ? "relative" : "relative md:w-48 lg:w-56 xl:w-64 2xl:w-72 shrink-0"}
      >
        <img
          src={store.image}
          alt={store.name}
          loading="lazy"
          className={`
            ${
              isVertical
                ? "w-full h-40 sm:h-48 lg:h-56 xl:h-64 2xl:h-72 object-cover rounded-t-lg"
                : "w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            }
          `}
        />
        {/* Logo overlay (optional) */}
        {store.logo && (
          <div className="absolute top-1.5 sm:top-2 lg:top-3 left-1.5 sm:left-2 lg:left-3 bg-white rounded-lg p-1.5 sm:p-2 lg:p-2.5 shadow-md">
            <img
              src={store.logo}
              alt={`${store.name} logo`}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 object-contain"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 lg:p-5 xl:p-6 flex flex-col flex-1">
        <div className="flex-1">
          {/* Category Badge */}
          <span className="inline-block px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 text-[10px] sm:text-xs lg:text-sm xl:text-base font-medium uppercase tracking-widest text-white bg-secondary rounded-full w-fit mb-2 sm:mb-3 lg:mb-4 shadow-sm">
            {t(`categories.${store.category}`)}
          </span>

          {/* Store Name */}
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-normal text-gray-900 dark:text-white mb-1.5 sm:mb-2 lg:mb-3">
            {store.name}
          </h3>

          {/* Description */}
          {store.description && (
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-normal text-gray-700 dark:text-gray-400 mb-2 sm:mb-3 lg:mb-4">
              {store.description}
            </p>
          )}

          {/* Floor Location */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-xs sm:text-sm lg:text-base xl:text-lg font-normal text-gray-700 dark:text-gray-400 mb-3 sm:mb-4 lg:mb-5">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
            <span>{store.floor}</span>
          </div>
        </div>

        {/* View Details Button */}
        {showButton === true && (
          <Link
            to={store.category === "hypermarket" ? "/hypermarket" : `/entertainment/${store.id}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 lg:gap-3 px-3 sm:px-4 lg:px-5 xl:px-6 py-1.5 sm:py-2 lg:py-2.5 xl:py-3 bg-primary text-white text-xs sm:text-sm lg:text-base xl:text-lg font-medium uppercase tracking-wide rounded shadow-md hover:shadow-lg hover:bg-primary-hover transition-all duration-300 ease-in-out w-fit focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 mt-3 sm:mt-4 lg:mt-5"
            onClick={(e) => {
              if (onClick) {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-medium">
              {t("common.viewDetails")}
            </span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          </Link>
        )}
      </div>
    </>
  );

  const cardClasses = `
    bg-white border border-gray-200 rounded-lg shadow-sm
    hover:shadow-md transition-shadow
    dark:bg-gray-800 dark:border-gray-700
    ${isVertical ? "max-w-sm flex flex-col h-full" : "flex flex-col md:flex-row md:max-w-2xl"}
  `;

  return <div className={cardClasses}>{content}</div>;
}
