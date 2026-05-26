import { Outlet, Link, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md p-6">

        <h2 className="mb-8 text-2xl font-bold text-blue-600">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">

          <Link
            to="/admin/dashboard"
            className="rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/projects"
            className="rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Projects
          </Link>

          <Link
            to="/admin/messages"
            className="rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Messages
          </Link>

          <Link
            to="/admin/testimonials"
            className="rounded-xl px-4 py-3 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Testimonials
          </Link>

        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full rounded-xl bg-red-500 py-3 text-white transition hover:bg-red-600"
        >
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;