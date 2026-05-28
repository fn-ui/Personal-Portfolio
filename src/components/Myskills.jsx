import { motion } from "framer-motion";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaJs,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiVercel,
} from "react-icons/si";

function Skills() {
  const skills = [
    {
      icon: <FaReact />,
      title: "Frontend Development",
      description:
        "I build modern and responsive user interfaces using React.js, JavaScript, Tailwind CSS, HTML5, and CSS3 with strong focus on clean design and smooth user experiences.",
    },

    {
      icon: <FaNodeJs />,
      title: "Backend Development",
      description:
        "I develop scalable backend systems and REST APIs using Node.js and Express.js while handling asynchronous data and application logic efficiently.",
    },

    {
      icon: <FaGitAlt />,
      title: "Tools & Workflow",
      description:
        "I use Git, GitHub, VS Code, and deployment platforms like Vercel to maintain organized workflows, collaboration, and clean code practices.",
    },

    {
      icon: <SiTailwindcss />,
      title: "Responsive Design",
      description:
        "I create fully responsive websites optimized for mobile, tablet, and desktop while improving accessibility, performance, and animations.",
    },
  ];

  const technologies = [
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiTailwindcss />, name: "Tailwind" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <SiVercel />, name: "Vercel" },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900 dark:bg-[#050816] dark:text-white"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl dark:bg-cyan-500/10" />

      {/* DARK SPOTLIGHT */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            My Skills
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Technologies &{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Technical expertise and modern technologies I use to design,
            develop, and deploy high-quality web applications.
          </p>
        </motion.div>

        {/* SKILLS GRID */}
        <div className="grid gap-8 md:grid-cols-2">

          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition hover:border-blue-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40"
            >
              {/* ICON */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600 transition group-hover:scale-110 dark:bg-blue-500/10 dark:text-blue-400">
                {skill.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {skill.title}
              </h3>

              <p className="leading-8 text-slate-600 dark:text-slate-400">
                {skill.description}
              </p>
            </motion.div>
          ))}

        </div>

        {/* TECHNOLOGY STACK */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="mb-12 text-center">
            <h3 className="text-4xl font-black">
              Tech Stack
            </h3>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Tools and technologies I work with regularly.
            </p>
          </div>

          {/* TECH STACK GRID */}
          <div className="flex flex-wrap justify-center gap-5">

            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -6, scale: 1.05 }}
                className="group flex min-w-[120px] flex-col items-center rounded-3xl border border-slate-200 bg-white/80 px-6 py-6 shadow-sm backdrop-blur-xl transition hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-blue-500/40"
              >
                <div className="mb-3 text-4xl text-blue-600 transition group-hover:scale-110 dark:text-blue-400">
                  {tech.icon}
                </div>

                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {tech.name}
                </p>
              </motion.div>
            ))}

          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Skills;