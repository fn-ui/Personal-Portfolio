import { useEffect, useState, useRef } from "react";
import API from "../../api/axios";
import io from "socket.io-client";

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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // =========================
  // DARK MODE
  // =========================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // =========================
  // CLOSE ON ROUTE CHANGE
  // =========================
  useEffect(() => {
    setSidebarOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  // =========================
  // FETCH NOTIFICATIONS
  // =========================
  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data || []);
    } catch (err) {
      console.log("Notification fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =========================
  // SOCKET (CLEAN + SAFE)
  // =========================
  useEffect(() => {
    const handleNew = (data) => {
      setNotifications((prev) => [data, ...prev]);
    };

    const handleUpdated = (updated) => {
      setNotifications((prev) =>
        prev.map((n) =>
          (n._id || n.id) === (updated._id || updated.id) ? updated : n
        )
      );
    };

    socket.on("notification:new", handleNew);
    socket.on("notification:updated", handleUpdated);

    return () => {
      socket.off("notification:new", handleNew);
      socket.off("notification:updated", handleUpdated);
    };
  }, []);

  // =========================
  // MARK AS READ (OPTIMISTIC)
  // =========================
  const markAsRead = async (id) => {
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          (n._id || n.id) === id ? { ...n, read: true } : n
        )
      );

      await API.patch(`/notifications/${id}/read`);
    } catch (err) {
      console.log("Mark as read error:", err.message);
    }
  };

  // =========================
  // OUTSIDE CLICK CLOSE
  // =========================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Projects", path: "/admin/projects", icon: <FolderKanban size={20} /> },
    { name: "Messages", path: "/admin/messages", icon: <Mail size={20} /> },
    { name: "Testimonials", path: "/admin/testimonials", icon: <MessageSquareQuote size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0b1220]">

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen flex flex-col justify-between
          border-r border-gray-200 dark:border-gray-800
          shadow-xl lg:shadow-sm
          transition-all duration-300 overflow-hidden
          ${collapsed ? "w-20" : "w-72"}
          bg-white dark:bg-[#0f172a]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* TOP */}
        <div>

          <div className="flex items-center justify-between p-4 mb-6">
            {!collapsed && (
              <div>
                <h1 className="text-2xl font-bold text-blue-600">Admin</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Portfolio CMS
                </p>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800"
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X />
            </button>
          </div>

          {/* NAV */}
          <nav className="px-2 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="p-3 space-y-3">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 py-3 rounded-2xl"
          >
            {darkMode ? <Sun /> : <Moon />}
            {!collapsed && (darkMode ? "Light Mode" : "Dark Mode")}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl"
          >
            <LogOut />
            {!collapsed && "Logout"}
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center">

          <div className="flex gap-4 items-center">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu />
            </button>

            <h2 className="font-bold text-lg">Portfolio Admin</h2>
          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">

            <div className="hidden md:flex bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl w-72">
              <Search />
              <input
                className="bg-transparent outline-none ml-2 w-full"
                placeholder="Search..."
              />
            </div>

            {/* NOTIFICATIONS */}
            <div ref={dropdownRef} className="relative">

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center"
              >
                <Bell />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border z-50">

                  <div className="p-4 font-bold border-b">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id || n.id}
                        onClick={() => markAsRead(n._id || n.id)}
                        className={`p-4 text-sm cursor-pointer border-b last:border-none ${
                          n.read ? "opacity-60" : "font-semibold"
                        }`}
                      >
                        {n.text}
                      </div>
                    ))
                  )}

                </div>
              )}

            </div>

          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;