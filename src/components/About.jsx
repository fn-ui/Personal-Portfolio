import profileImg from "../assets/about.png"

function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-32 overflow-hidden bg-black px-6 py-24 text-white"
    >

      {/* Background Glow Effects */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-20 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            Get To Know Me
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-white to-purple-400" />

        </div>

        {/* Content */}
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Image Section */}
          <div className="flex justify-center">

            <div className="group relative">

              {/* Background Glow */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl transition duration-500 group-hover:opacity-100" />

              {/* Image Card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">

                <img
                src={profileImg}
                 alt="Faith Njeri working on a laptop"
                 className="h-[520px] w-[420px] object-cover object-center transition duration-700 group-hover:scale-105"
                 />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md">

                  <p className="text-sm font-semibold text-white">
                 Web Developer
                </p>

                <p className="text-xs text-slate-400">
                React • Node.js • Tailwind CSS
                </p>

                </div>

              </div>

            </div>

          </div>

          {/* Text Content */}
          <div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
              Who I Am
            </p>

            <h3 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">

              Building Clean &
              <span className="block bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                Scalable Web Apps
              </span>

            </h3>

            <p className="mb-6 max-w-2xl text-lg leading-8 text-slate-300">
              I specialize in building responsive, scalable, and visually
              engaging web applications that combine clean design with
              seamless functionality.
            </p>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-400">
              My focus is creating user-centered digital experiences using
              modern technologies and solid engineering practices. I enjoy
              transforming ideas into interactive and accessible digital
              products while continuously learning new tools and technologies.
            </p>

            {/* Stats */}
            <div className="mb-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <h4 className="text-2xl font-black text-white">
                  01+
                </h4>
                <p className="mt-1 text-sm text-slate-400">
                  Years Learning
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <h4 className="text-2xl font-black text-white">
                  05+
                </h4>
                <p className="mt-1 text-sm text-slate-400">
                  Core Technologies
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <h4 className="text-2xl font-black text-white">
                  100%
                </h4>
                <p className="mt-1 text-sm text-slate-400">
                  Responsive Design
                </p>
              </div>

            </div>

            {/* Skills */}
            <div className="mb-10 flex flex-wrap gap-4">

              {[
                "HTML",
                "JavaScript",
                "React",
                "Node.js",
                "Tailwind CSS",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                >
                  {skill}
                </span>
              ))}

            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center rounded-2xl border border-white/15 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
            >
              Let’s Work Together
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}

export default About