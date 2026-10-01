# Rental Opportunities Pages - Setup Guide

## 📁 File Structure

```
src/
  pages/
    Rental/
      ├── Rental.tsx           # Main rental listings page
      ├── RentalInquiry.tsx    # Inquiry form page
      └── index.ts             # Exports
  services/
    └── emailService.ts        # Email sending utility
```

## 🚀 Features Implemented

### Main Rental Page (`Rental.tsx`)

✅ Hero section with value propositions
✅ Filter system (Floor, Category, Size)
✅ Responsive grid layout for rental spaces
✅ Multi-selection capability (click cards to select)
✅ Visual feedback for selected spaces
✅ "Request Information" button
✅ Status badges (Available, Coming Soon)
✅ Detailed space information (size, floor, location, features, pricing)
✅ No results state
✅ Mobile responsive design

### Inquiry Form Page (`RentalInquiry.tsx`)

✅ Contact information form
✅ Business details collection
✅ Selected spaces summary
✅ Form validation
✅ Loading state during submission
✅ Success confirmation screen
✅ Email to rental management
✅ Confirmation email to user
✅ Process timeline sidebar
✅ Contact information for immediate assistance
✅ Mobile responsive design

### Email Service (`emailService.ts`)

✅ Professional HTML email templates
✅ Plain text email fallback
✅ Confirmation email to user
✅ Formatted inquiry details
✅ Template ready for backend integration

## 📋 Setup Instructions

### 1. Add to Your Routes

In your `App.tsx` or route configuration file:

```tsx
import { Rental, RentalInquiry } from './pages/Rental';

// Add these routes
<Route path="/rental" element={<Rental />} />
<Route path="/rental/inquiry" element={<RentalInquiry />} />
```

### 2. Update Navigation

Add the rental link to your navigation menu (if not already present):

```tsx
<Link to="/rental">Rental Opportunities</Link>
```

### 3. Backend API Setup

You need to create a backend endpoint to handle email sending. Here are your options:

#### Option A: Node.js with Nodemailer

```javascript
// backend/routes/rental.js
const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // or your email provider
  port: 587,
  secure: false,
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password",
  },
});

app.post("/api/send-rental-inquiry", async (req, res) => {
  const { to, subject, htmlContent, textContent, replyTo } = req.body;

  try {
    await transporter.sendMail({
      from: "noreply@alamermall.com",
      to: to,
      replyTo: replyTo,
      subject: subject,
      text: textContent,
      html: htmlContent,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});
```

#### Option B: SendGrid API

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/api/send-rental-inquiry", async (req, res) => {
  const { to, subject, htmlContent, replyTo } = req.body;

  const msg = {
    to: to,
    from: "noreply@alamermall.com",
    replyTo: replyTo,
    subject: subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});
```

#### Option C: AWS SES

```javascript
const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "us-east-1" });

app.post("/api/send-rental-inquiry", async (req, res) => {
  const { to, subject, htmlContent, replyTo } = req.body;

  const params = {
    Source: "noreply@alamermall.com",
    Destination: { ToAddresses: [to] },
    ReplyToAddresses: [replyTo],
    Message: {
      Subject: { Data: subject },
      Body: { Html: { Data: htmlContent } },
    },
  };

  try {
    await ses.sendEmail(params).promise();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});
```

### 4. Update Email Service

In `emailService.ts`, update the API endpoint URLs to match your backend:

```typescript
// Change this line:
const response = await fetch('/api/send-rental-inquiry', {

// To your actual API endpoint:
const response = await fetch('https://your-backend.com/api/send-rental-inquiry', {
```

### 5. Configure Email Settings

Update these values in the code:

- **Rental Management Email**: Change `rentals@alamermall.com` to your actual email
- **Phone Number**: Update `+966 12 345 6789` to your rental team's phone
- **Business Hours**: Adjust the hours in the confirmation email template

## 🎨 Customization

### Update Rental Spaces Data

In `Rental.tsx`, modify the `rentalSpaces` array:

```typescript
const rentalSpaces: RentalSpace[] = [
  {
    id: "r1",
    name: "Your Space Name",
    floor: "Ground Floor",
    size: 150, // in sqm
    category: "retail", // or "food", "kiosk", "office", "event"
    price: "Contact for pricing", // or actual price
    status: "available", // or "coming-soon"
    image: "/path/to/image.jpg",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    location: "Location description",
  },
  // Add more spaces...
];
```

### Update Filter Options

Modify the filter dropdowns in `Rental.tsx`:

```typescript
// Floors
<option value="Ground Floor">Ground Floor</option>
<option value="First Floor">First Floor</option>
// Add more floors...

// Categories
<option value="retail">Retail</option>
<option value="food">Food & Beverage</option>
// Add more categories...
```

### Update Business Types

In `RentalInquiry.tsx`, modify business type options:

```typescript
<option value="fashion">Fashion & Apparel</option>
<option value="electronics">Electronics</option>
// Add more business types...
```

## 📱 Responsive Design

All pages are fully responsive:

- **Desktop**: 3-column grid with sidebar filters
- **Tablet**: 2-column grid with adjusted spacing
- **Mobile**: Single column with horizontal scrolling filters

## 🔒 Security Considerations

1. **Input Validation**: All form fields are validated on the frontend
2. **Backend Validation**: Implement server-side validation in your API
3. **Rate Limiting**: Add rate limiting to prevent spam submissions
4. **Email Sanitization**: Sanitize user inputs before sending emails
5. **CAPTCHA**: Consider adding reCAPTCHA for spam prevention

## 🧪 Testing Checklist

- [ ] Can view all rental spaces
- [ ] Filters work correctly (Floor, Category, Size)
- [ ] Can select/deselect spaces by clicking
- [ ] Selected count updates correctly
- [ ] "Request Information" requires at least one selection
- [ ] Navigation to inquiry form works with state
- [ ] Form validation prevents empty required fields
- [ ] Email format validation works
- [ ] Phone number accepts international format
- [ ] Form submission shows loading state
- [ ] Success message displays after submission
- [ ] Emails are sent to rental management
- [ ] Confirmation email sent to user
- [ ] Mobile responsive on all screen sizes
- [ ] Back button works correctly

## 📧 Email Templates

The email service includes two professionally designed templates:

1. **Rental Inquiry Email** (to management)

   - Contact information table
   - Selected spaces list
   - Additional message
   - Timestamp with timezone

2. **Confirmation Email** (to user)
   - Thank you message
   - Process timeline
   - Contact information
   - Next steps

## 🔄 Integration with Admin Panel

For future admin functionality, you'll need:

1. **Database schema** for rental spaces
2. **Admin dashboard** to add/edit/remove spaces
3. **Inquiry management system** to track and respond to inquiries
4. **Status tracking** (New, Contacted, In Progress, Closed)
5. **Image upload** functionality for space photos
6. **Floor plan upload** capability

## 📞 Support

If you need help:

- Update the phone number in the inquiry form: `+966 12 345 6789`
- Update the email: `rentals@alamermall.com`
- Adjust business hours in confirmation email template

## 🎯 Next Steps

1. Set up your backend email API
2. Update rental spaces with real data
3. Add actual images for spaces
4. Configure email settings
5. Test the complete flow
6. Consider adding PDF brochure download feature
7. Add virtual tour links if available

---

**Ready to use!** Just set up your backend email API and update the data with your actual rental spaces.
