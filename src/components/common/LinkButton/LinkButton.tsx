import { ReactNode } from "react";

interface LinkButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export default function LinkButton({
  href,
  variant = "primary",
  children,
  icon,
  className = "",
}: LinkButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary",
    secondary:
      "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary",
    outline:
      "bg-white text-primary border-2 border-primary hover:bg-primary/5 focus:ring-primary",
  };

  return (
    <a
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {icon}
      {children}
    </a>
  );
}

