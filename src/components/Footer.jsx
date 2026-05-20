import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  const linkClass =
    "text-slate-400 transition-all duration-300 hover:text-white hover:translate-x-1";

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black px-6 py-12 text-white">

      {/* Top Glow Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute left-0 top-0 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Main Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="mb-4 text-4xl font-black leading-none tracking-tight md:text-5xl">
              Faith{" "}
              <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                Njeri
              </span>
            </h2>

            <p className="mb-5 max-w-md text-base leading-relaxed text-slate-300">
              MERN Stack Developer focused on modern, responsive,
              and high-performance digital experiences. I build clean UI,
              accessible interfaces, and scalable web applications.
            </p>

            <p className="text-sm text-slate-500">
              Available for freelance and collaborative projects.
            </p>
          </div>

          {/* Contact + Services */}
          <div className="space-y-6">

            {/* Contact */}
            <section>
              <h3 className="mb-3 text-xl font-bold">Contact</h3>

              <ul className="space-y-2 text-slate-400">

                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Nairobi, Kenya</span>
                </li>

                <li className="flex items-center gap-2">
                  <span>✉️</span>

                  <a
                    href="mailto:fn0740839@gmail.com"
                    className="text-blue-400 underline transition duration-300 hover:text-blue-300"
                  >
                    fn0740839@gmail.com
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <span>💬</span>

                  <a
                    href="tel:+254796880912"
                    className="text-blue-400 underline transition duration-300 hover:text-blue-300"
                  >
                    +254 796 880 912
                  </a>
                </li>

              </ul>
            </section>

            {/* Services */}
            <section>
              <h3 className="mb-3 text-xl font-bold">Services</h3>

              <ul className="space-y-2 text-slate-400">

                <li className="transition duration-300 hover:text-white">
                  Web App Development
                </li>

                <li className="transition duration-300 hover:text-white">
                  UI / UX Design
                </li>

                <li className="transition duration-300 hover:text-white">
                  API Integration
                </li>

                <li className="transition duration-300 hover:text-white">
                  Performance Optimization
                </li>

              </ul>
            </section>
          </div>

          {/* Links + Social */}
          <div className="space-y-6">

            {/* Quick Links */}
            <nav>
              <h3 className="mb-3 text-xl font-bold">Quick Links</h3>

              <ul className="space-y-2">

                <li>
                  <a href="#about" className={linkClass}>
                    About
                  </a>
                </li>

                <li>
                  <a href="#projects" className={linkClass}>
                    Projects
                  </a>
                </li>

                <li>
                  <a href="#contact" className={linkClass}>
                    Contact
                  </a>
                </li>

                <li>
                  <a href="#" className={linkClass}>
                    Resume
                  </a>
                </li>

              </ul>
            </nav>

            {/* Social Icons */}
            <section>
              <h3 className="mb-4 text-xl font-bold">Connect</h3>

              <div className="mt-2 flex items-center gap-4">

                {/* GitHub */}
                <a
                  href="https://github.com/fn-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:border-slate-500 hover:bg-slate-800/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                >
                  <FaGithub
                    size={22}
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/faith-njeri-893489294/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
                >
                  <FaLinkedin
                    size={22}
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </a>

                {/* Email */}
                
           
                {/* Email */}
                <a
                  href="mailto:fn0740839@gmail.com"
                  aria-label="Email"
                  className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-purple-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                >
                  <FaEnvelope
                    size={20}
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </a>
              </div>
            </section>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/5 pt-6 text-center">

          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            © {new Date().getFullYear()} Faith Njeri. All rights reserved.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Built with React & Tailwind CSS
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;