import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./utils/i18n";
import AppRouter from "./router";

// Skip to content component
function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-9999 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkipToContent />
    <AppRouter />
  </StrictMode>
);
