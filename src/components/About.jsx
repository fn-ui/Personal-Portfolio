import { motion } from "framer-motion";
import {
  Code2,
  Database,
  MessageCircle,
  Rocket,
  Smartphone,
  SquareStack,
  UserRound,
} from "lucide-react";

import profileImg from "../assets/about.png";

const strengths = [
  {
    icon: SquareStack,
    title: "Clean & Intentional",
    body: "Interfaces that feel calm, intentional, and easy to use.",
  },
  {
    icon: Database,
    title: "Reliable & Scalable",
    body: "Backend workflows that make content and messages manageable.",
  },
  {
    icon: Smartphone,
    title: "Responsive by Design",
    body: "Layouts that look and perform beautifully on every device.",
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    body: "From first idea to launch and beyond, you'll always know what's happening.",
  },
];

const facts = [
  {
    icon: UserRound,
    value: "2+",
    label: "Years building modern solutions",
  },
  {
    icon: Code2,
    value: "8+",
    label: "Portfolio-ready projects",
  },
  {
    icon: Rocket,
    value: "Full Stack",
    label: "End-to-end development",
  },
];

function About() {
  return (
    <section
      id="about"
      className="section-shell bg-[#fff8ef] px-6 pb-20 pt-24 text-[#241423] before:hidden dark:bg-slate-950 dark:text-white lg:pt-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 hidden h-[calc(100%-7rem)] -translate-x-1/2 lg:block">
        <div className="h-full w-px bg-[#eadccf] dark:bg-slate-800" />
        <div className="absolute left-1/2 top-10 h-16 w-1 -translate-x-1/2 rounded-full bg-[#7c6a61] dark:bg-slate-600" />
        <div className="absolute top-0 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-[#eadccf] bg-[#fff8ef] text-[#c65f4a] shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1px_1fr] lg:items-center lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="lg:pr-8"
        >
          <p className="inline-flex items-center gap-2 rounded-md bg-[#fbe3dc] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#c65f4a]">
            <UserRound className="h-3.5 w-3.5" />
            About Me
          </p>
          <h2 className="mt-6 max-w-2xl text-4xl font-extrabold leading-tight tracking-normal text-[#241423] dark:text-white md:text-5xl">
            I build digital experiences with structure, warmth, and{" "}
            <span className="text-[#c65f4a]">purpose.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#6d5b53] dark:text-slate-400 md:text-lg">
            My work sits between thoughtful design and practical engineering. I
            care about how a website looks, how quickly people understand it,
            and how easily the owner can manage it behind the scenes.
          </p>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {strengths.map(({ icon: Icon, title, body }) => (
              <div key={title} className="grid grid-cols-[3.25rem_1fr] gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#fbe3dc] text-[#c65f4a]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#241423] dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-[#6d5b53] dark:text-slate-400">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hidden h-full min-h-[26rem] w-px bg-[#eadccf] lg:block" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true }}
          className="lg:pl-8"
        >
          <div className="grid overflow-hidden rounded-2xl border border-[#4f1f39]/20 bg-[#5b233f] shadow-2xl shadow-[#7a2e53]/20 md:grid-cols-[0.8fr_1.2fr]">
            <div className="p-6 text-white md:p-8">
              <h3 className="text-xl font-bold">Quick Facts</h3>
              <div className="mt-4 h-px bg-white/18" />
              <div className="mt-5 space-y-1">
                {facts.map(({ icon: Icon, value, label }) => (
                  <div
                    key={value}
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-white/12 py-5 last:border-b-0"
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[#c65f4a] text-white">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold leading-none">
                        {value}
                      </p>
                      <p className="mt-1 max-w-[10rem] text-sm leading-5 text-white/82">
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-[22rem] overflow-hidden md:min-h-[29rem]">
              <img
                src={profileImg}
                alt="Faith Njeri building web applications"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-[#eadccf] bg-[#fffaf3] p-5 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-700 dark:bg-slate-950">
            <p className="section-eyebrow">Current Focus</p>
            <p className="mt-2 text-lg font-bold text-[#241423] dark:text-white">
              Professional websites, admin systems, and product-style
              interfaces.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
