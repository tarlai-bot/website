# Investment Opportunities Page - Setup Guide

## 📦 What's Included

A complete, professional Investment Opportunities page based on your requirements and modern best practices.

## ✨ Features Implemented

### 1. Hero Section

- Eye-catching gradient background
- Clear value proposition
- Two CTA buttons:
  - "Request Information" button
  - "Download Investor Package" button with checkbox in form

### 2. Performance Metrics Dashboard

- **2.5M+ Annual Visitors** (+15% YoY)
- **95% Occupancy Rate** (Industry Leading)
- **SAR 450M+ Annual Revenue** (+22% YoY)
- **18% Average ROI** (5-Year Average)
- Animated cards with gradient icons
- Hover effects

### 3. "Why Invest?" Section

Six compelling reasons with icons:

- Prime Location
- Proven Track Record
- Strong Demographics
- Mixed-Use Development
- Professional Management
- Growth Potential

### 4. Current Investment Opportunities

Four detailed opportunity cards:

- **Expansion Project** (SAR 50M-200M, 16-20% IRR, 7-10 years)
- **Anchor Tenant Partnership** (SAR 10M-50M, 12-15% Returns, 5-7 years)
- **Smart Mall Technology** (SAR 5M-25M, 15-18% ROI, 3-5 years)
- **Entertainment Complex** (SAR 30M-100M, 14-17% IRR, 6-8 years)

Each card shows:

- Type of investment
- Description
- Investment amount range
- Expected returns
- Investment term
- "Request Details" button

### 5. Success Stories

Three case studies showing:

- Partner name
- Investment amount
- Actual ROI achieved
- Year of partnership
- Success description

Examples:

- Luxury Retail Group: 19% Annual ROI
- F&B International: 22% Annual ROI
- Tech Innovations LLC: 28% Annual ROI

### 6. Contact Form Modal

Professional inquiry form with:

- Full Name (required)
- Email (required)
- Phone (required)
- Company/Organization
- Investment Interest dropdown (required)
- Investment Amount Range
- Message textarea
- Checkbox to request investor information package (PDF)
- Submit button with loading state
- Success confirmation screen

### 7. Final CTA Section

- Gradient background
- "Schedule a Meeting" button
- Direct phone call button

## 📁 File Structure

```
src/pages/Investment/
├── Investment.tsx        ← Main component
└── index.ts             ← Export file
```

## 🚀 Installation Steps

### 1. Create Investment Folder

```bash
mkdir src/pages/Investment
```

### 2. Add Files

- Copy `Investment.tsx` to `src/pages/Investment/Investment.tsx`
- Copy `InvestmentIndex.ts` to `src/pages/Investment/index.ts`

### 3. Verify Router Configuration

The router should already have this route (from earlier update):

```typescript
const Investment = lazy(() => import("../pages/Investment/Investment"));

{
  path: "investment",
  element: (
    <LazyWrapper>
      <Investment />
    </LazyWrapper>
  ),
}
```

## 🎨 Customization

### Update Performance Metrics

Edit the `metrics` array in `Investment.tsx`:

```typescript
const metrics = [
  {
    icon: <Users className="w-8 h-8" />,
    value: "2.5M+", // ← Change this
    label: "Annual Visitors", // ← Change this
    growth: "+15% YoY", // ← Change this
    color: "from-blue-500 to-cyan-500",
  },
  // ... more metrics
];
```

### Update Investment Opportunities

Edit the `opportunities` array:

```typescript
const opportunities: InvestmentOpportunity[] = [
  {
    id: "expansion",
    title: "Expansion Project", // ← Change
    type: "Development", // ← Change
    description: "...", // ← Change
    investment: "SAR 50M - 200M", // ← Change
    returns: "Expected 16-20% IRR", // ← Change
    term: "7-10 years", // ← Change
    icon: <Building2 className="w-12 h-12" />,
  },
  // ... add more opportunities
];
```

### Update Success Stories

Edit the `successStories` array:

```typescript
const successStories = [
  {
    partner: "Luxury Retail Group", // ← Change
    investment: "SAR 45M", // ← Change
    returns: "19% Annual ROI", // ← Change
    year: "2020", // ← Change
    description: "...", // ← Change
  },
  // ... add more stories
];
```

### Update Contact Information

1. **Phone number**: Search for `+966 12 345 6789` and replace
2. **Email recipient**: Set up email service (see below)

## 📧 Email Integration

### Backend Setup Required

The form currently logs to console. You need to implement email sending:

#### Option 1: Use Rental Email Service

Adapt the email service from the Rental page (`src/services/emailService.ts`):

```typescript
import { sendInvestmentInquiry } from "../../services/emailService";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await sendInvestmentInquiry({
      ...formData,
      requestPackage,
    });

    setSubmitSuccess(true);
  } catch (error) {
    alert("Error submitting inquiry");
  } finally {
    setIsSubmitting(false);
  }
};
```

#### Option 2: Direct API Call

```typescript
const response = await fetch("/api/send-investment-inquiry", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ...formData,
    requestPackage,
    to: "investments@alamermall.com",
  }),
});
```

## 🎯 Design Highlights

### Professional & Corporate Feel

- Dark gradient hero (indigo/purple)
- Clean white sections
- Professional metrics dashboard
- Trust-building success stories

### Modern UI Elements

- Gradient cards with hover effects
- Animated metric cards (hover to scale)
- Modal form (not separate page)
- Loading states and success screens
- Responsive grid layouts

### User Experience

- Clear value proposition
- Easy-to-scan metrics
- Quick inquiry process
- Mobile-friendly design
- Accessible form inputs

## 📱 Responsive Design

### Desktop (1024px+)

- 4-column metrics grid
- 2-column opportunities grid
- 3-column benefits grid

### Tablet (768-1024px)

- 2-column metrics grid
- 2-column benefits grid
- 1-column opportunities (stacked)

### Mobile (<768px)

- Single column layouts
- Stacked buttons
- Full-width cards
- Optimized spacing

## ✅ Testing Checklist

- [ ] Page loads without errors
- [ ] Hero CTAs open form modal
- [ ] All metrics display correctly
- [ ] Opportunity cards show all info
- [ ] "Request Details" pre-fills form
- [ ] Form validation works
- [ ] Required fields are enforced
- [ ] Success screen shows after submit
- [ ] "Download Package" checkbox works
- [ ] Modal closes properly
- [ ] Phone link works on mobile
- [ ] Responsive on all devices
- [ ] All hover effects work
- [ ] Success stories are readable

## 🔄 Future Enhancements

Consider adding:

1. **PDF Generation**: Auto-generate investor package
2. **Calendar Integration**: Schedule meetings directly
3. **Video Tours**: Add property video tours
4. **Financial Calculator**: ROI calculator tool
5. **Document Upload**: Allow users to upload their info
6. **Multi-language**: Add Arabic translation
7. **Analytics Tracking**: Track which opportunities get most interest

## 📊 Content Updates

### Regular Updates Needed:

- **Quarterly**: Update performance metrics
- **As needed**: Add/remove investment opportunities
- **Annually**: Update success stories
- **Ongoing**: Keep contact information current

### Admin Panel Integration:

Consider adding admin functionality to:

- Update metrics via CMS
- Add/edit opportunities
- Manage inquiries
- Track conversion rates

## 🎨 Color Scheme

Primary colors used:

- **Indigo**: `#4f46e5` (indigo-600)
- **Purple**: `#9333ea` (purple-600)
- **Green** (success): `#10b981` (green-500)
- **Gray** (text): `#111827` (gray-900)

## 📞 Support & Contact

Update these placeholders:

- Phone: `+966 12 345 6789` → Your actual number
- Email: `investments@alamermall.com` → Your actual email
- Investment amounts: Adjust to your actual ranges
- ROI percentages: Use your actual historical data

---

**Ready to launch!** Just customize the data with your actual investment details and set up the email backend. 🚀
