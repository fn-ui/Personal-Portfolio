import { motion } from "framer-motion";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Monitor, Smartphone } from "lucide-react";

import heroImg from "../assets/developer-workspace-hero-background.webp";

const highlights = ["React", "Node.js", "MongoDB", "Tailwind CSS"];

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#fff8ef] text-white dark:bg-slate-950"
    >
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,17,29,0.86)_0%,rgba(36,20,35,0.66)_34%,rgba(88,44,57,0.24)_62%,rgba(255,248,239,0.06)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,#fff8ef_0%,rgba(255,248,239,0.86)_26%,rgba(42,22,35,0.34)_62%,rgba(42,22,35,0)_100%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-6 pt-28 sm:px-8 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#f2a38d]">
            Full-stack developer
          </p>

          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.98] text-white drop-shadow-xl sm:text-6xl lg:text-[4rem]">
            Built for clarity. Designed to scale.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#f8e8df] sm:text-lg">
            I build responsive interfaces, dependable APIs, and smooth web
            experiences for modern brands and growing teams.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-[#fff8ef] shadow-sm backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#c65f4a] px-6 py-4 font-semibold text-white shadow-xl shadow-black/20 transition hover:bg-[#ad503e]"
            >
              See My Work
              <FaArrowRight />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur-md transition hover:border-[#f2a38d] hover:bg-white/15"
            >
              Let's Talk
            </a>
          </div>

          <div className="mt-6 hidden items-center gap-3 sm:flex">
            {[
              { icon: FaGithub, label: "GitHub", href: "https://github.com/fn-ui" },
              { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com" },
              { icon: FaEnvelope, label: "Email", href: "mailto:fn0740839@gmail.com" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[#fff8ef] shadow-sm backdrop-blur-md transition hover:border-[#f2a38d] hover:text-[#f2a38d]"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="mt-8 grid gap-5 border-t border-white/15 pt-5 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f2a38d]">
              Website
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Portfolio Experience
            </h2>
            <div className="mt-4 h-2 w-full max-w-sm rounded-full bg-white/15">
              <div className="h-full w-3/5 rounded-full bg-[#c65f4a]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[#fff8ef]">
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((item) => (
                <span
                  key={item}
                  className={`h-2.5 w-2.5 rounded-full ${
                    item === 0 ? "bg-[#c65f4a]" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
            <span className="hidden h-10 w-px bg-white/20 sm:block" />
            <div className="flex items-center gap-3">
              <Monitor className="h-7 w-7" />
              <Smartphone className="h-7 w-7" />
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:text-[#f2a38d]"
            >
              Explore
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
