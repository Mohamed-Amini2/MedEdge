import { useState } from 'react'
import {
  FileText, Activity, Search, Download,
  Share2, Eye, Calendar, User, ChevronRight, X, Clock, CheckCircle,
  FlaskConical, Camera, Pill, Stethoscope, ShieldCheck, Plus,
  LayoutGrid, List, SortAsc,
} from 'lucide-react'

const TERRA = '#A33A10'

interface Record {
  id: number
  title: string
  type: 'Lab Report' | 'Imaging' | 'Prescription' | 'Consultation' | 'Checkup' | 'Vaccination'
  doctor: string
  department: string
  date: string
  size: string
  status: 'Available' | 'Pending' | 'Processing'
  tags: string[]
  summary: string
  isNew?: boolean
}

const RECORDS: Record[] = [
  { id: 1, title: 'Annual Physical Examination', type: 'Checkup', doctor: 'Dr. Sarah Mitchell', department: 'General Practice', date: '2026-01-15', size: '2.4 MB', status: 'Available', tags: ['Annual', 'Physical'], summary: 'Comprehensive yearly physical. All vitals normal.', isNew: true },
  { id: 2, title: 'Complete Blood Count (CBC)', type: 'Lab Report', doctor: 'Dr. James Anderson', department: 'Cardiology', date: '2026-01-10', size: '1.1 MB', status: 'Available', tags: ['Blood Work', 'Routine'], summary: 'CBC panel within normal ranges.', isNew: true },
  { id: 3, title: 'Chest X-Ray', type: 'Imaging', doctor: 'Dr. Michael Chen', department: 'Radiology', date: '2025-12-20', size: '8.7 MB', status: 'Available', tags: ['Imaging', 'Thoracic'], summary: 'No abnormalities detected in lung fields.' },
  { id: 4, title: 'Cardiology Consultation Report', type: 'Consultation', doctor: 'Dr. James Anderson', department: 'Cardiology', date: '2025-12-15', size: '0.8 MB', status: 'Available', tags: ['Cardiology', 'Follow-up'], summary: 'Follow-up consultation for hypertension management.' },
  { id: 5, title: 'Allergy Panel Results', type: 'Lab Report', doctor: 'Dr. Emily Brown', department: 'Immunology', date: '2025-11-28', size: '1.5 MB', status: 'Available', tags: ['Allergy', 'Immunology'], summary: 'Positive reaction to dust mites and pollen.' },
  { id: 6, title: 'COVID-19 Vaccination Record', type: 'Vaccination', doctor: 'Dr. Sarah Mitchell', department: 'General Practice', date: '2025-11-10', size: '0.3 MB', status: 'Available', tags: ['Vaccination', 'COVID-19'], summary: 'Booster dose administered.' },
  { id: 7, title: 'MRI Brain Scan', type: 'Imaging', doctor: 'Dr. Emily Brown', department: 'Neurology', date: '2025-10-22', size: '24.3 MB', status: 'Processing', tags: ['Imaging', 'Neurology'], summary: 'Scan ordered for recurring headaches.' },
  { id: 8, title: 'Dermatology Skin Assessment', type: 'Consultation', doctor: 'Dr. Michael Chen', department: 'Dermatology', date: '2025-10-05', size: '3.2 MB', status: 'Available', tags: ['Dermatology', 'Skin'], summary: 'Routine skin check. Benign mole documented.' },
]

