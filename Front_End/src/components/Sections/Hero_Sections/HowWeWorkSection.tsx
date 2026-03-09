import { ArrowRight } from 'lucide-react';

const TERRA = '#C4521A';
const AMBER = '#C8960A';

const steps = [
  { number: '01', eyebrow: 'TWO MINUTES', title: 'Create your account',       description: 'Sign up with your email or social login. We ask only what we need — no lengthy forms, no insurance paperwork on day one.', detail: 'Your data is encrypted the moment you hit submit.', accent: TERRA },
  { number: '02', eyebrow: 'YOUR CHOICE', title: 'Choose the right doctor',   description: 'Filter by specialty, language, rating and availability. Read verified bios and patient reviews before you commit to anything.', detail: 'Over 1,200 verified practitioners on the platform.', accent: AMBER },
  { number: '03', eyebrow: 'SAME DAY',   title: 'Start your consultation',    description: 'Join by video, receive your diagnosis, prescription or referral — all in one session. Records are saved automatically.', detail: 'Average wait time: under 15 minutes.', accent: TERRA },
];

const HowWeWorkSection = () => (
  <div className="space-y-16">
    <div className="text-center space-y-6 max-w-2xl mx-auto">
      <div className="text-xs tracking-[0.25em] text-[#A89080]">HOW IT WORKS</div>
      <h2 className="serif text-5xl lg:text-6xl leading-tight text-[#2C1810]">
        From sign-up to<br />
        <span style={{ color: TERRA }} className="italic">consultation in minutes</span>
      </h2>
      <p className="text-base leading-relaxed text-[#7A6458]">We removed every unnecessary step between you and the care you need.</p>
      <div className="h-px w-24 mx-auto" style={{ backgroundColor: TERRA }} />
    </div>

    <div className="grid md:grid-cols-3 gap-12">
      {steps.map((step, i) => (
        <div key={i} className="relative">
          <div className="space-y-5">
            <div className="text-7xl serif leading-none opacity-10" style={{ color: step.accent }}>{step.number}</div>
            <div className="text-xs tracking-[0.2em]" style={{ color: step.accent }}>{step.eyebrow}</div>
            <div className="space-y-3">
              <h3 className="text-2xl serif text-[#2C1810]">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#7A6458]">{step.description}</p>
            </div>
            <div className="inline-block text-xs tracking-[0.12em] px-4 py-2 rounded-sm border border-[#EDE5DF] text-[#A89080]">{step.detail}</div>
          </div>
          {i < steps.length - 1 && (
            <div className="hidden md:block absolute top-14 -right-6">
              <ArrowRight className="w-6 h-6 text-[#EDE5DF]" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default HowWeWorkSection;