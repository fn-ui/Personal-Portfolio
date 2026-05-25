import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Footer() {
  const linkClass =
    "text-slate-500 transition-all duration-300 hover:text-blue-600 hover:translate-x-1";

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white px-6 py-16 text-slate-900">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TOP CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-sky-500 p-10 text-white shadow-2xl"
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
                Let’s Work Together
              </p>

              <h2 className="max-w-2xl text-4xl font-black leading-tight md:text-5xl">
                Ready To Build Your Next Digital Experience?
              </h2>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Contact Me
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h2 className="mb-5 text-3xl font-black">
              Faith
              <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                {" "}Njeri
              </span>
            </h2>

            <p className="mb-6 leading-8 text-slate-600">
              Full Stack Developer focused on building clean, modern,
              and responsive web applications with exceptional user experiences.
            </p>

            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
              <p className="text-sm font-medium text-green-600">
                Available for freelance work
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-slate-900">
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li><a href="#about" className={linkClass}>About</a></li>
              <li><a href="#services" className={linkClass}>Services</a></li>
              <li><a href="#projects" className={linkClass}>Projects</a></li>
              <li><a href="#contact" className={linkClass}>Contact</a></li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-slate-900">
              Services
            </h3>

            <ul className="space-y-4 text-slate-600">
              <li>Web Development</li>
              <li>UI / UX Design</li>
              <li>API Integration</li>
              <li>Responsive Design</li>
              <li>Frontend Development</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-slate-900">
              Contact
            </h3>

            <div className="space-y-5">

              <div>
                <p className="mb-1 text-sm text-slate-500">Location</p>
                <h4 className="font-semibold text-slate-800">
                  Nairobi, Kenya
                </h4>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">Email</p>
                <a
                  href="mailto:fn0740839@gmail.com"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  fn0740839@gmail.com
                </a>
              </div>

              <div>
                <p className="mb-1 text-sm text-slate-500">Phone</p>
                <a
                  href="tel:+254796880912"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  +254 796 880 912
                </a>
              </div>

              {/* SOCIALS */}
              <div className="pt-3">
                <p className="mb-4 text-sm text-slate-500">
                  Connect With Me
                </p>

                <div className="flex items-center gap-4">

                  <a
                    href="https://github.com/fn-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-400 hover:text-blue-600"
                  >
                    <FaGithub size={20} />
                  </a>

                  <a
                    href="https://linkedin.com/in/faith-njeri-893489294/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-400 hover:text-blue-600"
                  >
                    <FaLinkedin size={20} />
                  </a>

                  <a
                    href="mailto:fn0740839@gmail.com"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-400 hover:text-blue-600"
                  >
                    <FaEnvelope size={20} />
                  </a>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-14 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
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