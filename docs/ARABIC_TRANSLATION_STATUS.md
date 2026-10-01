# Arabic Translation Status Report

## Completed ✅

### 1. Customer Service Page

- ✅ All section titles (Our Services, Get In Touch)
- ✅ All section descriptions
- ✅ Contact information labels (Phone, Email, Location, Working Hours)
- ✅ FAQ section text
- ✅ Location text includes Arabic for "Saudi Arabia"

### 2. Contact Us Page

- ✅ All contact card titles (Visit Us, Call Us, Email Us)
- ✅ Working hours using translation keys
- ✅ "We reply within 24 hours" translated
- ✅ Department titles (General Inquiries, Leasing & Rentals)
- ✅ Department descriptions translated
- ✅ "Saudi Arabia" translated

### 3. Photo Gallery Page

- ✅ All category names (Parking, Hypermarket, Water Fountain, Smarvy, etc.)
- ✅ Fully bilingual navigation menu

### 4. Services Page

- ✅ Prayer room changed from "غرف الصلاة" to "مصلى"
- ✅ All service descriptions use translation keys

### 5. Common Translations Added

- ✅ Phone, Email, Location
- ✅ Visit Us, Call Us, Email Us
- ✅ Get In Touch, Our Services
- ✅ Looking for Quick Answers, Check our FAQ, Visit FAQ
- ✅ Comprehensive services description
- ✅ Multiple ways to reach us
- ✅ Saudi Arabia
- ✅ We reply within 24 hours
- ✅ General Inquiries, Leasing & Rentals
- ✅ Filter-related: All Floors, All Categories, Clear Floor, Filter by Floor
- ✅ Size options: Small, Medium, Large
- ✅ Category types: Retail, Food & Beverage, Kiosk, Office, Entertainment

---

## Needs Translation Work ⚠️

### HIGH PRIORITY (User-Facing Pages)

#### 1. **Entertainment Page** (~15 instances)

**Needs Translation:**

- Location label, Category label, Floor label
- "View Details" button
- "Filter by Floor", "Showing X venues/venue"
- "Stack View", "Grid View" buttons
- All floor options in filters

**File:** `src/pages/Entertainment/Entertainment.tsx`

---

#### 2. **Rental Page** (~40 instances)

**Needs Translation - Rental Spaces Data:**
Each of 6 rental spaces needs translations for:

- Space names (e.g., "Premium Retail Space A1", "Fashion Boutique Space")
- Floor locations ("Ground Floor", "First Floor", "Second Floor")
- "Contact for pricing" text
- Features arrays (e.g., "High foot traffic", "Modern design")
- Location descriptions

**Filter Labels:**

- "Floor", "Category", "Size" labels
- All floor options
- All category options
- All size options
- "Request Information" button text
- Alert message: "Please select at least one space..."

**File:** `src/pages/Rental/Rental.tsx`

---

#### 3. **Investment Page** (~50 instances)

**Needs Translation - Performance Metrics:**

- "60+ Years", "Operating Excellence", "Since 1963"
- "4 Divisions", "Business Segments", "Retail, F&B, Mall, Bakery"
- "50+ Retail Locations", "Across Al-Ahsa"
- "1M+ Annual Customers", "Growing Steadily"

**Investment Opportunities (4 opportunities):**
Each needs:

- Title
- Type
- Full description (2-3 sentences)
- Investment amount
- Returns percentage
- Investment term

**Success Stories (3 stories):**
Each needs:

- Partner name
- Investment amount
- ROI percentage
- Year
- Full description

**Success Modal:**

- "Inquiry Received!" heading
- Success message text
- Confirmation text

**File:** `src/pages/Investment/Investment.tsx`

---

#### 4. **Careers Page** (~60 instances)

**Needs Translation - Job Listings (6 jobs):**
Each job needs:

- Job title
- Department
- Location text
- Employment type ("Full-time")
- Full job description
- All requirements (5-7 per job)
- All responsibilities (5-7 per job)

**Form Validation Messages:**

- Name validation errors
- Email validation errors
- Phone validation errors
- Resume validation errors
- File size/type restrictions

**File:** `src/pages/Careers/Careers.tsx`

---

#### 5. **Mall Maps Page** (~20 instances)

**Needs Translation:**

