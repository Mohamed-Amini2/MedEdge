import { useState, useRef, useEffect } from 'react'
import {
  Search as SearchIcon, SendHorizontal, Phone, Video, MoreVertical,
  Paperclip, Smile, Check, CheckCheck, ArrowLeft, Info,
} from 'lucide-react'

type Message = {
  id: number
  text: string
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
   { id: 10, name: 'Dr. James Anderson', specialty: 'Cardiologist', lastMessage: 'Take care and rest well!', online: true, unread: 2, time: '2m ago' },
   { id: 11, name: 'Dr. Sarah Mitchell', specialty: 'General Practice', lastMessage: 'Your results look good', online: true, time: '1h ago' },
   { id: 12, name: 'Dr. Michael Chen', specialty: 'Dermatologist', lastMessage: 'See you next week', online: false, time: '3h ago' },
   { id: 13, name: 'Dr. Emily Brown', specialty: 'Neurologist', lastMessage: 'Prescription sent', online: false, time: '1d ago' },
   { id: 14, name: 'Dr. Priya Patel', specialty: 'Cardiologist', lastMessage: 'Any questions?', online: true, time: '2d ago' },
]

const initialMessages: Message[] = [
  { id: 1, text: 'Hello, how can I help you today?', sender: 'doctor', time: '10:00 AM' },
  { id: 2, text: 'I have a headache since yesterday', sender: 'patient', time: '10:02 AM', status: 'read' },
  { id: 3, text: 'Have you taken any medication?', sender: 'doctor', time: '10:03 AM' },
  { id: 4, text: "No, I haven't taken anything yet.", sender: 'patient', time: '10:05 AM', status: 'read' },
  { id: 5, text: 'I recommend taking some pain relievers and resting. If it persists, please schedule an appointment.', sender: 'doctor', time: '10:07 AM' },
  { id: 6, text: 'Thank you, doctor!', sender: 'patient', time: '10:08 AM', status: 'read' },
  { id: 7, text: "You're welcome! Take care and don't hesitate to reach out if you need anything.", sender: 'doctor', time: '10:09 AM' },
  { id: 8, text: 'Will do, thanks again!', sender: 'patient', time: '10:10 AM', status: 'read' },
  { id: 9, text: 'Have a great day!', sender: 'doctor', time: '10:11 AM' },
  { id: 10, text: 'You too, bye!', sender: 'patient', time: '10:12 AM', status: 'read' },
  { id: 11, text: 'Hello, how can I assist you today?', sender: 'doctor', time: '10:00 AM' },
  { id: 12, text: 'I have been experiencing chest pain for the past few days.', sender: 'patient', time: '10:02 AM', status: 'read' },
  { id: 13, text: 'I see. Can you describe the pain? Is it sharp, dull, or burning?', sender: 'doctor', time: '10:03 AM' },
  { id: 14, text: 'It is a sharp pain that comes and goes.', sender: 'patient', time: '10:05 AM', status: 'read' },
]

const TERRA = '#A33A10'

const MessageBubble = ({ msg, isLast }: { msg: Message; isLast: boolean }) => {
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
        {isPatient ? 'ME' : 'JA'}
      </div>
      <div className="flex flex-col gap-1">
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isPatient
              ? 'bg-gradient-to-br from-[#A33A10] to-[#8B3210] text-white rounded-br-md'
              : 'bg-white text-[#1A0F0A] rounded-bl-md border border-[#EDE6DE]'
          }`}
        >
          <p className="text-sm leading-relaxed">{msg.text}</p>
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
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [activeConv, setActiveConv] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
          sender: 'doctor',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        },
      ])
    }, 2000)
  }

  const filteredConvs = conversations.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const activeDoctor = conversations.find((c) => c.id === activeConv)

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
            <ConversationItem key={conv.id} conv={conv} active={activeConv === conv.id} onClick={() => setActiveConv(conv.id)} />
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
            <button className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors">
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
            <MessageBubble key={msg.id} msg={msg} isLast={i === messages.length - 1} />
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
            <button className="w-11 h-11 rounded-xl bg-[#F5F0EB] flex items-center justify-center text-[#5C4A3E] hover:bg-[#EDE6DE] transition-colors shrink-0">
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
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A89080] hover:text-[#5C4A3E] transition-colors">
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
    </div>
  )
}

export default Chat_Client