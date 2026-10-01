# Quick Translation Key Reference

Quick lookup for all translation keys. Copy and paste directly into your code.

## Common Keys (Used Everywhere)

### Buttons & Actions

```typescript
t("common:common.readMore");
t("common:common.viewAll");
t("common:common.learnMore");
t("common:common.contactUs");
t("common:common.showMore");
t("common:common.showLess");
t("common:common.loadMore");
t("common:common.back");
t("common:common.next");
t("common:common.submit");
t("common:common.cancel");
```

### Status Messages

```typescript
t("common:common.loading");
t("common:common.noResults");
```

### Filters

```typescript
t("common:filters.all");
t("common:filters.category");
t("common:filters.floor");
t("common:filters.status");
```

### Floors

```typescript
t("common:floors.basement");
t("common:floors.ground");
t("common:floors.first");
t("common:floors.second");
t("common:floors.mezzanine");
t("common:floors.roof");
```

## Page-Specific Keys

### Home Page

```typescript
// Hero
t("pages:home.hero.title");
t("pages:home.hero.subtitle");
t("pages:home.hero.cta");

// Banners
t("pages:home.banners.smarvy.title");
t("pages:home.banners.smarvy.description");
t("pages:home.banners.smarvy.cta");
t("pages:home.banners.hypermarket.title");
t("pages:home.banners.hypermarket.description");
t("pages:home.banners.hypermarket.cta");

// Sections
t("pages:home.sections.stores");
t("pages:home.sections.storesDesc");
t("pages:home.sections.dining");
t("pages:home.sections.diningDesc");
t("pages:home.sections.entertainment");
t("pages:home.sections.entertainmentDesc");

// Events
t("pages:home.events.title");
t("pages:home.events.subtitle");
t("pages:home.events.viewAll");

// Who We Are
t("pages:home.whoWeAre.title");
t("pages:home.whoWeAre.description");
t("pages:home.whoWeAre.cta");

// Gallery
t("pages:home.gallery.title");
t("pages:home.gallery.viewAll");

// Why Visit
t("pages:home.whyVisit.title");
t("pages:home.whyVisit.subtitle");
t("pages:home.whyVisit.features[0].title");
t("pages:home.whyVisit.features[0].description");

// Business
t("pages:home.business.title");
t("pages:home.business.subtitle");
t("pages:home.business.rental.title");
t("pages:home.business.rental.description");
t("pages:home.business.rental.cta");
t("pages:home.business.investment.title");
t("pages:home.business.investment.description");
t("pages:home.business.investment.cta");

// CTA
t("pages:home.cta.title");
t("pages:home.cta.subtitle");
t("pages:home.cta.button");
```

### Stores Page

```typescript
// Hero
t("pages:stores.hero.title");
t("pages:stores.hero.subtitle");

// Filters
t("pages:stores.filters.searchPlaceholder");
t("pages:stores.filters.allFloors");
t("pages:stores.filters.allCategories");
t("pages:stores.filters.filter");

// Categories
t("pages:stores.categories.fashion");
t("pages:stores.categories.electronics");
t("pages:stores.categories.beauty");
t("pages:stores.categories.sports");
t("pages:stores.categories.homeDecor");
t("pages:stores.categories.jewelry");
t("pages:stores.categories.books");
t("pages:stores.categories.toys");

// Store Card
t("pages:stores.storeCard.floor");
t("pages:stores.storeCard.viewDetails");
t("pages:stores.storeCard.open");
t("pages:stores.storeCard.closed");

// Status
t("pages:stores.noResults");
t("pages:stores.loadMore");
t("pages:stores.showLess");
```

### Restaurants Page

