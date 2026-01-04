import { useEffect, useState } from "react";
import Header from "../components/header/Header_Component";
import type { NavItem } from "../components/header/types";
import { FeaturesSection,
   DoctorsSection ,
    HowWeWorkSection ,
     TestimonialSection ,
      ContactSection } from "../components/Sections/Hero_Sections";

const NAV_ITEMS: NavItem[] = [
  { label: "Features", id: "features" },
  { label: "Doctors", id: "doctors" },
  { label: "How we Work", id: "how-we-work" },
  { label: "Testimonial", id: "testimonial" },
  { label: "Contact", id: "contact" },
];

const HomePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavItem["id"]>("features");

  const toggleTheme = () => setIsDark((v) => !v);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}>
      <Header
        isDark={isDark}
        isMenuOpen={isMenuOpen}
        activeSection={activeSection}
        navItems={NAV_ITEMS}
        onToggleTheme={toggleTheme}
        onToggleMenu={toggleMenu}
        onNavClick={handleNavClick}
      />

      <main className="pt-32 px-4 max-w-7xl mx-auto">
        <FeaturesSection isDark={isDark} />
        <DoctorsSection isDark={isDark} />
        <HowWeWorkSection isDark={isDark} />
        <TestimonialSection isDark={isDark} />
        <ContactSection isDark={isDark} />
      </main>
    </div>
  );
};

export default HomePage;
