# Image Optimization Guide for Alamer Mall

## Overview

This guide covers best practices for implementing proper DOM structure for images in the Alamer Mall project.

## Components Created

### 1. **OptimizedImage** (`src/components/common/OptimizedImage`)

A simple, performant image component with:

- ✅ Lazy loading (native browser support)
- ✅ Loading skeleton/states
- ✅ Error handling with fallback
- ✅ Aspect ratio control
- ✅ Object-fit options
- ✅ Accessibility (alt text)
- ✅ Priority loading for above-the-fold images

### 2. **ResponsiveImage** (`src/components/common/ResponsiveImage`)

Advanced component using `<picture>` element:

- ✅ Multiple image formats (WebP, AVIF)
- ✅ Art direction (different images per breakpoint)
- ✅ Media queries
- ✅ All OptimizedImage features

---

## Quick Start

### Installation

Components are already created in your project. No npm packages needed!

### Basic Usage

```tsx
import OptimizedImage from "@/components/common/OptimizedImage";

<OptimizedImage
  src="/store-image.jpg"
  alt="Store description"
  aspectRatio="16/9"
  className="w-full rounded-lg"
/>;
```

---

## When to Use Each Component

### Use **OptimizedImage** for:

- ✅ Store/Restaurant cards
- ✅ Product images
- ✅ Event thumbnails
- ✅ Gallery images
- ✅ Logos and icons
- ✅ Any standard image needs

### Use **ResponsiveImage** for:

- ✅ Hero banners (different images for mobile/desktop)
- ✅ Large promotional images
- ✅ When you have WebP/AVIF versions
- ✅ Complex responsive layouts
- ✅ Art-directed images (cropped differently per size)

---

## Best Practices

### 1. Always Set Aspect Ratios

```tsx
// ❌ BAD - causes layout shift
<OptimizedImage src="/img.jpg" alt="..." />

// ✅ GOOD - reserves space, prevents CLS
<OptimizedImage src="/img.jpg" alt="..." aspectRatio="16/9" />
```

### 2. Use Priority for Above-the-Fold Images

```tsx
// Hero images, main banners
<OptimizedImage
  src="/hero.jpg"
  alt="Hero"
  priority={true} // Loads immediately
/>
```

### 3. Provide Meaningful Alt Text

```tsx
// ❌ BAD
<OptimizedImage src="/store.jpg" alt="image" />

// ✅ GOOD
<OptimizedImage src="/store.jpg" alt="Zara store front entrance at Alamer Mall" />
```

### 4. Use Object Fit Appropriately

```tsx
// For photos - cover (default)
<OptimizedImage src="/photo.jpg" alt="..." objectFit="cover" />

// For logos - contain
<OptimizedImage src="/logo.png" alt="..." objectFit="contain" />
```

### 5. Optimize Image Files

- **JPEG**: Photos, complex images (80-85% quality)
- **PNG**: Logos, graphics with transparency
- **WebP**: 30% smaller than JPEG, good browser support
- **AVIF**: 50% smaller than JPEG, newer format

**Recommended sizes:**

- Thumbnails: 400x300px
- Cards: 800x600px
- Banners: 1920x1080px
- Hero images: 2560x1440px (max)

---

## Migration Guide

### Replace Existing Images

#### Before (Stores.tsx):

```tsx
<div className="relative w-full md:w-1/2 h-[300px] md:h-[500px]">
  <img
    src={store.image}
    alt={store.name}
    className="w-full h-full object-cover"
  />
</div>
```

#### After:

```tsx
<OptimizedImage
  src={store.image}
  alt={`${store.name} store at Alamer Mall`}
  aspectRatio="1/1"
  className="w-full md:w-1/2 h-[300px] md:h-[500px]"
/>
```

---

## Common Aspect Ratios

| Ratio  | Use Case                 | Example                   |
| ------ | ------------------------ | ------------------------- |
| `16/9` | Standard videos, banners | Event banners             |
| `4/3`  | Traditional photos       | Gallery images            |
| `1/1`  | Squares                  | Product thumbnails, logos |
| `21/9` | Ultra-wide banners       | Hero sections             |
| `3/2`  | Photography              | Store showcases           |

---

## Advanced: Multiple Formats

### Create WebP versions:

```bash
# Using online tools or CLI tools like:
# - cwebp (Google's WebP encoder)
# - ImageMagick
# - Squoosh.app (web-based)

cwebp -q 80 input.jpg -o output.webp
```

### Use in component:

```tsx
<ResponsiveImage
  src="/event.jpg"
  alt="Event banner"
  sources={[
    { srcSet: "/event.avif", type: "image/avif" },
    { srcSet: "/event.webp", type: "image/webp" },
  ]}
  aspectRatio="16/9"
/>
```

---

## Performance Checklist

- [ ] All images have alt text
- [ ] Aspect ratios set on all images
- [ ] Hero/banner images use `priority={true}`
- [ ] Below-the-fold images lazy load (default)
- [ ] Images compressed/optimized
- [ ] WebP versions created for large images
- [ ] Fallback images available
- [ ] No layout shift on image load

---

## SEO Benefits

✅ **Better Core Web Vitals:**

- Reduced Cumulative Layout Shift (CLS)
- Improved Largest Contentful Paint (LCP)
- Better First Input Delay (FID)

✅ **Accessibility:**

- Screen reader friendly
- Proper semantic HTML

✅ **Performance:**

- Lazy loading reduces initial load
- Modern formats (WebP) save bandwidth

---

## Troubleshooting

### Images not loading?

- Check file paths (case-sensitive)
- Verify images are in `/public` folder
- Check browser console for errors

### Layout shifts still occurring?

- Ensure aspect ratio is set
- Check parent container has defined dimensions

### Images loading slowly?

- Optimize file sizes (use compression tools)
- Consider CDN for production
- Use WebP format

---

## Next Steps

### Immediate Actions:

1. ✅ Components created (OptimizedImage, ResponsiveImage)
2. ⏳ Update Stores page images
3. ⏳ Update Restaurants page images
4. ⏳ Update Events page images
5. ⏳ Update Hero component
6. ⏳ Update PhotoGallery component

### Future Enhancements:

- Add blur placeholder (base64)
- Implement image CDN
- Add progressive loading
- Create image generation pipeline

---

## Resources

- [MDN: \`<picture>\` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
- [web.dev: Optimize images](https://web.dev/fast/#optimize-your-images)
- [React: Lazy loading](https://react.dev/reference/react/lazy)
- [Squoosh.app](https://squoosh.app) - Image optimization tool

---

## Questions?

Common aspect ratios and use cases are documented above. For specific implementations, check `docs/IMAGE_USAGE_EXAMPLES.tsx`.
