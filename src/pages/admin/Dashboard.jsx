import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Activity,
  CalendarDays,
  CheckCircle,
  Eye,
  FolderKanban,
  Mail,
  MessageSquareQuote,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import API from "../../api/axios";

const toArray = (payload) => payload?.data || payload || [];

const emptyResponse = { data: [] };

const getOptional = async (path, fallback = emptyResponse) => {
  try {
    return await API.get(path);
  } catch (error) {
    if (error.response?.status === 503 || error.code === "ECONNABORTED") {
      return {
        ...fallback,
        databaseUnavailable: true,
      };
    }

    throw error;
  }
};

function Dashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalMessages: 0,
    totalTestimonials: 0,
  });
  const [messageStats, setMessageStats] = useState({
    New: 0,
    Replied: 0,
    Closed: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [databaseUnavailable, setDatabaseUnavailable] = useState(false);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        const [projectsRes, messagesRes, testimonialsRes, viewsRes] =
          await Promise.all([
            getOptional("/projects"),
            getOptional("/messages"),
            getOptional("/testimonials"),
            getOptional("/views", { data: { count: 0 } }),
          ]);

        setDatabaseUnavailable(
          [
            projectsRes,
            messagesRes,
            testimonialsRes,
            viewsRes,
          ].some((response) => response.databaseUnavailable)
        );

        const projects = toArray(projectsRes.data);
        const messages = toArray(messagesRes.data);
        const testimonials = toArray(testimonialsRes.data);

        setStats({
          totalProjects: projects.length,
          totalMessages: messages.length,
          totalTestimonials: testimonials.length,
        });

        setRecentProjects(projects.slice(0, 4));
        setRecentMessages(messages.slice(0, 5));
        setViews(viewsRes.data?.count || viewsRes.data?.data?.count || 0);
        setMessageStats({
          New: messages.filter((message) => message.status === "New").length,
          Replied: messages.filter((message) => message.status === "Replied").length,
          Closed: messages.filter((message) => message.status === "Closed").length,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
        setDatabaseUnavailable(false);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const analyticsData = [
    { month: "Projects", value: stats.totalProjects },
    { month: "Messages", value: stats.totalMessages },
    { month: "Testimonials", value: stats.totalTestimonials },
    { month: "Views", value: views },
  ];

  const cards = [
    {
      title: "Projects",
      value: stats.totalProjects,
      caption: "Published portfolio work",
      icon: FolderKanban,
      tone: "bg-[#fbe3dc] text-[#c65f4a] dark:bg-[#c65f4a]/10 dark:text-[#f4a391]",
    },
    {
      title: "New Messages",
      value: messageStats.New,
      caption: "Need your attention",
      icon: Mail,
      tone: "bg-[#fff1e8] text-[#7a2e53] dark:bg-[#7a2e53]/20 dark:text-[#f4a391]",
    },
    {
      title: "Replied",
      value: messageStats.Replied,
      caption: "Conversations handled",
      icon: CheckCircle,
      tone: "bg-[#fbe3dc] text-[#c65f4a] dark:bg-[#c65f4a]/10 dark:text-[#f4a391]",
    },
    {
      title: "Views",
      value: views,
      caption: "Tracked portfolio visits",
      icon: Eye,
      tone: "bg-[#fff8ef] text-[#7c6a61] dark:bg-slate-800 dark:text-slate-300",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-56 rounded-2xl bg-[#eadccf] dark:bg-slate-800" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-36 rounded-2xl bg-[#eadccf] dark:bg-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-[#4f1f39]/20 bg-[#5b233f] p-7 text-white shadow-xl shadow-[#7a2e53]/15">
        <Sparkles className="absolute -right-8 -top-8 h-48 w-48 text-white/10" />
        <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
          <div>
            <p className="inline-flex rounded-md bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f4a391]">
              Admin Overview
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
              {greeting}, Faith
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-white/78">
              Monitor portfolio activity, review messages, and keep your project
              showcase current from one focused dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/admin/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-[#c65f4a] px-5 py-3 font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#ad503e]"
              >
                Manage Projects
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/admin/messages"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                View Messages
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/12 p-5 backdrop-blur">
              <div className="mb-4 flex items-center justify-between text-white/72">
                <CalendarDays className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Today
                </span>
              </div>
              <p className="text-3xl font-extrabold">
                {new Date().toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="mt-1 text-sm text-white/68">Content control room</p>
            </div>
            <div className="rounded-xl bg-white/12 p-5 backdrop-blur">
              <div className="mb-4 flex items-center justify-between text-white/72">
                <Activity className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wide">
                  Inbox
                </span>
              </div>
              <p className="text-3xl font-extrabold">{messageStats.New}</p>
              <p className="mt-1 text-sm text-white/68">New messages waiting</p>
            </div>
          </div>
        </div>
      </section>

      {databaseUnavailable && (
        <section className="rounded-2xl border border-[#f3c8bb] bg-[#fff1e8] p-5 text-[#7a2e53] shadow-sm shadow-[#7a2e53]/5 dark:border-[#c65f4a]/30 dark:bg-[#c65f4a]/10 dark:text-[#f4a391]">
          <h2 className="font-extrabold">
            Database connection unavailable
          </h2>
          <p className="mt-2 text-sm leading-6">
            Your content is still in MongoDB, but the backend cannot reach the
            database right now. Start the backend from your normal terminal with
            internet access to restore live projects, messages, testimonials,
            skills, and services.
          </p>
        </section>
      )}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-[#eadccf] bg-white p-5 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#7c6a61] dark:text-slate-400">
                    {card.title}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-[#241423] dark:text-white">
                    {card.value}
                  </h2>
                  <p className="mt-1 text-sm text-[#6d5b53] dark:text-slate-400">
                    {card.caption}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${card.tone}`}>
                  <Icon size={22} />
                </div>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#c65f4a] dark:text-[#f4a391]">
                <TrendingUp size={16} />
                {databaseUnavailable
                  ? "Waiting for database"
                  : "Live portfolio data"}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#eadccf] bg-white p-6 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950 xl:col-span-2">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#241423] dark:text-white">
                Portfolio Snapshot
              </h2>
              <p className="text-sm text-[#7c6a61] dark:text-slate-400">
                Current totals from your live content.
              </p>
            </div>
            <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-bold text-[#7a2e53] dark:bg-slate-900 dark:text-[#f4a391]">
              Auto-refreshed on load
            </span>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#241423",
                  border: "0",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#c65f4a"
                fill="#fbe3dc"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <Panel title="Recent Messages" to="/admin/messages" icon={Mail}>
            {recentMessages.length ? (
              recentMessages.slice(0, 3).map((message) => (
                <MiniRow
                  key={message._id}
                  title={message.name}
                  subtitle={message.email}
                />
              ))
            ) : (
              <EmptyText>No messages yet</EmptyText>
            )}
          </Panel>

          <Panel title="Recent Projects" to="/admin/projects" icon={MessageSquareQuote}>
            {recentProjects.length ? (
              recentProjects.slice(0, 3).map((project) => (
                <MiniRow
                  key={project._id}
                  title={project.title}
                  subtitle={project.techStack}
                />
              ))
            ) : (
              <EmptyText>No projects yet</EmptyText>
            )}
          </Panel>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, to, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-[#eadccf] bg-white p-5 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-[#241423] dark:text-white">
          <Icon size={18} className="text-[#c65f4a]" />
          {title}
        </h3>
        <Link to={to} className="text-sm font-semibold text-[#c65f4a] hover:text-[#ad503e]">
          View all
        </Link>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MiniRow({ title, subtitle }) {
  return (
    <div className="rounded-lg bg-[#fff8ef] p-3 dark:bg-slate-900">
      <p className="truncate font-semibold text-[#241423] dark:text-white">{title}</p>
      <p className="truncate text-sm text-[#7c6a61] dark:text-slate-400">{subtitle}</p>
    </div>
  );
}

function EmptyText({ children }) {
  return <p className="py-4 text-center text-sm text-[#7c6a61]">{children}</p>;
}

export default Dashboard;
