import { useState, ImgHTMLAttributes, forwardRef } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  priority?: boolean; // For above-the-fold images
  showSkeleton?: boolean;
  className?: string;
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      fallbackSrc = "/placeholder-image.svg",
      aspectRatio,
      objectFit = "cover",
      priority = false,
      showSkeleton = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = () => {
      setIsLoading(false);
      setError(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setError(true);
      if (currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }
    };

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {/* Loading Skeleton */}
        {showSkeleton && isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Actual Image */}
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectFit }}
          crossOrigin="anonymous"
          {...props}
        />

        {/* Error State (optional visual indicator) */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            Image unavailable
          </div>
        )}
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
