import { useEffect, useState } from 'react';
import Header from '../components/header/Header_Component';
import type { NavItem } from '../components/header/types';
import logo from '../assets/image-logo.png';
import {
  FeaturesSection,
  DoctorsSection,
  HowWeWorkSection,
  TestimonialSection,
  ContactSection,
} from '../components/Sections/Hero_Sections';
import HeroSection from '../components/Sections/Hero_Sections/HeroSection';

const NAV_ITEMS: NavItem[] = [
  { label: 'Features',     id: 'features'    },
  { label: 'How It Works', id: 'how-we-work' },
  { label: 'Doctors',      id: 'doctors'     },
  { label: 'Testimonials', id: 'testimonial' },
  { label: 'Contact',      id: 'contact'     },
];

const HomePage = () => {
  const [isMenuOpen,    setIsMenuOpen   ] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  useEffect(() => {
    const allIds = ['hero', ...NAV_ITEMS.map((i) => i.id)];
    const handleScroll = () => {
      const pos = window.scrollY + 200;
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#FDFCFA] text-[#2C1810]">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#FDFCFA] via-[#FBF7F2] to-[#FDFCFA]" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right,rgba(196,82,26,0.07) 1px,transparent 1px),linear-gradient(to bottom,rgba(196,82,26,0.07) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none fixed -top-40 -left-40 h-[600px] w-[600px] rounded-full blur-[160px] bg-[#C4521A]/5" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[500px] w-[500px] rounded-full blur-[150px] bg-[#C8960A]/5" />
      <div className="pointer-events-none fixed bottom-0 left-1/4 h-[400px] w-[600px] rounded-full blur-[140px] bg-[#C8960A]/4" />

      <Header
        isMenuOpen={isMenuOpen}
        activeSection={activeSection}
        navItems={NAV_ITEMS}
        onToggleMenu={toggleMenu}
        onNavClick={handleNavClick}
      />

      <main className="relative z-10">

        <section id="hero" className="pt-40 scroll-mt-0">
          <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
            <HeroSection onGetStarted={() => handleNavClick('contact')} />
          </div>
        </section>

        <div className="border-t border-[#EDE5DF] mt-40" />

        <section id="features" className="scroll-mt-24 py-40">
          <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
            <FeaturesSection />
          </div>
        </section>

        <div className="bg-[#FAF7F4] border-y border-[#EDE5DF]">
          <section id="how-we-work" className="scroll-mt-24 py-40">
            <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
              <HowWeWorkSection />
            </div>
          </section>
        </div>

        <section id="doctors" className="scroll-mt-24 py-40">
          <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
            <DoctorsSection />
          </div>
        </section>

        <div className="bg-[#FAF7F4] border-y border-[#EDE5DF]">
          <section id="testimonial" className="scroll-mt-24 py-40">
            <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
              <TestimonialSection />
            </div>
          </section>
        </div>

        <section id="contact" className="scroll-mt-24 py-40">
          <div className="px-6 lg:px-16 max-w-[1400px] mx-auto">
            <div className="rounded-sm overflow-hidden border border-[#EDE5DF] bg-white shadow-xl shadow-[#C4521A]/5">
              <ContactSection />
            </div>
          </div>
        </section>

      </main>

      <footer className="relative border-t border-[#EDE5DF] bg-white/70 py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-4 gap-12 mb-16">

            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <img src={logo} className="w-10 h-10" alt="MedEdge logo" />
                <div>
                  <div className="serif text-2xl tracking-tight leading-none text-[#2C1810]">
                    MedEdge
                  </div>
                  <div className="text-[10px] tracking-[0.22em] text-[#C4521A] mt-0.5">
                    CARE WITH PRECISION
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-md text-[#7A6458]">
                Secure, HIPAA-compliant telemedicine for patients and healthcare professionals. Your wellness journey begins here.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-xs tracking-[0.2em] text-[#A89080]">QUICK LINKS</div>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="text-sm text-[#7A6458] hover:text-[#C4521A] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-xs tracking-[0.2em] text-[#A89080]">LEGAL</div>
              <ul className="space-y-3 text-sm">
                {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance'].map((link) => (
                  <li key={link}>
                    <button className="text-[#7A6458] hover:text-[#C4521A] transition-colors">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-[#EDE5DF] text-center">
            <p className="text-xs tracking-[0.15em] text-[#A89080]">
              {`© ${new Date().getFullYear()} MEDEDGE — CARE WITH PRECISION`}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;