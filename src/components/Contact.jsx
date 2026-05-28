import { useState } from "react";
import API from "../api/axios";

import {
  FaUser,
  FaEnvelope,
  FaPaperPlane,
  FaCommentDots,
} from "react-icons/fa";

import { motion } from "framer-motion";

function Contact() {

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // UI STATES
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // SEND MESSAGE
  const sendMessage = async (e) => {

    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {

      // SAVE TO MONGODB
      await API.post("/messages", {
        name,
        email,
        message,
      });

      setSuccess(true);

      // RESET FORM
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {

      console.log(error);

      setErrorMessage(
        "Failed to send message."
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-900 dark:bg-[#020617] dark:text-white"
    >

      {/* BACKGROUND DECORATION */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl dark:bg-cyan-500/10" />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            Contact Me
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            Let’s Build{" "}

            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Something Great
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Have a project idea or collaboration opportunity?
            Feel free to reach out.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">

            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

            <p className="font-medium text-green-600 dark:text-green-400">
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
          className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-xl"
        >

          <div className="grid lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-500 p-10 text-white">

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
                  I help build modern websites and web apps.
                </p>

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
                        Within 24 hours
                      </h4>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="p-8 md:p-10 dark:bg-transparent">

              <form
                onSubmit={sendMessage}
                className="space-y-6"
              >

                {/* NAME */}
                <div>

                  <label className="mb-2 block text-sm font-semibold dark:text-slate-200">
                    Full Name
                  </label>

                  <div className="relative">

                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-500"
                    />

                  </div>

                </div>

                {/* EMAIL */}
                <div>

                  <label className="mb-2 block text-sm font-semibold dark:text-slate-200">
                    Email
                  </label>

                  <div className="relative">

                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-500"
                    />

                  </div>

                </div>

                {/* MESSAGE */}
                <div>

                  <label className="mb-2 block text-sm font-semibold dark:text-slate-200">
                    Message
                  </label>

                  <textarea
                    rows="5"
                    required
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-blue-400 dark:border-white/10 dark:bg-[#0f172a] dark:text-white dark:placeholder:text-slate-500"
                  />

                </div>

                {/* SUCCESS */}
                {success && (
                  <p className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    Message sent successfully!
                  </p>
                )}

                {/* ERROR */}
                {errorMessage && (
                  <p className="rounded-xl bg-red-100 p-3 text-red-700 dark:bg-red-500/10 dark:text-red-400">
                    {errorMessage}
                  </p>
                )}

                {/* BUTTON */}
                <button
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >

                  <FaPaperPlane />

                  {loading
                    ? "Sending..."
                    : "Send Message"}

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