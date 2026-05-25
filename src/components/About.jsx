import profileImg from "../assets/about.png";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900"
    >
      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >

          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            About Me
          </p>

          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            Passionate About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Building
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
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

            {/* Decorative Shape */}
            <div className="absolute top-8 h-[450px] w-[380px] rounded-[3rem] bg-gradient-to-br from-blue-100 to-sky-50" />

            {/* Floating Circle */}
            <div className="absolute -left-2 top-0 h-24 w-24 rounded-full border-4 border-blue-200" />

            {/* Main Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="relative z-10 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl"
            >

              <img
                src={profileImg}
                alt="Faith Maina"
                className="h-[520px] w-[400px] object-cover"
              />

            </motion.div>

            {/* Floating Experience Card */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 left-0 z-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            >

              <p className="text-sm font-medium text-slate-500">
                Experience
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                1+ Years
              </h3>

            </motion.div>

          </motion.div>

          {/* TEXT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Who I Am
            </p>

            <h3 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
              Creating Modern &
              <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                Responsive Experiences
              </span>
            </h3>

            <p className="mb-6 text-lg leading-8 text-slate-600">
              I specialize in developing responsive, scalable, and visually
              engaging web applications that combine modern UI design
              with seamless functionality.
            </p>

            <p className="mb-10 text-lg leading-8 text-slate-500">
              My focus is building digital experiences that are clean,
              accessible, and performance-driven while continuously
              improving my skills and exploring new technologies.
            </p>

            {/* STATS */}
            <div className="mb-10 grid gap-5 sm:grid-cols-3">

              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition"
              >
                <h4 className="text-3xl font-black text-blue-600">
                  01+
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Years Learning
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition"
              >
                <h4 className="text-3xl font-black text-blue-600">
                  05+
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Technologies
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition"
              >
                <h4 className="text-3xl font-black text-blue-600">
                  100%
                </h4>

                <p className="mt-2 text-sm text-slate-500">
                  Responsive
                </p>
              </motion.div>

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
                  className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
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
              className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
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