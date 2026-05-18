function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 bg-white"
    >
      
      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Profile"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          <div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              I am a passionate MERN stack developer focused on building
              responsive and user-friendly web applications.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              I enjoy learning modern technologies, solving problems,
              and creating digital experiences that are both functional
              and visually appealing.
            </p>

            <div className="flex flex-wrap gap-4">

              <span className="bg-black text-white px-4 py-2 rounded-full">
                React
              </span>

              <span className="bg-black text-white px-4 py-2 rounded-full">
                Tailwind CSS
              </span>

              <span className="bg-black text-white px-4 py-2 rounded-full">
                Node.js
              </span>

              <span className="bg-black text-white px-4 py-2 rounded-full">
                MongoDB
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}

export default About