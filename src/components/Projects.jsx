function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 bg-gray-100"
    >

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-16">
          Projects
        </h2>

        <div className="flex justify-center">

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 max-w-md">

            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Portfolio Website"
              className="w-full h-56 object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl font-bold mb-4">
                Personal Portfolio Website
              </h3>

              <p className="text-gray-600 mb-6">
                A modern and responsive portfolio website built using
                React, Vite, and Tailwind CSS following MERN-stack
                development practices.
              </p>

              <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition">
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