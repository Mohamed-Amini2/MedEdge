import logo from "../../assets/logo_hero.png";
import { useMemo, useState } from "react";

const BACKEND_URL = "http://localhost:3000";

type ApiResult = { success: boolean; error?: string; data?: any; [k: string]: any };

const safeJson = async (res: Response): Promise<ApiResult & { _status: number }> => {
  const text = await res.text();
  let data: any;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: false, error: text || `HTTP ${res.status}` };
  }
  return { ...data, _status: res.status };
};

interface RegisterParams {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string; // YYYY-MM-DD format
  picture?: string;
}

const registerUser = async (payload: RegisterParams) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return safeJson(res);
};

const Register_Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");

  const phoneDigitsCount = useMemo(
    () => normalizePhone(phone).replace(/\D/g, "").length,
    [phone]
  );

  // Password validation
  const passwordValidation = useMemo(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };
    const allValid = Object.values(checks).every(Boolean);
    return { ...checks, allValid };
  }, [password]);

  const validate = () => {
    const errors: string[] = [];
    
    if (fullName.trim().length < 2) {
      errors.push("Full name must be at least 2 characters");
    }
    if (!email.includes("@")) {
      errors.push("Please enter a valid email");
    }
    if (!passwordValidation.allValid) {
      if (!passwordValidation.length) errors.push("Password must be at least 8 characters");
      if (!passwordValidation.uppercase) errors.push("Password must contain an uppercase letter");
      if (!passwordValidation.lowercase) errors.push("Password must contain a lowercase letter");
      if (!passwordValidation.number) errors.push("Password must contain a number");
    }
    if (phoneDigitsCount < 7) {
      errors.push("Please enter a valid phone number");
    }
    if (!dateOfBirth) {
      errors.push("Please select your date of birth");
    } else {
      // Check minimum age (13 years)
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
      
      if (actualAge < 13) {
        errors.push("You must be at least 13 years old to register");
      }
    }
    
    return errors;
  };

  const Handle_Register = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setValidationErrors([]);

    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await registerUser({
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        phoneNumber: normalizePhone(phone),
        dateOfBirth, // Already in YYYY-MM-DD format from date input
      });

      if (data.success) {
        setSuccessMsg(data.data?.message || "Account created successfully!");
        
        // Store user ID for verification
        if (data.data?.user?.id) {
          localStorage.setItem("pendingVerificationUserId", data.data.user.id);
        }
        
        // Redirect to email verification page or dashboard
        setTimeout(() => {
          window.location.href = "/verify-email";
        }, 1500);
      } else {
        // Handle backend validation errors
        if (data.details && Array.isArray(data.details)) {
          setValidationErrors(data.details.map((d: any) => d.message));
        } else {
          setError(data.error || "Registration failed");
        }
      }
    } catch {
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
      <div className="relative flex min-h-screen items-center justify-center p-4 py-12">
        {/* Glow behind the card */}
        <div className="pointer-events-none absolute h-[560px] w-[560px] rounded-full bg-orange-400/10 blur-3xl" />
        
        {/* Card */}
        <div className="relative bg-white/90 backdrop-blur max-w-md w-full mx-auto p-8 rounded-2xl shadow-xl border border-orange-100">
          {/* Thin top highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={logo} className="w-auto h-20" alt="MedEdge Logo" />
          </div>
          
          {/* Welcome Text */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">Create your account</h1>
            <p className="text-gray-600 text-sm">Register to continue to MedEdge</p>
          </div>
          
          {/* Error Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          {validationErrors.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-red-600 text-sm space-y-1">
                {validationErrors.map((err, idx) => (
                  <li key={idx}>• {err}</li>
                ))}
              </ul>
            </div>
          )}
          
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{successMsg}</p>
            </div>
          )}
          
          {/* Register Form */}
          <form className="space-y-4" onSubmit={Handle_Register}>
            {/* Full name */}
            <div className="space-y-1">
              <label htmlFor="fullName" className="text-xs font-medium text-gray-600">
                Full name
              </label>
              <input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                type="text"
                placeholder="e.g. Mohamed Amini"
                required
                minLength={2}
                maxLength={255}
                autoComplete="name"
              />
            </div>
            
            {/* Email */}
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
                placeholder="name@example.com"
                required
                autoComplete="email"
              />
            </div>
            
            {/* Phone */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="phone" className="text-xs font-medium text-gray-600">
                  Phone
                </label>
                <span
                  className={`text-[11px] ${
                    phone.length === 0
                      ? "text-gray-400"
                      : phoneDigitsCount >= 7
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {phone.length === 0
                    ? "Format: +1234567890"
                    : phoneDigitsCount >= 7
                    ? "Valid"
                    : "Too short"}
                </span>
              </div>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(normalizePhone(e.target.value))}
                className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                type="tel"
                placeholder="+1234567890"
                required
                maxLength={20}
                autoComplete="tel"
              />
            </div>
            
            {/* Date of Birth */}
            <div className="space-y-1">
              <label htmlFor="dateOfBirth" className="text-xs font-medium text-gray-600">
                Date of birth
              </label>
              <input
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                type="date"
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium text-gray-600">
                  Password
                </label>
                <span
                  className={`text-[11px] ${
                    password.length === 0
                      ? "text-gray-400"
                      : passwordValidation.allValid
                      ? "text-green-600"
                      : "text-amber-600"
                  }`}
                >
                  {password.length === 0
                    ? "8+ chars, uppercase, lowercase, number"
                    : passwordValidation.allValid
                    ? "Strong"
                    : "Weak"}
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 pr-14 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  autoComplete="new-password"
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
              {/* Password strength indicators */}
              {password.length > 0 && (
                <div className="flex gap-2 mt-2 text-[10px]">
                  <span className={passwordValidation.length ? "text-green-600" : "text-gray-400"}>
                    ✓ 8+ chars
                  </span>
                  <span className={passwordValidation.uppercase ? "text-green-600" : "text-gray-400"}>
                    ✓ A-Z
                  </span>
                  <span className={passwordValidation.lowercase ? "text-green-600" : "text-gray-400"}>
                    ✓ a-z
                  </span>
                  <span className={passwordValidation.number ? "text-green-600" : "text-gray-400"}>
                    ✓ 0-9
                  </span>
                </div>
              )}
            </div>
            
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-1">
              <a
                href="/login"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
              >
                Already have an account?
              </a>
              <span className="text-[11px] text-gray-500">
                By continuing, you agree to the Terms
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register_Page;