function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black px-6 py-32 text-white"
    >

      {/* Background Glow Effects */}
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-20 text-center">

          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">
            My Work
          </p>

          <h2 className="text-5xl font-black text-white">
            Projects
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-white to-slate-500" />
        </div>

        {/* Project Cards */}
        <div className="flex justify-center">

          <div className="group max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-white/20">

            {/* Project Image */}
            <div className="overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Portfolio Website"
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />

            </div>

            {/* Content */}
            <div className="p-8">

              <h3 className="mb-4 text-3xl font-bold text-white">
                Personal Portfolio Website
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-slate-300">
                A modern and responsive portfolio website built using
                React, Vite, and Tailwind CSS following modern frontend
                development practices.
              </p>

              {/* Tech Stack */}
              <div className="mb-8 flex flex-wrap gap-3">

                {["React", "Tailwind CSS", "Vite"].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    {tech}
                  </span>
                ))}

              </div>

              {/* Button */}
              <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition duration-300 hover:scale-105 hover:bg-slate-200">
                View Project
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Projects