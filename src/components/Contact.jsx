function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-white"
    >

      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Contact Me
        </h2>

        <p className="text-center text-gray-600 text-lg mb-12">
          Have a project, collaboration, or opportunity in mind?
          Feel free to reach out.
        </p>

        <form className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Message
            </label>

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact