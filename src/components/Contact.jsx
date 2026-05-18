function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-white"
    >

      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-center text-slate-950 mb-12">
          Contact Me
        </h2>

        <p className="text-center text-slate-600 text-lg mb-12">
          Have a project, collaboration, or opportunity in mind?
          Feel free to reach out.
        </p>

        <form className="space-y-6">

          <div>
            <label className="block mb-2 font-medium text-slate-950">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-slate-300 rounded-xl bg-white px-4 py-4 text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/40"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-950">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-xl bg-white px-4 py-4 text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/40"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-950">
              Message
            </label>

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="w-full border border-slate-300 rounded-xl bg-white px-4 py-4 text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950/40"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-slate-950 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Send Message
          </button>

        </form>

      </div>

    </section>
  )
}

export default Contact