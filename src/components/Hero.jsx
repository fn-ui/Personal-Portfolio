import heroBg from "../assets/hero.jpg";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" />

      
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-36">

        {/* Glass Container */}
        <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center text-white backdrop-blur-sm md:p-14">

          {/* Subtitle */}
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-blue-300 md:text-sm">
            Building Modern Digital Experiences
          </p>

          {/* Main Heading */}
          <h1 className="mx-auto mb-8 max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-6xl lg:text-7xl">

            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              MERN Stack Developer
            </span>

            <br />

            <span className="text-slate-200">
              Creative Technologist
            </span>

          </h1>

          {/* Accent Divider */}
          <div className="mx-auto mb-10 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_25px_rgba(96,165,250,0.4)]" />

          {/* Description */}
          <p className="mx-auto mb-5 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            I craft modern, scalable, and high-performance web applications
            that combine clean design with seamless functionality.
          </p>

          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          Specialized in React, Node.js, HTML, JavaScript, and Tailwind CSS —
          transforming ideas into elegant digital experiences.
          </p>

          {/* Core Skills */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">

            {["React", "Node.js", "HTML", "JavaScript", "Tailwind CSS"].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
              >
                {skill}
              </span>
            ))}

          </div>

          {/* Buttons */}
          <div className="mb-10 flex flex-col items-center justify-center gap-5 sm:flex-row">

            {/* Primary Button */}
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-2xl bg-white px-8 py-3.5 font-bold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-200"
            >
              <span className="relative z-10">
                View My Work
              </span>

              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-slate-200 to-white transition duration-300 group-hover:translate-y-0" />
            </a>

            {/* Secondary Button */}
            <a
              href="#contact"
              className="rounded-2xl border border-white/20 bg-white/5 px-8 py-3.5 font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10"
            >
              Get In Touch
            </a>

          </div>

          {/* Social Icons */}
          <div className="mb-10 flex items-center justify-center gap-4">

            {/* GitHub */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:border-slate-500 hover:bg-slate-800/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              <FaGithub
                size={20}
                className="transition-transform duration-300 group-hover:rotate-6"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
            >
              <FaLinkedin
                size={20}
                className="transition-transform duration-300 group-hover:rotate-6"
              />
            </a>

            {/* Email */}
            <a
              href="mailto:hello@yourdomain.com"
              aria-label="Email"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-purple-400 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:border-purple-500/50 hover:bg-purple-500/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
            >
              <FaEnvelope
                size={20}
                className="transition-transform duration-300 group-hover:rotate-6"
              />
            </a>

          </div>

          {/* Scroll Arrow */}
          <a
            href="#about"
            className="group inline-flex flex-col items-center text-slate-500 transition duration-300 hover:text-white"
          >
            <div className="animate-bounce">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}

export default Hero;