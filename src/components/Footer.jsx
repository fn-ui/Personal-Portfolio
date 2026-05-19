function Footer() {
  const linkClass =
    "transition-colors duration-300 hover:text-white"

  const buttonClass =
    "rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/30 hover:bg-white/10"

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-20 text-white">

      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl -z-10" />

      <div className="relative z-10 mx-auto max-w-7xl">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="mb-5 text-4xl font-black leading-none tracking-tight md:text-5xl">
              Faith{" "}
              <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                Njeri
              </span>
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-slate-400">
              MERN Stack Developer focused on modern, responsive, and high-performance digital experiences.
              I build clean UI, accessible interfaces, and scalable web applications.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects" className={buttonClass}>
                View Projects
              </a>
              <a href="#contact" className={buttonClass}>
                Contact Me
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <section>
              <h3 className="mb-4 text-xl font-bold">Contact</h3>
              <ul className="space-y-3 text-slate-400">
                <li>📍 Nairobi, Kenya</li>
                <li>
                  ✉️{" "}
                  <a href="mailto:fn0740839@gmail.com" className="text-white hover:text-slate-200">
                    Email Me
                  </a>
                </li>
                <li>
                  💬{" "}
                  <a href="tel:+254796880912" className="text-white hover:text-slate-200">
                    Call Me
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-bold">Services</h3>
              <ul className="space-y-3 text-slate-400">
                <li>Web App Development</li>
                <li>UI / UX Design</li>
                <li>API Integration</li>
                <li>Performance Optimization</li>
              </ul>
            </section>
          </div>

          {/* Links & Social */}
          <div className="space-y-8">

            <nav>
              <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#about" className={linkClass}>About</a></li>
                <li><a href="#projects" className={linkClass}>Projects</a></li>
                <li><a href="#contact" className={linkClass}>Contact</a></li>
                <li><a href="#" className={linkClass}>Resume</a></li>
              </ul>
            </nav>

            <section>
              <h3 className="mb-4 text-xl font-bold">Connect</h3>

              <div className="flex flex-wrap gap-4">

                {/* GitHub */}
                <a href="#" aria-label="GitHub"
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                  GitHub
                </a>

                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn"
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                  LinkedIn
                </a>

                {/* Email */}
                <a href="mailto:fn0740839@gmail.com" aria-label="Email"
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                  Email
                </a>

              </div>
            </section>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-slate-500">
          <p className="text-sm uppercase tracking-[0.2em]">
            © 2026 Faith Njeri. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Built with React & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer