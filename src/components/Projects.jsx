import { useEffect, useState } from "react";

import { FaArrowRight, FaGithub } from "react-icons/fa";

import { motion } from "framer-motion";

import API from "../api/axios";

function Projects() {

  // STATES
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH PROJECTS FROM MONGODB
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
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900"
    >

      {/* BACKGROUND DECORATIONS */}
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

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
            A selection of projects showcasing my skills in frontend
            development, responsive design, and modern web technologies.
          </p>

        </motion.div>

        {/* LOADING STATE */}
        {loading && (

          <div className="flex justify-center">

            <p className="text-lg text-slate-500">
              Loading projects...
            </p>

          </div>

        )}

        {/* EMPTY STATE */}
        {!loading && projects.length === 0 && (

          <div className="flex justify-center">

            <p className="text-lg text-slate-500">
              No projects available yet.
            </p>

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
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
              >

                {/* IMAGE */}
                {project.image && (

                  <div className="overflow-hidden">

                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                  </div>

                )}

                {/* CONTENT */}
                <div className="p-8">

                  {/* TITLE */}
                  <h3 className="mb-4 text-3xl font-black text-slate-900">
                    {project.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mb-6 text-lg leading-8 text-slate-600">
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
                            className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
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
                        className="group/button inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
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
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:text-blue-600"
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