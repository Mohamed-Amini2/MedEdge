import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, FileText, MessageSquare, Pill, Settings } from "lucide-react"
import logo from '../../../assets/image-logo.png'

const TERRA = '#A33A10'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Appointments',
    path: '/dashboard/appointments',
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    label: 'Records',
    path: '/dashboard/records',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: 'Messages',
    path: '/dashboard/messages',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'Prescriptions',
    path: '/dashboard/prescriptions',
    icon: <Pill className="w-5 h-5" />,
  },
  {
    label: 'Settings',
    path: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />,
  },
]

const Sidebar = () => {
  const navigate  = useNavigate()
  const location  = useLocation()

  const isActive = (path: string) =>
    path === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(path)

  return (
    <aside className="fixed left-0 top-0 w-1/4 h-screen bg-[#EDE6DE] border-r border-[#D6CCC2] flex flex-col shadow-sm z-10">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#D6CCC2]">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-9 h-9" alt="logo" />
          <div>
            <div className="serif text-lg tracking-tight leading-none text-[#1A0F0A]">MedEdge</div>
            <div className="text-[9px] tracking-[0.22em] mt-0.5 font-medium" style={{ color: TERRA }}>
              CARE WITH PRECISION
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs tracking-[0.15em] transition-all duration-300 ${
              isActive(item.path)
                ? 'text-white shadow-md'
                : 'text-[#5C4A3E] hover:text-[#1A0F0A] hover:bg-[#E2D8CE]'
            }`}
            style={isActive(item.path) ? { backgroundColor: TERRA } : undefined}
          >
            {item.icon}
            {item.label.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="px-6 py-5 border-t border-[#D6CCC2]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{ backgroundColor: TERRA }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[#1A0F0A] truncate">Mohamed Amini</div>
            <div className="text-xs text-[#8A7568] truncate">Mohamedamini740@gmail.com</div>
          </div>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar