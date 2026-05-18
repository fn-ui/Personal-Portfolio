function Navbar() {
  return (
    <header className="bg-white text-slate-950 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        <h1 className="text-2xl font-bold text-slate-950">
          Faith Njeri
        </h1>

        <ul className="hidden md:flex gap-6 font-medium text-slate-600">
          <li>
            <a href="#about" className="hover:text-slate-950">
              About
            </a>
          </li>

          <li>
            <a href="#projects" className="hover:text-slate-950">
              Projects
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-slate-950">
              Contact
            </a>
          </li>
        </ul>

        <button className="border border-slate-950 text-slate-950 bg-white px-4 py-2 rounded-lg font-medium hover:bg-slate-950 hover:text-white transition">
          Hire Me
        </button>

      </nav>
    </header>
  )
}

export default Navbar