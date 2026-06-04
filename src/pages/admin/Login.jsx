import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // SAVE JWT TOKEN
      localStorage.setItem("token", data.token);

      // REDIRECT
      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.message || "Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0f172a] px-6">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-[#111827] p-8 shadow-2xl border border-gray-100 dark:border-gray-800"
      >

        <div className="mb-8 text-center">

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Admin Login
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Access your portfolio dashboard
          </p>

        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-red-100 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          className="mb-4 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 outline-none focus:border-blue-500 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 outline-none focus:border-blue-500 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-60 shadow-lg shadow-blue-500/20"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login;