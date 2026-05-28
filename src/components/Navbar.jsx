import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";

import profileImg from "../assets/profile.png";

function Navbar({ darkMode, setDarkMode }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollY = useRef(0);

  const navItems = ["about", "services", "projects", "contact"];

  // DARK MODE EFFECT
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 30);

      if (currentScrollY > lastScrollY.current + 5 && currentScrollY > 100) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;

      navItems.forEach((item) => {
        const section = document.getElementById(item);
        if (!section) return;

        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (currentScrollY >= sectionTop && currentScrollY < sectionBottom) {
          setActiveSection(item);
        }
      });

      if (currentScrollY < 200) {
        setActiveSection("home");
      }
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
          className="fixed top-0 left-0 z-50 w-full"
        >
          <nav
            className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-4 backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? "border-slate-200 bg-white/90 shadow-lg dark:border-slate-700 dark:bg-slate-900/90"
                : "border-transparent bg-white/70 dark:bg-slate-900/70"
            }`}
          >
            {/* LOGO */}
            <a href="#hero" className="flex items-center gap-3">
              <img
                src={profileImg}
                alt="Profile"
                className="h-11 w-11 rounded-full border object-cover"
              />

              <div className="flex flex-col leading-none">
                <span className="font-bold dark:text-white">
                  Faith <span className="text-blue-500">Njeri</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">
                  Full-Stack Developer
                </span>
              </div>
            </a>

            {/* DESKTOP NAV */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-sm font-medium transition ${
                      activeSection === item
                        ? "text-blue-600"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* DARK MODE TOGGLE (ONLY ONE BUTTON) */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </motion.button>

              {/* CTA */}
              <a
                href="#contact"
                className="hidden md:block rounded-xl bg-blue-600 px-5 py-2.5 text-white"
              >
                Reach out
              </a>

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl border"
              >
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {/* MOBILE MENU */}
          {mobileMenu && (
            <motion.div className="mx-auto mt-4 max-w-6xl rounded-2xl border bg-white p-6 md:hidden dark:bg-slate-900">
              <ul className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMobileMenu(false)}
                      className="text-sm"
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