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
      className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900"
    >
      {/* Background Decorations (KEEP - LOOK GOOD) */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* ❌ REMOVED GRID PATTERN (this caused squares) */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            My Services
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            What I Can{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Do For You
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
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
              className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
            >
              <div className="flex h-full flex-col">

                {/* ICON */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {service.icon}
                </div>

                {/* TITLE */}
                <h3 className="mb-4 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="leading-8 text-slate-600">
                  {service.desc}
                </p>

                {/* READ MORE */}
                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 group-hover:translate-x-2">
                  Learn More
                  <FaArrowRight className="text-sm" />
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Services;