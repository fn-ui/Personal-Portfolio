import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Code2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";

import API from "../../api/axios";
import workspaceImg from "../../assets/developer-workspace-hero-background.webp";
import { setRefreshToken, setToken } from "../../utils/tokenManager";
import { validateEmail } from "../../utils/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await API.post("/auth/login", { email, password });

      if (response.data.success) {
        setToken(response.data.token);
        if (response.data.refreshToken) setRefreshToken(response.data.refreshToken);

        toast.success("Login successful!");
        setEmail("");
        setPassword("");
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {
      let errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";

      if (err.response?.status === 0 || err.code === "ERR_NETWORK") {
        errorMsg =
          "Login server is unreachable. Check the deployed API URL and backend CORS settings.";
      } else if (err.code === "ECONNABORTED") {
        errorMsg =
          "Login request timed out. The deployed API may be asleep or unavailable.";
      }

      setErrors({ general: errorMsg });
      toast.error(errorMsg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#241423] px-5 py-6 text-[#241423]">
      <img
        src={workspaceImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,12,20,0.82)_0%,rgba(36,20,35,0.55)_42%,rgba(255,248,239,0.2)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(0deg,rgba(20,12,20,0.78)_0%,rgba(20,12,20,0)_100%)]" />

      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
        <a href="/" className="flex w-fit items-center gap-3 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/15 text-[#f2a38d] backdrop-blur">
            <Code2 className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xl font-bold">Admin Studio</span>
            <span className="text-xs text-[#f8e8df]">
              Manage your portfolio with clarity.
            </span>
          </span>
        </a>

        <div className="flex flex-1 items-center justify-center py-6 lg:justify-start">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/25 bg-[#fffaf3]/92 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-6">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#fbe3dc]" />

              <div className="relative mb-5 text-center">
                <div className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-xl bg-[#fbe3dc] text-[#c65f4a]">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <p className="section-eyebrow">Secure access</p>
                <h1 className="mt-2 text-3xl font-extrabold text-[#241423]">
                  Welcome back
                </h1>
                <p className="mt-2 text-xs leading-5 text-[#6d5b53]">
                  Sign in to update projects, messages, and testimonials.
                </p>
              </div>

              {errors.general && (
                <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              <div className="mb-4">
                <label className="mb-2 block text-xs font-bold text-[#5f4d55]">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b4a095]" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-xl border bg-white/80 px-4 py-3 pl-11 text-sm outline-none transition ${
                      errors.email
                        ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                        : "border-[#eadccf] focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40"
                    }`}
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-2 block text-xs font-bold text-[#5f4d55]">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b4a095]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className={`w-full rounded-xl border bg-white/80 px-4 py-3 pl-11 pr-11 text-sm outline-none transition ${
                      errors.password
                        ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                        : "border-[#eadccf] focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40"
                    }`}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7c6a61] transition hover:text-[#c65f4a]"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="mb-5 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 text-[#6d5b53]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-[#eadccf] accent-[#c65f4a]"
                  />
                  Remember me
                </label>
                <a
                  href="#support"
                  className="font-semibold text-[#c65f4a] hover:text-[#ad503e]"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c65f4a] py-3 font-bold text-white shadow-lg shadow-[#c65f4a]/25 transition hover:bg-[#ad503e] disabled:bg-[#d88f7a]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <div className="mt-5 flex items-center gap-4 border-t border-[#eadccf] pt-4">
                <span className="h-px flex-1 bg-[#eadccf]" />
                <Code2 className="h-5 w-5 text-[#c65f4a]" />
                <span className="h-px flex-1 bg-[#eadccf]" />
              </div>

              <p className="mt-4 text-center text-[11px] text-[#7c6a61]">
                Demo credentials are set in your environment variables.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