- "Coming Soon" badge
- "Interactive floor maps are on the way!" message
- "Explore Our Mall" button text
- "Have questions?", "Contact us" text
- Floor names: "Roof", "2nd Floor", "1st Floor", "Ground Floor", "Basement"
- Sample store data (names, categories, zones)
- Category names: "Shopping", "Dining", "Parking", "Services"
- "Navigate through Alamer Mall with interactive floor maps" subtitle
- "Search stores..." placeholder
- "Select Floor" heading
- "Floor Plan Image Coming Soon" placeholder

**File:** `src/pages/MallMaps/MallMaps.tsx`

---

### MEDIUM PRIORITY

#### 6. **Events Page** (~2 instances)

- "Link copied to clipboard!" notification
- "Failed to copy link" notification

**File:** `src/pages/Events/Events.tsx`

---

#### 7. **Stores Page** (~1 instance)

- "Alamer Hypermarket" string check (conditional logic)

**File:** `src/pages/Stores/Stores.tsx`

---

## Translation Keys Structure Needed

### For Rental Page

```json
"rental": {
  "spaces": {
    "premiumA1": {
      "name": "Premium Retail Space A1",
      "floor": "Ground Floor",
      "price": "Contact for pricing",
      "features": ["High foot traffic", "Prime location", "Large display windows"],
      "location": "Main entrance area"
    },
    ...
  },
  "filters": {
    "requestInfo": "Request Information",
    "selectSpaceAlert": "Please select at least one space to request information."
  }
}
```

### For Investment Page

```json
"investment": {
  "metrics": {
    "experience": { "value": "60+ Years", "label": "Operating Excellence", "growth": "Since 1963" },
    ...
  },
  "opportunities": {
    "mallExpansion": {
      "title": "Mall Phase 2 Expansion",
      "type": "Real Estate Development",
      "description": "...",
      ...
    }
  },
  "successStories": {...},
  "modal": {...}
}
```

### For Careers Page

```json
"careers": {
  "jobs": {
    "retailManager": {
      "title": "Retail Store Manager",
      "department": "Retail Operations",
      "location": "Alamer Mall, Almubaraz, AlAhsa",
      "type": "Full-time",
      "description": "...",
      "requirements": [...],
      "responsibilities": [...]
    },
    ...
  }
}
```

### For Mall Maps Page

```json
"maps": {
  "comingSoon": {
    "badge": "Coming Soon",
    "message": "Interactive floor maps are on the way!",
    "button": "Explore Our Mall",
    "help": "Have questions?",
    "contact": "Contact us"
  },
  "floors": {
    "roof": "Roof",
    "second": "2nd Floor",
    ...
  }
}
```

### For Entertainment Page

```json
"entertainment": {
  "location": "Location",
  "category": "Category",
  "floor": "Floor:",
  "viewDetails": "View Details",
  "showing": "Showing",
  "venue": "venue",
  "venues": "venues",
  "stackView": "Stack View",
  "gridView": "Grid View"
}
```

---

## Recommendations

### Immediate Actions:

1. **Entertainment Page** - Quick wins (only ~15 instances)
2. **Events Page** - Very simple (2 notifications)
3. **Stores Page** - Minimal (1 check)

### Large Scale Work (Consider Batching):

1. **Rental Page** - Create structured data files for rental spaces
2. **Investment Page** - Create structured data files for opportunities
3. **Careers Page** - Create structured data files for job listings
4. **Mall Maps Page** - Wait until actual map data is ready

### Best Practice:

For pages with large data sets (Rental, Investment, Careers), consider:

- Moving data to separate JSON files in `/src/data/`
- Creating bilingual data structures
- Using consistent patterns for translation keys

---

## Summary

- **Total Hardcoded Instances Found:** 200+
- **Completed:** ~50 instances (25%)
- **Remaining:** ~150 instances (75%)
- **High Priority Pages:** 5 pages (Entertainment, Rental, Investment, Careers, Mall Maps)
- **Estimated Work:** 4-6 hours for complete translation coverage

---

## Next Steps

1. Run the website and verify all completed translations display correctly in Arabic
2. Decide priority: Quick wins (Entertainment, Events) or major pages (Rental, Investment, Careers)
3. For major pages, consider whether to:
   - Add translation keys inline
   - Move data to separate bilingual data files
   - Create a hybrid approach

4. Test thoroughly in both languages after each page completion
