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
    {
      icon: <FaHtml5 />,
      name: "HTML5",
    },
    {
      icon: <FaCss3Alt />,
      name: "CSS3",
    },
    {
      icon: <FaJs />,
      name: "JavaScript",
    },
    {
      icon: <FaReact />,
      name: "React",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <SiExpress />,
      name: "Express",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <FaGitAlt />,
      name: "Git",
    },
    {
      icon: <SiVercel />,
      name: "Vercel",
    },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900"
    >
      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            My Skills
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Technologies &
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Technical expertise and modern technologies I use to
            design, develop, and deploy high-quality web applications.
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
              className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-200 hover:shadow-xl"
            >

              {/* ICON */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600">
                {skill.icon}
              </div>

              {/* TITLE */}
              <h3 className="mb-4 text-2xl font-bold">
                {skill.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="leading-8 text-slate-600">
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

            <p className="mt-4 text-slate-600">
              Tools and technologies I work with regularly.
            </p>

          </div>

          {/* TECH ICONS */}
          <div className="flex flex-wrap justify-center gap-5">

            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                }}
                className="flex min-w-[120px] flex-col items-center rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm transition hover:border-blue-200 hover:shadow-lg"
              >

                <div className="mb-3 text-4xl text-blue-600">
                  {tech.icon}
                </div>

                <p className="font-semibold text-slate-700">
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