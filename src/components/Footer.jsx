import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Footer() {
  const linkClass =
    "text-slate-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1 dark:text-slate-400 dark:hover:text-blue-400";

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white px-6 py-10 text-slate-900 dark:border-white/10 dark:bg-[#020617] dark:text-white">

      {/* BACKGROUND GLOWS */}
      <div className="absolute -top-20 left-0 h-60 w-60 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute -bottom-20 right-0 h-60 w-60 rounded-full bg-sky-100/40 blur-3xl dark:bg-cyan-500/10" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 p-6 text-white shadow-[0_20px_60px_rgba(37,99,235,0.35)]"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Let’s Work Together
              </p>

              <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                Build something great together
              </h2>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:-translate-y-1"
            >
              Contact Me
              <FaArrowRight size={14} />
            </a>

          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="mb-3 text-2xl font-black">
              Faith{" "}
              <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                Njeri
              </span>
            </h2>

            <p className="text-sm leading-7 text-slate-600 dark:text-slate-400">
              Full Stack Developer focused on building clean,
              responsive and modern web applications with
              exceptional user experiences.
            </p>

            <p className="mt-4 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Available for freelance work
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className={linkClass}>
                  About
                </a>
              </li>

              <li>
                <a href="#services" className={linkClass}>
                  Services
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
                <a href="/resume.pdf" className={linkClass}>
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Services
            </h3>

            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>Web Development</li>
              <li>UI / UX Design</li>
              <li>API Integration</li>
              <li>Responsive Design</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Contact
            </h3>

            <div className="space-y-4 text-sm">

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Email
                </p>

                <a
                  href="mailto:fn0740839@gmail.com"
                  className="text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  fn0740839@gmail.com
                </a>
              </div>

              <div>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Phone
                </p>

                <a
                  href="tel:+254796880912"
                  className="text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  +254 796 880 912
                </a>
              </div>

              {/* SOCIALS */}
              <div className="flex gap-3 pt-2">

                <a
                  href="https://github.com/fn-ui"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://linkedin.com"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="mailto:fn0740839@gmail.com"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  <FaEnvelope />
                </a>

              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-500">
          © {new Date().getFullYear()} Faith Njeri — Built with React & Tailwind CSS
        </div>

      </div>
    </footer>
  );
}

export default Footer;