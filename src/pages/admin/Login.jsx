import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";
import { AlertCircle, Loader2, LockKeyhole, Sparkles } from "lucide-react";
import { setToken, setRefreshToken } from "../../utils/tokenManager";
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Store tokens
        setToken(response.data.token);
        if (response.data.refreshToken) {
          setRefreshToken(response.data.refreshToken);
        }

        toast.success("Login successful! 🎉");
        
        // Reset form
        setEmail("");
        setPassword("");
        
        // Navigate to dashboard
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Login failed. Please try again.";

      setErrors({ general: errorMsg });
      toast.error(errorMsg);

      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fff8ef] px-6 py-10 text-[#241423] dark:bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md"
      >
        {/* CARD */}
        <div className="relative overflow-hidden rounded-2xl border border-[#eadccf] bg-white p-8 shadow-2xl shadow-[#7a2e53]/10 dark:border-slate-800 dark:bg-slate-950">
          <Sparkles className="absolute -right-8 -top-8 h-36 w-36 text-[#fbe3dc]" />
          {/* HEADER */}
          <div className="relative mb-8 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-xl bg-[#fbe3dc] text-[#c65f4a]">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <h2 className="mb-2 text-3xl font-extrabold text-[#241423] dark:text-white">
              Admin Portal
            </h2>

            <p className="text-[#6d5b53] dark:text-slate-400">
              Manage your portfolio
            </p>
          </div>

          {/* GENERAL ERROR */}
          {errors.general && (
            <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.general}
              </p>
            </div>
          )}

          {/* EMAIL FIELD */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-[#5f4d55] dark:text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full rounded-xl border bg-[#fffaf3] p-4 outline-none transition-all dark:bg-slate-900 dark:text-white ${
                errors.email
                  ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                  : "border-[#eadccf] dark:border-slate-700 focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:focus:ring-[#c65f4a]/20"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
              disabled={loading}
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-[#5f4d55] dark:text-slate-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-[#fffaf3] p-4 pr-12 outline-none transition-all dark:bg-slate-900 dark:text-white ${
                  errors.password
                    ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30"
                    : "border-[#eadccf] dark:border-slate-700 focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:focus:ring-[#c65f4a]/20"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: "" });
                  }
                }}
                disabled={loading}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7c6a61] hover:text-[#c65f4a] dark:text-slate-400 dark:hover:text-[#f4a391]"
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c65f4a] py-4 font-bold text-white shadow-lg shadow-[#c65f4a]/20 transition-all hover:bg-[#ad503e] disabled:bg-[#d88f7a]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* DEMO CREDENTIALS */}
          <div className="mt-6 border-t border-[#eadccf] pt-6 dark:border-slate-800">
            <p className="text-center text-xs text-[#7c6a61] dark:text-slate-400">
              Demo credentials are set in your environment variables
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
