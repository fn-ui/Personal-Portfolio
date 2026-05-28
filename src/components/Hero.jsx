import profileImg from "../assets/profile.png";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white px-6 pt-32 pb-20 text-slate-900 dark:bg-slate-950 dark:text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      {/* GLOWS */}
      <div className="absolute -top-40 left-[-100px] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[120px] dark:bg-blue-500/20" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[500px] w-[500px] rounded-full bg-sky-200/40 blur-[120px] dark:bg-cyan-500/20" />

      {/* SPOTLIGHT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* MAIN GLASS CARD */}
        <div className="relative overflow-hidden rounded-[3rem] border border-slate-200/70 bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-900/70">

          {/* INNER GLOW */}
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-500/10" />

          <div className="relative grid items-center gap-16 px-8 py-12 lg:grid-cols-2 lg:px-16 lg:py-16">

            {/* LEFT CONTENT */}
            <div>

              {/* BADGE */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
              >
                ✨ Full-Stack Developer
              </motion.div>

              {/* HEADING */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-black leading-[1] sm:text-6xl lg:text-7xl"
              >
                Building{" "}
                <span className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  modern web
                </span>
                <br />
                experiences
                <br />
                that feel alive.
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
              >
                I design and build fast, responsive and interactive web
                applications using React, Tailwind CSS and modern frontend
                technologies.
              </motion.p>

              {/* TECH STACK */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "React",
                  "Tailwind",
                  "JavaScript",
                  "Node.js",
                  "MongoDB",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(37,99,235,0.35)] transition hover:bg-blue-700"
                >
                  View My Work

                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  Contact Me
                </motion.a>

              </div>

              {/* SOCIALS */}
              <div className="mt-10 flex items-center gap-5">

                {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (
                  <motion.a
                    whileHover={{ y: -5 }}
                    key={i}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                  >
                    <Icon />
                  </motion.a>
                ))}

              </div>

            </div>

            {/* RIGHT CONTENT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative flex justify-center"
            >

              {/* IMAGE WRAPPER */}
              <div className="relative">

                {/* OUTER ANIMATED RING */}
                <div className="absolute inset-0 animate-pulse rounded-full border border-blue-200/50 dark:border-blue-500/20" />

                {/* GLOW */}
                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-3xl dark:from-blue-500/20 dark:to-cyan-500/20" />

                {/* IMAGE */}
                <motion.img
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  src={profileImg}
                  alt="profile"
                  className="relative z-10 h-[340px] w-[340px] rounded-full border-[10px] border-white object-cover shadow-[0_30px_80px_rgba(0,0,0,0.18)] dark:border-slate-900 sm:h-[420px] sm:w-[420px]"
                />

                {/* EXPERIENCE CARD */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 z-20 rounded-3xl border border-white/60 bg-white/90 px-6 py-5 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Experience
                  </p>

                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                    2+ Years
                  </h3>
                </motion.div>

                

              </div>

            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;