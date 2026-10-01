# Translation Implementation Status

## ✅ Completed

### Locale Files

- ✅ **en/pages.json** - All 19 page sections with comprehensive translations
- ✅ **ar/pages.json** - All 19 page sections with Arabic translations
- ✅ **en/common.json** - Navigation, footer, filters, categories, days
- ✅ **ar/common.json** - Arabic versions of common elements
- ✅ **en/forms.json** - Form labels, placeholders, validation, messages
- ✅ **ar/forms.json** - Arabic form translations
- ✅ **Translation Guide** - Comprehensive documentation in docs/TRANSLATION_GUIDE.md

### Pages with Translations Ready

- ✅ **Home** (`src/pages/Home/Home.tsx`) - Already fully implemented with t() calls

## 📋 Needs Implementation

The following pages have translation keys ready in pages.json but need component updates:

### High Priority (User-Facing)

1. **Stores** (`src/pages/Stores/Stores.tsx`)

   - Keys: `pages:stores.*`
   - Shared: `common:floors`, `common:categories`, `common:filters`

2. **Restaurants** (`src/pages/Restaurants/Restaurants.tsx`)

   - Keys: `pages:restaurants.*`
   - Shared: `common:floors`, `common:filters`

3. **Events** (`src/pages/Events/Events.tsx`)

   - Keys: `pages:events.*`
   - Note: Shares some keys with home.events

4. **MallMaps** (`src/pages/MallMaps/MallMaps.tsx`)

   - Keys: `pages:maps.*`

5. **PhotoGallery** (`src/pages/PhotoGallery/PhotoGallery.tsx`)

   - Keys: `pages:gallery.*`

6. **ContactUs** (`src/pages/ContactUs/ContactUs.tsx`)
   - Keys: `pages:contact.*`
   - Shared: `forms:*`

### Medium Priority (Information)

7. **About** (`src/pages/About/About.tsx`)

   - Keys: `pages:about.*`

8. **Entertainment** (`src/pages/Entertainment/Entertainment.tsx`)

   - Keys: `pages:entertainment.*`

9. **Hypermarket** (`src/pages/Hypermarket/Hypermarket.tsx`)

   - Keys: `pages:hypermarket.*`

10. **Services** (`src/pages/Services/Services.tsx`)

    - Keys: `pages:services.*`

11. **CustomerService** (`src/pages/CustomerService/CustomerService.tsx`)

    - Keys: `pages:customerService.*`

12. **FAQ** (`src/pages/FAQ/FAQ.tsx`)
    - Keys: `pages:faq.*`

### Business Pages

13. **Rental** (`src/pages/Rental/Rental.tsx`)

    - Keys: `pages:rental.*`
    - Shared: `forms:*`

14. **Investment** (`src/pages/Investment/Investment.tsx`)

    - Keys: `pages:investment.*`

15. **Careers** (`src/pages/Careers/Careers.tsx`)
    - Keys: `pages:careers.*`
    - Shared: `forms:*`

### Legal Pages

16. **PrivacyPolicy** (`src/pages/PrivacyPolicy/PrivacyPolicy.tsx`)

    - Keys: `pages:privacyPolicy.*`

17. **TermsOfService** (`src/pages/TermsOfService/TermsOfService.tsx`)
    - Keys: `pages:termsOfService.*`

## Implementation Pattern

Each page needs these updates:

```tsx
// 1. Import useTranslation
import { useTranslation } from "react-i18next";

function PageComponent() {
  // 2. Get translation function and language
  const { t, i18n } = useTranslation(["pages", "common", "forms"]);

  // 3. Replace hardcoded text with t() calls
  return (
    <div>
      <h1>{t("pages:pageName.hero.title")}</h1>
      <p>{t("pages:pageName.hero.subtitle")}</p>
    </div>
  );

  // 4. For dynamic arrays, use useMemo
  const items = useMemo(
    () => [{ title: t("pages:pageName.item1") }],
    [t, i18n.language]
  );
}
```

## Translation Keys by Page

### pages:home

```
✅ hero: { title, subtitle, cta }
✅ banners: { smarvy, hypermarket }
✅ sections: { stores, storesDesc, dining, ... }
✅ events: { title, subtitle, viewAll }
✅ whoWeAre: { title, description, cta }
✅ gallery: { title, viewAll }
✅ whyVisit: { features[] }
✅ business: { rental, investment }
✅ cta: { title, subtitle, button }
```

### pages:stores

```
📋 hero: { title, subtitle }
📋 filters: { searchPlaceholder, allFloors, allCategories }
📋 categories: { fashion, electronics, beauty, ... }
📋 storeCard: { floor, viewDetails, open, closed }
📋 noResults, loadMore, showLess
```

