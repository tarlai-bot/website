import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import OptimizedImage from "../../common/OptimizedImage/OptimizedImage";

export interface Event {
  id: string;
  titleKey: string;
  descriptionKey: string;
  locationKey: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

interface EventCardProps {
  event: Event;
  layout?: "vertical" | "horizontal";
  onClick?: (event: Event) => void;
}

export default function EventCard({ event, layout = "vertical", onClick }: EventCardProps) {
  const { t } = useTranslation(["pages", "common"]);

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  const isVertical = layout === "vertical";

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const content = (
    <>
      {/* Image */}
      <div className={isVertical ? "relative" : "relative md:w-48 shrink-0"}>
        <img
          src={event.image}
          alt={t(event.titleKey)}
          className={`
            ${
              isVertical
                ? "w-full h-48 object-cover rounded-t-lg"
                : "w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            }
          `}
        />
        {/* Active Badge */}
        {event.isActive && (
          <div className="absolute top-2 right-2">
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-widest text-black bg-accent rounded-full shadow-md">
              {t("pages:events.activeNow")}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        {/* Event Title */}
        <h3 className="text-xl font-normal text-gray-900 dark:text-white mb-2 line-clamp-2">
          {t(event.titleKey)}
        </h3>

        {/* Description - Line Clamped to 3 lines */}
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400 mb-4 grow line-clamp-3">
          {t(event.descriptionKey)}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date Range */}
          <div className="flex items-center gap-2 text-sm font-normal text-gray-700 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>

          {/* Location */}
          {event.locationKey && (
            <div className="flex items-center gap-2 text-sm font-normal text-gray-700 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{t(event.locationKey)}</span>
            </div>
          )}
        </div>

        {/* Learn More Button */}
        <Link
          to={`/events/${event.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-medium uppercase tracking-wide rounded shadow-md hover:shadow-lg hover:bg-secondary-hover transition-all duration-300 ease-in-out w-fit focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          {t("pages:events.learnMore")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );

  const cardClasses = `
    bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden
    hover:shadow-md transition-shadow
    dark:bg-gray-800 dark:border-gray-700
    ${isVertical ? "max-w-sm" : "flex flex-col md:flex-row md:max-w-2xl"}
  `;

  return <div className={cardClasses}>{content}</div>;
}
