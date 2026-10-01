# Quick Reference: Image Components

## 🚀 Quick Import

```tsx
import OptimizedImage from "@/components/common/OptimizedImage";
import ResponsiveImage from "@/components/common/ResponsiveImage";
```

---

## 📸 OptimizedImage - Most Common Use

### Basic Usage

```tsx
<OptimizedImage src="/image.jpg" alt="Description" aspectRatio="16/9" />
```

### All Props

| Prop           | Type    | Default                  | Description                              |
| -------------- | ------- | ------------------------ | ---------------------------------------- |
| `src`          | string  | **required**             | Image source URL                         |
| `alt`          | string  | **required**             | Alt text (accessibility)                 |
| `aspectRatio`  | string  | -                        | e.g., "16/9", "4/3", "1/1"               |
| `objectFit`    | string  | "cover"                  | "cover" \| "contain" \| "fill" \| "none" |
| `priority`     | boolean | false                    | Load immediately (no lazy)               |
| `showSkeleton` | boolean | true                     | Show loading placeholder                 |
| `fallbackSrc`  | string  | "/placeholder-image.svg" | Fallback if error                        |
| `className`    | string  | ""                       | Tailwind classes                         |

---

## 🎨 Common Patterns

### Store/Product Card

```tsx
<OptimizedImage
  src={store.image}
  alt={store.name}
  aspectRatio="16/9"
  className="rounded-lg"
/>
```

### Logo (contain, not cover)

```tsx
<OptimizedImage
  src={logo}
  alt="Brand logo"
  aspectRatio="1/1"
  objectFit="contain"
  className="w-20 h-20"
/>
```

### Hero Banner (priority loading)

```tsx
<OptimizedImage
  src="/hero.jpg"
  alt="Mall entrance"
  aspectRatio="21/9"
  priority={true}
  className="w-full"
/>
```

### Gallery Thumbnail

```tsx
<OptimizedImage
  src={image.src}
  alt={image.alt}
  aspectRatio="4/3"
  className="rounded hover:opacity-90 transition"
/>
```

---

## 🌐 ResponsiveImage - Advanced

### With WebP Support

```tsx
<ResponsiveImage
  src="/image.jpg"
  alt="Description"
  sources={[{ srcSet: "/image.webp", type: "image/webp" }]}
  aspectRatio="16/9"
/>
```

### Different Images per Breakpoint

```tsx
<ResponsiveImage
  src="/desktop.jpg"
  alt="Banner"
  sources={[
    { srcSet: "/mobile.jpg", media: "(max-width: 767px)" },
    { srcSet: "/tablet.jpg", media: "(max-width: 1023px)" },
    { srcSet: "/desktop.jpg", media: "(min-width: 1024px)" },
  ]}
  aspectRatio="21/9"
  priority={true}
/>
```

---

## 📏 Common Aspect Ratios

| Ratio  | Visual    | Use Case                   |
| ------ | --------- | -------------------------- |
| `1/1`  | ■ Square  | Logos, avatars, thumbnails |
| `4/3`  | ▬ Classic | Standard photos, gallery   |
| `3/2`  | ▬ Photo   | Photography, portraits     |
| `16/9` | ▬▬ Wide   | Videos, banners, cards     |
| `21/9` | ▬▬▬ Ultra | Hero sections, cinematic   |

---

## ✅ Checklist

### Every Image Should Have:

- [x] `src` prop
- [x] `alt` prop (meaningful description)
- [x] `aspectRatio` (prevents layout shift)
- [x] Appropriate `objectFit` (cover vs contain)

### Above-the-fold Images:

- [x] `priority={true}`

### Logos/Icons:

- [x] `objectFit="contain"`

---

## 🎯 Decision Tree

```
Do you need different images for mobile/desktop?
├─ YES → Use ResponsiveImage
└─ NO  → Use OptimizedImage

Is the image above the fold (visible without scrolling)?
├─ YES → Add priority={true}
└─ NO  → Leave default (lazy loads)

Is it a logo or icon?
├─ YES → Use objectFit="contain"
└─ NO  → Use objectFit="cover" (default)

Does the image have critical dimensions?
├─ YES → Set aspectRatio
└─ NO  → Consider setting it anyway (prevents CLS)
```

---

## 🐛 Troubleshooting

### Image not showing?

1. Check file path (case-sensitive)
2. Verify image is in `/public` folder
3. Check browser console for errors

### Layout jumping?

- Add `aspectRatio` prop

### Slow loading?

- Compress images
- Use WebP format
- Check file sizes (<500KB for banners)

---

## 💡 Pro Tips

1. **Always set aspect ratio** - prevents layout shift
2. **Use priority sparingly** - only for visible content
3. **Compress images first** - components can't fix huge files
4. **Meaningful alt text** - helps SEO and accessibility
5. **Test on slow connection** - use Chrome DevTools throttling

---

## 📚 More Info

- Full Guide: `docs/IMAGE_OPTIMIZATION_GUIDE.md`
- Examples: `docs/IMAGE_USAGE_EXAMPLES.tsx`
- Migration: `docs/MIGRATION_PLAN.md`