### pages:restaurants

```
📋 hero: { title, subtitle }
📋 filters: { searchPlaceholder, allFloors, allCuisines }
📋 cuisines: { italian, chinese, indian, ... }
📋 card: { cuisine, floor, viewMenu }
📋 noResults, loadMore, showLess
```

### pages:entertainment

```
📋 hero: { title, subtitle }
📋 description
📋 featured: { title, subtitle }
📋 activities: { gaming, cinema, kids, arcade, vr }
```

### pages:hypermarket

```
📋 hero: { title, subtitle }
📋 description
📋 categories: { fresh, dairy, meat, ... }
📋 features: { quality, prices, variety, convenience }
```

### pages:rental

```
📋 hero: { title, subtitle }
📋 why: { location, footfall, facilities, support }
📋 spaces: { retail, kiosk, food, anchor }
📋 inquiry: { title, subtitle, success, error }
```

### pages:investment

```
📋 hero: { title, subtitle }
📋 overview: { title, description }
📋 benefits: { returns, growth, reputation, management }
📋 contact: { title, subtitle }
```

### pages:careers

```
📋 hero: { title, subtitle }
📋 why: { growth, environment, benefits, training }
📋 openings: { title, department, type, location, ... }
📋 application: { title, success, error }
```

### pages:services

```
📋 hero: { title, subtitle }
📋 categories: { customer, facilities, accessibility, safety }
📋 list: { information, parking, wifi, prayer, ... }
```

### pages:customerService

```
📋 hero: { title, subtitle }
📋 contact: { title, phone, email, visit, social }
📋 hours: { title, description }
📋 faq: { title, viewAll }
```

### pages:faq

```
📋 hero: { title, subtitle }
📋 categories: { general, shopping, parking, services, events }
📋 noResults, search
```

### pages:about

```
📋 hero: { title, subtitle }
📋 whoWeAre: { title, description, mission, vision }
📋 ourStory: { title, year, milestone, description }
📋 stats: [{ value, label }]
```

### pages:events

```
📋 hero: { title, subtitle }
📋 filters: { upcoming, past, all }
📋 details: { date, time, location, register }
📋 noEvents
```

### pages:maps

```
📋 hero: { title, subtitle }
📋 facilities: { restrooms, parking, atm, ... }
```

### pages:gallery

```
📋 hero: { title, subtitle }
📋 categories: { all, stores, events, facilities, dining }
📋 noImages
```

### pages:contact

```
📋 hero: { title, subtitle }
📋 form: { title, subtitle }
📋 info: { address, phone, email, hours, ... }
📋 location: { title, directions }
```

### pages:privacyPolicy

```
📋 hero: { title, subtitle }
📋 lastUpdated
```

### pages:termsOfService

```
📋 hero: { title, subtitle }
📋 lastUpdated
```

## Shared Translation Keys

These keys are used across multiple pages:

### common:nav

Used in: Header/Navigation component

```
home, about, sections, events, stores, dining, entertainment,
hypermarket, map, maps, gallery, business, services,
rentalOpportunities, investmentOpportunities, careers,
customerService, faq, contact
```

### common:footer

Used in: Footer component

```
location, quickAccess, support, followUs, copyright,
privacyPolicy, termsOfService, contactInfo, workingHours
```

### common:common

Used in: All pages (buttons, actions, messages)

```
menu, close, readMore, viewAll, learnMore, contactUs,
loading, noResults, search, filter, clear, apply,
cancel, submit, save, edit, delete, back, next, previous,
showMore, showLess
```

### common:floors

Used in: Stores, Restaurants, Maps

```
basement, ground, first, second, mezzanine, roof
```

### common:categories

Used in: Stores, Gallery, Filters

```
all, fashion, food, entertainment, hypermarket,
electronics, health, services, kids
```

### forms:\*

Used in: Contact, Rental, Investment, Careers

```
labels: { name, email, phone, subject, message, ... }
placeholders: { name, email, phone, ... }
buttons: { submit, send, apply, upload, ... }
validation: { required, email, phone, ... }
messages: { success, error, loading }
```

## Next Steps

1. **Start with high-priority pages**: Stores, Restaurants, Events
2. **Follow the implementation pattern** from Home.tsx
3. **Test each page** after updating:
   - Toggle language to verify all text changes
   - Check console for missing translation warnings
   - Verify dynamic content re-renders
4. **Update this document** as pages are completed

## Notes

- All translation keys are available in both English and Arabic
- Common keys reduce duplication across pages
- Dynamic arrays must use `useMemo([t, i18n.language])`
- RouterProvider already has `key={i18n.language}` for forced re-renders
- i18n config includes debug mode for troubleshooting

---

Last Updated: January 2025
