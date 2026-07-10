import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import { SiExpress, SiMongodb, SiTailwindcss, SiVercel } from "react-icons/si";
import { Braces, Layers3, Rocket } from "lucide-react";
import API from "../api/axios";

const iconMap = {
  Braces,
  Layers3,
  Rocket,
};

const fallbackSkillGroups = [
  {
    icon: "Layers3",
    title: "Design to Interface",
    description:
      "Turning page ideas into readable, responsive React interfaces with strong spacing, hierarchy, and interaction states.",
    items: ["React", "Tailwind CSS", "JavaScript", "Forms"],
  },
  {
    icon: "Braces",
    title: "Backend Workflows",
    description:
      "Building APIs, admin flows, authentication, message handling, and database-backed content management.",
    items: ["Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    icon: "Rocket",
    title: "Launch Ready",
    description:
      "Preparing projects with clean code, validation, deployment settings, and a structure that is easier to maintain.",
    items: ["Git", "Vite", "Vercel", "ESLint"],
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

function Skills() {
  const [skillGroups, setSkillGroups] = useState(fallbackSkillGroups);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        const nextSkills = res.data?.data || res.data || [];

        if (nextSkills.length) {
          setSkillGroups(nextSkills);
        }
      } catch {
        setSkillGroups(fallbackSkillGroups);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="section-shell bg-[#fffaf3] px-6 py-24 text-[#241423] dark:bg-slate-950 dark:text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md bg-[#fbe3dc] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#c65f4a]">
              Skills
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-[#241423] dark:text-white md:text-5xl">
              A practical stack for thoughtful web products.
            </h2>
          </div>
          <div className="rounded-xl border border-[#eadccf] bg-white/65 p-5 shadow-sm shadow-[#7a2e53]/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-base leading-7 text-[#6d5b53] dark:text-slate-400">
              I pair frontend polish with backend structure so the final product
              looks good, works reliably, and stays easy to improve.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillCard key={group._id || group.title} group={group} index={index} />
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((tech, index) => (
            <motion.article
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="flex min-h-16 items-center gap-4 rounded-xl border border-[#eadccf] bg-white/85 px-4 py-4 shadow-sm shadow-[#7a2e53]/5 backdrop-blur transition hover:border-[#ddbcae] hover:bg-white hover:shadow-lg hover:shadow-[#7a2e53]/10 dark:border-slate-800 dark:bg-slate-900/80"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#fbe3dc] text-2xl text-[#c65f4a] dark:bg-slate-800">
                {tech.icon}
              </span>
              <span className="font-bold text-[#5f4d55] dark:text-slate-200">
                {tech.name}
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, index }) {
  const Icon = iconMap[group.icon] || Layers3;
  const items = Array.isArray(group.items) ? group.items : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-[#eadccf] bg-white p-7 shadow-sm shadow-[#7a2e53]/5 transition hover:-translate-y-1 hover:border-[#ddbcae] hover:shadow-2xl hover:shadow-[#7a2e53]/12 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c65f4a] via-[#f0b29d] to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-5">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#fbe3dc] text-[#c65f4a]">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-sm font-bold uppercase tracking-wide text-[#c65f4a]">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-7 text-2xl font-extrabold tracking-normal text-[#241423] dark:text-white">
        {group.title}
      </h3>
      <p className="mt-4 min-h-[6.25rem] leading-7 text-[#6d5b53] dark:text-slate-400">
        {group.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-[#fff1e8] px-3 py-1.5 text-sm font-bold text-[#7a2e53] dark:bg-slate-800 dark:text-[#f4a391]"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default Skills;
