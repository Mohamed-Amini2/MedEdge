import { useState } from 'react'
import {
  User, Bell, Shield, Palette, Globe, CreditCard, HelpCircle, Plus ,
  ChevronRight, Camera, Mail, Phone, MapPin, Calendar, Check,
  Moon, Sun, Monitor, Lock, Key, Smartphone, Eye, EyeOff,
  Download, Trash2, LogOut, AlertTriangle, Save,
} from 'lucide-react'

const TERRA = '#A33A10'

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
]

const NOTIFICATION_SETTINGS = [
  { id: 'appointments', label: 'Appointment Reminders', desc: 'Get notified before your appointments', enabled: true },
  { id: 'messages', label: 'New Messages', desc: 'Receive notifications for new doctor messages', enabled: true },
  { id: 'records', label: 'Medical Records', desc: 'Updates when new records are available', enabled: false },
  { id: 'prescriptions', label: 'Prescription Refills', desc: 'Reminders when prescriptions need refilling', enabled: true },
  { id: 'promotions', label: 'Health Tips & News', desc: 'Occasional health tips and updates', enabled: false },
]

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={`relative w-12 h-7 rounded-full transition-all duration-300 ${enabled ? 'bg-[#A33A10]' : 'bg-[#D6CCC2]'}`}
  >
    <span
      className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${enabled ? 'left-6' : 'left-1'}`}
    />
  </button>
)

const Settings_Client = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [notifications, setNotifications] = useState(NOTIFICATION_SETTINGS)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, enabled: !n.enabled } : n)))
  }

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${TERRA}12`, color: TERRA }}
          >
            SETTINGS
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">Account Settings</h1>
        <p className="text-sm text-[#7A6458] mt-2">Manage your account preferences and settings.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <nav className="bg-white rounded-xl border border-[#D6CCC2] overflow-hidden shadow-sm sticky top-6">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-all border-l-4 ${
                    active
                      ? 'bg-[#A33A10]/5 border-[#A33A10]'
                      : 'border-transparent hover:bg-[#F5F0EB]'
                  }`}
                >
                  <Icon className="w-5 h-5" style={{ color: active ? TERRA : '#8A7568' }} />
                  <span className={`text-sm font-medium ${active ? 'text-[#1A0F0A]' : 'text-[#5C4A3E]'}`}>
                    {tab.label}
                  </span>
                  {active && <ChevronRight className="w-4 h-4 ml-auto" style={{ color: TERRA }} />}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-8">Personal Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-8 mb-10 pb-8 border-b border-[#EDE6DE]">
                  <div className="relative group">
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                      style={{ backgroundColor: TERRA }}
                    >
                      MA
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white border border-[#D6CCC2] flex items-center justify-center shadow-md hover:shadow-lg transition-all group-hover:scale-110">
                      <Camera className="w-5 h-5 text-[#5C4A3E]" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1A0F0A]">Mohamed Amini</h3>
                    <p className="text-sm text-[#8A7568] mt-1">Patient ID: #PAT-2024-1847</p>
                    <p className="text-sm text-[#8A7568]">Member since January 2024</p>
                    <button className="text-sm font-medium mt-3 hover:underline" style={{ color: TERRA }}>
                      Change photo
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: User, label: 'Full Name', value: 'Mohamed Amini', type: 'text' },
                    { icon: Mail, label: 'Email Address', value: 'mohamed@example.com', type: 'email' },
                    { icon: Phone, label: 'Phone Number', value: '+1 (555) 123-4567', type: 'tel' },
                    { icon: Calendar, label: 'Date of Birth', value: '1990-05-15', type: 'date' },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                        {field.label}
                      </label>
                      <div className="relative">
                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] focus:outline-none focus:border-[#A33A10]/50 focus:ring-2 focus:ring-[#A33A10]/10 transition-all"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                      <input
                        type="text"
                        defaultValue="123 Health Street, Medical City, MC 12345"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] focus:outline-none focus:border-[#A33A10]/50 focus:ring-2 focus:ring-[#A33A10]/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-8 pt-8 border-t border-[#EDE6DE]">
                  <button className="px-6 py-3 rounded-xl border border-[#D6CCC2] text-sm font-semibold text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[#A33A10]/20"
                    style={{ backgroundColor: TERRA }}
                  >
                    {saved ? (
                      <>
                        <Check className="w-4 h-4" /> Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-6">Emergency Contact</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Sarah Amini"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] focus:outline-none focus:border-[#A33A10]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Relationship
                    </label>
                    <input
                      type="text"
                      defaultValue="Spouse"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] focus:outline-none focus:border-[#A33A10]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 987-6543"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] focus:outline-none focus:border-[#A33A10]/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm animate-fadeIn">
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Notification Preferences</h2>
              <p className="text-sm text-[#8A7568] mb-8">Choose how you want to be notified about important updates.</p>

              <div className="space-y-2">
                {notifications.map((setting, i) => (
                  <div
                    key={setting.id}
                    className={`flex items-center justify-between p-5 rounded-xl transition-all ${
                      setting.enabled ? 'bg-[#A33A10]/5' : 'hover:bg-[#F5F0EB]'
                    } ${i !== notifications.length - 1 ? '' : ''}`}
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-[#1A0F0A]">{setting.label}</h3>
                      <p className="text-xs text-[#8A7568] mt-1">{setting.desc}</p>
                    </div>
                    <Toggle enabled={setting.enabled} onChange={() => toggleNotification(setting.id)} />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[#EDE6DE]">
                <h3 className="text-sm font-semibold text-[#1A0F0A] mb-4">Notification Channels</h3>
                <div className="flex gap-4">
                  {['Email', 'SMS', 'Push Notifications'].map((channel) => (
                    <button
                      key={channel}
                      className="flex items-center gap-3 px-5 py-3 rounded-xl border-2 border-[#A33A10] text-sm font-medium hover:bg-[#A33A10]/5 transition-all"
                      style={{ color: TERRA }}
                    >
                      <div className="w-5 h-5 rounded border-2 border-[#A33A10] flex items-center justify-center">
                        <Check className="w-3 h-3" style={{ color: TERRA }} />
                      </div>
                      {channel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-8">Change Password</h2>
                <div className="space-y-5 max-w-lg">
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm"
                        placeholder="••••••••"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89080] hover:text-[#5C4A3E]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      New Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                      <input
                        type="password"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                      <input
                        type="password"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <button
                    className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
                    style={{ backgroundColor: TERRA }}
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-6">Two-Factor Authentication</h2>
                <div className="flex items-center justify-between p-5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${TERRA}12` }}>
                      <Smartphone className="w-6 h-6" style={{ color: TERRA }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#1A0F0A]">Authenticator App</h3>
                      <p className="text-xs text-[#8A7568] mt-0.5">Use an authenticator app for additional security</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl border border-[#D6CCC2] text-sm font-semibold text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
                    Enable
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-red-200 p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-red-600 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Danger Zone
                </h2>
                <div className="space-y-4">
                  <button className="flex items-center gap-4 w-full p-5 rounded-xl border border-[#EDE6DE] hover:border-red-200 hover:bg-red-50 transition-all group">
                    <Download className="w-6 h-6 text-[#5C4A3E] group-hover:text-red-500" />
                    <div className="text-left flex-1">
                      <h3 className="text-sm font-semibold text-[#1A0F0A] group-hover:text-red-600">Download My Data</h3>
                      <p className="text-xs text-[#8A7568]">Get a copy of all your personal data</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#A89080] group-hover:text-red-400" />
                  </button>
                  <button className="flex items-center gap-4 w-full p-5 rounded-xl border border-red-200 hover:bg-red-50 transition-all group">
                    <Trash2 className="w-6 h-6 text-red-500" />
                    <div className="text-left flex-1">
                      <h3 className="text-sm font-semibold text-red-600">Delete Account</h3>
                      <p className="text-xs text-[#8A7568]">Permanently delete your account and all data</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm animate-fadeIn">
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-2">Theme</h2>
              <p className="text-sm text-[#8A7568] mb-8">Choose how the application looks to you.</p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { id: 'light', label: 'Light', desc: 'Clean and bright', icon: Sun },
                  { id: 'dark', label: 'Dark', desc: 'Easy on the eyes', icon: Moon },
                  { id: 'system', label: 'System', desc: 'Match your device', icon: Monitor },
                ].map((option) => {
                  const Icon = option.icon
                  const active = theme === option.id
                  return (
                    <button
                      key={option.id}
                      onClick={() => setTheme(option.id as typeof theme)}
                      className={`p-8 rounded-2xl border-2 text-center transition-all hover:shadow-md ${
                        active ? 'border-[#A33A10] bg-[#A33A10]/5 shadow-md' : 'border-[#EDE6DE] hover:border-[#D6CCC2]'
                      }`}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: active ? `${TERRA}15` : '#F5F0EB', color: active ? TERRA : '#8A7568' }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-base font-semibold text-[#1A0F0A] block">{option.label}</span>
                      <span className="text-xs text-[#8A7568] mt-1 block">{option.desc}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-10 pt-8 border-t border-[#EDE6DE]">
                <h3 className="text-sm font-semibold text-[#1A0F0A] mb-4">Language & Region</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Language
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                      <select className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] appearance-none focus:outline-none focus:border-[#A33A10]/50">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>Arabic</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#5C4A3E] uppercase tracking-wider mb-2 block">
                      Timezone
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A89080]" />
                      <select className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE6DE] bg-[#FDFCFA] text-sm text-[#1A0F0A] appearance-none focus:outline-none focus:border-[#A33A10]/50">
                        <option>Eastern Time (ET)</option>
                        <option>Pacific Time (PT)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-6">Current Plan</h2>
                <div
                  className="flex items-center justify-between p-6 rounded-2xl border-2"
                  style={{ borderColor: TERRA, backgroundColor: `${TERRA}05` }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#1A0F0A]">Premium Health</h3>
                      <span
                        className="text-[10px] px-2 py-1 rounded-full font-bold"
                        style={{ backgroundColor: TERRA, color: '#fff' }}
                      >
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-sm text-[#8A7568]">Full access to all features, priority support, unlimited records</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold" style={{ color: TERRA }}>
                      $29<span className="text-base font-normal text-[#8A7568]">/month</span>
                    </p>
                    <p className="text-xs text-[#8A7568] mt-1">Next billing: Feb 1, 2026</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
                    style={{ backgroundColor: TERRA }}
                  >
                    Upgrade Plan
                  </button>
                  <button className="px-5 py-2.5 rounded-xl border border-[#D6CCC2] text-sm font-semibold text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
                    View All Plans
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-6">Payment Method</h2>
                <div className="flex items-center justify-between p-5 rounded-xl border border-[#EDE6DE]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A0F0A]">•••• •••• •••• 4242</p>
                      <p className="text-xs text-[#8A7568]">Expires 12/27</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm font-medium hover:underline" style={{ color: TERRA }}>
                      Edit
                    </button>
                    <span className="text-[#D6CCC2]">|</span>
                    <button className="text-sm font-medium text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
                <button className="mt-4 text-sm font-medium hover:underline flex items-center gap-1" style={{ color: TERRA }}>
                  <Plus className="w-4 h-4" />
                  Add new payment method
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1A0F0A] mb-6">Billing History</h2>
                <div className="space-y-3">
                  {[
                    { date: 'Jan 1, 2026', amount: '$29.00', status: 'Paid' },
                    { date: 'Dec 1, 2025', amount: '$29.00', status: 'Paid' },
                    { date: 'Nov 1, 2025', amount: '$29.00', status: 'Paid' },
                  ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-[#FDFCFA] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F0EB] flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#8A7568]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1A0F0A]">Invoice - {invoice.date}</p>
                          <p className="text-xs text-[#8A7568]">Premium Health Plan</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-[#1A0F0A]">{invoice.amount}</span>
                        <span className="text-[10px] px-2 py-1 rounded-full font-medium bg-green-50 text-green-600">
                          {invoice.status}
                        </span>
                        <button className="text-sm font-medium hover:underline" style={{ color: TERRA }}>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Help Tab */}
          {activeTab === 'help' && (
            <div className="bg-white rounded-xl border border-[#D6CCC2] p-8 shadow-sm animate-fadeIn">
              <h2 className="text-xl font-semibold text-[#1A0F0A] mb-8">How can we help?</h2>
              <div className="space-y-3">
                {[
                  { icon: HelpCircle, label: 'FAQ', desc: 'Find answers to common questions' },
                  { icon: MessageSquare, label: 'Contact Support', desc: 'Get in touch with our team' },
                  { icon: Shield, label: 'Privacy Policy', desc: 'Learn how we protect your data' },
                  { icon: FileText, label: 'Terms of Service', desc: 'Read our terms and conditions' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      className="flex items-center justify-between w-full p-5 rounded-xl border border-[#EDE6DE] hover:border-[#D6CCC2] hover:bg-[#FDFCFA] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#F5F0EB] flex items-center justify-center group-hover:bg-[#A33A10]/10 transition-colors">
                          <Icon className="w-5 h-5 text-[#8A7568] group-hover:text-[#A33A10] transition-colors" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-sm font-semibold text-[#1A0F0A]">{item.label}</h3>
                          <p className="text-xs text-[#8A7568]">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#A89080] group-hover:text-[#A33A10] group-hover:translate-x-1 transition-all" />
                    </button>
                  )
                })}
              </div>

              <div className="mt-10 pt-8 border-t border-[#EDE6DE]">
                <button className="flex items-center gap-3 text-base font-semibold text-red-500 hover:text-red-600 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// Add missing import for Clock
import { Clock, MessageSquare, FileText } from 'lucide-react'

export default Settings_Client