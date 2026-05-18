function Navbar() {
  return (
    <header className="bg-black text-white shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        <h1 className="text-2xl font-bold">
          Faith Njeri
        </h1>

        <ul className="hidden md:flex gap-6 font-medium">
          <li>
            <a href="#about" className="hover:text-gray-300">
              About
            </a>
          </li>

          <li>
            <a href="#projects" className="hover:text-gray-300">
              Projects
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>

        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
          Hire Me
        </button>

      </nav>
    </header>
  )
}

export default Navbar