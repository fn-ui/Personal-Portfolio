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
      {/* SOFT BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

      {/* Animated Glow Orbs (more intentional placement) */}
      <div className="absolute -top-40 left-[-100px] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[120px]" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[500px] w-[500px] rounded-full bg-sky-200/40 blur-[120px]" />

      {/* Subtle radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl items-center"
      >
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="relative">

            {/* Glass panel behind text (key upgrade) */}
            <div className="absolute -left-6 top-[-40px] h-[120%] w-[120%] rounded-[3rem] bg-white/60 backdrop-blur-xl shadow-xl border border-slate-100" />

            <div className="relative z-10">

              {/* Badge */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700"
              >
                ✨ Full-Stack Developer
              </motion.p>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
              >
                Building{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  modern web experiences
                </span>
                {" "}that feel alive.
              </motion.h1>

              {/* Description */}
              <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                I design and build fast, responsive and interactive web apps
                using React, Tailwind CSS, and modern frontend tools.
              </p>

              {/* Tech pills (improved visual weight) */}
              <div className="mt-7 flex flex-wrap gap-3">
                {["React", "Tailwind", "JavaScript", "Node.js", "MongoDB"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#projects"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700"
                >
                  View My Work
                  <FaArrowRight />
                </a>

                <a
                  href="#contact"
                  className="rounded-2xl border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                >
                  Contact Me
                </a>
              </div>

              {/* Socials */}
              <div className="mt-10 flex items-center gap-5">
                {[FaGithub, FaLinkedin, FaEnvelope].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600"
                  >
                    <Icon />
                  </a>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative flex justify-center"
          >

            {/* Floating glow ring */}
            <div className="absolute h-[450px] w-[450px] rounded-full bg-gradient-to-br from-blue-100 to-sky-100 blur-2xl" />

            {/* Decorative orbit */}
            <div className="absolute left-10 top-10 h-24 w-24 rounded-full border border-blue-200/60" />

            {/* Image */}
            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              src={profileImg}
              alt="profile"
              className="relative z-10 h-[420px] w-[420px] rounded-full object-cover shadow-2xl border-4 border-white"
            />

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 left-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            >
              <p className="text-sm text-slate-500">Experience</p>
              <h3 className="text-2xl font-bold">2+ Years</h3>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;