```typescript
// Hero
t("pages:restaurants.hero.title");
t("pages:restaurants.hero.subtitle");

// Filters
t("pages:restaurants.filters.searchPlaceholder");
t("pages:restaurants.filters.allFloors");
t("pages:restaurants.filters.allCuisines");
t("pages:restaurants.filters.filter");

// Cuisines
t("pages:restaurants.cuisines.italian");
t("pages:restaurants.cuisines.chinese");
t("pages:restaurants.cuisines.indian");
t("pages:restaurants.cuisines.arabic");
t("pages:restaurants.cuisines.american");
t("pages:restaurants.cuisines.japanese");
t("pages:restaurants.cuisines.mexican");
t('pages:restaurants.cuisines["fast food"]');
t("pages:restaurants.cuisines.cafe");

// Card
t("pages:restaurants.card.cuisine");
t("pages:restaurants.card.floor");
t("pages:restaurants.card.viewMenu");

// Status
t("pages:restaurants.noResults");
t("pages:restaurants.loadMore");
t("pages:restaurants.showLess");
```

### Entertainment Page

```typescript
// Hero
t("pages:entertainment.hero.title");
t("pages:entertainment.hero.subtitle");
t("pages:entertainment.description");

// Featured
t("pages:entertainment.featured.title");
t("pages:entertainment.featured.subtitle");

// Activities
t("pages:entertainment.activities.gaming");
t("pages:entertainment.activities.cinema");
t("pages:entertainment.activities.kids");
t("pages:entertainment.activities.arcade");
t("pages:entertainment.activities.vr");

t("pages:entertainment.loadMore");
t("pages:entertainment.showLess");
```

### Hypermarket Page

```typescript
// Hero
t("pages:hypermarket.hero.title");
t("pages:hypermarket.hero.subtitle");
t("pages:hypermarket.description");

// Categories
t("pages:hypermarket.categories.title");
t("pages:hypermarket.categories.fresh");
t("pages:hypermarket.categories.dairy");
t("pages:hypermarket.categories.meat");
t("pages:hypermarket.categories.bakery");
t("pages:hypermarket.categories.beverages");
t("pages:hypermarket.categories.household");
t("pages:hypermarket.categories.personal");
t("pages:hypermarket.categories.frozen");

// Features
t("pages:hypermarket.features.title");
t("pages:hypermarket.features.quality");
t("pages:hypermarket.features.qualityDesc");
t("pages:hypermarket.features.prices");
t("pages:hypermarket.features.pricesDesc");
t("pages:hypermarket.features.variety");
t("pages:hypermarket.features.varietyDesc");
t("pages:hypermarket.features.convenience");
t("pages:hypermarket.features.convenienceDesc");
```

### Services Page

```typescript
// Hero
t("pages:services.hero.title");
t("pages:services.hero.subtitle");

// Categories
t("pages:services.categories.customer");
t("pages:services.categories.facilities");
t("pages:services.categories.accessibility");
t("pages:services.categories.safety");

// List
t("pages:services.list.information");
t("pages:services.list.parking");
t("pages:services.list.wifi");
t("pages:services.list.prayer");
t("pages:services.list.nursing");
t("pages:services.list.atm");
t("pages:services.list.currency");
t("pages:services.list.wheelchairs");
t("pages:services.list.strollers");
t("pages:services.list.lockers");
t("pages:services.list.valet");
t("pages:services.list.security");
t("pages:services.list.firstAid");
t("pages:services.list.lostFound");
```

### Customer Service Page

```typescript
// Hero
t("pages:customerService.hero.title");
t("pages:customerService.hero.subtitle");

// Contact
t("pages:customerService.contact.title");
t("pages:customerService.contact.phone");
t("pages:customerService.contact.email");
t("pages:customerService.contact.visit");
t("pages:customerService.contact.social");

// Hours
t("pages:customerService.hours.title");
t("pages:customerService.hours.description");

// FAQ
t("pages:customerService.faq.title");
t("pages:customerService.faq.viewAll");
```

### FAQ Page

```typescript
// Hero
t("pages:faq.hero.title");
t("pages:faq.hero.subtitle");

// Categories
t("pages:faq.categories.general");
t("pages:faq.categories.shopping");
t("pages:faq.categories.parking");
t("pages:faq.categories.services");
t("pages:faq.categories.events");

t("pages:faq.noResults");
t("pages:faq.search");
```

