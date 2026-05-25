import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import profileImg from "../assets/profile.png";

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollY = useRef(0); // ✅ FIX: stable scroll memory

  const navItems = ["about", "services", "projects", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 30);

      // ✅ FIXED: prevent flicker with threshold
      if (currentScrollY > lastScrollY.current + 5 && currentScrollY > 100) {
        setShowNavbar(false); // scrolling down
      } else if (currentScrollY < lastScrollY.current - 5) {
        setShowNavbar(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;

      // SECTION TRACKING
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
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="fixed left-0 top-0 z-50 w-full"
        >
          <nav
            className={`mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-4 backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? "border-slate-200 bg-white/90 shadow-lg"
                : "border-transparent bg-white/70"
            }`}
          >
            {/* LOGO */}
            <a href="#hero" className="flex items-center gap-3">
              <img
                src={profileImg}
                alt="Profile"
                className="h-11 w-11 rounded-full border border-slate-200 object-cover"
              />

              <div className="flex flex-col leading-none">
                <span className="text-[0.95rem] font-bold text-slate-900">
                  Faith{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                    Njeri
                  </span>
                </span>

                <span className="text-[9px] uppercase tracking-[0.28em] text-slate-400">
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
                        : "text-slate-600 hover:text-blue-500"
                    }`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA + MOBILE */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 md:block"
              >
                Reach out
              </a>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white md:hidden"
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
              className="mx-auto mt-4 max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:hidden"
            >
              <ul className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item}`}
                      onClick={() => setMobileMenu(false)}
                      className="text-sm font-medium text-slate-700 hover:text-blue-600"
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