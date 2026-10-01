# Image Components - Usage Examples

This document contains code examples for using the OptimizedImage and ResponsiveImage components.

---

## 1. OPTIMIZED IMAGE - Simple Use Case

### Basic usage:

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";

<OptimizedImage
  src="/store-image.jpg"
  alt="Store front view"
  className="w-full h-64"
/>;
```

### With aspect ratio (recommended for layouts):

```tsx
<OptimizedImage
  src="/store-image.jpg"
  alt="Store front view"
  aspectRatio="16/9"
  className="w-full"
/>
```

### Above-the-fold image (hero, banner):

```tsx
<OptimizedImage
  src="/hero-banner.jpg"
  alt="Alamer Mall entrance"
  aspectRatio="21/9"
  priority={true} // Loads immediately, no lazy loading
  className="w-full"
/>
```

### With custom object fit:

```tsx
<OptimizedImage
  src="/logo.png"
  alt="Brand logo"
  objectFit="contain"
  aspectRatio="1/1"
  className="w-32 h-32"
/>
```

---

## 2. RESPONSIVE IMAGE - Advanced Use Case

### With WebP/AVIF support:

```tsx
import ResponsiveImage from "../../components/common/ResponsiveImage";

<ResponsiveImage
  src="/event-banner.jpg"
  alt="Event banner"
  sources={[
    {
      srcSet: "/event-banner.avif",
      type: "image/avif",
    },
    {
      srcSet: "/event-banner.webp",
      type: "image/webp",
    },
  ]}
  aspectRatio="16/9"
  className="w-full"
/>;
```

### With responsive breakpoints:

```tsx
<ResponsiveImage
  src="/banner-desktop.jpg"
  alt="Mall banner"
  sources={[
    {
      srcSet: "/banner-mobile.jpg",
      media: "(max-width: 767px)",
    },
    {
      srcSet: "/banner-tablet.jpg",
      media: "(min-width: 768px) and (max-width: 1023px)",
    },
    {
      srcSet: "/banner-desktop.jpg",
      media: "(min-width: 1024px)",
    },
  ]}
  aspectRatio="21/9"
  priority={true}
  className="w-full"
/>
```

---

## 3. Store Card Example

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";
import { Store } from "../../types/store.types";

function StoreCard({ store }: { store: Store }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <OptimizedImage
        src={store.image}
        alt={store.name}
        aspectRatio="16/9"
        className="w-full"
      />

      {store.logo && (
        <OptimizedImage
          src={store.logo}
          alt={`${store.name} logo`}
          aspectRatio="1/1"
          objectFit="contain"
          className="w-16 h-16 p-2"
        />
      )}

      <div className="p-4">
        <h3>{store.name}</h3>
        <p>{store.description}</p>
      </div>
    </div>
  );
}
```

---

## 4. Photo Gallery Example

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";

function PhotoGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="cursor-pointer">
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            aspectRatio="4/3"
            className="rounded-lg hover:opacity-90 transition-opacity"
          />
        </div>
      ))}
    </div>
  );
}
```

---

## 5. Event Banner Example

```tsx
import ResponsiveImage from "../../components/common/ResponsiveImage";
import { Event } from "../../data/events";

function EventBanner({ event }: { event: Event }) {
  return (
    <div className="relative">
      <ResponsiveImage
        src={event.bannerImage}
        alt={event.title}
        sources={[
          {
            srcSet: event.bannerImage.replace(".jpg", ".webp"),
            type: "image/webp",
          },
        ]}
        aspectRatio="21/9"
        priority={true}
        className="w-full rounded-lg"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">{event.title}</h1>
      </div>
    </div>
  );
}
```

---

## 6. Hero Section Example

```tsx
import ResponsiveImage from "../../components/common/ResponsiveImage";

function Hero({ backgroundImage }: { backgroundImage: string }) {
  return (
    <section className="relative h-screen">
      <ResponsiveImage
        src={backgroundImage}
        alt="Alamer Mall"
        sources={[
          {
            srcSet: backgroundImage.replace(".jpg", "-mobile.jpg"),
            media: "(max-width: 767px)",
          },
          {
            srcSet: backgroundImage.replace(".jpg", "-desktop.jpg"),
            media: "(min-width: 768px)",
          },
        ]}
        priority={true}
        className="absolute inset-0"
        objectFit="cover"
      />

      <div className="relative z-10 container mx-auto h-full flex items-center">
        <h1 className="text-white text-6xl font-bold">
          Welcome to Alamer Mall
        </h1>
      </div>
    </section>
  );
}
```

---

## 7. Store Banner with Logo Overlay

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";
import { Store } from "../../types/store.types";

function StoreBanner({ store }: { store: Store }) {
  return (
    <div className="relative">
      <OptimizedImage
        src={store.image}
        alt={`${store.name} store at Alamer Mall`}
        aspectRatio="16/9"
        className="w-full h-[400px]"
      />

      {/* Logo Overlay */}
      {store.logo && (
        <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-md">
          <OptimizedImage
            src={store.logo}
            alt={`${store.name} logo`}
            aspectRatio="1/1"
            objectFit="contain"
            className="w-16 h-16"
          />
        </div>
      )}

      {/* Category Badge */}
      <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full">
        {store.category}
      </div>
    </div>
  );
}
```

---

## 8. Restaurant Card Grid

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";

function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <OptimizedImage
            src={restaurant.image}
            alt={`${restaurant.name} restaurant`}
            aspectRatio="16/9"
            className="w-full"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
            <p className="text-gray-600">{restaurant.category}</p>
            <p className="text-sm text-gray-500 mt-2">
              Floor {restaurant.floor}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 9. Entertainment Venue with Background

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";

function VenueCard({ venue }: { venue: Entertainment }) {
  return (
    <div className="relative rounded-lg overflow-hidden h-96 group cursor-pointer">
      <OptimizedImage
        src={venue.image}
        alt={venue.name}
        aspectRatio="4/3"
        className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end">
        <div className="p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{venue.name}</h3>
          <p className="text-gray-200">{venue.description}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## 10. Lightbox Image Viewer

```tsx
import OptimizedImage from "../../components/common/OptimizedImage";

function Lightbox({ imageSrc, alt, onClose }: LightboxProps) {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl"
      >
        ×
      </button>

      <OptimizedImage
        src={imageSrc}
        alt={alt}
        priority={true}
        showSkeleton={false}
        className="max-w-[90vw] max-h-[90vh]"
        objectFit="contain"
      />
    </div>
  );
}
```

---

## Common Import Paths

Depending on your file location:

```tsx
// From pages/ directory
import OptimizedImage from "../../components/common/OptimizedImage";

// From components/features/ directory
import OptimizedImage from "../common/OptimizedImage";

// Using TypeScript path alias (if configured in tsconfig.json)
import OptimizedImage from "@/components/common/OptimizedImage";
```

---

## Tips

1. **Always provide meaningful alt text** - important for SEO and accessibility
2. **Set aspect ratios** - prevents layout shift (CLS)
3. **Use priority for hero images** - faster perceived load time
4. **Use contain for logos** - prevents distortion
5. **Test with slow network** - Chrome DevTools throttling

See `IMAGE_OPTIMIZATION_GUIDE.md` for complete documentation.
