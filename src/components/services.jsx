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
      desc: "Modern and responsive websites built using React and Tailwind CSS.",
    },
    {
      icon: <FaLaptopCode />,
      title: "API Integration",
      desc: "Seamless integration of RESTful APIs to enhance application functionality.",
    },
    {
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      desc: "Beautiful user-focused interfaces with modern design principles.",
    },
    {
      icon: <FaMobileAlt />,
      title: "Responsive Design",
      desc: "Websites optimized for desktop, tablet, and mobile devices.",
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-400">
            What I Offer
          </p>

          <h2 className="text-4xl font-bold md:text-5xl">
            My Services
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
            >
              <div className="flex h-full flex-col justify-between">
  
  {/* Top Content */}
  {/* Icon */}
<div className="mb-6 inline-flex rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-2xl">
  {service.icon}
</div>

{/* Title */}
<h3 className="mb-4 text-2xl font-semibold">
  {service.title}
</h3>

{/* Description */}
<p className="leading-relaxed text-gray-400">
  {service.desc}
</p>

{/* Read More */}
<p className="mt-6 text-sm font-semibold text-white transition-all duration-300 hover:translate-x-1 hover:text-gray-300">
  Read More →
</p>

</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;