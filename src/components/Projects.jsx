import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

import API from "../api/axios";

const fallbackProjects = [
  {
    _id: "fallback-1",
    title: "Portfolio Admin System",
    description:
      "A full-stack portfolio platform with project management, secure admin access, message tracking, and responsive public pages.",
    techStack: "React, Node.js, Express, MongoDB, Tailwind CSS",
    githubLink: "https://github.com/fn-ui",
    liveDemo: "#contact",
  },
  {
    _id: "fallback-2",
    title: "BelleBliss Storefront",
    description:
      "A polished product-focused web experience designed for browsing, conversion, and smooth mobile performance.",
    techStack: "React, Tailwind CSS, JavaScript",
    githubLink: "https://github.com/fn-ui",
    liveDemo: "#contact",
  },
];

const toProjectArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasApiError, setHasApiError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await API.get("/projects");
        const items = toProjectArray(res.data);
        setProjects(items.length ? items : fallbackProjects);
      } catch (error) {
        console.error("Projects fetch failed:", error);
        setHasApiError(true);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="section-shell bg-[#fffaf3] px-6 py-24 text-[#241423] dark:bg-slate-950 dark:text-white"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="section-eyebrow">Case Studies</p>
            <h2 className="section-title mt-3">
              Selected work with product thinking behind it.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6d5b53] dark:text-slate-400">
              A collection of web experiences shaped around clarity,
              responsiveness, maintainability, and real user workflows.
            </p>
          </div>

          <a
            href="https://github.com/fn-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#eadccf] bg-white/80 px-4 py-3 font-semibold text-[#7a2e53] shadow-sm backdrop-blur transition hover:border-[#c65f4a]"
          >
            GitHub Profile
            <FaArrowRight />
          </a>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-[1.5rem] bg-[#f8eadf]"
              />
            ))}
          </div>
        ) : (
          <>
            {hasApiError && (
              <p className="mb-6 rounded-xl border border-[#e9c9ae] bg-[#fff1e8] px-4 py-3 text-sm text-[#7a2e53]">
                Showing featured examples while the live project API is unavailable.
              </p>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project._id || project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#eadccf] bg-white shadow-sm shadow-[#7a2e53]/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#7a2e53]/10"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-72 items-center justify-center bg-[linear-gradient(135deg,#241423_0%,#7a2e53_55%,#c65f4a_100%)] px-8 text-center">
                      <p className="max-w-sm text-3xl font-bold text-white">
                        {project.title}
                      </p>
                    </div>
                  )}

                  <div className="p-7">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="text-2xl font-bold text-[#241423]">
                        {project.title}
                      </h3>
                      <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-bold text-[#c65f4a]">
                        Featured
                      </span>
                    </div>

                    <p className="leading-8 text-[#6d5b53]">{project.description}</p>

                    {project.techStack && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.techStack.split(",").map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[#eadccf] px-3 py-1 text-sm font-semibold text-[#5f4d55]"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-7 flex flex-wrap gap-3">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target={project.liveDemo.startsWith("#") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#c65f4a] px-4 py-3 font-semibold text-white hover:bg-[#ad503e]"
                        >
                          View Project
                          <ExternalLink size={18} />
                        </a>
                      )}

                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-[#eadccf] px-4 py-3 font-semibold text-[#7a2e53] hover:border-[#c65f4a]"
                        >
                          <FaGithub />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;
