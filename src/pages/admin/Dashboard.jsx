import { useEffect, useState, useRef } from "react";
import API from "../../api/axios";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import {
  FolderKanban,
  Mail,
  MessageSquareQuote,
  Eye,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Sparkles,
  Bell,
} from "lucide-react";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  // =========================
  // GREETING
  // =========================
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // =========================
  // STATE
  // =========================
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    totalTestimonials: 0,
  });

  const [recentMessages, setRecentMessages] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  
  // =========================
  // FETCH FUNCTIONS
  // =========================
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const [projects, messages, testimonials] = await Promise.all([
        API.get("/projects"),
        API.get("/messages"),
        API.get("/testimonials"),
      ]);

      setStats({
        totalProjects: projects.data.length,
        totalMessages: messages.data.length,
        totalTestimonials: testimonials.data.length,
      });

      setRecentMessages(messages.data.slice(0, 4));
      setRecentProjects(projects.data.slice(0, 3));
    } catch (error) {
      console.log("DASHBOARD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const [messages, testimonials] = await Promise.all([
        API.get("/messages"),
        API.get("/testimonials"),
      ]);

      const newNotifications = [];

      messages.data.slice(0, 5).forEach((msg) => {
        newNotifications.push({
          id: msg._id,
          type: "message",
          text: `New message from ${msg.name}`,
        });
      });

      testimonials.data
        .filter((t) => t.status === "pending")
        .forEach((t) => {
          newNotifications.push({
            id: t._id,
            type: "testimonial",
            text: `New testimonial from ${t.name}`,
          });
        });

      setNotifications(newNotifications);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // USE EFFECTS
  // =========================

  // increment views once
  useEffect(() => {
    const incrementViews = async () => {
      try {
        await API.post("/views/increment");
      } catch (err) {
        console.log(err);
      }
    };

    incrementViews();
  }, []);

  // fetch views
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const res = await API.get("/views");
        setViews(res.data.count);
      } catch (err) {
        console.log(err);
      }
    };

    fetchViews();
  }, []);

  // dashboard stats
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // notifications with interval
  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // STATIC DATA
  // =========================
  const analyticsData = [
    { month: "Jan", projects: 4, messages: 8, testimonials: 1, views: 20 },
    { month: "Feb", projects: 6, messages: 13, testimonials: 2, views: 25 },
    { month: "Mar", projects: 8, messages: 16, testimonials: 3, views: 30 },
    { month: "Apr", projects: 9, messages: 23, testimonials: 4, views: 40 },
    { month: "May", projects: 11, messages: 31, testimonials: 6, views: 45 },
    { month: "Jun", projects: 16, messages: 40, testimonials: 8, views: 57 },
  ];

  const techStackData = [
    { name: "React", value: 35 },
    { name: "Tailwind", value: 25 },
    { name: "Node.js", value: 15 },
    { name: "MongoDB", value: 10 },
    { name: "Others", value: 15 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#f97316", "#94a3b8"];

  // =========================
  // CARDS
  // =========================
  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <FolderKanban size={30} />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      icon: <Mail size={30} />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials,
      icon: <MessageSquareQuote size={30} />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Portfolio Views",
      value: views,
      icon: <Eye size={30} />,
      color: "from-orange-500 to-orange-700",
    },
  ];

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div>
          <div className="h-10 w-72 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-44 rounded-3xl bg-white dark:bg-gray-800" />
          ))}
        </div>

        <div className="h-[400px] bg-white dark:bg-gray-800 rounded-3xl"></div>
      </div>
    );
  }
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowNotifications(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
 return (
  <div>
    {/* HERO */}
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2rem] p-8 md:p-12 mb-12 text-white">
      
      {/* Background icon */}
      <div className="absolute top-0 right-0 opacity-10">
        <Sparkles size={220} />
      </div>

      <div className="relative z-10">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-4">

          {/* LEFT ICON */}
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Activity size={28} />
          </div>

          {/* RIGHT SIDE (NOTIFICATIONS) */}
          <div ref={dropdownRef} className="relative z-50">

            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative bg-white/20 p-3 rounded-2xl backdrop-blur-md hover:bg-white/30 transition"
            >
              <Bell size={24} />

              {/* BADGE */}
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* DROPDOWN */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 z-[999]">

                <div className="p-4 border-b font-bold">
                  Notifications
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        {n.text}
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* BADGE TITLE */}
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-md">
          Portfolio Analytics
        </span>

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight mt-4">
          {greeting}, Admin 👋
        </h1>

        {/* DESCRIPTION */}
        <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
          Track your portfolio growth, manage projects, monitor messages,
          and control your entire admin system from one dashboard.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            to="/admin/projects"
            className="bg-white text-blue-700 shadow-2xl px-6 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
          >
            Manage Projects
          </Link>

          <Link
            to="/admin/messages"
            className="bg-white/15 border border-white/20 backdrop-blur-xl px-6 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300"
          >
            View Messages
          </Link>

        </div>

      </div>
    </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  {card.title}
                </p>

                <h2 className="text-5xl font-extrabold text-gray-800 dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`bg-gradient-to-br ${card.color} text-white p-4 rounded-3xl shadow-lg`}
              >
                {card.icon}
              </div>
            </div>

            <div className="flex items-center gap-2 text-green-500 font-semibold">
              <TrendingUp size={18} />
              <span>+12% this month</span>
            </div>
          </div>
        ))}
      </div>

      {/* CHART + ACTIVITY */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-12">

  {/* LEFT SIDE */}
  <div className="xl:col-span-2">

    {/* LEGENDS */}
    <div className="flex flex-wrap gap-6 mb-6">

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
        <span className="text-sm text-gray-500">Projects</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-600"></div>
        <span className="text-sm text-gray-500">Messages</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
        <span className="text-sm text-gray-500">Testimonials</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        <span className="text-sm text-gray-500">Views</span>
      </div>

    </div>

    {/* ANALYTICS CHART */}
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Analytics Overview
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Portfolio growth trends
          </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-3 rounded-2xl">
          <Activity size={24} />
        </div>

      </div>

      {/* MINI STATS */}
      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Total Growth
          </p>

          <h3 className="text-2xl font-bold text-blue-600">
            +24%
          </h3>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Active Users
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            1.2K
          </h3>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Conversion
          </p>

          <h3 className="text-2xl font-bold text-purple-600">
            86%
          </h3>
        </div>

      </div>

      {/* CHART */}
      <div className="w-full h-[350px] min-h-[350px]">

  <ResponsiveContainer width="99%" height={350}>

          <AreaChart
            data={analyticsData}
            margin={{
              top: 10,
              right: 20,
              left:  0,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorTestimonials" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.1}
            />

            <XAxis
              dataKey="month"
              stroke="#9ca3af"
            />

            <YAxis stroke="#9ca3af" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "16px",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            />

            <Area
              type="monotone"
              dataKey="projects"
              stroke="#2563eb"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorProjects)"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />

            <Area
              type="monotone"
              dataKey="messages"
              stroke="#16a34a"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorMessages)"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />

            <Area
              type="monotone"
              dataKey="testimonials"
              stroke="#a855f7"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorTestimonials)"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />

            <Area
              type="monotone"
              dataKey="views"
              stroke="#f97316"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorViews)"
              animationDuration={2000}
              animationEasing="ease-in-out"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* BOTTOM STATS */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Best Month
          </p>

          <h4 className="font-bold text-lg text-gray-800 dark:text-white">
            June Performance
          </h4>

        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Average Engagement
          </p>

          <h4 className="font-bold text-lg text-gray-800 dark:text-white">
            72%
          </h4>

        </div>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="space-y-6">

    {/* PERFORMANCE */}
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">

      <div className="flex items-center justify-between mb-6">

        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Performance
        </h3>

        <ArrowUpRight className="text-green-500" />

      </div>

      <div className="space-y-6">

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400">
              Projects Growth
            </span>

            <span className="font-semibold text-blue-600">
              78%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full w-[78%]"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400">
              Message Activity
            </span>

            <span className="font-semibold text-green-600">
              92%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full w-[92%]"></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 dark:text-gray-400">
              Testimonials
            </span>

            <span className="font-semibold text-purple-600">
              64%
            </span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full w-[64%]"></div>
          </div>
        </div>

      </div>

    </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Quick Actions
            </h3>

            <div className="space-y-4">
              <Link
                to="/admin/projects"
                className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 p-5 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl">
                    <FolderKanban size={22} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Add Project
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Create portfolio project
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="text-blue-600" />
              </Link>

              <Link
                to="/admin/messages"
                className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 p-5 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-2xl">
                    <Mail size={22} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Inbox
                    </h4>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Check new messages
                    </p>
                  </div>
                </div>

                <ArrowUpRight className="text-green-600" />
              </Link>
            </div>
          </div>

          {/* SYSTEM STATUS */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                System Status
              </h3>

              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  API Server
                </span>

                <span className="text-green-500 font-semibold">
                  Online
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Database
                </span>

                <span className="text-green-500 font-semibold">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">
                  Portfolio
                </span>

                <span className="text-blue-500 font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>

               </div>
               </div>   
      {/* RECENT SECTION */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-12">

  {/* LEFT SIDE */}
  <div className="xl:col-span-2 space-y-6">

    {/* RECENT MESSAGES */}
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Recent Messages
        </h2>

        <button className="text-blue-600 font-medium hover:underline">
          View all messages →
        </button>
      </div>

      {recentMessages.length > 0 ? (
        recentMessages.map((message, index) => (
          <div
            key={message._id}
            className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all ${
              index !== recentMessages.length - 1
                ? "border-b border-gray-100 dark:border-gray-800"
                : ""
            }`}
          >
            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-lg">
                {message.name?.charAt(0)}
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 dark:text-white">
                    {message.name}
                  </h3>

                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    New
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {message.email}
                </p>

                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {message.message}
                </p>

              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
          No messages yet.
        </div>
      )}
    </div>

    {/* RECENT PROJECTS */}
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Recent Projects
        </h2>

        <button className="text-blue-600 font-medium hover:underline">
          View all projects →
        </button>
      </div>

      <div className="p-6 space-y-6">

        {recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <div
              key={project._id}
              className="flex gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/40 p-3 rounded-2xl transition-all duration-300"
            >

              <img
                src={
                  project.image?.startsWith("http")
                    ? project.image
                    : `http://localhost:5000/${project.image.replace(
                        /^\/+/,
                        ""
                      )}`
                }
                alt={project.title}
                className="w-24 h-24 rounded-3xl object-cover shadow-lg"
              />

              <div className="flex-1">

                <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack
                    ?.split(",")
                    .slice(0, 3)
                    .map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-xs"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            No projects available yet 🚀
          </div>
        )}

      </div>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <div>

    {/* TECH STACK */}
    <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm">

      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Top Tech Stack
      </h3>

      <div className="w-full h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={techStackData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={60}
              paddingAngle={3}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >

              {techStackData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>

</div>
    </div>
  );
}

export default Dashboard;