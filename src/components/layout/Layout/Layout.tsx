import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isGalleryPage = location.pathname === "/gallery";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Only show outside hero on homepage */}
      {!isHomePage && <Header />}

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer - Hidden on gallery page */}
      {!isGalleryPage && <Footer />}
    </div>
  );
}

