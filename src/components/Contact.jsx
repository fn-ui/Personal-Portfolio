function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-32 text-white"
    >

      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">

        {/* Section Heading */}
        <div className="mb-20 text-center">

          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-400">
            Let’s Connect
          </p>

          <h2 className="text-5xl font-black text-white">
            Contact Me
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-white to-slate-500" />

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
            Have a project, collaboration, or opportunity in mind?
            Feel free to reach out — I’d love to hear from you.
          </p>

        </div>

        {/* Contact Form Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-md">

          <form className="space-y-8">

            {/* Full Name */}
            <div>

              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-white/40 focus:bg-white/10"
              />

            </div>

            {/* Email */}
            <div>

              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-white/40 focus:bg-white/10"
              />

            </div>

            {/* Message */}
            <div>

              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Message
              </label>

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition duration-300 focus:border-white/40 focus:bg-white/10"
              ></textarea>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-white px-8 py-4 font-semibold text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] transition duration-300 hover:scale-[1.02] hover:bg-slate-200"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  )
}

export default Contact