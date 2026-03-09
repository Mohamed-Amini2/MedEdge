import { Calendar, Video, FileText, Lock, Activity, Clock } from 'lucide-react';

const TERRA = '#C4521A';
const AMBER = '#C8960A';

const features = [
  { icon: Calendar, title: 'Instant Booking',         accent: TERRA, description: 'Browse real-time availability and lock in a slot with a verified doctor in under 60 seconds — no hold music, no front desk.' },
  { icon: Video,    title: 'HD Video Consultations',  accent: TERRA, description: 'End-to-end encrypted video calls that feel like sitting in the same room. Works on any device, anywhere in the world.' },
  { icon: FileText, title: 'Unified Medical Records', accent: AMBER, description: 'Every prescription, lab result and consultation note lives in one secure timeline. Share with any doctor in seconds.' },
  { icon: Activity, title: 'Digital Prescriptions',   accent: AMBER, description: 'Receive, store and refill prescriptions digitally. Get reminders when a refill is due so you never miss a dose.' },
  { icon: Lock,     title: 'HIPAA Compliant',         accent: TERRA, description: 'AES-256 encryption at rest and in transit. We never sell your data — your health story belongs to you alone.' },
  { icon: Clock,    title: '24 / 7 Access',           accent: AMBER, description: "Whether it's 2 pm or 2 am, a qualified doctor is available. Urgent care that fits your life, not the other way around." },
];

const FeaturesSection = () => (
  <div className="space-y-16">
    <div className="text-center space-y-6 max-w-2xl mx-auto">
      <div className="text-xs tracking-[0.25em] text-[#A89080]">WHY MEDEDGE</div>
      <h2 className="serif text-5xl lg:text-6xl leading-tight text-[#2C1810]">
        Everything you need,<br />
        <span style={{ color: TERRA }} className="italic">nothing you don't</span>
      </h2>
      <p className="text-base leading-relaxed text-[#7A6458]">
        We stripped out the complexity of traditional healthcare and rebuilt it around six things that actually matter to patients.
      </p>
      <div className="h-px w-24 mx-auto" style={{ backgroundColor: TERRA }} />
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <div key={i} className="group p-8 rounded-sm border border-[#EDE5DF] bg-white hover:border-[#C4521A]/40 transition-all duration-300 hover:shadow-lg">
            <div className="w-14 h-14 rounded-full border-2 border-[#EDE5DF] group-hover:border-[#C4521A] flex items-center justify-center mb-6 transition-all duration-300">
              <Icon className="w-6 h-6" style={{ color: f.accent }} />
            </div>
            <h3 className="text-xl serif mb-3 text-[#2C1810]">{f.title}</h3>
            <p className="text-sm leading-relaxed text-[#7A6458]">{f.description}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default FeaturesSection;