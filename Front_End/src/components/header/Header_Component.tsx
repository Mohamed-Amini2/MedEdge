import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { NavItem } from "./types";
import logo from "../../assets/image-logo.png";

interface HeaderProps {
  isMenuOpen: boolean;
  activeSection: string;
  navItems: NavItem[];
  onToggleMenu: () => void;
  onNavClick: (id: string) => void;
}

const TERRA = "#C4521A";

const Header = ({
  isMenuOpen,
  activeSection,
  navItems,
  onToggleMenu,
  onNavClick,
}: HeaderProps) => {
  const [scrolled,     setScrolled    ] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setUserMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setUserMenuOpen(false), 120);
  };

  const border = "border-[#EDE5DF]/50";
  const text   = "text-[#5A3C30]";

  /* ── User dropdown ────────────────────────────────────────────── */
  const UserBtn = () => (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Button */}
      <button
        aria-label="Account"
        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          userMenuOpen
            ? "border-[#C4521A] text-[#C4521A]"
            : "border-[#EDE5DF] text-[#7A6458] hover:border-[#C4521A] hover:text-[#C4521A]"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </button>

      {/* Invisible bridge to prevent gap-triggered close */}
      <div className="absolute right-0 top-full h-2 w-full" />

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-[calc(100%+0.5rem)] w-44 rounded-sm border border-[#EDE5DF] bg-white shadow-lg shadow-[#C4521A]/5 overflow-hidden transition-all duration-200 ${
          userMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {/* Top accent */}
        <div className="h-0.5 w-full" style={{ backgroundColor: TERRA }} />

        <button
          onClick={() => { navigate("/login"); setUserMenuOpen(false); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-[0.15em] text-[#5A3C30] hover:text-[#C4521A] hover:bg-[#FBF7F2] transition-colors"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
          </svg>
          LOG IN
        </button>

        <div className="h-px bg-[#EDE5DF] mx-4" />

        <button
          onClick={() => { navigate("/signup"); setUserMenuOpen(false); }}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-[0.15em] text-[#5A3C30] hover:text-[#C4521A] hover:bg-[#FBF7F2] transition-colors"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
          SIGN UP
        </button>
      </div>
    </div>
  );

  /* ── Brand lockup ─────────────────────────────────────────────── */
  const Brand = ({ compact = false }: { compact?: boolean }) => (
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavClick("hero")}>
      <img src={logo} className="w-10 h-10" />
      <div>
        <div className={`serif tracking-tight leading-none text-[#2C1810] transition-all ${compact ? "text-lg" : "text-xl"}`}>
          MedEdge
        </div>
        {!compact && (
          <div className="text-[9px] tracking-[0.22em] mt-0.5" style={{ color: TERRA }}>
            CARE WITH PRECISION
          </div>
        )}
      </div>
    </div>
  );

  /* ── Nav links ────────────────────────────────────────────────── */
  const NavLinks = ({ compact = false }: { compact?: boolean }) => (
    <ul className={`flex items-center ${compact ? "gap-8" : "gap-10 justify-center"}`}>
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <li key={item.id}>
            <button
              onClick={() => onNavClick(item.id)}
              className={`relative text-xs tracking-[0.18em] uppercase transition-colors duration-200 pb-0.5 ${
                isActive ? "" : `${text} hover:text-[#C4521A]`
              }`}
              style={isActive ? { color: TERRA } : undefined}
            >
              {item.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: TERRA }}
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  /* ── Hamburger ────────────────────────────────────────────────── */
  const Hamburger = () => (
    <button
      onClick={onToggleMenu}
      aria-label="Toggle menu"
      className={`md:hidden w-9 h-9 rounded-full border flex flex-col items-center justify-center gap-[5px] transition-colors ${border}`}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="block w-4 h-px bg-[#7A6458] transition-all" />
      ))}
    </button>
  );

  return (
    <>
      {/* ── HERO HEADER ─────────────────────────────────────────── */}
      <header
        className={`absolute top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          scrolled ? "opacity-0 pointer-events-none -translate-y-3" : "opacity-100"
        }`}
      >
        <div className={`w-full border-b ${border} px-6 lg:px-16 py-5 flex items-center justify-between`}>
          <Brand />
          <div className="flex items-center gap-3">
            <UserBtn />
            <Hamburger />
          </div>
        </div>
        <div className={`hidden md:flex w-full items-center justify-center border-b ${border} px-6 lg:px-16 py-4`}>
          <NavLinks />
        </div>
      </header>

      {/* ── STICKY HEADER ───────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-2xl backdrop-saturate-150 border-b bg-[#FDFCFA]/10 transition-all duration-500 ${border} ${
          scrolled
            ? "translate-y-0 opacity-100 shadow-sm"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          boxShadow: scrolled
            ? "0 1px 0 #EDE5DF, 0 4px 24px rgba(44,24,16,0.06)"
            : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
          <Brand compact />
          <nav className="hidden md:block">
            <NavLinks compact />
          </nav>
          <div className="flex items-center gap-3">
            <UserBtn />
            <Hamburger />
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${border} px-6 py-6 bg-[#FDFCFA]`}>
            <ul className="flex flex-col gap-5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onNavClick(item.id)}
                      className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase transition-colors"
                      style={{ color: isActive ? TERRA : "#7A6458" }}
                    >
                      {isActive && (
                        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: TERRA }} />
                      )}
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-6 border-t border-[#EDE5DF] flex flex-col gap-3">
              <button
                onClick={() => navigate("/login")}
                className="w-full text-xs tracking-[0.15em] py-3 border border-[#EDE5DF] text-[#5A3C30] hover:border-[#C4521A] hover:text-[#C4521A] transition-colors"
              >
                LOG IN
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full text-xs tracking-[0.15em] py-3 text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TERRA }}
              >
                SIGN UP
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;