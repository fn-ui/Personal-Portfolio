function Hero() {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      
      <div className="max-w-4xl text-center">
        
        <p className="text-gray-600 text-lg mb-4">
          Hello, I'm
        </p>

        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
          Faith Njeri
        </h1>

        <h2 className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
          MERN Stack Developer
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          I build modern, responsive, and user-friendly web applications
          using React, Tailwind CSS, Node.js, and MongoDB.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          
          <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition">
            View Projects
          </button>

          <button className="border-2 border-black text-black px-6 py-3 rounded-xl font-medium hover:bg-black hover:text-white transition">
            Contact Me
          </button>

        </div>

      </div>

    </section>
  )
}

export default Hero