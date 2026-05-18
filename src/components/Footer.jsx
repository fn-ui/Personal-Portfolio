function Footer() {
  return (
    <footer className="bg-white text-slate-950 py-10 px-6 border-t border-slate-200">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div>

          <h2 className="text-2xl font-bold mb-2 text-slate-950">
            Faith Njeri
          </h2>

          <p className="text-slate-600">
            MERN Stack Developer passionate about building
            modern web experiences.
          </p>

        </div>

        <div className="flex gap-6 text-lg text-slate-600">

          <a
            href="#"
            className="hover:text-slate-950 transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="hover:text-slate-950 transition"
          >
            LinkedIn
          </a>

          <a
            href="#"
            className="hover:text-slate-950 transition"
          >
            Email
          </a>

        </div>

      </div>

      <div className="mt-8 pt-6 text-center text-slate-500 text-sm">

        © 2026 Faith Njeri. All rights reserved.

      </div>

    </footer>
  )
}

export default Footer