### Events Page

```typescript
// Hero
t("pages:events.hero.title");
t("pages:events.hero.subtitle");

// Filters
t("pages:events.filters.upcoming");
t("pages:events.filters.past");
t("pages:events.filters.all");

// Details
t("pages:events.details.date");
t("pages:events.details.time");
t("pages:events.details.location");
t("pages:events.details.register");

t("pages:events.noEvents");
```

### Maps Page

```typescript
// Hero
t("pages:maps.hero.title");
t("pages:maps.hero.subtitle");

// Facilities
t("pages:maps.facilities.title");
t("pages:maps.facilities.restrooms");
t("pages:maps.facilities.parking");
t("pages:maps.facilities.atm");
t("pages:maps.facilities.information");
t("pages:maps.facilities.prayer");
t("pages:maps.facilities.nursing");
t("pages:maps.facilities.elevator");
t("pages:maps.facilities.stairs");
t("pages:maps.facilities.emergency");
```

### Gallery Page

```typescript
// Hero
t("pages:gallery.hero.title");
t("pages:gallery.hero.subtitle");

// Categories
t("pages:gallery.categories.all");
t("pages:gallery.categories.stores");
t("pages:gallery.categories.events");
t("pages:gallery.categories.facilities");
t("pages:gallery.categories.dining");

t("pages:gallery.noImages");
```

### Contact Page

```typescript
// Hero
t("pages:contact.hero.title");
t("pages:contact.hero.subtitle");

// Form
t("pages:contact.form.title");
t("pages:contact.form.subtitle");

// Info
t("pages:contact.info.title");
t("pages:contact.info.address");
t("pages:contact.info.phone");
t("pages:contact.info.email");
t("pages:contact.info.hours");
t("pages:contact.info.addressValue");
t("pages:contact.info.phoneValue");
t("pages:contact.info.emailValue");
t("pages:contact.info.hoursValue");

// Location
t("pages:contact.location.title");
t("pages:contact.location.directions");
```

### About Page

```typescript
// Hero
t("pages:about.hero.title");
t("pages:about.hero.subtitle");

// Who We Are
t("pages:about.whoWeAre.title");
t("pages:about.whoWeAre.description");
t("pages:about.whoWeAre.mission.title");
t("pages:about.whoWeAre.mission.description");
t("pages:about.whoWeAre.vision.title");
t("pages:about.whoWeAre.vision.description");

// Our Story
t("pages:about.ourStory.title");
t("pages:about.ourStory.year");
t("pages:about.ourStory.milestone");
t("pages:about.ourStory.description");

// Stats
t("pages:about.stats[0].value");
t("pages:about.stats[0].label");
```

### Rental Page

```typescript
// Hero
t("pages:rental.hero.title");
t("pages:rental.hero.subtitle");

// Why
t("pages:rental.why.title");
t("pages:rental.why.location");
t("pages:rental.why.locationDesc");
t("pages:rental.why.footfall");
t("pages:rental.why.footfallDesc");
t("pages:rental.why.facilities");
t("pages:rental.why.facilitiesDesc");
t("pages:rental.why.support");
t("pages:rental.why.supportDesc");

// Spaces
t("pages:rental.spaces.title");
t("pages:rental.spaces.retail");
t("pages:rental.spaces.kiosk");
t("pages:rental.spaces.food");
t("pages:rental.spaces.anchor");

// Inquiry
t("pages:rental.inquiry.title");
t("pages:rental.inquiry.subtitle");
t("pages:rental.inquiry.success");
t("pages:rental.inquiry.error");
```

### Investment Page

```typescript
// Hero
t("pages:investment.hero.title");
t("pages:investment.hero.subtitle");

// Overview
t("pages:investment.overview.title");
t("pages:investment.overview.description");

// Benefits
t("pages:investment.benefits.title");
t("pages:investment.benefits.returns");
t("pages:investment.benefits.returnsDesc");
t("pages:investment.benefits.growth");
t("pages:investment.benefits.growthDesc");
t("pages:investment.benefits.reputation");
t("pages:investment.benefits.reputationDesc");
t("pages:investment.benefits.management");
t("pages:investment.benefits.managementDesc");

// Contact
t("pages:investment.contact.title");
t("pages:investment.contact.subtitle");
```

