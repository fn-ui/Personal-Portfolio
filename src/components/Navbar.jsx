import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";

import profileImg from "../assets/profile.png";

const navItems = ["about", "skills", "services", "projects", "testimonials", "contact"];

function Navbar({ darkMode, setDarkMode }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 24);
      setShowNavbar(
        !(currentScrollY > lastScrollY.current + 5 && currentScrollY > 120)
      );
      if (currentScrollY < lastScrollY.current - 5) setShowNavbar(true);

      lastScrollY.current = currentScrollY;

      navItems.forEach((item) => {
        const section = document.getElementById(item);
        if (!section) return;

        const top = section.offsetTop - 130;
        const bottom = top + section.offsetHeight;
        if (currentScrollY >= top && currentScrollY < bottom) {
          setActiveSection(item);
        }
      });

      if (currentScrollY < 180) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed left-0 top-0 z-50 w-full px-4"
        >
          <nav
            className={`mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border px-5 py-3 backdrop-blur-xl transition ${
              scrolled
                ? "border-[#eadccf] bg-[#fffaf3]/95 shadow-lg shadow-[#3a2236]/10 dark:border-slate-800 dark:bg-slate-950/90"
                : "border-[#eadccf]/80 bg-[#fffaf3]/80 dark:border-slate-800 dark:bg-slate-950/70"
            }`}
          >
            <a href="#hero" className="flex items-center gap-3">
              <img
                src={profileImg}
                alt="Faith Njeri"
                className="h-11 w-11 rounded-full border border-[#eadccf] object-cover"
              />
              <div className="leading-tight">
                <span className="font-bold text-[#241423] dark:text-white">
                  Faith <span className="text-[#c65f4a]">Njeri</span>
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#7c6a61] dark:text-slate-400">
                  Full-Stack Developer
                </span>
              </div>
            </a>

            <ul className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-sm font-semibold transition ${
                      activeSection === item
                        ? "text-[#c65f4a]"
                        : "text-[#5f4d55] hover:text-[#c65f4a] dark:text-slate-300"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle theme"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadccf] bg-white text-[#241423] shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              <a
                href="#contact"
                className="hidden rounded-xl bg-[#7a2e53] px-5 py-3 font-semibold text-white shadow-lg shadow-[#7a2e53]/20 transition hover:bg-[#642442] md:block"
              >
                Let's Talk
              </a>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Toggle menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#eadccf] bg-white text-[#241423] lg:hidden"
              >
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-3 max-w-7xl rounded-2xl border border-[#eadccf] bg-[#fffaf3] p-5 shadow-xl lg:hidden dark:border-slate-800 dark:bg-slate-950"
            >
              <ul className="grid gap-4">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMobileMenu(false)}
                      className="font-semibold text-[#5f4d55] dark:text-slate-300"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.header>
      )}
    </AnimatePresence>
  );
}

export default Navbar;
