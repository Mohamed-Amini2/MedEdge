import logo from '../../assets/logo_hero.png'
import { useState } from 'react';

const BACKEND_URL = "http://localhost:3000";

// Helper functions for API calls
const sendCode = async (email: string) => {
  const res = await fetch(`${BACKEND_URL}/api/auth/email/send-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const text = await res.text();
  let data: any;
  try { data = JSON.parse(text); }
  catch { data = { success: false, message: text || `HTTP ${res.status}` }; }

  return { ...data, _status: res.status };
};

const verifyCode = async (email: string, code: string, name: string) => {
  const response = await fetch(`${BACKEND_URL}/api/auth/email/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({ email, code, name })
  });
  return response.json();
};

const Login_Page = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isYandexLoading, setIsYandexLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [error, setError] = useState('');

  const Handle_Google_Login = () => {
    setIsGoogleLoading(true);
    window.location.href = `${BACKEND_URL}/api/auth/google/start`;
  };

  const Handle_Yandex_Login = () => {
    setIsYandexLoading(true);
    window.location.href = `${BACKEND_URL}/api/auth/yandex/start`;
  };

  const Handle_Email_Login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailLoading(true);

    try {
      const data = await sendCode(email);

      if (data.success) {
        setStep('verify');
      } else {
        setError(data.message || 'Failed to send verification code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  const Handle_Verify_Code = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsEmailLoading(true);

    try {
      const data = await verifyCode(email, verificationCode, name);

      if (data.success) {
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Invalid verification code');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50/30 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full mx-auto p-8 rounded-2xl shadow-xl border border-orange-100">
      
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            className='w-auto h-24'
            alt="MedEdge Logo"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-2">
            {step === 'input' ? 'Welcome Back' : 'Check Your Email'}
          </h1>
          <p className="text-gray-600 text-sm">
            {step === 'input' 
              ? 'Sign in to continue to MedEdge' 
              : `We sent a verification code to ${email}`}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {step === 'input' ? (
          <>
            {/* Email Login Form */}
            <form className="space-y-4 mb-6" onSubmit={Handle_Email_Login}>
              <div className="relative">
                <input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                  type="text" 
                  placeholder="Your name" 
                  required 
                  minLength={2}
                />
              </div>
              <div className="relative">
                <input 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                  type="email" 
                  placeholder="Email address" 
                  required 
                />
              </div>
              <button 
                type="submit"
                disabled={isEmailLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                {isEmailLoading ? 'Sending code...' : 'Sign In with Email'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">Or use one of these providers</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={Handle_Google_Login}
                disabled={isGoogleLoading}
                className="w-full flex items-center gap-3 justify-center bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-orange-400 py-3.5 rounded-lg text-gray-700 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{isGoogleLoading ? "Signing in..." : "Continue with Google"}</span>
              </button>

              <button 
                type="button"
                onClick={Handle_Yandex_Login}
                disabled={isYandexLoading}
                className="w-full flex items-center gap-3 justify-center bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-orange-400 py-3.5 rounded-lg text-gray-700 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                <img 
                  src="https://yastatic.net/s3/home-static/_/Z/6/nfVezDRqofwQZ5e669DSK84Tw.svg" 
                  alt="Yandex"
                  className="w-5 h-5"
                />
                <span>{isYandexLoading ? "Signing in..." : "Continue with Yandex"}</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Verification Code Form */}
            <form className="space-y-4 mb-6" onSubmit={Handle_Verify_Code}>
              <div className="relative">
                <input 
                  id="code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 text-center text-2xl tracking-widest font-bold transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
                  type="text" 
                  placeholder="000000" 
                  required 
                  maxLength={6}
                  pattern="\d{6}"
                />
              </div>
              <button 
                type="submit"
                disabled={isEmailLoading || verificationCode.length !== 6}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                {isEmailLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
            </form>

            {/* Back button */}
            <button
              onClick={() => {
                setStep('input');
                setVerificationCode('');
                setError('');
              }}
              className="w-full text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
            >
              ← Back to login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login_Page;