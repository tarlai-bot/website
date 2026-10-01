import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "../components/layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";
import Loader from "../components/common/Loader/Loader";

// Pages
const Home = lazy(() => import("../pages/Home/Home"));
const About = lazy(() => import("../pages/About/About"));
const Events = lazy(() => import("../pages/Events/Events"));
const Stores = lazy(() => import("../pages/Stores/Stores"));
const Restaurants = lazy(() => import("../pages/Restaurants/Restaurants"));
const Entertainment = lazy(() => import("../pages/Entertainment/Entertainment"));
const Smarvy = lazy(() => import("../pages/Smarvy/Smarvy"));
const Hypermarket = lazy(() => import("../pages/Hypermarket/Hypermarket"));
const MallMaps = lazy(() => import("../pages/MallMaps/MallMaps"));
const PhotoGallery = lazy(() => import("../pages/PhotoGallery/PhotoGallery"));

// Business Opportunities
const Rental = lazy(() => import("../pages/Rental/Rental"));
const RentalInquiry = lazy(() => import("../pages/Rental/RentalInquiry"));
const Investment = lazy(() => import("../pages/Investment/Investment"));

// Support & Info
const Careers = lazy(() => import("../pages/Careers/Careers"));
const CustomerService = lazy(() => import("../pages/CustomerService/CustomerService"));
const FAQ = lazy(() => import("../pages/FAQ/FAQ"));
const ContactUs = lazy(() => import("../pages/ContactUs/ContactUs"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService/TermsOfService"));

// Wrapper for lazy-loaded components
const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // Home
      {
        index: true,
        element: (
          <LazyWrapper>
            <Home />
          </LazyWrapper>
        ),
      },

      // About
      {
        path: "about",
        element: (
          <LazyWrapper>
            <About />
          </LazyWrapper>
        ),
      },

      // Events
      {
        path: "events",
        element: (
          <LazyWrapper>
            <Events />
          </LazyWrapper>
        ),
      },

      // Shopping & Dining
      {
        path: "stores",
        element: (
          <LazyWrapper>
            <Stores />
          </LazyWrapper>
        ),
      },
      {
        path: "restaurants",
        element: (
          <LazyWrapper>
            <Restaurants />
          </LazyWrapper>
        ),
      },
      {
        path: "entertainment",
        element: (
          <LazyWrapper>
            <Entertainment />
          </LazyWrapper>
        ),
      },
      {
        path: "entertainment/smarvy",
        element: (
          <LazyWrapper>
            <Smarvy />
          </LazyWrapper>
        ),
      },
      {
        path: "hypermarket",
        element: (
          <LazyWrapper>
            <Hypermarket />
          </LazyWrapper>
        ),
      },

      // Maps & Gallery
      {
        path: "maps",
        element: (
          <LazyWrapper>
            <MallMaps />
          </LazyWrapper>
        ),
      },
      {
        path: "gallery",
        element: (
          <LazyWrapper>
            <PhotoGallery />
          </LazyWrapper>
        ),
      },

      // Business Opportunities
      {
        path: "rental",
        element: (
          <LazyWrapper>
            <Rental />
          </LazyWrapper>
        ),
      },
      {
        path: "rental/inquiry",
        element: (
          <LazyWrapper>
            <RentalInquiry />
          </LazyWrapper>
        ),
      },
      {
        path: "investment",
        element: (
          <LazyWrapper>
            <Investment />
          </LazyWrapper>
        ),
      },

      // Careers
      {
        path: "careers",
        element: (
          <LazyWrapper>
            <Careers />
          </LazyWrapper>
        ),
      },

      // Support & Services
      {
        path: "customer-service",
        element: (
          <LazyWrapper>
            <CustomerService />
          </LazyWrapper>
        ),
      },
      {
        path: "services/customer-service",
        element: (
          <LazyWrapper>
            <CustomerService />
          </LazyWrapper>
        ),
      },
      {
        path: "faq",
        element: (
          <LazyWrapper>
            <FAQ />
          </LazyWrapper>
        ),
      },

      // Contact
      {
        path: "contact",
        element: (
          <LazyWrapper>
            <ContactUs />
          </LazyWrapper>
        ),
      },

      // Legal
      {
        path: "privacy-policy",
        element: (
          <LazyWrapper>
            <PrivacyPolicy />
          </LazyWrapper>
        ),
      },
      {
        path: "terms-of-service",
        element: (
          <LazyWrapper>
            <TermsOfService />
          </LazyWrapper>
        ),
      },

      // 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

// Export RouterProvider wrapper component
export default function AppRouter() {
  const { i18n } = useTranslation();

  return <RouterProvider router={router} key={i18n.language} />;
}
