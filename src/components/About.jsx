import profileImg from "../assets/about.png";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900 dark:bg-[#050816] dark:text-white"
    >
      {/* BACKGROUND GLOWS */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl dark:bg-cyan-500/10" />

      {/* DARK GRADIENT */}
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            About Me
          </p>

          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            Passionate About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Building
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            I create clean, scalable, and user-focused web applications
            using modern technologies and strong design principles.
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* IMAGE SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* GLOW */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/30 blur-3xl dark:from-blue-500/10 dark:to-cyan-500/10" />

            {/* MAIN IMAGE WRAPPER */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-10"
            >
              {/* OUTER RING */}
              <div className="absolute inset-0 scale-110 rounded-full border border-blue-200/40 dark:border-blue-400/10" />

              {/* IMAGE */}
              <img
                src={profileImg}
                alt="Faith Maina"
                className="relative h-[340px] w-[340px] rounded-full border-[10px] border-white object-cover shadow-[0_30px_80px_rgba(0,0,0,0.18)] dark:border-slate-900 sm:h-[420px] sm:w-[420px]"
              />

              {/* EXPERIENCE CARD */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 left-0 rounded-3xl border border-slate-200 bg-white/90 px-6 py-5 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80"
              >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Experience
                </p>

                <h3 className="mt-1 text-3xl font-black text-slate-900 dark:text-white">
                  2+ Years
                </h3>
              </motion.div>

              
            </motion.div>
          </motion.div>

          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
              Who I Am
            </p>

            <h3 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
              Creating Modern &{" "}
              <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                Responsive Experiences
              </span>
            </h3>

            <p className="mb-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              I specialize in developing responsive, scalable, and visually
              engaging web applications that combine modern UI design
              with seamless functionality.
            </p>

            <p className="mb-10 text-lg leading-8 text-slate-500 dark:text-slate-500">
              My focus is building digital experiences that are clean,
              accessible, and performance-driven while continuously
              improving my skills and exploring new technologies.
            </p>

            {/* STATS */}
            <div className="mb-10 grid gap-5 sm:grid-cols-3">

              {[
                { value: "01+", label: "Years Learning" },
                { value: "05+", label: "Technologies" },
                { value: "100%", label: "Responsive" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <h4 className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    {item.value}
                  </h4>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}

            </div>

            {/* SKILLS */}
            <div className="mb-10 flex flex-wrap gap-4">

              {[
                "HTML",
                "JavaScript",
                "React",
                "Node.js",
                "Tailwind CSS",
              ].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -4 }}
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                >
                  {skill}
                </motion.span>
              ))}

            </div>

            {/* BUTTON */}
            <motion.a
              href="#contact"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(37,99,235,0.35)] transition hover:bg-blue-700"
            >
              Let’s Work Together
              <FaArrowRight />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;