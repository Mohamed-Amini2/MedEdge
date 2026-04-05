import { useState } from 'react'
import {
  Pill, Search, Filter, Calendar, RefreshCw, AlertTriangle,
  Download, Eye, User, Plus, Package, SortAsc, MoreHorizontal,
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
  {
    id: 5,
    name: 'Amlodipine',
    genericName: 'Amlodipine Besylate',
    dosage: '5mg',
    frequency: 'Once daily',
    instructions: 'Take at the same time each day',
    doctor: 'Dr. Sarah Mitchell',
    pharmacy: 'CVS Pharmacy - Downtown',
    startDate: '2025-10-01',
    endDate: '2026-04-01',
    refillsLeft: 4,
    totalRefills: 6,
    daysUntilRefill: 15,
    status: 'active',
    pillsRemaining: 15,
    totalPills: 30,
  },
  {
    id: 6,
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    dosage: '40mg',
    frequency: 'Once at night',
    instructions: 'Avoid grapefruit and grapefruit juice',
    doctor: 'Dr. James Anderson',
    pharmacy: 'Walgreens - Main St',
    startDate: '2025-11-15',
    endDate: '2026-05-15',
    refillsLeft: 2,
    totalRefills: 4,
    daysUntilRefill: 5,
    status: 'refill-needed',
    pillsRemaining: 5,
    totalPills: 30,
  }
]

const STATS = [
  { label: 'Active Medications', value: '4', icon: Pill, color: TERRA },
  { label: 'Refills Available', value: '13', icon: RefreshCw, color: '#0D9488' },
  { label: 'Needs Attention', value: '1', icon: AlertTriangle, color: '#EA580C' },
  { label: 'Next Refill', value: '4 days', icon: Calendar, color: '#2563EB' },
]

const TABS = ['All', 'Active', 'Refill Needed', 'Expired']

const StatusBadge = ({ status }: { status: Prescription['status'] }) => {
  const config = {
    active: { bg: 'bg-green-50', text: 'text-green-600', label: 'Active' },
    'refill-needed': { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Refill Needed' },
    expired: { bg: 'bg-red-50', text: 'text-red-600', label: 'Expired' },
    completed: { bg: 'bg-gray-50', text: 'text-gray-600', label: 'Completed' },
  }[status]

  return (
    <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100
  const isLow = percentage <= 20
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-[#EDE6DE] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: isLow ? '#EA580C' : TERRA 
          }}
        />
      </div>
      <span className={`text-[11px] font-medium ${isLow ? 'text-amber-600' : 'text-[#5C4A3E]'}`}>
        {current}/{total}
      </span>
    </div>
  )
}

const Prescriptions_Client = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = PRESCRIPTIONS.filter((rx) => {
    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Active' && rx.status === 'active') ||
      (activeTab === 'Refill Needed' && rx.status === 'refill-needed') ||
      (activeTab === 'Expired' && rx.status === 'expired')
    const matchSearch =
      !search ||
      rx.name.toLowerCase().includes(search.toLowerCase()) ||
      rx.genericName.toLowerCase().includes(search.toLowerCase()) ||
      rx.doctor.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${TERRA}12`, color: TERRA }}
            >
              PRESCRIPTIONS
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">My Prescriptions</h1>
          <p className="text-sm text-[#7A6458] mt-2">Manage your medications and refills.</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold tracking-wide hover:opacity-90 transition-all"
          style={{ backgroundColor: TERRA }}
        >
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
        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#D6CCC2] rounded-xl text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
          <SortAsc className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white border border-[#D6CCC2] rounded-xl p-1 w-fit shadow-sm">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all"
            style={
              activeTab === tab ? { backgroundColor: TERRA, color: '#fff' } : { color: '#7A6458' }
            }
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8A7568]">
          Showing <span className="font-medium text-[#1A0F0A]">{filtered.length}</span> prescription
          {filtered.length !== 1 ? 's' : ''}
          {activeTab !== 'All' && <span className="text-[#A89080]"> in {activeTab}</span>}
        </p>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-xs font-medium hover:underline"
            style={{ color: TERRA }}
          >
            Clear search
          </button>
        )}
      </div>


      {/* Refill Alert Banner */}

      {filtered.some((rx) => rx.status === 'refill-needed') && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {filtered.filter((rx) => rx.status === 'refill-needed').length} prescription(s) need refilling
              </p>
              <p className="text-xs text-amber-600">Request refills to avoid running out of medication</p>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: TERRA }}
          >
            Refill All
          </button>
        </div>
      )}

      {/* Prescriptions Table */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#D6CCC2] p-12 text-center">
          <Package className="w-12 h-12 text-[#D6CCC2] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1A0F0A] mb-2">No prescriptions found</h3>
          <p className="text-sm text-[#8A7568]">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#D6CCC2] overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-[#FDFCFA] border-b border-[#EDE6DE]">
              <tr>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Medication
                </th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Dosage
                </th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Frequency
                </th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Doctor
                </th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Supply
                </th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Refills
                </th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE6DE]">
              {filtered.map((rx) => {
                const isUrgent = rx.status === 'refill-needed' || (rx.daysUntilRefill <= 5 && rx.status !== 'expired')
                
                return (
                  <tr 
                    key={rx.id} 
                    className={`hover:bg-[#FDFCFA] transition-colors ${isUrgent ? 'bg-amber-50/30' : ''}`}
                  >
                    {/* Medication */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${TERRA}12` }}
                        >
                          <Pill className="w-5 h-5" style={{ color: TERRA }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#1A0F0A]">{rx.name}</span>
                            {isUrgent && rx.status !== 'expired' && (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                            )}
                          </div>
                          <span className="text-[11px] text-[#8A7568]">{rx.genericName}</span>
                        </div>
                      </div>
                    </td>

                    {/* Dosage */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-[#1A0F0A]">{rx.dosage}</span>
                    </td>

                    {/* Frequency */}
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#5C4A3E]">{rx.frequency}</span>
                    </td>

                    {/* Doctor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#A89080]" />
                        <span className="text-sm text-[#5C4A3E]">{rx.doctor}</span>
                      </div>
                    </td>

                    {/* Supply */}
                    <td className="px-5 py-4">
                      <ProgressBar current={rx.pillsRemaining} total={rx.totalPills} />
                    </td>

                    {/* Refills */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 text-[#A89080]" />
                        <span className="text-sm text-[#5C4A3E]">
                          {rx.refillsLeft} / {rx.totalRefills}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={rx.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {rx.status === 'refill-needed' && (
                          <button
                            className="px-3 py-1.5 rounded-lg text-white text-[11px] font-semibold hover:opacity-90 transition-all mr-1"
                            style={{ backgroundColor: TERRA }}
                          >
                            Refill
                          </button>
                        )}
                        <button className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors">
                          <Eye className="w-4 h-4 text-[#8A7568]" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors">
                          <Download className="w-4 h-4 text-[#8A7568]" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors">
                          <MoreHorizontal className="w-4 h-4 text-[#8A7568]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      
      
    </div>
  )
}

export default Prescriptions_Client