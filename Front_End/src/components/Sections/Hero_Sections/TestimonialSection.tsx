import { Star } from 'lucide-react';

const TERRA = '#C4521A';
const AMBER = '#C8960A';

const testimonials = [
  {
    quote: "I was sceptical about online healthcare. After my first consultation I cancelled my in-person GP and haven't looked back. The doctor spent more time with me than any clinic ever did.",
    author: 'Sarah Mitchell',
    role: 'PATIENT — USING MEDEDGE FOR 2 YEARS',
    accent: TERRA,
  },
  {
    quote: "As a practitioner, the platform is a revelation. Zero admin overhead, clean records, and patients who actually show up. I see 30% more patients per week with zero extra stress.",
    author: 'Dr. James Anderson',
    role: 'GENERAL PRACTITIONER',
    accent: AMBER,
  },
  {
    quote: "My son has complex allergies. Having his entire history — every reaction, every prescription — in one place I can share instantly with any specialist has been life-changing.",
    author: 'Michelle Torres',
    role: 'PARENT — PATIENT SINCE 2023',
    accent: TERRA,
  },
];

const statBar = [
  { value: '98%',     label: 'SATISFACTION RATE' },
  { value: '50,000+', label: 'ACTIVE PATIENTS'   },
  { value: '4.9',     label: 'AVERAGE RATING'    },
  { value: '<15 min', label: 'AVG. WAIT TIME'    },
];

const TestimonialSection = () => (
  <div className="space-y-16">
    <div className="text-center space-y-6 max-w-2xl mx-auto">
      <div className="text-xs tracking-[0.25em] text-[#A89080]">TESTIMONIALS</div>
      <h2 className="serif text-5xl lg:text-6xl leading-tight text-[#2C1810]">
        Don't take our word<br />
        <span style={{ color: AMBER }} className="italic">for it</span>
      </h2>
      <p className="text-base leading-relaxed text-[#7A6458]">Real patients and practitioners — unedited, unsponsored.</p>
      <div className="h-px w-24 mx-auto" style={{ backgroundColor: AMBER }} />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 border border-[#EDE5DF] rounded-sm divide-x divide-y md:divide-y-0 divide-[#EDE5DF] bg-[#FDFCFA]">
      {statBar.map((s, i) => (
        <div key={s.label} className="py-8 text-center space-y-2">
          <div className="serif text-4xl font-semibold" style={{ color: i % 2 === 0 ? TERRA : AMBER }}>
            {s.value}
          </div>
          <div className="text-xs tracking-[0.2em] text-[#7A6458]">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((t, i) => (
        <div key={i} className="p-8 border border-[#EDE5DF] bg-white rounded-sm space-y-6">
          <div className="w-8 h-0.5" style={{ backgroundColor: t.accent }} />
          <div className="flex gap-1">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="w-4 h-4" style={{ fill: t.accent, color: t.accent }} />
            ))}
          </div>
          <p className="text-lg serif italic leading-relaxed text-[#2C1810]">"{t.quote}"</p>
          <div className="pt-6 border-t border-[#EDE5DF]">
            <div className="text-sm font-medium text-[#2C1810]">{t.author}</div>
            <div className="text-xs tracking-[0.15em] mt-1 text-[#A89080]">{t.role}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TestimonialSection;