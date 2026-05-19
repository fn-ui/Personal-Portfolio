import heroBg from "../assets/0_JpG3mgDOUWhA8MXT.jpg"

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-black/90" />

      {/* Glow Effects */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-28">

        <div className="max-w-5xl text-center text-white">

          {/* Welcome */}
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-slate-300 md:text-base">
            Welcome
          </p>

          {/* Name */}
          <h1 className="mb-6 text-5xl font-black leading-none tracking-tight md:text-7xl lg:text-8xl">

            <span className="text-white">
              Faith
            </span>{" "}

            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Njeri
            </span>

          </h1>

          {/* Divider */}
          <div className="mx-auto mb-8 h-1 w-28 rounded-full bg-gradient-to-r from-white/80 via-slate-300 to-white/80" />

          {/* Title */}
          <h2 className="mx-auto mb-8 max-w-4xl text-2xl font-semibold leading-relaxed text-slate-200 md:text-4xl">
            Web Developer & Creative Technologist
          </h2>

          {/* Description */}
          <p className="mx-auto mb-4 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            I craft modern, scalable, and high-performance web applications
            that combine clean design with seamless functionality.
          </p>

          <p className="mx-auto mb-12 max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg">
            Specialized in React, Node.js, MongoDB, and Tailwind CSS —
            transforming ideas into elegant digital experiences.
          </p>

          {/* Skills */}
          <div className="mb-14 flex flex-wrap justify-center gap-4">

            {['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'HTML', 'CSS', 'Python', 'Java', 'Bootstrap', 'Django', 'Flask'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/20 hover:shadow-2xl"
              >
                {skill}
              </span>
            ))}

          </div>

          {/* Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <a
              href="#projects"
              className="group relative overflow-hidden rounded-2xl bg-white px-10 py-4 font-bold text-black shadow-2xl transition duration-300 hover:scale-105"
            >
              <span className="relative z-10">
                View My Work
              </span>

              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-slate-200 to-white transition duration-300 group-hover:translate-y-0" />
            </a>

            <a
              href="#contact"
              className="rounded-2xl border border-white/30 bg-white/10 px-10 py-4 font-bold text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white hover:text-black"
            >
              Get In Touch
            </a>

          </div>

          {/* Social Links */}
          <div className="mb-14 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-slate-300">

            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              GitHub
            </a>

            <span className="text-slate-500">
              •
            </span>

            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              LinkedIn
            </a>

            <span className="text-slate-500">
              •
            </span>

            <a
              href="mailto:hello@yourdomain.com"
              className="transition duration-300 hover:text-white"
            >
              Email
            </a>

          </div>

          {/* Scroll Down */}
          <a
            href="#about"
            className="group flex flex-col items-center gap-3 text-slate-400 transition duration-300 hover:text-white"
          >

            <span className="text-sm uppercase tracking-[0.25em]">
              Explore Below
            </span>

            <div className="animate-bounce">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>

          </a>

        </div>
      </div>
    </section>
  )
}

export default Hero