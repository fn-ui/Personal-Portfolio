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

// =========================
const socket = io(
  import.meta.env.VITE_SOCKET_URL,
  {
    transports: ["polling", "websocket"],
  }
);

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // =========================
  // STATE
  // =========================
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
      console.log("❌ Notification fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =========================
  // SOCKET EVENTS
  // =========================
  useEffect(() => {
    // CONNECTED
    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    // NEW NOTIFICATION
    const handleNewNotification = (notification) => {
      console.log("🔔 New notification received:", notification);

      setNotifications((prev) => {
        // prevent duplicates
        const exists = prev.some(
          (n) => n._id === notification._id
        );

        if (exists) return prev;

        return [notification, ...prev];
      });
    };

    // UPDATED NOTIFICATION
    const handleUpdatedNotification = (updated) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === updated._id ? updated : n
        )
      );
    };

    // ALL READ
    const handleAllRead = () => {
      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );
    };

    socket.on("notification:new", handleNewNotification);

    socket.on(
      "notification:updated",
      handleUpdatedNotification
    );

    socket.on(
      "notification:all-read",
      handleAllRead
    );

    return () => {
      socket.off(
        "notification:new",
        handleNewNotification
      );

      socket.off(
        "notification:updated",
        handleUpdatedNotification
      );

      socket.off(
        "notification:all-read",
        handleAllRead
      );
    };
  }, []);

  // =========================
  // MARK AS READ
  // =========================
  const markAsRead = async (id) => {
    try {
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id
            ? {
                ...n,
                read: true,
              }
            : n
        )
      );

      await API.patch(`/notifications/${id}/read`);
    } catch (err) {
      console.log("❌ Mark as read error:", err);
    }
  };

  // =========================
  // MARK ALL AS READ
  // =========================
  const markAllAsRead = async () => {
    try {
      await API.patch("/notifications/mark-all-read");

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );
    } catch (err) {
      console.log("❌ Mark all read error:", err);
    }
  };

  // =========================
  // OUTSIDE CLICK
  // =========================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // =========================
  // UNREAD COUNT
  // =========================
  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  // =========================
  // NAV LINKS
  // =========================
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
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0b1220]">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

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
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* TOP */}
        <div>

          {/* HEADER */}
          <div className="flex items-center justify-between p-4 mb-6">

            {!collapsed && (
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  Admin
                </h1>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Portfolio CMS
                </p>
              </div>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={24} />
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
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                {link.icon}

                {!collapsed && (
                  <span>{link.name}</span>
                )}
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
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}

            {!collapsed &&
              (darkMode
                ? "Light Mode"
                : "Dark Mode")}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl"
          >
            <LogOut size={18} />

            {!collapsed && "Logout"}
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex gap-4 items-center">

            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>

            <h2 className="font-bold text-lg text-gray-800 dark:text-white">
              Portfolio Admin
            </h2>

          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">

            {/* SEARCH */}
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl w-72">

              <Search size={18} />

              <input
                className="bg-transparent outline-none ml-2 w-full text-sm"
                placeholder="Search..."
              />

            </div>

            {/* NOTIFICATIONS */}
            <div
              ref={dropdownRef}
              className="relative"
            >

              <button
                onClick={() =>
                  setShowNotifications(
                    !showNotifications
                  )
                }
                className="relative w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center"
              >
                <Bell size={18} />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* DROPDOWN */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">

                  {/* HEADER */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">

                    <h3 className="font-bold text-gray-800 dark:text-white">
                      Notifications
                    </h3>

                    {notifications.length > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}

                  </div>

                  {/* LIST */}
                  <div className="max-h-[420px] overflow-y-auto">

                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-gray-500">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n._id}
                          onClick={() =>
                            markAsRead(n._id)
                          }
                          className={`
                            p-4 border-b border-gray-100 dark:border-gray-800
                            cursor-pointer transition
                            hover:bg-gray-50 dark:hover:bg-gray-800
                            ${
                              !n.read
                                ? "bg-blue-50/60 dark:bg-blue-500/10"
                                : ""
                            }
                          `}
                        >

                          <div className="flex items-start gap-3">

                            <div
                              className={`
                                mt-1 w-2 h-2 rounded-full
                                ${
                                  n.read
                                    ? "bg-gray-400"
                                    : "bg-blue-500"
                                }
                              `}
                            />

                            <div className="flex-1">

                              <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                                {n.title}
                              </h4>

                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {n.message}
                              </p>

                              <p className="text-xs text-gray-400 mt-2">
                                {new Date(
                                  n.createdAt
                                ).toLocaleString()}
                              </p>

                            </div>

                          </div>

                        </div>
                      ))
                    )}

                  </div>

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