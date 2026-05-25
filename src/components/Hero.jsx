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
      className="relative overflow-hidden bg-white px-6 pt-36 text-slate-900"
    >
      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl items-center"
      >
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>

            {/* Small Heading */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700"
            >
              ✨ Full-Stack Developer
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                Faith Maina
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl text-lg leading-relaxed text-slate-600"
            >
              I build modern, responsive, and user-friendly web
              applications using React, Tailwind CSS, Node.js,
              and JavaScript.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {[
                "React",
                "Tailwind CSS",
                "JavaScript",
                "Node.js",
                "MongoDB",
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                View My Work
                <FaArrowRight className="text-sm" />
              </a>

              <a
                href="#contact"
                className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-600"
              >
                Contact Me
              </a>

              <a
                href="/MyCV.pdf"
                download
                className="rounded-2xl border border-blue-200 bg-blue-50 px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Download CV
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-5"
            >
              <a
                href="https://github.com/fn-ui"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/faith-njeri-893489294/"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:fn0740839@gmail.com"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
              >
                <FaEnvelope />
              </a>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >
            {/* Background Shape */}
            <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-br from-blue-100 to-sky-50" />

            {/* Floating Ring */}
            <div className="absolute left-10 top-10 h-20 w-20 rounded-full border-4 border-blue-200" />

            {/* Main Image */}
            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              src={profileImg}
              alt="Faith Maina"
              className="relative z-10 h-[420px] w-[420px] rounded-full object-cover shadow-2xl"
            />

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 left-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            >
              <p className="text-sm font-medium text-slate-500">
                Experience
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                2+ Years
              </h3>
            </motion.div>

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default Hero;