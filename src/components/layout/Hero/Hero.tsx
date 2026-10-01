import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { MapPin, Clock } from "lucide-react";
import logger from "../../../utils/logger";
import OptimizedImage from "../../common/OptimizedImage/OptimizedImage";

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryCTA?: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = "/images/alamerMall/mall_image.JPG",
  primaryCTA,
  secondaryCTA,
}: HeroProps) {
  const { t } = useTranslation(["common", "pages"]);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5); // Default medium
  const imageRef = useRef<HTMLImageElement>(null);

  // Analyze image brightness and set overlay opacity
  useEffect(() => {
    const analyzeImageBrightness = () => {
      const img = imageRef.current;
      if (!img || !img.complete) return;

      try {
        // Create canvas to analyze image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size (sample a smaller version for performance)
        canvas.width = 100;
        canvas.height = 100;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, 100, 100);

        // Get image data
        const imageData = ctx.getImageData(0, 0, 100, 100);
        const data = imageData.data;

        // Calculate average brightness
        let totalBrightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Calculate perceived brightness (weighted formula)
          const brightness = r * 0.299 + g * 0.587 + b * 0.114;
          totalBrightness += brightness;
        }

        const avgBrightness = totalBrightness / (data.length / 4);

        // Map brightness (0-255) to overlay opacity
        // Bright image (200+) → darker overlay (0.7)
        // Medium image (100-200) → medium overlay (0.5)
        // Dark image (0-100) → lighter overlay (0.3)
        let opacity;
        if (avgBrightness > 180) {
          opacity = 0.7; // Very bright image - darkest overlay
        } else if (avgBrightness > 140) {
          opacity = 0.6; // Bright image - dark overlay
        } else if (avgBrightness > 100) {
          opacity = 0.5; // Medium image - medium overlay
        } else if (avgBrightness > 60) {
          opacity = 0.4; // Dark image - light overlay
        } else {
          opacity = 0.3; // Very dark image - lightest overlay
        }

        setOverlayOpacity(opacity);
      } catch (error) {
        logger.error("Error analyzing image brightness:", error);
        setOverlayOpacity(0.5); // Fallback to medium
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        analyzeImageBrightness();
      } else {
        img.addEventListener("load", analyzeImageBrightness);
        return () => img.removeEventListener("load", analyzeImageBrightness);
      }
    }
    return undefined;
  }, [backgroundImage]);

  return (
    <div className="hero-section relative isolate overflow-hidden bg-gray-900 h-screen snap-start snap-always">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <OptimizedImage
          ref={imageRef}
          src={backgroundImage}
          alt="Alamer Mall"
          className="h-full w-full"
          priority={true}
          objectFit="cover"
          showSkeleton={false}
        />
      </div>

      {/* Adaptive Dark Overlay - Pure Black Only */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500 -z-10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative px-4 sm:px-6 pt-14 lg:px-8 xl:px-12 2xl:px-16 h-full flex items-center">
        <div className="mx-auto max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-tight text-balance text-white mb-6 sm:mb-8 lg:mb-10 2xl:mb-12 drop-shadow-2xl">
            {title || t("pages:home.hero.title")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-pretty text-gray-100 mb-8 sm:mb-10 lg:mb-12 2xl:mb-14 drop-shadow-xl leading-relaxed">
            {subtitle || t("pages:home.hero.subtitle")}
          </p>
          <div className="flex items-center justify-center gap-x-4 sm:gap-x-6 lg:gap-x-8">
            {primaryCTA && (
              <a
                href={primaryCTA.link}
                className="rounded bg-secondary px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-2 sm:py-3 lg:py-4 xl:py-5 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium uppercase tracking-wide text-white shadow-md hover:shadow-lg hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 transition-all duration-300 ease-in-out"
              >
                {primaryCTA.text}
              </a>
            )}
            {secondaryCTA && (
              <a
                href={secondaryCTA.link}
                className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium leading-6 text-white drop-shadow-xl hover:text-gray-200 transition-colors duration-300 ease-in-out"
              >
                {secondaryCTA.text} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Working Hours - Bottom Left */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 xl:bottom-10 left-4 sm:left-6 lg:left-8 xl:left-10 z-10">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 sm:px-3 lg:px-4 xl:px-5 py-1.5 sm:py-2 lg:py-3 xl:py-4 text-white shadow-lg">
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 mb-0.5 sm:mb-1 lg:mb-1.5">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6" />
            <span className="text-[10px] sm:text-xs lg:text-sm xl:text-base font-medium uppercase tracking-wider">
              {t("common:hours.title")}
            </span>
          </div>
          <p className="text-[9px] sm:text-xs lg:text-sm xl:text-base font-normal">
            {t("common:hours.satThu")}
          </p>
          <p className="text-[9px] sm:text-xs lg:text-sm xl:text-base font-normal">
            {t("common:hours.fri")}
          </p>
        </div>
      </div>

      {/* Location Button - Bottom Right */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 xl:bottom-10 right-4 sm:right-6 lg:right-8 xl:right-10 z-10">
        <div className="absolute -inset-2 rounded-full animate-ping-slow bg-white opacity-40 pointer-events-none"></div>
        <a
          href="https://maps.app.goo.gl/duMw7y1F68JHAzFq8"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block bg-secondary hover:bg-secondary-hover text-white p-2 sm:p-3 lg:p-4 xl:p-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus-visible:outline-none"
          aria-label="View location on Google Maps"
          tabIndex={-1}
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
        </a>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          const heroSection = document.querySelector(".hero-section");
          if (heroSection) {
            const heroHeight = heroSection.getBoundingClientRect().height;
            window.scrollTo({
              top: heroHeight,
              behavior: "smooth",
            });
          }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 cursor-pointer bg-transparent border-none p-2 focus:outline-none"
        aria-label="Scroll to content"
      >
        <svg
          className="w-6 h-6 text-white drop-shadow-xl"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </button>
    </div>
  );
}
