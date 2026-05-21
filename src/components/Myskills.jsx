import { motion } from "framer-motion";

function Skills() {
  const skills = [
    {
      title: "Frontend Technologies",
      description:
        "I build modern and interactive user interfaces using React.js, JavaScript, Tailwind CSS, HTML5, and CSS3. I focus on creating responsive, scalable, and visually appealing web applications with smooth user experiences.",
    },
    {
      title: "Backend & API Development",
      description:
        "I work with Node.js, Express.js, and RESTful APIs to develop dynamic web applications. I integrate external services, manage asynchronous data, and create seamless communication between frontend and backend systems.",
    },
    {
      title: "Tools & Workflow",
      description:
        "I use Git and GitHub for version control, Visual Studio Code for development, and modern deployment platforms like Vercel. I follow clean coding practices and organized workflows to improve productivity and maintainability.",
    },
    {
      title: "Responsive & Performance Optimization",
      description:
        "I develop fully responsive websites optimized for desktop, tablet, and mobile devices. I also focus on performance optimization, accessibility, and smooth animations to create fast and engaging user experiences.",
    },
  ];

  return (
    <section id="skills" className="relative bg-black px-6 py-24 text-white">
      {/* Heading */}
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <h2 className="mb-4 text-5xl font-bold">My Skills</h2>

        <p className="text-gray-400">
          Technical expertise and technologies I use to build modern web applications.
        </p>
      </div>

      {/* Skills */}
      <div className="mx-auto max-w-4xl space-y-14">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.title}   // ✅ better than index
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="border-b border-white/10 pb-10 text-center"
          >
            <h3 className="mb-5 text-3xl font-semibold">
              {skill.title}
            </h3>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;