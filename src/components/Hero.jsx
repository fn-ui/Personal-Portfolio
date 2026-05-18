function Hero() {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-4xl text-center rounded-[2rem] bg-slate-50 border border-slate-200 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.08)]">
        <p className="text-slate-500 text-lg mb-4">
          Hi, I’m
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-950 mb-5">
          Faith Njeri
        </h1>

        <h2 className="text-2xl md:text-3xl text-slate-700 font-semibold mb-6">
          MERN Stack Developer
        </h2>

        <p className="text-slate-600 text-base md:text-lg font-medium mb-4">
          I help businesses launch polished, high-performance web apps faster.
        </p>

        <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          I build modern, responsive, and accessible web applications with React, Tailwind CSS, Node.js, and MongoDB.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="rounded-full bg-white text-slate-950 border border-slate-200 px-4 py-2 text-sm font-medium">React</span>
          <span className="rounded-full bg-white text-slate-950 border border-slate-200 px-4 py-2 text-sm font-medium">Node.js</span>
          <span className="rounded-full bg-white text-slate-950 border border-slate-200 px-4 py-2 text-sm font-medium">MongoDB</span>
          <span className="rounded-full bg-white text-slate-950 border border-slate-200 px-4 py-2 text-sm font-medium">Tailwind</span>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <button className="bg-slate-950 text-white px-6 py-3 rounded-2xl font-medium hover:bg-slate-800 transition duration-200">
            See My Work
          </button>

          <button className="border-2 border-slate-950 text-slate-950 px-6 py-3 rounded-2xl font-medium hover:bg-slate-950 hover:text-white transition duration-200">
            Let’s Talk
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-500">
          <a href="#projects" className="hover:text-slate-900 transition">GitHub</a>
          <span className="text-slate-400">•</span>
          <a href="#contact" className="hover:text-slate-900 transition">LinkedIn</a>
          <span className="text-slate-400">•</span>
          <a href="mailto:hello@yourdomain.com" className="hover:text-slate-900 transition">Email</a>
        </div>

        <div className="mt-8 text-slate-500 text-sm tracking-[0.18em] uppercase">
          <a href="#about" className="inline-flex items-center gap-2 hover:text-slate-900 transition">
            Scroll down
            <span className="inline-block h-3 w-3 rounded-full bg-slate-950 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero