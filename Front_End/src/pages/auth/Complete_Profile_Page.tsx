import logo from "../../assets/logo_hero.png";
import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:3000";

const verifyEmail = async (userId: string, otp: string) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, otp }),
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

const resendOtp = async (userId: string) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId }),
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

const VerifyEmail_Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    // Get user ID from localStorage (set during registration)
    const storedUserId = localStorage.getItem("pendingVerificationUserId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("No pending verification found. Please register first.");
    }
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError("User ID not found. Please register again.");
      return;
    }

    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await verifyEmail(userId, otp);

      if (data.success) {
        setSuccessMsg("Email verified successfully! Redirecting...");
        localStorage.removeItem("pendingVerificationUserId");
        
        // Store user info if provided
        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }
        
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setError(data.error || data.message || "Invalid verification code");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!userId) {
      setError("User ID not found. Please register again.");
      return;
    }

    setError("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await resendOtp(userId);

      if (data.success) {
        setSuccessMsg("Verification code sent! Check your email.");
        setResendCooldown(60); // 60 second cooldown
      } else {
        setError(data.error || data.message || "Failed to resend code");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
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
            <h1 className="text-2xl font-bold text-black mb-2">Verify Your Email</h1>
            <p className="text-gray-600 text-sm">
              We sent a 6-digit verification code to your email
            </p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {/* Success Message */}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{successMsg}</p>
            </div>
          )}
          
          {/* Verification Form */}
          <form className="space-y-4 mb-4" onSubmit={handleVerify}>
            <div className="relative">
              <input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 text-center text-2xl tracking-widest font-bold transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                type="text"
                placeholder="000000"
                required
                maxLength={6}
                pattern="\d{6}"
                inputMode="numeric"
                autoComplete="one-time-code"
                disabled={!userId}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6 || !userId}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
          
          {/* Resend + Back */}
          <div className="flex items-center justify-between gap-3">
            <a
              href="/signup"
              className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
            >
              ← Back to signup
            </a>
            <button
              type="button"
              onClick={handleResend}
              disabled={isLoading || resendCooldown > 0 || !userId}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
            </button>
          </div>
          
          {/* Help text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the code? Check your spam folder or try resending
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyEmail_Page;