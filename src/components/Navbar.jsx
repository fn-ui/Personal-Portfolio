import { useEffect, useState } from "react"

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        showNavbar
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

        {/* Logo */}
        <a
          href="/"
          className="group text-3xl font-black tracking-tight text-white"
        >
          Faith{" "}

          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent transition duration-300 group-hover:from-blue-300 group-hover:to-purple-400">
            Njeri
          </span>
        </a>

        {/* Navigation Links */}
        <ul className="hidden items-center gap-10 md:flex">

          <li>
            <a
              href="#about"
              className="group relative font-medium text-white/70 transition duration-300 hover:text-white"
            >
              About

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </li>

          <li>
            <a
              href="#projects"
              className="group relative font-medium text-white/70 transition duration-300 hover:text-white"
            >
              Projects

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="group relative font-medium text-white/70 transition duration-300 hover:text-white"
            >
              Contact

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </li>

        </ul>

        {/* CTA Button */}
        <a
          href="#contact"
          className="rounded-2xl border border-white/20 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white hover:text-black"
        >
          Hire Me
        </a>

      </nav>
    </header>
  )
}

export default Navbar