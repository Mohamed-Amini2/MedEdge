import { Phone, Mail, Clock } from 'lucide-react';

const TERRA = '#C4521A';
const BROWN = '#2C1810';

const ContactSection = () => (
  <div className="grid lg:grid-cols-2 gap-16 p-12 lg:p-20">
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="text-xs tracking-[0.25em] text-[#A89080]">GET IN TOUCH</div>
        <h2 className="serif text-5xl leading-tight text-[#2C1810]">
          You've seen enough.<br />
          <span style={{ color: TERRA }} className="italic">Let's get started.</span>
        </h2>
        <p className="text-base leading-relaxed max-w-sm text-[#7A6458]">
          Book a consultation, ask a question, or tell us what you need. A real person reads every message — usually within the hour.
        </p>
        <div className="h-px w-16" style={{ backgroundColor: TERRA }} />
      </div>

      <div className="space-y-8">
        {[
          { Icon: Phone, label: 'PHONE',        value: '(+7) ### ### ## ##'        },
          { Icon: Mail,  label: 'EMAIL',         value: 'hello@mededge.com'         },
          { Icon: Clock, label: 'RESPONSE TIME', value: 'Usually within 1 hour'    },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-full border-2 border-[#C4521A] flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" style={{ color: TERRA }} />
            </div>
            <div className="space-y-1 pt-1">
              <div className="text-xs tracking-[0.2em] text-[#A89080]">{label}</div>
              <div className="text-lg text-[#2C1810]">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs leading-relaxed max-w-xs text-[#7A6458]">
        Your information is never shared with third parties. Reaching out doesn't commit you to anything.
      </p>
    </div>

    <div className="p-10 rounded-sm border border-[#EDE5DF] bg-[#FDFCFA]">
      <form className="space-y-8">
        {[
          { label: 'YOUR NAME',     type: 'text',  placeholder: 'John Smith'       },
          { label: 'EMAIL ADDRESS', type: 'email', placeholder: 'john@example.com' },
        ].map(({ label, type, placeholder }) => (
          <div key={label} className="space-y-3">
            <label className="block text-xs tracking-[0.2em] text-[#A89080]">{label}</label>
            <input type={type} placeholder={placeholder} className="w-full px-0 py-3 bg-transparent border-b border-[#EDE5DF] text-[#2C1810] placeholder-[#C0B0A8] focus:border-[#C4521A] focus:outline-none transition-colors" />
          </div>
        ))}

        <div className="space-y-3">
          <label className="block text-xs tracking-[0.2em] text-[#A89080]">REASON FOR CONTACT</label>
          <select className="w-full px-0 py-3 bg-transparent border-b border-[#EDE5DF] text-[#A89080] focus:border-[#C4521A] focus:outline-none transition-colors appearance-none">
            <option value="">Select one…</option>
            <option>Book a consultation</option>
            <option>General enquiry</option>
            <option>Technical support</option>
            <option>Partnership / press</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-xs tracking-[0.2em] text-[#A89080]">MESSAGE</label>
          <textarea rows={4} placeholder="Tell us more…" className="w-full px-0 py-3 bg-transparent border-b border-[#EDE5DF] text-[#2C1810] placeholder-[#C0B0A8] focus:border-[#C4521A] focus:outline-none transition-colors resize-none" />
        </div>

        <button type="submit" style={{ backgroundColor: BROWN }} className="w-full px-8 py-4 text-xs tracking-[0.15em] text-white transition-all duration-300 hover:opacity-90">
          SEND MESSAGE
        </button>

        <p className="text-xs text-center text-[#A89080]">
          We'll never share your details. Read our{' '}
          <a href="#" className="underline hover:text-[#C4521A] transition-colors">Privacy Policy</a>.
        </p>
      </form>
    </div>
  </div>
);

export default ContactSection;