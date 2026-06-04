import { useEffect, useState } from "react";

import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  MessageSquareQuote,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // MOBILE SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // DARK MODE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // APPLY DARK MODE
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // CLOSE SIDEBAR ON ROUTE CHANGE
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // NAVIGATION LINKS
  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <Mail size={20} />,
    },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: <MessageSquareQuote size={20} />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-72
          bg-white dark:bg-[#111827]
          border-r border-gray-200 dark:border-gray-800
          shadow-2xl lg:shadow-sm
          flex flex-col justify-between
          p-6
          transition-all duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* TOP */}
        <div>

          {/* LOGO + CLOSE */}
          <div className="flex items-center justify-between mb-12">

            <div>
              <h1 className="text-3xl font-extrabold text-blue-600">
                Admin
              </h1>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Portfolio CMS
              </p>
            </div>

            {/* MOBILE CLOSE */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-700 dark:text-gray-300"
            >
              <X size={28} />
            </button>

          </div>

          {/* NAVIGATION */}
          <nav className="space-y-3">

            {navLinks.map((link) => (

              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/admin"}
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600"
                  }`
                }
              >

                <div className="transition-transform duration-300 group-hover:scale-110">
                  {link.icon}
                </div>

                <span>{link.name}</span>

              </NavLink>

            ))}

          </nav>

        </div>

        {/* BOTTOM */}
        <div>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 py-4 rounded-2xl transition-all duration-300 mb-4"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-red-500/20"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#111827]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-700 dark:text-gray-300"
            >
              <Menu size={28} />
            </button>

            {/* PAGE TITLE */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Portfolio Admin
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your portfolio content
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* SEARCH */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl w-72">
              <Search
                size={18}
                className="text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
              />
            </div>

            {/* NOTIFICATIONS */}
            <button className="relative w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">

              <Bell size={20} />

              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

            </button>

            {/* PROFILE */}
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 px-3 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">

              <div className="hidden md:block text-right">
                <p className="font-semibold text-gray-800 dark:text-white">
                  Admin
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Portfolio Owner
                </p>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
                A
              </div>

            </div>

          </div>

        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;