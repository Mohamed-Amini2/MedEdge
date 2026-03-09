import logo from "../../assets/logo_hero.png";
import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";

// API functions matching your backend endpoints
const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: false, error: text || `HTTP ${res.status}` };
  }
  return { ...data, _status: res.status };
};

const Login_Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const Handle_Login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(email.trim().toLowerCase(), password);
      
      if (data.success) {
        // Store user info if needed
        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }
        window.location.href = "/dashboard";
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50/40 to-amber-50/40" />
      
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -right-40 h-[28rem] w-[28rem] rounded-full bg-amber-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-sky-300/15 blur-3xl" />
      
      {/* Centered content */}
      <div className="relative flex min-h-screen items-center justify-center p-4">
        {/* Glow behind the card */}
        <div className="pointer-events-none absolute h-[520px] w-[520px] rounded-full bg-orange-400/10 blur-3xl" />
        
        {/* Card */}
        <div className="relative bg-white/90 backdrop-blur max-w-md w-full mx-auto p-8 rounded-2xl shadow-xl border border-orange-100">
          {/* Thin top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} className="w-auto h-24" alt="MedEdge Logo" />
          </div>
          
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">Sign in to continue to MedEdge</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {/* Login Form */}
          <form className="space-y-4 mb-6" onSubmit={Handle_Login}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-xs font-medium text-gray-600">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                type="email"
                placeholder="Email address"
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-xs font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 pr-14 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            
            <div className="flex justify-between items-center">
              <a
                href="/signup"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
              >
                Don&apos;t have an account?
              </a>
              <a
                href="/forgot-password"
                className="text-gray-600 hover:text-gray-800 text-sm transition-colors"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login_Page;