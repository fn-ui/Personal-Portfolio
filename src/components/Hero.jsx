import heroBg from "../assets/hero.jpg";
import profileImg from "../assets/profile.png";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden text-white"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg || ""})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center px-6 py-24 md:py-32"
      >
        <div className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-14">

          <div className="flex flex-col items-center gap-14 lg:flex-row lg:justify-between">

            {/* LEFT */}
            <div className="max-w-[540px] flex-1 text-center lg:text-left">

              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
                Building Modern Digital Experiences
              </p>

              <h1 className="mb-6 text-4xl font-black sm:text-5xl md:text-6xl lg:text-[68px]">
                <span className="bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-clip-text text-transparent">
                  Full-Stack
                </span>
                <br />
                Developer &<br />
                <span className="text-slate-400">UI Engineer</span>
              </h1>

              <div className="mb-7 h-[3px] w-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />

              <p className="mb-5 text-slate-300">
                I build scalable, responsive web applications focused on performance,
                accessibility, and user experience.
              </p>

              <p className="mb-7 text-sm text-slate-400">
                React • Node.js • MongoDB • Tailwind CSS • JavaScript
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span>⚡ Performance Focused</span>
                <span>📱 Responsive Design</span>
                <span>🌍 Open to Remote Work</span>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#projects" className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3.5 font-semibold">
                  View My Work
                </a>

                <a href="#contact" className="rounded-2xl border border-white/15 bg-white/5 px-8 py-3.5">
                  Get In Touch
                </a>

                <a href="/MyCV.pdf" download className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-8 py-3.5 text-blue-300">
                  Download CV
                </a>
              </div>

              {/* Socials */}
              <div className="mt-9 flex gap-5">
                <a href="https://github.com/fn-ui" target="_blank">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/faith-njeri-893489294/" target="_blank">
                  <FaLinkedin />
                </a>
                <a href="mailto:fn0740839@gmail.com">
                  <FaEnvelope />
                </a>
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-1 justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="relative"
              >
                <img
                  src={profileImg}
                  alt="profile"
                  className="h-72 w-72 rounded-full object-cover lg:h-[340px] lg:w-[340px]"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;