### Careers Page

```typescript
// Hero
t("pages:careers.hero.title");
t("pages:careers.hero.subtitle");

// Why
t("pages:careers.why.title");
t("pages:careers.why.growth");
t("pages:careers.why.growthDesc");
t("pages:careers.why.environment");
t("pages:careers.why.environmentDesc");
t("pages:careers.why.benefits");
t("pages:careers.why.benefitsDesc");
t("pages:careers.why.training");
t("pages:careers.why.trainingDesc");

// Openings
t("pages:careers.openings.title");
t("pages:careers.openings.department");
t("pages:careers.openings.type");
t("pages:careers.openings.location");
t("pages:careers.openings.apply");
t("pages:careers.openings.fullTime");
t("pages:careers.openings.partTime");
t("pages:careers.openings.contract");
t("pages:careers.openings.noOpenings");

// Application
t("pages:careers.application.title");
t("pages:careers.application.success");
t("pages:careers.application.error");
```

### Privacy Policy Page

```typescript
t("pages:privacyPolicy.hero.title");
t("pages:privacyPolicy.hero.subtitle");
t("pages:privacyPolicy.lastUpdated");
```

### Terms of Service Page

```typescript
t("pages:termsOfService.hero.title");
t("pages:termsOfService.hero.subtitle");
t("pages:termsOfService.lastUpdated");
```

## Form Keys

### Labels

```typescript
t("forms:labels.name");
t("forms:labels.email");
t("forms:labels.phone");
t("forms:labels.subject");
t("forms:labels.message");
t("forms:labels.company");
t("forms:labels.position");
t("forms:labels.cv");
t("forms:labels.coverLetter");
```

### Placeholders

```typescript
t("forms:placeholders.name");
t("forms:placeholders.email");
t("forms:placeholders.phone");
t("forms:placeholders.subject");
t("forms:placeholders.message");
t("forms:placeholders.company");
t("forms:placeholders.search");
```

### Buttons

```typescript
t("forms:buttons.submit");
t("forms:buttons.send");
t("forms:buttons.apply");
t("forms:buttons.upload");
t("forms:buttons.clear");
t("forms:buttons.cancel");
```

### Validation

```typescript
t("forms:validation.required");
t("forms:validation.email");
t("forms:validation.phone");
t("forms:validation.minLength", { count: 3 });
t("forms:validation.maxLength", { count: 100 });
t("forms:validation.fileSize", { size: 5 });
t("forms:validation.fileType", { types: "PDF, DOC" });
```

### Messages

```typescript
t("forms:messages.success");
t("forms:messages.error");
t("forms:messages.loading");
```

## Navigation Keys

```typescript
t("common:nav.home");
t("common:nav.about");
t("common:nav.sections");
t("common:nav.events");
t("common:nav.stores");
t("common:nav.dining");
t("common:nav.entertainment");
t("common:nav.hypermarket");
t("common:nav.map");
t("common:nav.maps");
t("common:nav.gallery");
t("common:nav.business");
t("common:nav.services");
t("common:nav.rentalOpportunities");
t("common:nav.investmentOpportunities");
t("common:nav.careers");
t("common:nav.customerService");
t("common:nav.faq");
t("common:nav.contact");
```

## Footer Keys

```typescript
t("common:footer.location");
t("common:footer.quickAccess");
t("common:footer.support");
t("common:footer.followUs");
t("common:footer.copyright", { year: 2025 });
t("common:footer.privacyPolicy");
t("common:footer.termsOfService");
t("common:footer.contactInfo");
t("common:footer.workingHours");
```

---

**Tip**: Use your IDE's search to quickly find the key you need. Press `Ctrl+F` and search for the text you want to translate.
