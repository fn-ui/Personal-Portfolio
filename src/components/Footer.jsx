function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div>

          <h2 className="text-2xl font-bold mb-2">
            Faith Njeri
          </h2>

          <p className="text-gray-400">
            MERN Stack Developer passionate about building
            modern web experiences.
          </p>

        </div>

        <div className="flex gap-6 text-lg">

          <a
            href="#"
            className="hover:text-gray-400 transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="hover:text-gray-400 transition"
          >
            LinkedIn
          </a>

          <a
            href="#"
            className="hover:text-gray-400 transition"
          >
            Email
          </a>

        </div>

      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">

        © 2026 Faith Njeri. All rights reserved.

      </div>

    </footer>
  )
}

export default Footer