import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

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

  // FETCH TESTIMONIALS
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "feedbacks")
        );

        const firebaseFeedbacks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFeedbacks((prev) => [
          ...firebaseFeedbacks,
          ...prev,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
  }, []);

  // SUBMIT FEEDBACK
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      name,
      role,
      feedback: message,
      rating,
      image:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(name),
    };

    try {
      await addDoc(
        collection(db, "feedbacks"),
        newFeedback
      );

      setFeedbacks((prev) => [
        newFeedback,
        ...prev,
      ]);

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
      className="relative overflow-hidden bg-slate-50 px-6 py-28 text-slate-900"
    >
      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <p className="mb-4 inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Testimonials
          </p>

          <h2 className="text-5xl font-black md:text-6xl">
            What Clients
            <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              Say About Me
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Feedback from people I’ve collaborated with on
            frontend development and modern web projects.
          </p>

        </motion.div>

        {/* TESTIMONIAL CARDS */}
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
              whileHover={{
                y: -8,
              }}
              className="group flex h-full flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
            >

              <div>

                {/* QUOTE ICON */}
                <div className="mb-5 text-4xl text-blue-200">
                  <FaQuoteLeft />
                </div>

                {/* STARS */}
                <div className="mb-4 flex gap-1">

                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      className={
                        i < item.rating
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}

                </div>

                {/* FEEDBACK */}
                <p className="text-[15px] leading-8 text-slate-600">
                  {item.feedback}
                </p>

              </div>

              {/* USER */}
              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.role}
                  </p>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

        {/* FEEDBACK FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-4xl rounded-[2.5rem] border border-slate-200 bg-white p-10 shadow-xl"
        >

          <div className="mb-10 text-center">

            <h3 className="text-4xl font-black">
              Leave Feedback
            </h3>

            <p className="mt-3 text-slate-600">
              Share your experience working with me.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* NAME */}
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
            />

            {/* ROLE */}
            <input
              type="text"
              placeholder="Your Role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              required
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
            />

          </div>

          {/* MESSAGE */}
          <textarea
            rows="6"
            placeholder="Write your feedback..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            required
            className="mt-6 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
          />

          {/* RATING */}
          <div className="mt-8 flex justify-center gap-3">

            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={26}
                onClick={() =>
                  setRating(star)
                }
                className={
                  star <= rating
                    ? "cursor-pointer text-yellow-400 transition"
                    : "cursor-pointer text-slate-300 transition"
                }
              />
            ))}

          </div>

          {/* BUTTON */}
          <div className="mt-10 flex justify-center">

            <button
              type="submit"
              className="rounded-2xl bg-blue-600 px-10 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              Submit Feedback
            </button>

          </div>

        </motion.form>

      </div>
    </section>
  );
}

export default Testimonials;