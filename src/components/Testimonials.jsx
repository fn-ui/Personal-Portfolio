import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

import API from "../api/axios";

// AVATARS
import johnImg from "../assets/testimonials/john.png";
import graceImg from "../assets/testimonials/grace.png";
import brianImg from "../assets/testimonials/brian.png";

function Testimonials() {
  const [feedbacks, setFeedbacks] = useState([
    {
      name: "John Mwangi",
      role: "Frontend Developer",
      image: johnImg,
      feedback:
        "Faith created a clean and responsive interface with smooth animations and strong attention to detail.",
      rating: 5,
    },
    {
      name: "Grace Wanjiru",
      role: "UI/UX Designer",
      image: graceImg,
      feedback:
        "Very professional work with modern design principles and excellent responsiveness across devices.",
      rating: 5,
    },
    {
      name: "Brian Otieno",
      role: "Project Collaborator",
      image: brianImg,
      feedback:
        "Great communication, fast delivery, and impressive frontend development skills.",
      rating: 5,
    },
  ]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  // FETCH FIREBASE FEEDBACKS
  useEffect(() => {
  fetchTestimonials();
}, []);

const fetchTestimonials = async () => {
  try {
    const res = await API.get("/testimonials");

    const approvedTestimonials =
      res.data.filter(
        (item) =>
          item.status === "approved"
      );

    setFeedbacks(approvedTestimonials);

  } catch (error) {
    console.log(error);
  }
};

  // SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/testimonials", {
      name,
      role,
      message,
      rating,
      image:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(name),
    });

    // optional: refresh list or give feedback
    setName("");
    setRole("");
    setMessage("");
    setRating(5);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-500/10" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl dark:bg-cyan-500/10" />

      

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
            Testimonials
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            What Clients{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Say About Me
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Feedback from collaborators, clients, and developers I’ve worked
            with on different projects and experiences.
          </p>
        </motion.div>

        {/* TESTIMONIALS */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {feedbacks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group flex flex-col justify-between rounded-[2rem] border border-slate-200 bg-white/90 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 hover:border-blue-200 hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)] dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-blue-500/30"
            >
              <div>
                {/* ICON */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <FaQuoteLeft />
                </div>

                {/* STARS */}
                <div className="mb-5 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      className={
                        i < item.rating
                          ? "text-yellow-400"
                          : "text-slate-300 dark:text-slate-700"
                      }
                    />
                  ))}
                </div>

                {/* MESSAGE */}
                <p className="text-[15px] leading-8 text-slate-600 dark:text-slate-400">
                {item.message}
              </p>
              </div>

              {/* USER */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
            {item.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/90 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80"
        >
          {/* INNER GLOW */}
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-500/10" />

          <div className="relative z-10">
            <h3 className="text-center text-4xl font-black dark:text-white">
              Leave Feedback
            </h3>

            <p className="mt-4 text-center text-slate-600 dark:text-slate-400">
              Share your experience and thoughts about working with me.
            </p>

            {/* INPUTS */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />

              <input
                placeholder="Your Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
              />
            </div>

            {/* TEXTAREA */}
            <textarea
              rows="6"
              placeholder="Write feedback..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />

            {/* STARS */}
            <div className="mt-8 flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  key={star}
                >
                  <FaStar
                    onClick={() => setRating(star)}
                    className={
                      star <= rating
                        ? "cursor-pointer text-yellow-400"
                        : "cursor-pointer text-slate-300 dark:text-slate-700"
                    }
                    size={28}
                  />
                </motion.div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="mt-10 flex justify-center">
              <motion.button
          type="submit"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-2xl bg-blue-600 px-10 py-4 font-semibold text-white shadow-[0_15px_40px_rgba(37,99,235,0.35)] transition hover:bg-blue-700"
        >
          Submit Feedback
        </motion.button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default Testimonials;