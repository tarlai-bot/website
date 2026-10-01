# Alamer Mall - Admin Panel

Content Management System for Alamer Mall website.

## 🚀 Quick Start

### Install Dependencies

```bash
cd admin
npm install
```

### Run Development Server

```bash
npm run dev
```

The admin panel will be available at: `http://localhost:5174`

### Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout/       # Dashboard layout, sidebar, header
│   │   └── ProtectedRoute.tsx
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── HomePage/     # Home page content management
│   │   ├── Stores/       # Stores/Restaurants/Entertainment management
│   │   ├── Events/       # Events management
│   │   ├── Gallery/      # Gallery management
│   │   ├── Inquiries/    # Inquiries management
│   │   ├── Users/        # User management
│   │   └── Settings/     # System settings
│   ├── contexts/         # React contexts (Auth, etc.)
│   ├── config/           # Configuration files
│   │   └── permissions.ts # Role-based access control
│   ├── types/            # TypeScript type definitions
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 👥 User Roles & Permissions

### **Super Admin**

- Full access to everything
- User management
- System settings
- All content management

### **Content Manager**

- Manage home page content
- Manage stores, restaurants, entertainment venues
- Manage events
- Manage gallery
- Cannot manage users or system settings

### **Inquiry Manager**

- View and respond to inquiries only
- Contact forms
- Rental requests
- Investment inquiries
- Job applications

### **Editor**

- Edit existing content
- Limited permissions
- Cannot create or delete

---

## 🏠 Home Page Management

Admins can control:

- **Hero Section**: Title, subtitle, background image, CTA buttons
- **Banner Sections**: Multiple banners with images, titles, descriptions
- **Featured Events**: Auto-newest OR manually selected events
- **Gallery Photos**: Select which photos appear on home page

---

## 🎯 Key Features

### Content Management

- ✅ Stores (Retail, Restaurants, Entertainment, Hypermarket)
- ✅ Events with "Featured" flag
- ✅ Gallery with "Display on Home Page" flag
- ✅ Home page hero and banners
- ✅ Rich text editor for descriptions
- ✅ Image upload with preview
- ✅ Drag & drop file uploads

### Inquiries

- ✅ View contact forms
- ✅ Rental requests
- ✅ Investment inquiries
- ✅ Job applications
- ✅ Mark as read/responded
- ✅ Add internal notes

### User Management

- ✅ Create/edit admin users
- ✅ Assign roles
- ✅ Manage permissions
- ✅ Activity logs

### Settings

- ✅ Mall information
- ✅ Operating hours
- ✅ Contact details
- ✅ Social media links
- ✅ Emergency messages

---

## 🔐 Authentication

The admin panel uses JWT-based authentication:

- Login with email/password
- Token stored in localStorage
- Auto-refresh on page load
- Protected routes based on permissions

---

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **React Router** - Routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **React Dropzone** - File uploads
- **React Quill** - Rich text editor
- **Axios** - HTTP client
- **Vite** - Build tool

---

## 📝 Development Notes

### Mock Data

Currently using mock data for development. Replace API calls in `services/` folder when backend is ready.

### API Endpoints

Expected backend endpoints:

```
POST   /api/admin/login
GET    /api/admin/dashboard/stats

GET    /api/admin/home-page
PUT    /api/admin/home-page/hero
POST   /api/admin/home-page/banners
PUT    /api/admin/home-page/banners/:id
DELETE /api/admin/home-page/banners/:id

GET    /api/admin/stores
POST   /api/admin/stores
PUT    /api/admin/stores/:id
DELETE /api/admin/stores/:id

GET    /api/admin/events
POST   /api/admin/events
PUT    /api/admin/events/:id
DELETE /api/admin/events/:id
PUT    /api/admin/events/:id/featured

GET    /api/admin/gallery
POST   /api/admin/gallery/upload
DELETE /api/admin/gallery/:id
PUT    /api/admin/gallery/:id/home-display

GET    /api/admin/inquiries
GET    /api/admin/inquiries/:type
PUT    /api/admin/inquiries/:id/respond

GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id

GET    /api/admin/settings
PUT    /api/admin/settings
```

---

## 🚢 Deployment

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

Deploy the `dist/` folder to your hosting service.

**Recommended setup:**

- Main site: `alamericmall.com`
- Admin panel: `admin.alamericmall.com`

---

## 📋 TODO

- [ ] Create all page components
- [ ] Implement API services
- [ ] Add form validation
- [ ] Implement image upload
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success/error notifications
- [ ] Implement pagination
- [ ] Add search/filter functionality
- [ ] Add bulk operations
- [ ] Implement activity logs
- [ ] Add data export features

---

## 🆘 Support

For issues or questions, contact the development team.
