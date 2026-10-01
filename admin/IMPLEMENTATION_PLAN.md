# Admin Panel Development Setup

This document outlines the complete implementation plan for the Alamer Mall Admin Panel.

---

## ✅ Phase 1: Foundation (COMPLETED)

- [x] Project structure created
- [x] TypeScript types defined
- [x] Role-based permissions configured
- [x] Authentication context created
- [x] Protected routes implemented
- [x] Main App routing setup

---

## 📋 Phase 2: Core Components (NEXT)

### 1. Layout Components

- [ ] **DashboardLayout** - Main layout with sidebar and header
- [ ] **Sidebar** - Navigation with role-based menu items
- [ ] **Header** - User menu, notifications, logout
- [ ] **Breadcrumbs** - Page navigation

### 2. Common Components

- [ ] **DataTable** - Reusable table with sorting, filtering, pagination
- [ ] **ConfirmDialog** - Confirmation dialogs for delete actions
- [ ] **ImageUpload** - Drag & drop image upload with preview
- [ ] **RichTextEditor** - Wrapper for React Quill
- [ ] **LoadingSpinner** - Loading states
- [ ] **EmptyState** - Empty data states
- [ ] **Toast** - Success/error notifications

---

## 📋 Phase 3: Authentication Pages

### Login Page

- [ ] Email/password form
- [ ] Form validation
- [ ] Error handling
- [ ] Remember me option
- [ ] Forgot password link (future)

### Unauthorized Page

- [ ] 403 page for insufficient permissions
- [ ] Link back to dashboard

---

## 📋 Phase 4: Dashboard Page

### Dashboard Components

- [ ] **Stats Cards** - Total stores, events, inquiries, etc.
- [ ] **Quick Actions** - Common tasks
- [ ] **Recent Activity** - Latest changes log
- [ ] **Charts** - Inquiries over time, events calendar

---

## 📋 Phase 5: Home Page Management

### Hero Section Editor

- [ ] Title input
- [ ] Subtitle textarea
- [ ] Background image upload with preview
- [ ] CTA buttons (text + link)
- [ ] Live preview (optional)
- [ ] Save/cancel buttons

### Banner Sections Manager

- [ ] List all banners (sortable)
- [ ] Add new banner button
- [ ] Edit banner modal/page:
  - Title input
  - Description textarea
  - Image upload
  - Link input
  - Order number
  - Active toggle
- [ ] Delete banner with confirmation
- [ ] Drag & drop reordering

### Featured Events Settings

- [ ] Radio buttons: "Newest Events" vs "Selected Events"
- [ ] If selected: Checkboxes in events list

### Home Gallery Settings

- [ ] Number of photos to display slider
- [ ] Preview of selected photos

---

## 📋 Phase 6: Stores Management

### Stores List Page

- [ ] Tabs for: Retail | Restaurants | Entertainment | Hypermarket
- [ ] Data table with columns:
  - Image thumbnail
  - Name
  - Category
  - Floor
  - Status (Active/Inactive)
  - Actions (Edit, Delete)
- [ ] Search by name
- [ ] Filter by category, floor
- [ ] Sort by name, date
- [ ] Pagination
- [ ] Add new button
- [ ] Bulk actions (activate, deactivate, delete)

### Store Form Page (Add/Edit)

- [ ] Basic Info section:
  - Name input
  - Category dropdown
  - Floor dropdown
  - Description rich text editor
  - Status toggle
- [ ] Images section:
  - Main image upload
  - Logo upload (optional)
  - Image preview
- [ ] Contact Info section (optional):
  - Phone
  - Email
  - Website
- [ ] Opening Hours section (optional):
  - Days of week with open/close times
  - Closed day toggle
- [ ] Save/cancel buttons
- [ ] Form validation
- [ ] Loading states

---

## 📋 Phase 7: Events Management

### Events List Page

- [ ] Data table with columns:
  - Banner image thumbnail
  - Title
  - Date range
  - Location
  - Featured badge
  - Status
  - Actions
- [ ] Search by title
- [ ] Filter by date, category, featured
- [ ] Sort options
- [ ] Pagination
- [ ] Add new button
- [ ] Quick "Add to Featured" toggle

### Event Form Page (Add/Edit)

- [ ] Basic Info:
  - Title input
  - Short description textarea
  - Long description rich text editor
  - Category dropdown
- [ ] Dates:
  - Start date/time picker
  - End date/time picker
- [ ] Location input
- [ ] Images:
  - Multiple image upload
  - Banner image selection
  - Image gallery with delete
- [ ] Featured checkbox: "Add to Featured Events"
- [ ] Active toggle
- [ ] Save/cancel buttons

---

## 📋 Phase 8: Gallery Management

### Gallery Page

- [ ] Grid view of all images
- [ ] Each image card shows:
  - Thumbnail
  - Title
  - Category
  - "On Home Page" badge
  - Actions (edit, delete)
- [ ] Upload button (multiple files)
- [ ] Filter by category
- [ ] Search by title/alt text
- [ ] Bulk select mode:
  - Select multiple
  - Bulk delete
  - Bulk categorize
  - Bulk "Display on Home Page"
