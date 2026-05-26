import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <p className="mb-6 text-slate-600">
          You are now logged in. This is your control center.
        </p>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-500 px-6 py-3 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;