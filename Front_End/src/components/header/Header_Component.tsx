import type { NavItem } from "./types";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo_hero from "../../assets/logo_hero.png"


type Props = {
  isDark: boolean;
  isMenuOpen: boolean;
  activeSection: string;
  navItems: NavItem[];
  onToggleTheme: () => void;
  onToggleMenu: () => void;
  onNavClick: (id: string) => void;
};

const Header = ({
  isDark,
  isMenuOpen,
  activeSection,
  navItems,
  onToggleTheme,
  onToggleMenu,
  onNavClick,
}: Props) => {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav
        className={`${
          isDark ? "bg-gray-900/70 border-gray-700" : "bg-white/70 border-gray-300"
        } backdrop-blur-xl border-2 rounded-full shadow-2xl transition-all duration-300 px-6 py-3`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-300 ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              <img
                src={logo_hero}
                alt="MedEdge Logo"
                className="h-18 w-auto"
              />
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1 px-8">
            <ul className="flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(item.id);
                      }}
                      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        isActive
                          ? isDark
                            ? "text-white bg-blue-600"
                            : "text-white bg-blue-500"
                          : isDark
                          ? "text-gray-300 hover:text-white hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-pulse" />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right side (Desktop) */}
          <div
            className={`hidden md:flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 hover:rotate-180"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:rotate-180"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#signin"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Sign In
            </a>

            <a
              href="#signup"
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Buttons */}
          <div
            className={`md:hidden flex items-center space-x-2 px-3 py-2 rounded-full border-2 ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark ? "bg-gray-800 text-yellow-400 hover:rotate-180" : "bg-gray-100 text-gray-600 hover:rotate-180"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={onToggleMenu}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden mt-4 border-t-2 ${
              isDark ? "border-gray-700" : "border-gray-300"
            } pt-4`}
          >
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(item.id);
                      }}
                      className={`block px-4 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                        isActive
                          ? isDark
                            ? "text-white bg-blue-600"
                            : "text-white bg-blue-500"
                          : isDark
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-4 space-y-2 border-t-2 border-gray-700">
              <a
                href="#signin"
                className={`block w-full text-center px-4 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                  isDark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Sign In
              </a>

              <a
                href="#signup"
                className={`block w-full text-center px-4 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                  isDark ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Sign Up
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
