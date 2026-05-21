import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import profileImg from "../assets/profile.png";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = ["About", "Services", "Projects", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < 10 || window.scrollY < 100);

      setScrolled(window.scrollY > 30);

      const sections = navItems.map((item) =>
        document.getElementById(item.toLowerCase())
      );

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;

          if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });

      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: showNavbar ? 0 : -100,
        opacity: showNavbar ? 1 : 0,
      }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 z-50 w-full px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-4 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* LOGO */}
        <a href="#home" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md transition group-hover:bg-purple-500/20" />

            <img
              src={profileImg}
              alt="Faith Njeri"
              className="relative h-10 w-10 rounded-full border border-white/10 object-cover transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[0.95rem] font-bold text-white">
              Faith{" "}
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Njeri
              </span>
            </span>

            <span className="text-[9px] uppercase tracking-[0.28em] text-slate-500">
              Full-Stack Developer
            </span>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const sectionId = item.toLowerCase();

            return (
              <li key={item}>
                <a
                  href={`#${sectionId}`}
                  className={`group relative text-sm font-medium transition duration-300 ${
                    activeSection === sectionId
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item}

                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                      activeSection === sectionId
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* CTA */}
          <a
            href="#contact"
            className="hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 md:block"
          >
            Reach out
          </a>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/10 md:hidden"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mx-auto mt-4 max-w-6xl rounded-2xl border border-white/10 bg-black/80 p-6 backdrop-blur-2xl md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {navItems.map((item) => {
              const sectionId = item.toLowerCase();

              return (
                <li key={item}>
                  <a
                    href={`#${sectionId}`}
                    onClick={() => setMobileMenu(false)}
                    className={`text-sm font-medium transition ${
                      activeSection === sectionId
                        ? "text-white"
                        : "text-slate-400"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            onClick={() => setMobileMenu(false)}
            className="mt-6 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white"
          >
            Hire Me
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}

export default Navbar;