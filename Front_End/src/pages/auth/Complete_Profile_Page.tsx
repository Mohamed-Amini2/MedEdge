import logo from '../../assets/logo_hero.png'
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const BACKEND_URL = "http://localhost:3000";

// Helper function for API call
const completeProfile = async (profileData: {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
}) => {
  const response = await fetch(`${BACKEND_URL}/api/user/complete-profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(profileData)
  });
  return response.json();
};

const Complete_Profile_Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');

  const Handle_Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!phoneNumber) {
        setError('Please enter a valid phone number');
        setIsLoading(false);
        return;
      }

      const data = await completeProfile({
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber
      });

      if (data.success) {
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Failed to complete profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(dateOfBirth);

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
            Complete Your Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Help us get to know you better
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Profile Form */}
        <form className="space-y-4" onSubmit={Handle_Submit}>
          {/* First Name */}
          <div className="relative">
            <input 
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
              type="text" 
              placeholder="First name" 
              required 
              minLength={2}
            />
          </div>

          {/* Last Name */}
          <div className="relative">
            <input 
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
              type="text" 
              placeholder="Last name" 
              required 
              minLength={2}
            />
          </div>

          {/* Date of Birth */}
          <div className="relative">
            <input 
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200" 
              type="date" 
              placeholder="Date of birth" 
              required 
              max={new Date().toISOString().split('T')[0]}
            />
            {age && (
              <p className="text-sm text-gray-500 mt-1 px-1">
                Age: {age} years old
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="relative">
            <PhoneInput
              international
              defaultCountry="US"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter phone number"
              className="phone-input-custom"
              numberInputProps={{
                className: 'w-full bg-white border-2 border-gray-300 text-gray-800 placeholder-gray-400 outline-none rounded-lg py-3 px-4 transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200'
              }}
            />
            <style>{`
              .phone-input-custom {
                width: 100%;
              }
              .phone-input-custom .PhoneInputInput {
                width: 100%;
                background: white;
                border: 2px solid #d1d5db;
                color: #1f2937;
                outline: none;
                border-radius: 0.5rem;
                padding: 0.75rem 1rem;
                transition: all 0.3s;
                font-size: 1rem;
              }
              .phone-input-custom .PhoneInputInput::placeholder {
                color: #9ca3af;
              }
              .phone-input-custom .PhoneInputInput:focus {
                border-color: #ea580c;
                ring: 2px;
                ring-color: #fed7aa;
              }
              .phone-input-custom .PhoneInputCountry {
                margin-right: 0.5rem;
                padding: 0.5rem;
                border: none;
                background: transparent;
              }
              .phone-input-custom .PhoneInputCountrySelect {
                background: transparent;
                border: none;
                outline: none;
                cursor: pointer;
              }
              .phone-input-custom .PhoneInputCountryIcon {
                width: 1.5rem;
                height: 1.5rem;
              }
            `}</style>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>

        {/* Skip Option */}
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors mt-4"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

export default Complete_Profile_Page;