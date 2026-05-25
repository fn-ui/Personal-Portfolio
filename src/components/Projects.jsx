import { FaArrowRight, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

import bellebliss from "../assets/bellebliss.png";
import portfolio from "../assets/portfolio.png";

function Projects() {
  const projects = [
    {
      image: portfolio,
      title: "Personal Portfolio Website",
      description:
        "A modern and responsive portfolio website built using React, Vite, and Tailwind CSS following modern frontend development practices and smooth user experience principles.",
      tech: ["React", "Tailwind CSS", "Vite"],
      live: "https://personal-portfolio-tlvs.vercel.app/",
      github: "https://github.com/fn-ui",
    },
    {
      image: bellebliss,
      title: "Bellebliss Website",
      description:
        "A modern online clothing store offering stylish and affordable fashion with responsive design, smooth navigation, and seamless shopping experiences across devices.",
      tech: ["HTML", "JavaScript", "CSS"],
      live: "https://bellebliss-website.vercel.app/",
      github: "https://github.com/fn-ui/Bellebliss-website",
    },
  ];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900"
    >
      {/* Background Decorations (KEEP - they look good) */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* ❌ REMOVED GRID PATTERN (this was causing squares everywhere) */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            My Projects
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Featured{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            A selection of projects showcasing my skills in frontend development,
            responsive design, and modern web technologies.
          </p>
        </motion.div>

        {/* PROJECT GRID */}
        <div className="grid gap-10 md:grid-cols-2">

          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8">

                <h3 className="mb-4 text-3xl font-black text-slate-900">
                  {project.title}
                </h3>

                <p className="mb-8 text-lg leading-8 text-slate-600">
                  {project.description}
                </p>

                <div className="mb-8 flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/button inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
                  >
                    View Project
                    <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
                  >
                    <FaGithub size={22} />
                  </a>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* VIEW ALL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/fn-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-lg"
          >
            View All Projects
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default Projects;