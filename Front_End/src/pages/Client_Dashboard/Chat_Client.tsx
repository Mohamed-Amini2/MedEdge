import { useState, useRef, useEffect } from 'react'
import { CallModal, Modal, PrimaryButton, useToast } from '@/components/ui/feedback'
import { useLang } from '@/lib/i18n'
import { THREADS } from './chatData'
import {
  Search as SearchIcon, SendHorizontal, Phone, Video,
  Paperclip, Smile, Check, CheckCheck, Info,
} from 'lucide-react'

type Message = {
  id: number
  text: string
  ru?: string
  sender: 'doctor' | 'patient'
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

type Conversation = {
  id: number
  name: string
  specialty: string
  lastMessage: string
  avatar?: string
  online?: boolean
  unread?: number
  time?: string
}

const conversations: Conversation[] = [
  { id: 1, name: 'Dr. James Anderson', specialty: 'Cardiologist', lastMessage: 'Take care and rest well!', online: true, unread: 2, time: '2m ago' },
  { id: 2, name: 'Dr. Sarah Mitchell', specialty: 'General Practice', lastMessage: 'Your results look good', online: true, time: '1h ago' },
  { id: 3, name: 'Dr. Michael Chen', specialty: 'Dermatologist', lastMessage: 'See you next week', online: false, time: '3h ago' },
  { id: 4, name: 'Dr. Emily Brown', specialty: 'Neurologist', lastMessage: 'Prescription sent', online: false, time: '1d ago' },
  { id: 5, name: 'Dr. Priya Patel', specialty: 'Cardiologist', lastMessage: 'Any questions?', online: true, time: '2d ago' },
  { id: 6, name: 'Dr. Robert Wilson', specialty: 'Pediatrician', lastMessage: 'Follow-up scheduled', online: false, time: '3d ago' },
  { id: 7, name: 'Dr. Linda Garcia', specialty: 'Endocrinologist', lastMessage: 'Lab results are in', online: true, time: '4d ago' },
  { id: 8, name: 'Dr. David Lee', specialty: 'Orthopedist', lastMessage: 'Physical therapy recommended', online: false, time: '5d ago' },
   { id: 9, name: 'Dr. Maria Rodriguez', specialty: 'Gastroenterologist', lastMessage: 'Dietary changes suggested', online: true, time: '6d ago' },
]

const clock = (i: number) => {
  const minutes = 600 + i * 2
  return Math.floor(minutes / 60) + ':' + String(minutes % 60).padStart(2, '0') + ' AM'
}

const INITIAL_THREADS: Record<number, Message[]> = Object.fromEntries(
  Object.entries(THREADS).map(([id, lines]) => [
    Number(id),
    lines.map(([who, en, ru], i): Message => ({
      id: i + 1,
      text: en,
      ru,
      sender: who === 'd' ? 'doctor' : 'patient',
      time: clock(i),
      status: who === 'p' ? 'read' : undefined,
    })),
  ]),
)

const TERRA = '#A33A10'

const MessageBubble = ({ msg, isLast, doctor }: { msg: Message; isLast: boolean; doctor: string }) => {
  const { lang } = useLang()
  const isPatient = msg.sender === 'patient'

  return (
    <div
      className={`flex items-end gap-2.5 max-w-[75%] ${isPatient ? 'self-end flex-row-reverse' : ''}`}
      style={{ animation: isLast ? 'fadeIn 0.3s ease-out' : 'none' }}
    >
      <div
        className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
          isPatient ? 'bg-[#D6CCC2] text-[#5C4A3E]' : 'text-white'
        }`}
        style={{ backgroundColor: isPatient ? undefined : TERRA }}
      >
        {isPatient ? 'ME' : doctor}
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isPatient
              ? 'bg-gradient-to-br from-[#A33A10] to-[#8B3210] text-white rounded-br-md'
              : 'bg-white text-[#1A0F0A] rounded-bl-md border border-[#EDE6DE]'
          }`}
        >
          <p className="text-sm leading-relaxed">{lang === 'ru' && msg.ru ? msg.ru : msg.text}</p>
        </div>
        <div className={`flex items-center gap-1 text-[10px] text-[#A89080] ${isPatient ? 'justify-end' : ''}`}>
          <span>{msg.time}</span>
          {isPatient && msg.status && (
            <span className="ml-1">
              {msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-[#A33A10]" /> : <Check className="w-3.5 h-3.5" />}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

const ConversationItem = ({ conv, active, onClick }: { conv: Conversation; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-4 transition-all duration-200 border-l-4 ${
      active ? 'bg-white/80 border-[#A33A10]' : 'border-transparent hover:bg-white/50'
    }`}
  >
    <div className="relative">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
        style={{ backgroundColor: TERRA }}
      >
        {conv.name
          .split(' ')
          .slice(1)
          .map((n) => n[0])
          .join('')}
      </div>
      {conv.online && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#E2D8CE]" />
      )}
    </div>
    <div className="flex-1 min-w-0 text-left">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-[#1A0F0A] truncate">{conv.name}</span>
        <span className="text-[10px] text-[#A89080] shrink-0">{conv.time}</span>
      </div>
      <p className="text-[11px] text-[#8A7568] truncate">{conv.specialty}</p>
      <p className="text-xs text-[#8A7568] truncate mt-0.5">{conv.lastMessage}</p>
    </div>
    {conv.unread && conv.unread > 0 && (
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
        style={{ backgroundColor: TERRA }}
      >
        {conv.unread}
      </span>
    )}
  </button>
)

const Chat_Client = () => {
  const [threads, setThreads] = useState<Record<number, Message[]>>(INITIAL_THREADS)
  const { lang } = useLang()
  const [input, setInput] = useState('')
  const [activeConv, setActiveConv] = useState(1)
  const messages = threads[activeConv] ?? []
  const setMessages = (update: (prev: Message[]) => Message[]) => {
    const target = activeConv
    setThreads((all) => ({ ...all, [target]: update(all[target] ?? []) }))
  }
  const [searchQuery, setSearchQuery] = useState('')
  const [typingConv, setTypingConv] = useState<number | null>(null)
  const isTyping = typingConv === activeConv
  const setIsTyping = (on: boolean) => setTypingConv(on ? activeConv : null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const notify = useToast()
  const [call, setCall] = useState<{ video: boolean } | null>(null)
  const [infoOpen, setInfoOpen] = useState(false)

  const attachFile = () => {
    const picker = document.createElement('input')
    picker.type = 'file'
    picker.onchange = () => {
      const file = picker.files?.[0]
      if (!file) return
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'Attached file: ' + file.name,
          ru: 'Прикреплён файл: ' + file.name,
          sender: 'patient',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          status: 'sent',
        },
      ])
      notify('File attached: ' + file.name)
    }
    picker.click()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMsg: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'patient',
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'sent',
    }
    setMessages((prev) => [...prev, newMsg])
    setInput('')

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Thank you for your message. I'll review it and get back to you shortly.",
          ru: 'Спасибо за сообщение. Я посмотрю и отвечу вам в ближайшее время.',
          sender: 'doctor',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        },
      ])
    }, 2000)
  }

  const filteredConvs = conversations.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const activeDoctor = conversations.find((c) => c.id === activeConv)
  const doctorInitials = (activeDoctor?.name ?? '').split(' ').slice(1).map((n) => n[0]).join('')
  const lastText = (id: number, fallback: string) => {
    const thread = threads[id]
    const last = thread?.[thread.length - 1]
    return last ? (lang === 'ru' && last.ru ? last.ru : last.text) : fallback
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4 animate-fadeIn">
      {/* Sidebar */}
      <aside className="w-80 flex flex-col bg-[#E8E0D8] rounded-2xl overflow-hidden shadow-lg shrink-0">
        {/* Header */}
        <div className="px-5 py-5 flex items-center justify-between" style={{ backgroundColor: TERRA }}>
          <div>
            <h1 className="text-xl font-bold text-white">Messages</h1>
            <p className="text-xs text-white/70">{conversations.length} conversations</p>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A89080]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm text-[#1A0F0A] placeholder:text-[#A89080] outline-none focus:ring-2 focus:ring-[#A33A10]/20 transition-all"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv) => (
            <ConversationItem
              key={conv.id}
              conv={{ ...conv, lastMessage: lastText(conv.id, conv.lastMessage), unread: activeConv === conv.id ? undefined : conv.unread }}
              active={activeConv === conv.id}
              onClick={() => setActiveConv(conv.id)}
            />
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-lg border border-[#E8E0D8]">
        {/* Chat Header */}
        <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-[#EDE6DE]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                style={{ backgroundColor: TERRA }}
              >
                {activeDoctor?.name
                  .split(' ')
                  .slice(1)
                  .map((n) => n[0])
                  .join('')}
              </div>
              {activeDoctor?.online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#1A0F0A]">{activeDoctor?.name}</h2>
              <div className="flex items-center gap-2">
                <p className="text-xs text-[#8A7568]">{activeDoctor?.specialty}</p>
                <span className="w-1 h-1 rounded-full bg-[#D6CCC2]" />
                <p className={`text-xs flex items-center gap-1 ${activeDoctor?.online ? 'text-green-600' : 'text-[#A89080]'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeDoctor?.online ? 'bg-green-500' : 'bg-[#C4B8B0]'}`} />
                  {activeDoctor?.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCall({ video: false })} className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button onClick={() => setCall({ video: true })} className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button onClick={() => setInfoOpen(true)} className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">
          {/* Date Separator */}
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-[#E8E0D8]" />
            <span className="text-[10px] text-[#A89080] font-semibold px-4 py-1.5 bg-white rounded-full border border-[#EDE6DE]">Today</span>
            <div className="flex-1 h-px bg-[#E8E0D8]" />
          </div>

          {messages.map((msg, i) => (
            <MessageBubble key={msg.id} msg={msg} isLast={i === messages.length - 1} doctor={doctorInitials} />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: TERRA }}>
                JA
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-[#EDE6DE]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#A89080] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-[#A89080] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-[#A89080] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 bg-white border-t border-[#EDE6DE]">
          <div className="flex items-center gap-3">
            <button onClick={attachFile} className="w-11 h-11 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="w-full px-5 py-3.5 bg-[#F5F0EB] rounded-xl text-sm text-[#1A0F0A] placeholder:text-[#A89080] outline-none focus:ring-2 focus:ring-[#A33A10]/20 transition-all pr-12"
              />
              <button onClick={() => setInput((v) => v + '🙂')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89080] hover:text-[#5C4A3E] transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 shrink-0 shadow-lg shadow-[#A33A10]/20"
              style={{ backgroundColor: TERRA }}
            >
              <SendHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      {call && <CallModal doctor={activeDoctor?.name ?? 'Doctor'} withVideo={call.video} onClose={() => setCall(null)} />}
      {infoOpen && (
        <Modal title={activeDoctor?.name ?? 'Doctor'} onClose={() => setInfoOpen(false)} footer={<PrimaryButton onClick={() => setInfoOpen(false)}>Close</PrimaryButton>}>
          <div className="space-y-2">
            <p><span className="font-semibold text-[#1A0F0A]">Specialty:</span> {activeDoctor?.specialty}</p>
            <p><span className="font-semibold text-[#1A0F0A]">Status:</span> {activeDoctor?.online ? 'Online' : 'Offline'}</p>
            <p>Messages in this conversation are visible only to you and your doctor.</p>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Chat_Client