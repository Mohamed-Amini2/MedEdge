import { useState } from 'react'
import {
  Pill, Search, Filter, Calendar, Clock, RefreshCw, AlertTriangle,
  Check, ChevronRight, User, Building2, FileText, Download, Plus,
  Bell, X, CheckCircle, Package,
} from 'lucide-react'

const TERRA = '#A33A10'

interface Prescription {
  id: number
  name: string
  genericName: string
  dosage: string
  frequency: string
  instructions: string
  doctor: string
  pharmacy: string
  startDate: string
  endDate: string
  refillsLeft: number
  totalRefills: number
  daysUntilRefill: number
  status: 'active' | 'refill-needed' | 'expired' | 'completed'
  pillsRemaining: number
  totalPills: number
}

const PRESCRIPTIONS: Prescription[] = [
  {
    id: 1,
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    dosage: '500mg',
    frequency: 'Twice daily',
    instructions: 'Take with meals to reduce stomach upset',
    doctor: 'Dr. Sarah Mitchell',
    pharmacy: 'CVS Pharmacy - Downtown',
    startDate: '2025-11-01',
    endDate: '2026-05-01',
    refillsLeft: 3,
    totalRefills: 6,
    daysUntilRefill: 12,
    status: 'active',
    pillsRemaining: 24,
    totalPills: 60,
  },
  {
    id: 2,
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    instructions: 'Take in the morning, avoid potassium supplements',
    doctor: 'Dr. James Anderson',
    pharmacy: 'Walgreens - Main St',
    startDate: '2025-10-15',
    endDate: '2026-04-15',
    refillsLeft: 1,
    totalRefills: 5,
    daysUntilRefill: 4,
    status: 'refill-needed',
    pillsRemaining: 4,
    totalPills: 30,
  },
  {
    id: 3,
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    dosage: '20mg',
    frequency: 'Once at night',
    instructions: 'Take at bedtime for best results',
    doctor: 'Dr. James Anderson',
    pharmacy: 'CVS Pharmacy - Downtown',
    startDate: '2025-12-01',
    endDate: '2026-06-01',
    refillsLeft: 5,
    totalRefills: 6,
    daysUntilRefill: 20,
    status: 'active',
    pillsRemaining: 20,
    totalPills: 30,
  },
  {
    id: 4,
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    dosage: '20mg',
    frequency: 'Once daily',
    instructions: 'Take 30 minutes before breakfast',
    doctor: 'Dr. Michael Chen',
    pharmacy: 'Walgreens - Main St',
    startDate: '2025-09-01',
    endDate: '2025-12-01',
    refillsLeft: 0,
    totalRefills: 3,
    daysUntilRefill: 0,
    status: 'expired',
    pillsRemaining: 0,
    totalPills: 30,
  },
]

const STATS = [
  { label: 'Active Medications', value: '3', icon: Pill, color: TERRA },
  { label: 'Refills Available', value: '9', icon: RefreshCw, color: '#0D9488' },
  { label: 'Needs Attention', value: '1', icon: AlertTriangle, color: '#EA580C' },
  { label: 'Next Refill', value: '4 days', icon: Calendar, color: '#2563EB' },
]

const TABS = ['All', 'Active', 'Refill Needed', 'Expired']

