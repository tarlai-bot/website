import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getAccessibleNavItems } from "../../config/permissions";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  Store as StoreIcon,
  Event as EventIcon,
  Photo as PhotoIcon,
  Email as EmailIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  ShoppingBag,
  Restaurant,
  TheaterComedy,
  ShoppingCart,
  ContactMail,
  Business,
  AttachMoney,
  Work,
  Map as MapIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";

const iconMap: Record<string, any> = {
  Dashboard: DashboardIcon,
  Home: HomeIcon,
  Store: StoreIcon,
  Event: EventIcon,
  Photo: PhotoIcon,
  Email: EmailIcon,
  People: PeopleIcon,
  Settings: SettingsIcon,
  Map: MapIcon,
  ShoppingBag,
  Restaurant,
  TheaterComedy,
  ShoppingCart,
  ContactMail,
  Business,
  AttachMoney,
  Work,
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = user ? getAccessibleNavItems(user.role) : [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden bg-primary duration-300 ease-linear lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${sidebarOpen ? "w-72" : "w-20"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <h1 className="text-xl font-bold text-white">Alamer Mall</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:block text-white hover:text-secondary-light transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6 flex-1 overflow-y-auto">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400 uppercase">
              {sidebarOpen ? "MENU" : ""}
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = iconMap[item.icon];
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems.includes(item.path);
                const active = isActive(item.path);

                return (
                  <li key={item.path}>
                    <button
                      onClick={() =>
                        hasChildren
                          ? toggleExpanded(item.path)
                          : handleNavClick(item.path)
                      }
                      className={`group relative flex items-center gap-2.5 rounded-lg py-2.5 px-4 font-medium duration-300 ease-in-out w-full ${
                        active
                          ? "bg-primary-light text-white"
                          : "text-gray-300 hover:bg-primary-hover hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {sidebarOpen && <span>{item.label}</span>}
                      {sidebarOpen && hasChildren && (
                        <div className="ml-auto">
                          {isExpanded ? (
                            <ExpandLess className="w-5 h-5" />
                          ) : (
                            <ExpandMore className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </button>

                    {hasChildren && isExpanded && sidebarOpen && (
                      <ul className="mt-2 mb-4 flex flex-col gap-2 pl-6">
                        {item.children!.map((child) => {
                          const ChildIcon = iconMap[child.icon];
                          const childActive = isActive(child.path);
                          return (
                            <li key={child.path}>
                              <button
                                onClick={() => handleNavClick(child.path)}
                                className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium duration-300 ease-in-out w-full ${
                                  childActive
                                    ? "text-white bg-primary-hover"
                                    : "text-gray-400 hover:text-white hover:bg-primary-hover"
                                }`}
                              >
                                <ChildIcon className="w-4 h-4" />
                                <span className="text-sm">{child.label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 flex w-full bg-white shadow-sm">
          <div className="flex grow items-center justify-between py-4 px-4 shadow-sm md:px-6 2xl:px-11">
            {/* Mobile menu button */}
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="z-50 block rounded-lg border border-gray-200 bg-white p-1.5 shadow-sm lg:hidden"
              >
                <MenuIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="hidden sm:block flex-1 max-w-md">
              <div className="relative">
                <button className="absolute left-3 top-1/2 -translate-y-1/2">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Header Right */}
            <div className="flex items-center gap-3 2xl:gap-4">
              {/* Notifications */}
              <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                <NotificationsIcon className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 z-1 h-2 w-2 rounded-full bg-danger">
                  <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75"></span>
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role.replace("_", " ")}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <KeyboardArrowDown className="text-gray-600" />
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => navigate("/settings")}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <SettingsIcon className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-danger hover:bg-red-50"
                    >
                      <LogoutIcon className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 w-full">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
