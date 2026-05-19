import profileImg from "../assets/hero.png"

function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-32 overflow-hidden bg-black px-6 py-32 text-white"
    >

      {/* Background Glow Effects */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-24 text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            Get To Know Me
          </p>

          <h2 className="text-5xl font-black tracking-tight md:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-white via-slate-400 to-white" />

        </div>

        {/* Content */}
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Image Section */}
          <div className="flex justify-center">

            <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">

              {/* Glow Border */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/10" />

              <img
                src={profileImg}
                alt="Profile"
                className="h-[520px] w-[400px] object-cover transition duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            </div>

          </div>

          {/* Text Content */}
          <div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              Who I Am
            </p>

            <h3 className="mb-8 text-4xl font-black leading-tight text-white">

              Passionate About Building
              <span className="block bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
                Modern Digital Experiences
              </span>

            </h3>

            <p className="mb-6 text-lg leading-relaxed text-slate-300">
              I specialize in building responsive, scalable, and visually
              engaging web applications that combine clean design with
              seamless functionality.
            </p>

            <p className="mb-10 text-lg leading-relaxed text-slate-400">
              My focus is creating user-centered digital experiences using
              modern technologies and solid engineering practices. I build with
              performance, accessibility, and responsiveness in mind, while
              staying curious and learning the latest tools.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-4">

              {[
                "React",
                "Node.js",
                "MongoDB",
                "Tailwind CSS",
                "HTML",
                "CSS",
                "Python",
                "Java",
                "Bootstrap",
                "Django",
                "Flask",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:shadow-2xl"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default About