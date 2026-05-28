import { useEffect, useState } from "react";

import { FaArrowRight, FaGithub } from "react-icons/fa";

import { motion } from "framer-motion";

import API from "../api/axios";

function Projects() {
  // STATES
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH PROJECTS
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await API.get("/projects");

        setProjects(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl dark:bg-cyan-500/10" />

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            My Projects
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Featured{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            A selection of projects showcasing my skills in frontend
            development, backend systems, responsive UI design, and modern web
            technologies.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

              <p className="text-lg text-slate-500 dark:text-slate-400">
                Loading projects...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && projects.length === 0 && (
          <div className="flex justify-center">
            <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-lg text-slate-500 dark:text-slate-400">
                No projects available yet.
              </p>
            </div>
          </div>
        )}

        {/* PROJECT GRID */}
        {!loading && projects.length > 0 && (
          <div className="grid gap-10 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-500/30"
              >
                {/* IMAGE */}
                {project.image && (
                  <div className="relative overflow-hidden">
                    {/* OVERLAY */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    {/* FLOATING BADGE */}
                    <div className="absolute left-5 top-5 z-20 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-800 shadow-lg backdrop-blur dark:bg-slate-900/80 dark:text-white">
                      Featured Project
                    </div>
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-8">
                  {/* TITLE */}
                  <h3 className="mb-4 text-3xl font-black text-slate-900 transition duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {project.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                    {project.description}
                  </p>

                  {/* TECH STACK */}
                  {project.techStack && (
                    <div className="mb-8 flex flex-wrap gap-3">
                      {project.techStack
                        .split(",")
                        .map((tech, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:-translate-y-1 hover:bg-blue-600 hover:text-white dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-600 dark:hover:text-white"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                    </div>
                  )}

                  {/* BUTTONS */}
                  <div className="flex items-center gap-4">
                    {/* LIVE DEMO */}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/button inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
                      >
                        View Project

                        <FaArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                      </a>
                    )}

                    {/* GITHUB */}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
                      >
                        <FaGithub size={22} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* VIEW ALL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <a
            href="https://github.com/fn-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/30 dark:hover:text-blue-400"
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