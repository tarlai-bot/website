import { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  to?: string;
  showArrow?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  to,
  showArrow = true,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm font-medium uppercase tracking-wide",
    md: "px-5 py-3 text-sm font-medium uppercase tracking-wide",
    lg: "px-6 py-4 text-base font-medium uppercase tracking-wide",
  };

  // Variant classes using brand colors with Material Design elevation
  const variantClasses = {
    primary:
      "border-[#44273a] bg-[#44273a] text-white hover:bg-[#5a3550] hover:border-[#5a3550] shadow-md hover:shadow-lg",
    secondary:
      "border-[#ef7622] bg-[#ef7622] text-white hover:bg-[#d66819] hover:border-[#d66819] shadow-md hover:shadow-lg",
    accent:
      "border-[#fedd3d] bg-[#fedd3d] text-black hover:bg-[#fdd520] hover:border-[#fdd520] shadow-md hover:shadow-lg",
    outline:
      "border-[#44273a] text-[#44273a] hover:bg-[#44273a] hover:text-white shadow-sm hover:shadow-md",
  };

  // Focus states for accessibility
  const focusClasses = {
    primary:
      "focus:outline-none focus:ring-2 focus:ring-[#44273a] focus:ring-offset-2",
    secondary:
      "focus:outline-none focus:ring-2 focus:ring-[#ef7622] focus:ring-offset-2",
    accent:
      "focus:outline-none focus:ring-2 focus:ring-[#fedd3d] focus:ring-offset-2",
    outline:
      "focus:outline-none focus:ring-2 focus:ring-[#44273a] focus:ring-offset-2",
  };

  // Arrow icon colors
  const arrowClasses = {
    primary: "border-white bg-white text-[#44273a]",
    secondary: "border-white bg-white text-[#ef7622]",
    accent: "border-black bg-white text-[#fedd3d]",
    outline:
      "border-[#44273a] bg-white text-[#44273a] group-hover:text-white group-hover:bg-[#5a3550]",
  };

  // Base classes
  const baseClasses = `
    group flex items-center justify-between gap-4 rounded border
    transition-all duration-300 ease-in-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${focusClasses[variant]}
    ${fullWidth ? "w-full" : "w-fit"}
    ${className}
  `;

  // Arrow icon
  const ArrowIcon = showArrow ? (
    <span
      className={`shrink-0 rounded-full border p-2 transition-all duration-300 ease-in-out ${arrowClasses[variant]}`}
    >
      <ArrowRight className="w-5 h-5 rtl:rotate-180" />
    </span>
  ) : null;

  // Content
  const Content = (
    <>
      <span className="transition-colors">{children}</span>
      {ArrowIcon}
    </>
  );

  // External link
  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {Content}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {Content}
      </Link>
    );
  }

  // Regular button
  return (
    <button className={baseClasses} {...props}>
      {Content}
    </button>
  );
}

