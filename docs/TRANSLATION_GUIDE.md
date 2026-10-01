# Translation Guide - Alamer Mall Website

## Overview

This guide documents all translation keys available in the i18n system and how to use them across different pages.

## Translation Namespaces

The application uses 4 namespaces:

- **common**: Shared UI elements (navigation, footer, buttons, filters, etc.)
- **pages**: Page-specific content (hero sections, descriptions, features)
- **forms**: Form labels, placeholders, validation messages
- **legal**: Privacy policy, terms of service content

## How to Use Translations

### 1. Import the hook

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation(["pages", "common"]); // specify namespaces

  return <h1>{t("pages:home.hero.title")}</h1>;
}
```

### 2. Dynamic Content with useMemo

For arrays or objects that contain translations, wrap them in `useMemo` with `i18n.language` as dependency:

```tsx
const { t, i18n } = useTranslation(["pages"]);

const sections = useMemo(
  () => [
    {
      title: t("pages:home.sections.stores"),
      description: t("pages:home.sections.storesDesc"),
    },
  ],
  [t, i18n.language]
);
```

## Available Translation Keys by Page

### Home Page (`pages:home`)

```typescript
home: {
  hero: { title, subtitle, cta }
  banners: {
    smarvy: { title, description, cta }
    hypermarket: { title, description, cta }
  }
  sections: { stores, storesDesc, dining, diningDesc, entertainment, entertainmentDesc }
  events: { title, subtitle, viewAll }
  whoWeAre: { title, description, cta }
  gallery: { title, viewAll }
  whyVisit: { title, subtitle, features: [{ title, description }] }
  business: { title, subtitle, rental: { title, description, cta }, investment: { title, description, cta } }
  cta: { title, subtitle, button }
}
```

### About Page (`pages:about`)

```typescript
about: {
  hero: { title, subtitle }
  whoWeAre: { title, description, mission: { title, description }, vision: { title, description } }
  ourStory: { title, year, milestone, description }
  stats: [{ value, label }]
}
```

### Stores Page (`pages:stores`)

```typescript
stores: {
  hero: {
    title, subtitle;
  }
  filters: {
    searchPlaceholder, allFloors, allCategories, filter;
  }
  categories: {
    fashion, electronics, beauty, sports, homeDecor, jewelry, books, toys;
  }
  storeCard: {
    floor, viewDetails, open, closed;
  }
  noResults, loadMore, showLess;
}
```

**Shared Keys**: Uses `common:floors`, `common:filters`, `common:categories`

### Restaurants Page (`pages:restaurants`)

```typescript
restaurants: {
  hero: { title, subtitle }
  filters: { searchPlaceholder, allFloors, allCuisines, filter }
  cuisines: { italian, chinese, indian, arabic, american, japanese, mexican, fast food, cafe }
  card: { cuisine, floor, viewMenu }
  noResults, loadMore, showLess
}
```

**Shared Keys**: Uses `common:floors`, `common:filters`

### Entertainment Page (`pages:entertainment`)

```typescript
entertainment: {
  hero: {
    title, subtitle;
  }
  description;
  featured: {
    title, subtitle;
  }
  activities: {
    gaming, cinema, kids, arcade, vr;
  }
  loadMore, showLess;
}
```

### Hypermarket Page (`pages:hypermarket`)

```typescript
hypermarket: {
  hero: {
    title, subtitle;
  }
  description;
  categories: {
    title, fresh, dairy, meat, bakery, beverages, household, personal, frozen;
  }
  features: {
    title,
      quality,
      qualityDesc,
      prices,
      pricesDesc,
      variety,
      varietyDesc,
      convenience,
      convenienceDesc;
  }
}
```

### Services Page (`pages:services`)

```typescript
services: {
  hero: {
    title, subtitle;
  }
  categories: {
    customer, facilities, accessibility, safety;
  }
  list: {
    information,
      parking,
      wifi,
      prayer,
      nursing,
      atm,
      currency,
      wheelchairs,
      strollers,
      lockers,
      valet,
      security,
      firstAid,
      lostFound;
  }
}
```

### Customer Service Page (`pages:customerService`)

```typescript
customerService: {
  hero: {
    title, subtitle;
  }
  contact: {
    title, phone, email, visit, social;
  }
  hours: {
    title, description;
  }
  faq: {
    title, viewAll;
  }
}
```

### FAQ Page (`pages:faq`)

```typescript
faq: {
  hero: {
    title, subtitle;
  }
  categories: {
    general, shopping, parking, services, events;
  }
  noResults, search;
}
```

### Events Page (`pages:events`)

```typescript
events: {
  hero: {
    title, subtitle;
  }
  filters: {
    upcoming, past, all;
  }
  details: {
    date, time, location, register;
  }
  noEvents;
}
```

**Shared Keys**: This section is shared with Home page's event section

### Maps Page (`pages:maps`)

```typescript
maps: {
  hero: {
    title, subtitle;
  }
  facilities: {
    title,
      restrooms,
      parking,
      atm,
      information,
      prayer,
      nursing,
      elevator,
      stairs,
      emergency;
  }
}
```

### Gallery Page (`pages:gallery`)

```typescript
gallery: {
  hero: {
    title, subtitle;
  }
  categories: {
    all, stores, events, facilities, dining;
  }
  noImages;
}
```

### Contact Page (`pages:contact`)

```typescript
contact: {
  hero: {
    title, subtitle;
  }
  form: {
    title, subtitle;
  }
  info: {
    title,
      address,
      phone,
      email,
      hours,
      addressValue,
      phoneValue,
      emailValue,
      hoursValue;
  }
  location: {
    title, directions;
  }
}
```

**Shared Keys**: Uses `forms:*` for form fields

### Rental Page (`pages:rental`)

```typescript
rental: {
  hero: {
    title, subtitle;
  }
  why: {
    title,
      location,
      locationDesc,
      footfall,
      footfallDesc,
      facilities,
      facilitiesDesc,
      support,
      supportDesc;
  }
  spaces: {
    title, retail, kiosk, food, anchor;
  }
  inquiry: {
    title, subtitle, success, error;
  }
}
```

**Shared Keys**: Uses `forms:*` for inquiry form

### Investment Page (`pages:investment`)

```typescript
investment: {
  hero: {
    title, subtitle;
  }
  overview: {
    title, description;
  }
  benefits: {
    title,
      returns,
      returnsDesc,
      growth,
      growthDesc,
      reputation,
      reputationDesc,
      management,
      managementDesc;
  }
  contact: {
    title, subtitle;
  }
}
```

### Careers Page (`pages:careers`)

```typescript
careers: {
  hero: {
    title, subtitle;
  }
  why: {
    title,
      growth,
      growthDesc,
      environment,
      environmentDesc,
      benefits,
      benefitsDesc,
      training,
      trainingDesc;
  }
  openings: {
    title,
      department,
      type,
      location,
      apply,
      fullTime,
      partTime,
      contract,
      noOpenings;
  }
  application: {
    title, success, error;
  }
}
```

**Shared Keys**: Uses `forms:*` for application form

### Privacy Policy Page (`pages:privacyPolicy`)

```typescript
privacyPolicy: {
  hero: {
    title, subtitle;
  }
  lastUpdated;
}
```

### Terms of Service Page (`pages:termsOfService`)

```typescript
termsOfService: {
  hero: {
    title, subtitle;
  }
  lastUpdated;
}
```

## Common Shared Keys

### Navigation (`common:nav`)

```typescript
nav: {
  home,
    about,
    sections,
    events,
    stores,
    dining,
    entertainment,
    hypermarket,
    map,
    maps,
    gallery,
    business,
    services,
    rentalOpportunities,
    investmentOpportunities,
    careers,
    customerService,
    faq,
    contact;
}
```

### Footer (`common:footer`)

```typescript
footer: {
  location,
    quickAccess,
    support,
    followUs,
    copyright,
    privacyPolicy,
    termsOfService,
    contactInfo,
    workingHours;
}
```

### Common UI Elements (`common:common`)

```typescript
common: {
  menu, close, readMore, viewAll, learnMore, contactUs,
  loading, noResults, search, filter, clear, apply,
  cancel, submit, save, edit, delete, back, next, previous,
  showMore, showLess
}
```

### Filters (`common:filters`)

```typescript
filters: {
  all, category, floor, status;
}
```

### Floors (`common:floors`)

```typescript
floors: {
  basement, ground, first, second, mezzanine, roof;
}
```

### Categories (`common:categories`)

```typescript
categories: {
  all,
    fashion,
    food,
    entertainment,
    hypermarket,
    electronics,
    health,
    services,
    kids;
}
```

### Days of Week (`common:days`)

```typescript
days: {
  saturday, sunday, monday, tuesday, wednesday, thursday, friday;
}
```

## Form Translations (`forms:`)

### Labels (`forms:labels`)

```typescript
labels: {
  name, email, phone, subject, message, company, position, cv, coverLetter;
}
```

### Placeholders (`forms:placeholders`)

```typescript
placeholders: {
  name, email, phone, subject, message, company, search;
}
```

### Buttons (`forms:buttons`)

```typescript
buttons: {
  submit, send, apply, upload, clear, cancel;
}
```

### Validation (`forms:validation`)

```typescript
validation: {
  required, email, phone, minLength, maxLength, fileSize, fileType;
}
```

### Messages (`forms:messages`)

```typescript
messages: {
  success, error, loading;
}
```

## Best Practices

1. **Always specify namespace**: Use `t('pages:home.hero.title')` not `t('home.hero.title')`

2. **Load required namespaces**:

   ```tsx
   const { t } = useTranslation(["pages", "common", "forms"]);
   ```

3. **Use useMemo for dynamic arrays**:

   ```tsx
   const items = useMemo(() => [{ title: t("key1") }], [t, i18n.language]);
   ```

4. **Prefer common keys over page-specific**:

   - Use `common:common.loadMore` instead of creating `pages:stores.loadMore`
   - Use `forms:buttons.submit` instead of custom button text

5. **Consistent fallbacks**:

   ```tsx
   title={title || t('pages:home.hero.title')}
   ```

6. **Variables in translations**:
   ```tsx
   t("common:footer.copyright", { year: new Date().getFullYear() });
   ```

## Page Update Checklist

When updating a page to use translations:

- [ ] Import `useTranslation` hook
- [ ] Load required namespaces
- [ ] Replace all hardcoded strings with `t()` calls
- [ ] Wrap dynamic arrays/objects in `useMemo([t, i18n.language])`
- [ ] Use shared keys from `common` and `forms` where applicable
- [ ] Test language switching to verify all text updates
- [ ] Check that no console errors appear

## Translation File Locations

```
src/locales/
├── en/
│   ├── common.json
│   ├── pages.json
│   ├── forms.json
│   └── legal.json
└── ar/
    ├── common.json
    ├── pages.json
    ├── forms.json
    └── legal.json
```

## Need to Add New Translations?

1. Add keys to both `en/` and `ar/` versions of the appropriate namespace file
2. Maintain the same structure in both files
3. Use descriptive key names (e.g., `description` not `desc`)
4. Group related keys together
5. Update this guide with the new keys

---

Last Updated: January 2025
