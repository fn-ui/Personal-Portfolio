import {
  FaCode,
  FaLaptopCode,
  FaPaintBrush,
  FaMobileAlt,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Services() {
  const services = [
    {
      icon: <FaCode />,
      title: "Web Development",
      desc: "Modern, scalable, and responsive websites built using React, Tailwind CSS, and modern frontend technologies.",
    },

    {
      icon: <FaLaptopCode />,
      title: "API Integration",
      desc: "Integration of RESTful APIs and backend services to create dynamic and data-driven web applications.",
    },

    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      desc: "Clean and user-focused interfaces designed with modern UI principles and intuitive user experiences.",
    },

    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      desc: "Fully responsive websites optimized for desktop, tablet, and mobile devices with smooth performance.",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900 dark:bg-[#050816] dark:text-white"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl dark:bg-cyan-500/10" />

      {/* DARK SPOTLIGHT */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            My Services
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            What I Can{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Do For You
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            I design and develop modern digital experiences focused
            on performance, responsiveness, and user engagement.
          </p>
        </motion.div>

        {/* SERVICES GRID */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-blue-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40"
            >
              {/* HOVER GLOW */}
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl transition-all duration-500 group-hover:scale-150 dark:bg-blue-500/10" />

              <div className="relative z-10 flex h-full flex-col">

                {/* ICON */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600 transition duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
                  {service.icon}
                </div>

                {/* TITLE */}
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="leading-8 text-slate-600 dark:text-slate-400">
                  {service.desc}
                </p>

                {/* READ MORE */}
                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 group-hover:translate-x-2 dark:text-blue-400">
                  Learn More
                  <FaArrowRight className="text-sm" />
                </div>

              </div>
            </motion.div>
          ))}

        </div>

        {/* BOTTOM FEATURE STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[2.5rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                Why Work With Me
              </p>

              <h3 className="text-3xl font-black md:text-4xl">
                Modern Solutions With
                <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                  Clean User Experience
                </span>
              </h3>
            </div>

            {/* FEATURES */}
            <div className="grid gap-4 sm:grid-cols-3">

              {[
                "Responsive Design",
                "Modern UI/UX",
                "Fast Performance",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Services;