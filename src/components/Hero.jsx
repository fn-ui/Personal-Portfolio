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
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Ambient Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />

      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center px-6 py-24 md:py-32"
      >

        {/* Glass Container */}
        <div className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(59,130,246,0.05)] md:p-14">

          <div className="flex flex-col items-center gap-14 lg:flex-row lg:justify-between">

            
            {/* LEFT CONTENT */}
<div className="max-w-[540px] flex-1 text-center lg:text-left">

  {/* Small Heading */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200 md:text-sm"
  >
    Building Modern Digital Experiences
  </motion.p>

  {/* Main Heading */}
  <motion.h1
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="mb-6 text-4xl font-black leading-[0.92] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
  >

    <motion.span
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="bg-gradient-to-r from-white via-blue-100 to-slate-400 bg-[length:200%_200%] bg-clip-text text-transparent"
    >
      Full-Stack
    </motion.span>

    <br />

    <span className="text-slate-100">
      Developer &
    </span>

    <br />

    <span className="text-slate-400">
      UI Engineer
    </span>

  </motion.h1>

  {/* Animated Accent Line */}
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: 80, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="mx-auto mb-7 h-[3px] rounded-full bg-gradient-to-r from-blue-400 to-purple-400 lg:mx-0"
  />

  {/* Description */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="mb-5 max-w-[520px] text-base leading-relaxed text-slate-300 md:text-lg"
  >
    I build scalable, responsive web applications focused on
    performance, accessibility, and exceptional user experience
    using modern frontend and backend technologies.
  </motion.p>

  {/* Tech Stack */}
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.9 }}
    className="mb-7 text-sm text-slate-400 md:text-base"
  >
    React • Node.js • MongoDB • Tailwind CSS • JavaScript
  </motion.p>

  {/* Trust Indicators */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1 }}
    className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-400"
  >

    <span>⚡ Performance Focused</span>

    <span>•</span>

    <span>📱 Responsive Design</span>

    <span>•</span>

    <span>🌍 Open to Remote Work</span>

  </motion.div>

  {/* CTA Buttons */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.2 }}
    className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
  >

    {/* Primary Button */}
    <a
      href="#projects"
      className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(59,130,246,0.35)]"
    >
      View My Work
    </a>

    {/* Secondary Button */}
    <a
      href="#contact"
      className="rounded-2xl border border-white/15 bg-white/[0.04] px-8 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.08]"
    >
      Get In Touch
    </a>

    {/* CV Button */}
    <a
      href="/MyCV.pdf"
      download
      className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-8 py-3.5 font-semibold text-blue-300 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500/20"
    >
      Download MyCV
    </a>

  </motion.div>

  {/* Social Links */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1.4 }}
    className="mt-9 flex items-center justify-center gap-5 lg:justify-start"
  >

    {/* GitHub */}
<a
  href="https://github.com/fn-ui"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub Profile"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:text-white"
>
  <FaGithub size={18} />
</a>

{/* LinkedIn */}
<a
  href="https://linkedin.com/in/faith-njeri-893489294/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn Profile"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:text-blue-400"
>
  <FaLinkedin size={18} />
</a>

{/* Email */}
<a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=fn0740839@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Send Email"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/40 hover:text-pink-400"
>
  <FaEnvelope size={18} />
</a>
  </motion.div>

</div>

            
            {/* RIGHT IMAGE */}
      <div className="flex flex-1 justify-center">

       <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative"
  >

    {/* Floating Badge - React */}
    <div className="absolute -left-6 top-10 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md">
      React
    </div>

    {/* Floating Badge - Node */}
    <div className="absolute -right-6 bottom-10 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md">
      Node.js
    </div>

    {/* Ambient Ring */}
    <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 blur-2xl" />

    {/* Profile Image */}
    <img
      src={profileImg}
      alt="Faith Njeri"
      className="relative h-72 w-72 rounded-full border border-white/10 ring-1 ring-white/10 object-cover object-top shadow-[0_25px_100px_rgba(0,0,0,0.55)] transition duration-500 hover:scale-[1.03] lg:h-[340px] lg:w-[340px]"
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