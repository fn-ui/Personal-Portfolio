import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCommentDots,
} from "react-icons/fa";

import { motion } from "framer-motion";

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
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900"
    >
      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Contact Me
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Let’s Build
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have a project idea or collaboration opportunity?
            Feel free to reach out and let’s create something amazing together.
          </p>

          {/* Availability */}
          <div className="mt-6 flex items-center justify-center gap-3">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <p className="font-medium text-green-600">
              Available for freelance & collaborations
            </p>

          </div>

        </motion.div>

        {/* CONTACT CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl"
        >

          <div className="grid lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-500 p-10 text-white">

              {/* Decorative Circles */}
              <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/10" />

              <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-white/5" />

              <div className="relative z-10">

                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-100">
                  Get In Touch
                </p>

                <h3 className="mb-6 text-4xl font-black leading-tight">
                  Let’s Talk About Your Project
                </h3>

                <p className="leading-8 text-blue-50">
                  Whether you need a modern website, responsive UI,
                  or frontend development support, I’m ready to help
                  bring your ideas to life.
                </p>

                {/* Contact Info */}
                <div className="mt-10 space-y-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <FaEnvelope />
                    </div>

                    <div>
                      <p className="text-sm text-blue-100">
                        Email
                      </p>

                      <h4 className="font-semibold">
                        fn0740839@gmail.com
                      </h4>
                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <FaCommentDots />
                    </div>

                    <div>
                      <p className="text-sm text-blue-100">
                        Response Time
                      </p>

                      <h4 className="font-semibold">
                        Usually within 24 hours
                      </h4>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 md:p-10">

              <form
                ref={form}
                onSubmit={sendEmail}
                className="space-y-6"
              >

                {/* NAME */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="user_name"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      name="user_email"
                      required
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
                    />

                  </div>

                </div>

                {/* MESSAGE */}
                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Message
                  </label>

                  <textarea
                    rows="5"
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
                  />

                </div>

                {/* STATUS */}
                {success && (
                  <p className="rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-700">
                    Message sent successfully!
                  </p>
                )}

                {errorMessage && (
                  <p className="rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                    {errorMessage}
                  </p>
                )}

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 disabled:opacity-60"
                >

                  <FaPaperPlane />

                  {loading ? "Sending..." : "Send Message"}

                </button>

              </form>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default Contact;