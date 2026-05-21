import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";

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
      <div className="absolute left-0 top-0 h-72 w-72 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Let’s Connect
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-400 via-white to-purple-400" />

          <p className="mx-auto mt-6 max-w-xl text-base text-slate-400">
            Have a project or idea? Feel free to reach out.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            Available for collaborations & freelance projects
          </div>
        </div>

        {/* Form */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl md:p-8">

          <form ref={form} onSubmit={sendEmail} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-400/50"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none focus:border-purple-400/50"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Message
              </label>

              <textarea
                rows="4"
                name="message"
                required
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-pink-400/50"
              />
            </div>

            {/* Status */}
            {success && (
              <p className="text-sm text-green-400">
                Message sent successfully!
              </p>
            )}

            {errorMessage && (
              <p className="text-sm text-red-400">
                {errorMessage}
              </p>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white disabled:opacity-60"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;