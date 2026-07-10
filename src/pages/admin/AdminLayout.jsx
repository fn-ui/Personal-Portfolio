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
  Layers3,
  Mail,
  MessageSquareQuote,
  PanelsTopLeft,
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
// SOCKET CONNECTION
// =========================
console.log(
  "ENV:",
  import.meta.env.VITE_SOCKET_URL
);



function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // =========================
  // STATE
  // =========================
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [collapsed, setCollapsed] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem("theme") ===
        "dark"
    );

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  // =========================
  // DARK MODE
  // =========================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode]);

  // =========================
  // CLOSE ON ROUTE CHANGE
  // =========================
  useEffect(() => {
    setSidebarOpen(false);
    setShowNotifications(false);
    setSearchTerm("");
  }, [location.pathname]);

  // =========================
  // FETCH NOTIFICATIONS
  // =========================
  const fetchNotifications =
    async () => {
      try {
        const res = await API.get(
          "notifications"
        );

        setNotifications(res.data || []);
      } catch (err) {
        if (
          err.response?.status === 503 ||
          err.code === "ECONNABORTED"
        ) {
          setNotifications([]);
          return;
        }

        console.log(
          "❌ Notification fetch error:",
          err
        );
      }
    };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =========================
  // SOCKET EVENTS
  // =========================
  useEffect(() => {
    // CONNECT
    const socket = io(
  import.meta.env.VITE_SOCKET_URL
    );
    socket.on("connect", () => {
      console.log(
        "🟢 Socket connected:",
        socket.id
      );
    });

    // CONNECTION ERROR
    socket.on(
      "connect_error",
      (err) => {
        console.log(
          "❌ SOCKET ERROR:",
          err.message
        );
      }
    );

    // NEW NOTIFICATION
    const handleNewNotification = (
      notification
    ) => {
      console.log(
        "🔔 New notification:",
        notification
      );

      setNotifications((prev) => {
        const exists = prev.some(
          (n) =>
            n._id === notification._id
        );

        if (exists) return prev;

        return [notification, ...prev];
      });
    };

    // UPDATED NOTIFICATION
    const handleUpdatedNotification = (
      updated
    ) => {
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === updated._id
            ? updated
            : n
        )
      );
    };

    // MARK ALL READ
    const handleAllRead = (updated) => {
      if (Array.isArray(updated)) {
        setNotifications(updated);
        return;
      }

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );
    };

    // EVENTS
    socket.on(
      "notification:new",
      handleNewNotification
    );

    socket.on(
      "notification:updated",
      handleUpdatedNotification
    );

    socket.on(
      "notification:all-read",
      handleAllRead
    );

    // CLEANUP
    return () => {
      socket.off("connect");

      socket.off("connect_error");

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

      await API.patch(
        `/notifications/${id}/read`
      );
    } catch (err) {
      console.log(
        "❌ Mark as read error:",
        err
      );
    }
  };

  // =========================
  // MARK ALL AS READ
  // =========================
  const markAllAsRead = async () => {
    try {
      await API.patch(
        "/notifications/mark-all-read"
      );

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );
    } catch (err) {
      console.log(
        "❌ Mark all read error:",
        err
      );
    }
  };

  // =========================
  // OUTSIDE CLICK
  // =========================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
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
  const unreadCount =
    notifications.filter(
      (n) => !n.read
    ).length;

  const getNotificationText = (notification) =>
    notification.text ||
    notification.message ||
    notification.body ||
    "Notification details unavailable";

  const getNotificationTitle = (notification) => {
    if (notification.title) {
      return notification.title;
    }

    const text =
      getNotificationText(notification);

    if (
      notification.type === "success"
    ) {
      return "Success";
    }

    if (
      notification.type === "warning"
    ) {
      return "Needs attention";
    }

    if (notification.type === "error") {
      return "Issue detected";
    }

    return text.length > 64
      ? `${text.slice(0, 64)}...`
      : text;
  };

  const getNotificationBody = (notification) => {
    if (!notification.title) {
      return notification.message
        ? notification.message
        : "";
    }

    return getNotificationText(notification);
  };

  const formatNotificationDate = (value) => {
    if (!value) return "Just now";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Just now";
    }

    return date.toLocaleString();
  };

  // =========================
  // NAV LINKS
  // =========================
  const navLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: (
        <LayoutDashboard size={20} />
      ),
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: (
        <FolderKanban size={20} />
      ),
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: (
        <PanelsTopLeft size={20} />
      ),
    },
    {
      name: "Skills",
      path: "/admin/skills",
      icon: (
        <Layers3 size={20} />
      ),
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <Mail size={20} />,
    },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: (
        <MessageSquareQuote size={20} />
      ),
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings size={20} />,
    },
  ];

  const searchResults = navLinks.filter(
    (link) => {
      const query =
        searchTerm.toLowerCase().trim();

      if (!query) return false;

      return (
        link.name
          .toLowerCase()
          .includes(query) ||
        link.path
          .replace("/admin/", "")
          .replace("/admin", "dashboard")
          .includes(query)
      );
    }
  );

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchTerm("");
  };

  return (
    <div className="flex min-h-screen bg-[#fff8ef] text-[#241423] dark:bg-slate-950 dark:text-white">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen flex flex-col justify-between
          border-r border-[#eadccf] dark:border-slate-800
          shadow-xl lg:shadow-sm
          transition-all duration-300 overflow-hidden
          ${
            collapsed
              ? "w-20"
              : "w-72"
          }
          bg-[#fffaf3] dark:bg-slate-950
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
                <h1 className="text-2xl font-bold text-[#c65f4a]">
                  Admin
                </h1>

                <p className="text-xs text-[#7c6a61] dark:text-slate-400">
                  Portfolio CMS
                </p>
              </div>
            )}

            <button
              onClick={() =>
                setCollapsed(
                  !collapsed
                )
              }
              className="hidden lg:flex p-2 rounded-xl hover:bg-[#fbe3dc] dark:hover:bg-slate-900"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
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
                end={
                  link.path ===
                  "/admin"
                }
                className={({
                  isActive,
                }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                    isActive
                      ? "bg-[#c65f4a] text-white shadow-lg shadow-[#c65f4a]/20"
                      : "text-[#5f4d55] dark:text-slate-300 hover:bg-[#fbe3dc] dark:hover:bg-slate-900"
                  }`
                }
              >
                {link.icon}

                {!collapsed && (
                  <span>
                    {link.name}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

        </div>

        {/* BOTTOM */}
        <div className="p-3 space-y-3">

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="w-full flex items-center justify-center gap-2 bg-[#fbe3dc] dark:bg-slate-900 py-3 rounded-2xl"
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
            className="w-full flex items-center justify-center gap-2 bg-[#5b233f] hover:bg-[#4b1932] text-white py-3 rounded-2xl"
          >
            <LogOut size={18} />

            {!collapsed &&
              "Logout"}
          </button>

        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-[#fffaf3]/85 dark:bg-slate-950/90 backdrop-blur-md border-b border-[#eadccf] dark:border-slate-800 px-6 py-4 flex justify-between items-center">

          {/* LEFT */}
          <div className="flex gap-4 items-center">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>

            <h2 className="font-bold text-lg text-[#241423] dark:text-white">
              Portfolio Admin
            </h2>

          </div>

          {/* RIGHT */}
          <div className="flex gap-4 items-center">

            {/* SEARCH */}
            <div className="relative hidden md:block w-72">

              <div className="flex items-center bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-[#eadccf] dark:border-slate-800 focus-within:border-[#c65f4a] focus-within:ring-4 focus-within:ring-[#f3c8bb]/35">
                <Search
                  size={18}
                  className="text-[#7c6a61] dark:text-slate-400"
                />

                <input
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      searchResults[0]
                    ) {
                      handleSearchSelect(
                        searchResults[0].path
                      );
                    }
                  }}
                  className="bg-transparent outline-none ml-2 w-full text-sm text-[#241423] placeholder:text-[#9a897f] dark:text-white dark:placeholder:text-slate-500"
                  placeholder="Search admin pages..."
                />

                {searchTerm && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    className="ml-2 rounded-full p-1 text-[#7c6a61] transition hover:bg-[#fbe3dc] hover:text-[#c65f4a] dark:text-slate-400 dark:hover:bg-slate-800"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {searchTerm && (
                <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-[#eadccf] bg-white shadow-2xl shadow-[#7a2e53]/10 dark:border-slate-800 dark:bg-slate-950">
                  {searchResults.length > 0 ? (
                    searchResults.map(
                      ({
                        name,
                        path,
                        icon,
                      }) => (
                        <button
                          key={path}
                          type="button"
                          onMouseDown={(event) =>
                            event.preventDefault()
                          }
                          onClick={() =>
                            handleSearchSelect(
                              path
                            )
                          }
                          className="flex w-full items-center gap-3 border-b border-[#f1e4d8] px-4 py-3 text-left text-sm font-semibold text-[#5f4d55] transition last:border-b-0 hover:bg-[#fff8ef] dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
                        >
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fbe3dc] text-[#c65f4a] dark:bg-[#c65f4a]/10">
                            {icon}
                          </span>
                          <span>
                            {name}
                          </span>
                        </button>
                      )
                    )
                  ) : (
                    <div className="px-4 py-5 text-sm text-[#7c6a61] dark:text-slate-400">
                      No admin pages match your search.
                    </div>
                  )}
                </div>
              )}

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
                className="relative w-10 h-10 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center border border-[#eadccf] dark:border-slate-800"
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

                    {notifications.length >
                      0 && (
                      <button
                        onClick={
                          markAllAsRead
                        }
                        className="text-xs text-[#c65f4a] hover:underline"
                      >
                        Mark all as
                        read
                      </button>
                    )}

                  </div>

                  {/* LIST */}
                  <div className="max-h-[420px] overflow-y-auto">

                    {notifications.length ===
                    0 ? (
                      <div className="p-6 text-center text-sm text-gray-500">
                        No
                        notifications
                        yet
                      </div>
                    ) : (
                      notifications.map(
                        (n) => {
                          const title =
                            getNotificationTitle(
                              n
                            );
                          const body =
                            getNotificationBody(
                              n
                            );

                          return (
                          <div
                            key={n._id}
                            onClick={() =>
                              markAsRead(
                                n._id
                              )
                            }
                            className={`
                              p-4 border-b border-gray-100 dark:border-gray-800
                              cursor-pointer transition
                              hover:bg-gray-50 dark:hover:bg-gray-800
                              ${
                                !n.read
                                  ? "bg-[#fbe3dc]/70 dark:bg-[#c65f4a]/10"
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
                                      : "bg-[#c65f4a]"
                                  }
                                `}
                              />

                              <div className="flex-1 min-w-0">

                                <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                                  {title}
                                </h4>

                                {body && (
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                                    {body}
                                  </p>
                                )}

                                <p className="text-xs text-gray-400 mt-2">
                                  {formatNotificationDate(
                                    n.createdAt
                                  )}
                                </p>

                              </div>

                            </div>

                          </div>
                          );
                        }
                      )
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
