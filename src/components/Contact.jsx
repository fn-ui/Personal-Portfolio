import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    emailjs
      .sendForm(
        "service_8rknec7",
        "template_omxv3up",
        form.current,
        "almnacznM-FrvnXgy"
      )
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          e.target.reset();
        },
        (error) => {
          setErrorMessage("Failed to send message.");
          console.log(error.text);
          setLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-black via-[#050816] to-black px-6 py-20 text-white"
    >
      {/* Background Glow Effects */}
      <div className="absolute left-0 top-0 h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300">
            Let’s Connect
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-white to-purple-400" />

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
            Have a project, collaboration, or opportunity in mind?
            Feel free to reach out using the form below.
          </p>

          {/* Status Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            Available for collaborations & freelance projects
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-purple-500/10 md:p-10">
          {/* Glow */}
          <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

          <form
            ref={form}
            onSubmit={sendEmail}
            className="relative z-10 space-y-6"
          >
            {/* Full Name */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-blue-400/50 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(59,130,246,0.25)]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-purple-400/50 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Message
              </label>

              <textarea
                rows="6"
                name="message"
                placeholder="Tell me about your project..."
                required
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-pink-400/50 focus:bg-white/10 focus:shadow-[0_0_25px_rgba(236,72,153,0.25)]"
              ></textarea>
            </div>

            {/* Success Message */}
            {success && (
              <p className="text-sm font-medium text-green-400">
                Message sent successfully!
              </p>
            )}

            {/* Error Message */}
            {errorMessage && (
              <p className="text-sm font-medium text-red-400">
                {errorMessage}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaPaperPlane />

                {loading ? "Sending..." : "Send Message"}
              </span>

              <div className="absolute inset-0 translate-y-full bg-gradient-to-r from-purple-500 to-blue-500 transition duration-500 group-hover:translate-y-0" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;