const StatusBadge = ({ status }: { status: Prescription['status'] }) => {
  const config = {
    'active': { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
    'refill-needed': { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Refill Needed' },
    'expired': { bg: 'bg-red-50', text: 'text-red-600', label: 'Expired' },
    'completed': { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Completed' },
  }[status]

  return (
    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

const ProgressBar = ({ current, total, color }: { current: number; total: number; color: string }) => (
  <div className="w-full h-1.5 bg-[#EDE6DE] rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-500"
      style={{ width: `${(current / total) * 100}%`, backgroundColor: color }}
    />
  </div>
)

const PrescriptionCard = ({ rx, onClick }: { rx: Prescription; onClick: () => void }) => {
  const isUrgent = rx.status === 'refill-needed' || rx.daysUntilRefill <= 5

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border shadow-sm p-5 transition-all hover:shadow-md cursor-pointer ${
        isUrgent ? 'border-amber-200' : 'border-[#D6CCC2]'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${TERRA}12` }}
        >
          <Pill className="w-6 h-6" style={{ color: TERRA }} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-sm font-semibold text-[#1A0F0A]">{rx.name}</h3>
              <p className="text-xs text-[#8A7568]">{rx.genericName}</p>
            </div>
            <StatusBadge status={rx.status} />
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs text-[#5C4A3E]">
            <span className="font-medium">{rx.dosage}</span>
            <span className="w-1 h-1 rounded-full bg-[#D6CCC2]" />
            <span>{rx.frequency}</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-[#8A7568]">Pills remaining</span>
              <span className="text-[#1A0F0A] font-medium">{rx.pillsRemaining}/{rx.totalPills}</span>
            </div>
            <ProgressBar
              current={rx.pillsRemaining}
              total={rx.totalPills}
              color={rx.pillsRemaining <= 10 ? '#EA580C' : TERRA}
            />
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EDE6DE]">
            <div className="flex items-center gap-4 text-[11px] text-[#A89080]">
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {rx.doctor}
              </span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                {rx.refillsLeft} refills left
              </span>
            </div>
            {rx.status === 'refill-needed' && (
              <button
                onClick={(e) => { e.stopPropagation() }}
                className="px-3 py-1.5 rounded-lg text-white text-[11px] font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: TERRA }}
              >
                Request Refill
              </button>
            )}
          </div>
        </div>
      </div>

      {isUrgent && rx.status !== 'expired' && (
        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 text-amber-700 text-xs">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Refill needed in {rx.daysUntilRefill} days</span>
        </div>
      )}
    </div>
  )
}

const DetailDrawer = ({ rx, onClose }: { rx: Prescription; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex justify-end">
    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
    <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slideLeft">
      <div className="sticky top-0 bg-white border-b border-[#EDE6DE] px-6 py-5 flex items-center justify-between z-10">
        <h3 className="text-lg font-semibold text-[#1A0F0A]">Prescription Details</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors">
          <X className="w-5 h-5 text-[#5C4A3E]" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${TERRA}12` }}>
            <Pill className="w-7 h-7" style={{ color: TERRA }} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1A0F0A]">{rx.name}</h2>
            <p className="text-sm text-[#8A7568]">{rx.genericName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge status={rx.status} />
          <span className="text-xs text-[#A89080]">{rx.dosage} · {rx.frequency}</span>
        </div>

        <div className="bg-[#FDFCFA] rounded-xl border border-[#EDE6DE] p-4">
          <p className="text-xs text-[#A89080] uppercase tracking-wider mb-2">Instructions</p>
          <p className="text-sm text-[#1A0F0A]">{rx.instructions}</p>
        </div>

        <div className="space-y-3">
          {[
            { icon: User, label: 'Prescribing Doctor', value: rx.doctor },
            { icon: Building2, label: 'Pharmacy', value: rx.pharmacy },
            { icon: Calendar, label: 'Start Date', value: rx.startDate },
            { icon: Calendar, label: 'End Date', value: rx.endDate },
            { icon: RefreshCw, label: 'Refills Remaining', value: `${rx.refillsLeft} of ${rx.totalRefills}` },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F5F0EB] flex items-center justify-center">
                <row.icon className="w-4 h-4 text-[#8A7568]" />
              </div>
              <div>
                <p className="text-[10px] text-[#A89080] uppercase">{row.label}</p>
                <p className="text-sm text-[#1A0F0A]">{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs text-[#A89080] uppercase tracking-wider mb-2">Supply Status</p>
          <div className="bg-[#FDFCFA] rounded-xl border border-[#EDE6DE] p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#5C4A3E]">Pills remaining</span>
              <span className="text-sm font-semibold text-[#1A0F0A]">{rx.pillsRemaining} of {rx.totalPills}</span>
            </div>
            <ProgressBar current={rx.pillsRemaining} total={rx.totalPills} color={TERRA} />
            {rx.daysUntilRefill > 0 && (
              <p className="text-xs text-[#8A7568] mt-2">Approximately {rx.daysUntilRefill} days until refill needed</p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-[#EDE6DE] space-y-2">
          <button className="w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2" style={{ backgroundColor: TERRA }}>
            <RefreshCw className="w-4 h-4" />
            Request Refill
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-2.5 rounded-xl border border-[#D6CCC2] text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="py-2.5 rounded-xl border border-[#D6CCC2] text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Set Reminder
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Prescriptions_Client = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedRx, setSelectedRx] = useState<Prescription | null>(null)

  const filtered = PRESCRIPTIONS.filter((rx) => {
    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Active' && rx.status === 'active') ||
      (activeTab === 'Refill Needed' && rx.status === 'refill-needed') ||
      (activeTab === 'Expired' && rx.status === 'expired')
    const matchSearch = !search || rx.name.toLowerCase().includes(search.toLowerCase()) || rx.genericName.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="space-y-6">
      {selectedRx && <DetailDrawer rx={selectedRx} onClose={() => setSelectedRx(null)} />}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${TERRA}12`, color: TERRA }}>
              PRESCRIPTIONS
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">My Prescriptions</h1>
          <p className="text-sm text-[#7A6458] mt-2">Manage your medications and refills.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold tracking-wide hover:opacity-90 transition-all" style={{ backgroundColor: TERRA }}>
          <Plus className="w-4 h-4" />
          REQUEST NEW
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#D6CCC2] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#8A7568]">{stat.label}</span>
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-[#1A0F0A]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89080]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medications..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#D6CCC2] rounded-xl text-sm text-[#1A0F0A] placeholder-[#A89080] focus:outline-none focus:border-[#A33A10]/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#D6CCC2] rounded-xl text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-[#D6CCC2] rounded-xl p-1 w-fit shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all"
            style={activeTab === tab ? { backgroundColor: TERRA, color: '#fff' } : { color: '#7A6458' }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((rx) => (
          <PrescriptionCard key={rx.id} rx={rx} onClick={() => setSelectedRx(rx)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-[#D6CCC2] p-12 text-center">
          <Package className="w-12 h-12 text-[#D6CCC2] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1A0F0A] mb-2">No prescriptions found</h3>
          <p className="text-sm text-[#8A7568]">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  )
}

export default Prescriptions_Client