import { ArrowRight, Calendar, Video, FileText, Lock } from 'lucide-react';

interface Props {
  onGetStarted?: () => void;
}

const TERRA  = '#C4521A';
const AMBER  = '#C8960A';
const BROWN  = '#2C1810';

const stats = [
  { number: '50,000+', label: 'ACTIVE PATIENTS'   },
  { number: '1,200+',  label: 'VERIFIED DOCTORS'  },
  { number: '98%',     label: 'SATISFACTION RATE' },
];

const HeroSection = ({ onGetStarted }: Props) => (
  <div className="space-y-40">
    <div className="grid lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-10">
        <div className="space-y-6">
          <div className="text-xs tracking-[0.25em] text-[#A89080]">HIPAA-COMPLIANT TELEMEDICINE</div>
          <h1 className="serif text-7xl lg:text-8xl leading-[0.95] tracking-tight text-[#2C1810]">
            YOUR CARE,<br />
            <span style={{ color: TERRA }} className="italic">ON YOUR TERMS</span>
          </h1>
          <div className="h-px w-24" style={{ backgroundColor: TERRA }} />
        </div>
        <p className="text-lg leading-relaxed max-w-lg text-[#7A6458]">
          MediConnect connects you with 1,200+ verified doctors in minutes — not days. Video consultations, digital prescriptions and your complete health record, all in one secure place.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onGetStarted}
            style={{ backgroundColor: TERRA }}
            className="group inline-flex items-center gap-3 px-10 py-4 text-white text-xs tracking-[0.15em] transition-all duration-300 hover:opacity-90"
          >
            BOOK A CONSULTATION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <span className="text-xs tracking-[0.15em] text-[#7A6458]">No credit card required</span>
        </div>
      </div>

      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Doctor in consultation"
          className="w-full h-[600px] object-cover rounded-sm"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
          }}
        />
        <div className="absolute bottom-8 -left-8 text-white p-8 w-64 shadow-lg" style={{ backgroundColor: TERRA }}>
          <div className="space-y-3">
            <div className="text-xs tracking-[0.2em] opacity-70">PATIENT SATISFACTION</div>
            <div className="serif text-4xl">98%</div>
            <div className="text-sm opacity-90 leading-relaxed">Across 50,000+ consultations in the last 12 months</div>
          </div>
        </div>
      </div>
    </div>

    <div className="py-20 px-12 lg:px-20 rounded-sm border border-[#EDE5DF] bg-white text-center space-y-6">
      <div className="text-xs tracking-[0.25em] text-[#A89080]">INSURANCE & PARTNERSHIPS</div>
      <h2 className="serif text-4xl lg:text-5xl leading-snug text-[#2C1810]">
        Accepted by major insurers. Partnered with<br />
        <span style={{ color: AMBER }} className="italic">leading hospital networks</span><br />
        so your care is always covered.
      </h2>
      <div className="h-px w-24 mx-auto" style={{ backgroundColor: AMBER }} />
      <p className="text-sm max-w-xl mx-auto text-[#7A6458]">
        We work directly with 30+ insurance providers so you're never hit with unexpected bills. Just quality care, fully covered.
      </p>
    </div>

    <div className="space-y-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1758691462848-ba1e929da259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Modern clinic"
            className="w-full h-[500px] object-cover rounded-sm"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
            }}
          />
        </div>
        <div className="order-1 lg:order-2 space-y-8">
          <div className="space-y-4">
            <div className="text-xs tracking-[0.25em] text-[#A89080]">01 — THE PLATFORM</div>
            <h3 className="serif text-4xl leading-snug text-[#2C1810]">
              Built around how patients<br />
              <span style={{ color: AMBER }} className="italic">actually live their lives</span>
            </h3>
            <div className="h-px w-16" style={{ backgroundColor: AMBER }} />
            <p className="text-sm leading-relaxed text-[#7A6458]">
              We talked to thousands of patients before writing a single line of code. The result feels obvious — because it was designed around your real workflow, not a hospital's.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-2">
            {[
              { Icon: Calendar, label: 'Instant Booking', desc: 'Real-time slots, confirmed immediately' },
              { Icon: Video,    label: 'HD Video Calls',  desc: 'Crystal clear, end-to-end encrypted'   },
            ].map(({ Icon, label, desc }) => (
              <div key={label} className="space-y-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#EDE5DF] flex items-center justify-center">
                  <Icon className="w-5 h-5" style={{ color: TERRA }} />
                </div>
                <div className="text-lg serif text-[#2C1810]">{label}</div>
                <div className="text-sm leading-relaxed text-[#7A6458]">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-xs tracking-[0.25em] text-[#A89080]">02 — YOUR DATA</div>
            <h3 className="serif text-4xl leading-snug text-[#2C1810]">
              Your health history,<br />
              <span style={{ color: TERRA }} className="italic">always in your hands</span>
            </h3>
            <div className="h-px w-16" style={{ backgroundColor: TERRA }} />
            <p className="text-sm leading-relaxed text-[#7A6458]">
              Every record, prescription and test result is yours. Export it, share it with a specialist, or simply know it's safe. HIPAA-compliant and AES-256 encrypted — we never sell your data.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-2">
            {[
              { Icon: FileText, label: 'Digital Records', desc: 'Complete history in one place' },
              { Icon: Lock,     label: 'HIPAA Secure',    desc: 'AES-256 encryption, always'   },
            ].map(({ Icon, label, desc }) => (
              <div key={label} className="space-y-2">
                <div className="w-12 h-12 rounded-full border-2 border-[#EDE5DF] flex items-center justify-center">
                  <Icon className="w-5 h-5" style={{ color: TERRA }} />
                </div>
                <div className="text-lg serif text-[#2C1810]">{label}</div>
                <div className="text-sm leading-relaxed text-[#7A6458]">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1614880397238-e69b733e95fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Healthcare professional"
            className="w-full h-[500px] object-cover rounded-sm"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';
            }}
          />
        </div>
      </div>
    </div>

    <div className="py-24 px-12 lg:px-20 rounded-sm border border-[#EDE5DF] bg-white text-center space-y-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="serif text-5xl lg:text-6xl leading-tight text-[#2C1810]">
          The best time to start managing your health was yesterday.{' '}
          <span style={{ color: TERRA }} className="italic">Today works too.</span>
        </h2>
        <div className="h-px w-24 mx-auto" style={{ backgroundColor: TERRA }} />
        <p className="text-sm text-[#7A6458]">First consultation available today. No waiting list.</p>
      </div>
      <button
        onClick={onGetStarted}
        style={{ backgroundColor: BROWN }}
        className="inline-flex items-center gap-3 px-12 py-4 text-white text-xs tracking-[0.15em] transition-all duration-300 hover:opacity-90"
      >
        BOOK YOUR FIRST CONSULTATION
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-16">
      {stats.map((s) => (
        <div key={s.label} className="text-center space-y-4">
          <div className="serif text-6xl" style={{ color: TERRA }}>{s.number}</div>
          <div className="text-xs tracking-[0.25em] text-[#A89080]">{s.label}</div>
          <div className="h-px w-12 mx-auto bg-[#EDE5DF]" />
        </div>
      ))}
    </div>
  </div>
);

export default HeroSection;