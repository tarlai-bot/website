import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  autoRotateInterval?: number;
}

export default function GalleryGrid({ images = [], autoRotateInterval = 4000 }: GalleryGridProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPaused] = useState(false);
  const [validImages, setValidImages] = useState<GalleryImage[]>([]);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  // Filter out images that fail to load
  useEffect(() => {
    const filtered = images.filter((img) => !imageLoadErrors.has(img.src));
    setValidImages(filtered);
  }, [images, imageLoadErrors]);

  const handleImageError = (src: string) => {
    setImageLoadErrors((prev) => new Set(prev).add(src));
  };

  // Get 6 images for the 6 positions
  const getPositionImages = () => {
    if (!validImages || validImages.length === 0) return [];
    const positions = [];
    for (let i = 0; i < 6; i++) {
      const index = (currentIndex + i) % validImages.length;
      positions.push({ ...validImages[index], originalIndex: index });
    }
    return positions;
  };

  const positionImages = getPositionImages();

  // Auto-rotate
  useEffect(() => {
    if (!validImages || validImages.length === 0 || isPaused || isLightboxOpen || isAnimating)
      return;

    const interval = setInterval(() => {
      rotateForward();
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isPaused, isLightboxOpen, isAnimating, currentIndex, validImages, autoRotateInterval]);

  const rotateForward = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % validImages.length);

    setTimeout(() => setIsAnimating(false), 1000);

    // setIsPaused(true);
    // setTimeout(() => setIsPaused(false), 10000);
  };

  const rotateBackward = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);

    setTimeout(() => setIsAnimating(false), 1000);

    // setIsPaused(true);
    // setTimeout(() => setIsPaused(false), 10000);
  };

  const openLightbox = (posIdx: number) => {
    if (!positionImages || positionImages.length === 0) return;
    setLightboxIndex(positionImages[posIdx].originalIndex);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const lightboxNext = () => {
    if (!validImages || validImages.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % validImages.length);
  };

  const lightboxPrev = () => {
    if (!validImages || validImages.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, validImages]);

  if (!validImages || validImages.length === 0 || positionImages.length === 0) {
    return (
      <div className="h-[600px] md:h-[700px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-700 text-lg font-normal">No images available</p>
      </div>
    );
  }

  // Position configurations for 3x3 grid
  const positions = {
    large: { gridColumn: "1 / 3", gridRow: "1 / 3" },
    tile3: { gridColumn: "3", gridRow: "1" },
    tile6: { gridColumn: "3", gridRow: "2" },
    tile7: { gridColumn: "1", gridRow: "3" },
    tile8: { gridColumn: "2", gridRow: "3" },
    tile9: { gridColumn: "3", gridRow: "3" },
  };

  return (
    <>
      <div className="gallery-grid">
        {/* Position 0: LARGE */}
        <motion.div
          key={`large-${positionImages[0].id}`}
          layoutId={`tile-${positionImages[0].id}`}
          style={positions.large}
          className="gallery-tile tile-large"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => openLightbox(0)}
        >
          <img
            src={positionImages[0].src}
            alt="Gallery Image"
            className="tile-img"
            onError={() => handleImageError(positionImages[0].src)}
          />
          {/* <div className="featured-badge">Featured</div> */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              rotateBackward();
            }}
            disabled={isAnimating}
            className="nav-btn nav-left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              rotateForward();
            }}
            disabled={isAnimating}
            className="nav-btn nav-right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Position 1: Tile 3 */}
        <motion.div
          key={`tile3-${positionImages[1].id}`}
          layoutId={`tile-${positionImages[1].id}`}
          style={positions.tile3}
          className="gallery-tile tile-small"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => openLightbox(1)}
        >
          <img
            src={positionImages[1].src}
            alt="Gallery Image"
            className="tile-img"
            onError={() => handleImageError(positionImages[1].src)}
          />
        </motion.div>

        {/* Position 2: Tile 6 */}
        <motion.div
          key={`tile6-${positionImages[2].id}`}
          layoutId={`tile-${positionImages[2].id}`}
          style={positions.tile6}
          className="gallery-tile tile-small"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => openLightbox(2)}
        >
          <img
            src={positionImages[2].src}
            alt="Gallery Image"
            className="tile-img"
            onError={() => handleImageError(positionImages[2].src)}
          />
        </motion.div>

        {/* Position 3: Tile 9 */}
        <motion.div
          key={`tile9-${positionImages[3].id}`}
          layoutId={`tile-${positionImages[3].id}`}
          style={positions.tile9}
          className="gallery-tile tile-small"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => openLightbox(3)}
        >
          <img
            src={positionImages[3].src}
            alt="Gallery Image"
            className="tile-img"
            onError={() => handleImageError(positionImages[3].src)}
          />
        </motion.div>

        {/* Position 4: Tile 8 */}
        <motion.div
          key={`tile8-${positionImages[4].id}`}
          layoutId={`tile-${positionImages[4].id}`}
          style={positions.tile8}
          className="gallery-tile tile-small"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => openLightbox(4)}
        >
          <img
            src={positionImages[4].src}
            alt="Gallery Image"
            className="tile-img"
            onError={() => handleImageError(positionImages[4].src)}
          />
        </motion.div>

        {/* Position 5: Tile 7 */}
        <motion.div
          key={`tile7-${positionImages[5].id}`}
          layoutId={`tile-${positionImages[5].id}`}
          style={positions.tile7}
          className="gallery-tile tile-small"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={() => openLightbox(5)}
        >
          <img
            src={positionImages[5].src}
            alt="Gallery Image"
            className="tile-img"
            onError={() => handleImageError(positionImages[5].src)}
          />
        </motion.div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out z-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={validImages[lightboxIndex].src}
              alt="Gallery Image"
              className="max-w-full max-h-full object-contain"
              onError={() => handleImageError(validImages[lightboxIndex].src)}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-sm font-normal text-gray-300">
                {lightboxIndex + 1} / {validImages.length}
              </p>
            </div>
          </div>

          <button
            onClick={lightboxPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={lightboxNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 1rem;
          height: 600px;
          position: relative;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            height: 700px;
          }
        }

        .gallery-tile {
          position: relative;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          cursor: pointer;
        }

        .gallery-tile:hover {
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.2);
        }

        .tile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .gallery-tile:hover .tile-img {
          transform: scale(1.05);
        }

        .tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1rem;
          pointer-events: none;
        }

        .gallery-tile:hover .tile-overlay {
          opacity: 1;
        }

        .tile-caption {
          color: white;
          font-weight: 400;
          font-size: 1.125rem;
        }

        .tile-caption-sm {
          color: white;
          font-weight: 400;
          font-size: 0.875rem;
        }

        .featured-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #ef7622;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          z-index: 10;
          pointer-events: none;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.5);
          color: white;
          padding: 0.75rem;
          border-radius: 9999px;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
          border: none;
          cursor: pointer;
        }

        .gallery-tile:hover .nav-btn {
          opacity: 1;
        }

        .nav-btn:hover {
          background: rgba(0,0,0,0.7);
        }

        .nav-btn:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed;
        }

        .nav-left { left: 1rem; }
        .nav-right { right: 1rem; }
      `}</style>
    </>
  );
}
