import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import profileImg from "../assets/profile.png";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // DARK MODE
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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

      // SHOW / HIDE NAVBAR
      if (currentScrollY > lastScrollY.current + 5 && currentScrollY > 100) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;

      // ACTIVE SECTION
      navItems.forEach((item) => {
        const section = document.getElementById(item);

        if (!section) return;

        const sectionTop = section.offsetTop - 120;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          currentScrollY >= sectionTop &&
          currentScrollY < sectionBottom
        ) {
          setActiveSection(item);
        }
      });

      if (currentScrollY < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed left-0 top-0 z-50 w-full"
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
                className="h-11 w-11 rounded-full border border-slate-200 object-cover dark:border-slate-700"
              />

              <div className="flex flex-col leading-none">
                <span className="text-[0.95rem] font-bold text-slate-900 dark:text-white">
                  Faith{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                    Njeri
                  </span>
                </span>

                <span className="text-[9px] uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
                  Full-Stack Developer
                </span>
              </div>
            </a>

            {/* DESKTOP NAV */}
            <ul className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={`text-sm font-medium transition ${
                      activeSection === item
                        ? "text-blue-600"
                        : "text-slate-600 hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">

              {/* DARK MODE TOGGLE */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-400 dark:hover:border-slate-600"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </motion.button>

              {/* CTA */}
              <a
                href="#contact"
                className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 md:block"
              >
                Reach out
              </a>

              {/* MOBILE BUTTON */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition dark:border-slate-700 dark:bg-slate-800 dark:text-white md:hidden"
              >
                {mobileMenu ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {/* MOBILE MENU */}
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-4 max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900 md:hidden"
            >
              <ul className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMobileMenu(false)}
                      className="text-sm font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
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