- [ ] Pagination or infinite scroll

### Image Upload Modal

- [ ] Drag & drop zone
- [ ] Multiple file selection
- [ ] For each image:
  - Title input
  - Alt text input
  - Category dropdown
  - "Display on Home Page" checkbox
- [ ] Upload progress bars
- [ ] Preview before upload

### Image Edit Modal

- [ ] Change title
- [ ] Change alt text
- [ ] Change category
- [ ] Toggle "Display on Home Page"
- [ ] Delete button

---

## 📋 Phase 9: Inquiries Management

### Inquiries List Page (by type)

- [ ] Tabs: Contact | Rental | Investment | Jobs
- [ ] Data table with columns:
  - Name
  - Email
  - Date received
  - Status badge (New, Read, Responded)
  - Actions (View, Respond, Archive)
- [ ] Filter by status, date range
- [ ] Search by name/email
- [ ] Sort options
- [ ] Pagination
- [ ] Badge for unread count

### Inquiry Detail Modal/Page

- [ ] Display all inquiry fields
- [ ] Status dropdown (New, Read, Responded, Archived)
- [ ] Internal notes textarea
- [ ] Response section:
  - Response textarea
  - Send response button (emails user)
- [ ] Mark as responded automatically
- [ ] Timestamp history

---

## 📋 Phase 10: Users Management

### Users List Page

- [ ] Data table with columns:
  - Name
  - Email
  - Role badge
  - Status (Active/Inactive)
  - Last login
  - Actions (Edit, Delete)
- [ ] Search by name/email
- [ ] Filter by role, status
- [ ] Add new user button

### User Form Modal/Page (Add/Edit)

- [ ] Name input
- [ ] Email input
- [ ] Role dropdown (with descriptions)
- [ ] Password input (only for new users or password reset)
- [ ] Active toggle
- [ ] Permissions checklist (auto from role, read-only)
- [ ] Save/cancel buttons

---

## 📋 Phase 11: Settings Page

### Settings Sections

- [ ] **Mall Information**:
  - Name
  - Tagline
  - Description
  - Logo upload
- [ ] **Contact Details**:
  - Phone
  - Email
  - Address
- [ ] **Operating Hours**:
  - Days of week with times
  - Special hours notes
- [ ] **Social Media**:
  - Facebook, Instagram, Twitter, YouTube, TikTok links
- [ ] **Footer**:
  - Footer text
  - Copyright text
- [ ] **Emergency Message**:
  - Toggle active
  - Message textarea
  - Type dropdown (Info, Warning, Critical)
- [ ] Save button (saves all sections)

---

## 📋 Phase 12: API Services

### Create service files for:

- [ ] `authService.ts` - Login, logout, refresh token
- [ ] `homePageService.ts` - Get/update hero, banners
- [ ] `storesService.ts` - CRUD for stores
- [ ] `eventsService.ts` - CRUD for events
- [ ] `galleryService.ts` - Upload, delete, update images
- [ ] `inquiriesService.ts` - Get, respond to inquiries
- [ ] `usersService.ts` - CRUD for users
- [ ] `settingsService.ts` - Get/update settings
- [ ] `dashboardService.ts` - Get stats and activity

---

## 📋 Phase 13: Polish & Features

- [ ] Form validation with Zod schemas
- [ ] Error handling and error boundaries
- [ ] Toast notifications for success/error
- [ ] Loading spinners and skeletons
- [ ] Responsive design (mobile-friendly)
- [ ] Dark mode toggle (optional)
- [ ] Activity logging
- [ ] Data export (CSV/Excel)
- [ ] Print views for inquiries
- [ ] Image optimization on upload
- [ ] Keyboard shortcuts
- [ ] Accessibility improvements

---

## 📋 Phase 14: Testing & Deployment

- [ ] Test all CRUD operations
- [ ] Test role permissions
- [ ] Test image uploads
- [ ] Test form validations
- [ ] Build production bundle
- [ ] Deploy to subdomain
- [ ] Set up environment variables
- [ ] Configure CORS with backend
- [ ] Set up monitoring

---

## 🎯 Priority Order

1. **Phase 2**: Layout Components
2. **Phase 3**: Login Page
3. **Phase 4**: Dashboard (basic)
4. **Phase 5**: Home Page Management (your priority)
5. **Phase 6**: Stores Management
6. **Phase 7**: Events Management
7. **Phase 8**: Gallery Management
8. **Phase 9**: Inquiries Management
9. **Phase 10**: Users Management
10. **Phase 11**: Settings
11. **Phase 12-14**: API, Polish, Deploy

---

## ⏱️ Estimated Timeline

- **Phases 2-3**: 2-3 days
- **Phase 4**: 1 day
- **Phase 5**: 2 days (complex with preview)
- **Phases 6-8**: 3-4 days each
- **Phases 9-11**: 2 days each
- **Phases 12-14**: 3-5 days

**Total**: ~3-4 weeks for complete admin panel

---

## 🚀 Next Steps

To continue development, run:

```bash
cd admin
npm install
```

Then start implementing Phase 2 components!