const TYPE_CONFIG: { [key: string]: { icon: React.ComponentType<{ className?: string }>; color: string; bg: string } } = {
  'Lab Report': { icon: FlaskConical, color: '#0D9488', bg: 'rgba(13,148,136,0.1)' },
  'Imaging': { icon: Camera, color: '#2563EB', bg: 'rgba(37,99,235,0.1)' },
  'Prescription': { icon: Pill, color: TERRA, bg: `${TERRA}15` },
  'Consultation': { icon: Stethoscope, color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
  'Checkup': { icon: Activity, color: '#EA580C', bg: 'rgba(234,88,12,0.1)' },
  'Vaccination': { icon: ShieldCheck, color: '#16A34A', bg: 'rgba(22,163,74,0.1)' },
}

const FILTERS = ['All Records', 'Lab Report', 'Imaging', 'Consultation', 'Checkup', 'Vaccination']

const STATS = [
  { label: 'Total Records', value: '24', icon: FileText, color: TERRA },
  { label: 'Lab Reports', value: '8', icon: FlaskConical, color: '#0D9488' },
  { label: 'Imaging', value: '6', icon: Camera, color: '#2563EB' },
  { label: 'This Month', value: '4', icon: Calendar, color: '#7C3AED' },
]

const RecordDrawer = ({ record, onClose }: { record: Record; onClose: () => void }) => {
  const cfg = TYPE_CONFIG[record.type]
  const Icon = cfg.icon

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-slideLeft">
        <div className="sticky top-0 bg-white border-b border-[#EDE6DE] px-6 py-5 flex items-center justify-between z-10">
          <h3 className="text-lg font-semibold text-[#1A0F0A]">Record Details</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors">
            <X className="w-5 h-5 text-[#5C4A3E]" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-3"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}
            >
              <Icon className="w-3.5 h-3.5" />
              {record.type}
            </div>
            <h2 className="text-xl font-semibold text-[#1A0F0A] leading-snug mb-2">{record.title}</h2>
            {record.isNew && (
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-600">NEW</span>
            )}
          </div>

          <div className="bg-[#FDFCFA] rounded-xl border border-[#EDE6DE] p-4">
            <p className="text-xs text-[#A89080] uppercase tracking-wider mb-2">Summary</p>
            <p className="text-sm text-[#1A0F0A] leading-relaxed">{record.summary}</p>
          </div>

          <div className="space-y-3">
            {[
              { icon: User, label: 'Doctor', value: record.doctor },
              { icon: Activity, label: 'Department', value: record.department },
              { icon: Calendar, label: 'Date', value: new Date(record.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
              { icon: FileText, label: 'File Size', value: record.size },
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
            <p className="text-xs text-[#A89080] uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {record.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-xs border border-[#EDE6DE] text-[#5C4A3E]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {record.status === 'Available' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Clock className="w-4 h-4 text-amber-500" />
            )}
            <span className={`text-sm font-medium ${record.status === 'Available' ? 'text-green-600' : 'text-amber-600'}`}>
              {record.status}
            </span>
          </div>

          <div className="pt-4 border-t border-[#EDE6DE] space-y-2">
            <button
              className="w-full py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: TERRA }}
            >
              <Eye className="w-4 h-4" />
              View Document
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2.5 rounded-xl border border-[#D6CCC2] text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="py-2.5 rounded-xl border border-[#D6CCC2] text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecordCard = ({ record, onClick }: { record: Record; onClick: () => void }) => {
  const cfg = TYPE_CONFIG[record.type]
  const Icon = cfg.icon

  return (
    <div
      className="bg-white rounded-xl border border-[#D6CCC2] p-5 hover:shadow-md hover:border-[#C4A99A] transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#1A0F0A] truncate">{record.title}</h3>
              {record.isNew && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-600 flex-shrink-0">NEW</span>
              )}
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                record.status === 'Available'
                  ? 'bg-green-50 text-green-600'
                  : record.status === 'Processing'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              {record.status}
            </span>
          </div>

          <p className="text-xs text-[#8A7568] mb-3 line-clamp-1">{record.summary}</p>

          <div className="flex items-center gap-3 text-[11px] text-[#A89080] flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {record.doctor}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {record.size}
            </span>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-[#C4B8B0] group-hover:text-[#A33A10] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
      </div>

      {record.tags.length > 0 && (
        <div className="flex gap-1.5 mt-4 pt-3 border-t border-[#EDE6DE]">
          {record.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] border border-[#EDE6DE] text-[#8A7568]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const Records_Client = () => {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All Records')
  const [activeRecord, setActiveRecord] = useState<Record | null>(null)
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = RECORDS.filter((r) => {
    const matchFilter = activeFilter === 'All Records' || r.type === activeFilter
    const matchSearch = !search || [r.title, r.doctor, r.type, ...r.tags].some((s) => s.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  return (
    <div className="space-y-6 animate-fadeIn">
      {activeRecord && <RecordDrawer record={activeRecord} onClose={() => setActiveRecord(null)} />}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] tracking-[0.25em] font-semibold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: `${TERRA}12`, color: TERRA }}
            >
              RECORDS
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A0F0A]">Medical Records</h1>
          <p className="text-sm text-[#7A6458] mt-2">Access, download, and share your health documents securely.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-[#D6CCC2] rounded-xl text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
            <Download className="w-4 h-4" />
            Export All
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
            style={{ backgroundColor: TERRA }}
          >
            <Plus className="w-4 h-4" />
            Request Records
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#D6CCC2] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[#8A7568]">{s.label}</span>
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
            </div>
            <p className="text-2xl font-bold text-[#1A0F0A]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89080]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, doctor, type, or tag..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#D6CCC2] rounded-xl text-sm text-[#1A0F0A] placeholder-[#A89080] focus:outline-none focus:border-[#A33A10]/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-[#F5F0EB]"
            >
              <X className="w-4 h-4 text-[#A89080]" />
            </button>
          )}
        </div>

        <div className="flex items-center border border-[#D6CCC2] rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setView('grid')}
            className={`p-3 transition-colors ${view === 'grid' ? 'bg-[#A33A10]/10 text-[#A33A10]' : 'text-[#A89080] hover:text-[#5C4A3E]'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-3 transition-colors ${view === 'list' ? 'bg-[#A33A10]/10 text-[#A33A10]' : 'text-[#A89080] hover:text-[#5C4A3E]'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#D6CCC2] rounded-xl text-sm text-[#5C4A3E] hover:bg-[#F5F0EB] transition-all">
          <SortAsc className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              activeFilter === f
                ? 'bg-[#A33A10] text-white border-[#A33A10]'
                : 'bg-white border-[#D6CCC2] text-[#5C4A3E] hover:border-[#A33A10]/40'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8A7568]">
          Showing <span className="font-medium text-[#1A0F0A]">{filtered.length}</span> record{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'All Records' && <span className="text-[#A89080]"> in {activeFilter}</span>}
        </p>
        {search && (
          <button onClick={() => setSearch('')} className="text-xs font-medium hover:underline" style={{ color: TERRA }}>
            Clear search
          </button>
        )}
      </div>

      {/* Records */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#D6CCC2] p-16 text-center">
          <FileText className="w-12 h-12 text-[#D6CCC2] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[#1A0F0A] mb-2">No records found</h3>
          <p className="text-sm text-[#8A7568]">Try adjusting your search or filter.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <RecordCard key={r.id} record={r} onClick={() => setActiveRecord(r)} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#D6CCC2] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#FDFCFA] border-b border-[#EDE6DE]">
              <tr>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-3">Record</th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-3">Doctor</th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-[#8A7568] uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE6DE]">
              {filtered.map((record) => {
                const cfg = TYPE_CONFIG[record.type]
                const Icon = cfg.icon
                return (
                  <tr key={record.id} className="hover:bg-[#FDFCFA] transition-colors cursor-pointer" onClick={() => setActiveRecord(record)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[#1A0F0A]">{record.title}</span>
                            {record.isNew && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-600">NEW</span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#8A7568]">{record.size}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#5C4A3E]">{record.type}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#5C4A3E]">{record.doctor}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[#5C4A3E]">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          record.status === 'Available'
                            ? 'bg-green-50 text-green-600'
                            : record.status === 'Processing'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors"
                        >
                          <Eye className="w-4 h-4 text-[#8A7568]" />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-[#F5F0EB] transition-colors"
                        >
                          <Download className="w-4 h-4 text-[#8A7568]" />
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

export default Records_Client