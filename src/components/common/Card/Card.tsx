import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CardProps {
  layout?: "vertical" | "horizontal";
  image: string;
  imageAlt?: string;
  title: string;
  description?: string;
  href?: string;
  to?: string;
  showButton?: boolean;
  buttonText?: string;
  buttonVariant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function Card({
  layout = "vertical",
  image,
  imageAlt = "",
  title,
  description,
  href,
  to,
  showButton = false,
  buttonText = "Read more",
  buttonVariant = "secondary",
  onClick,
  children,
  className = "",
}: CardProps) {
  // Base card classes
  const baseClasses = `
    bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg
    transition-shadow duration-300 ease-in-out
    dark:bg-gray-800 dark:border-gray-700
    ${className}
  `;

  // Layout-specific classes
  const layoutClasses = {
    vertical: "max-w-sm",
    horizontal:
      "flex flex-col md:flex-row md:max-w-xl hover:bg-gray-100 dark:hover:bg-gray-700",
  };

  // Image classes
  const imageClasses = {
    vertical: "rounded-t-lg w-full object-cover h-64",
    horizontal:
      "object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg",
  };

  // Button variant classes using brand colors with Material Design
  const buttonClasses = {
    primary:
      "bg-[#44273a] hover:bg-[#5a3550] text-white focus:ring-[#44273a] focus:ring-offset-2",
    secondary:
      "bg-[#ef7622] hover:bg-[#d66819] text-white focus:ring-[#ef7622] focus:ring-offset-2",
    accent:
      "bg-[#fedd3d] hover:bg-[#fdd520] text-black focus:ring-[#fedd3d] focus:ring-offset-2",
  };

  // Content
  const CardContent = (
    <>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className={imageClasses[layout]}
      />
      <div
        className={
          layout === "vertical"
            ? "p-5 flex flex-col justify-between"
            : "flex flex-col justify-between p-4 leading-normal"
        }
        style={layout === "vertical" ? { minHeight: "200px" } : undefined}
      >
        <div>
          <h5 className="mb-2 text-2xl font-normal tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          {description && (
            <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          )}
          {children}
        </div>
        {showButton && layout === "vertical" && (
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium uppercase tracking-wide text-center rounded shadow-md hover:shadow-lg focus:ring-2 focus:outline-none transition-all duration-300 ease-in-out w-fit ${buttonClasses[buttonVariant]}`}
          >
            {buttonText}
            <ArrowRight className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
          </button>
        )}
      </div>
    </>
  );

  const cardClasses = `${baseClasses} ${layoutClasses[layout]}`;

  // External link
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {CardContent}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link to={to} className={cardClasses}>
        {CardContent}
      </Link>
    );
  }

  // Clickable card
  if (onClick) {
    return (
      <div
        onClick={onClick}
        className={`${cardClasses} cursor-pointer`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
          }
        }}
      >
        {CardContent}
      </div>
    );
  }

  // Static card
  return <div className={cardClasses}>{CardContent}</div>;
}

