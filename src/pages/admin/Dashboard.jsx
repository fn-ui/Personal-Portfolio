import { useEffect, useState } from "react";
import API from "../../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    testimonials: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        // FETCH ALL DATA
        const [
          projectsRes,
          messagesRes,
          testimonialsRes,
        ] = await Promise.all([
          API.get("/projects"),
          API.get("/messages"),
          API.get("/testimonials"),
        ]);

        setStats({
          projects: projectsRes.data.length,
          messages: messagesRes.data.length,
          testimonials:
            testimonialsRes.data.length,
        });
      } catch (error) {
        console.log(
          "DASHBOARD ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to your portfolio admin panel.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* PROJECTS */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">
            Total Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold text-blue-600">
            {loading ? "..." : stats.projects}
          </h2>
        </div>

        {/* MESSAGES */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">
            Total Messages
          </p>

          <h2 className="mt-4 text-4xl font-bold text-green-600">
            {loading ? "..." : stats.messages}
          </h2>
        </div>

        {/* TESTIMONIALS */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-slate-500">
            Total Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-bold text-purple-600">
            {loading
              ? "..."
              : stats.testimonials}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;