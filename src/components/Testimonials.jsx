import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
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
        "Faith created a clean and responsive interface with smooth animations and great attention to detail.",
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

  // FETCH TESTIMONIALS FROM FIREBASE
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
      // SAVE TO FIREBASE
      await addDoc(
        collection(db, "feedbacks"),
        newFeedback
      );

      // UPDATE UI
      setFeedbacks((prev) => [
        newFeedback,
        ...prev,
      ]);

      // CLEAR FORM
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
      className="relative overflow-hidden bg-black px-6 py-24 text-white"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-400">
            Testimonials
          </p>

          <h2 className="text-4xl font-bold md:text-5xl">
            What People Say
          </h2>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

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
                y: -6,
                scale: 1.02,
              }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.07]"
            >
              <div>

                {/* Quote */}
                <div className="mb-3 text-3xl leading-none text-purple-400/60">
                  “
                </div>

                {/* Stars */}
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={13}
                      className={
                        i < item.rating
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>

                {/* Feedback */}
                <p className="mb-5 text-sm leading-relaxed text-slate-300">
                  {item.feedback}
                </p>
              </div>

              {/* User */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded-full border border-white/10 object-cover"
                />

                <div>
                  <h3 className="text-base font-semibold text-white">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
          <h3 className="mb-8 text-center text-3xl font-bold">
            Leave Feedback
          </h3>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-purple-500"
            />

            <input
              type="text"
              placeholder="Your Role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-purple-500"
            />

            <textarea
              rows="5"
              placeholder="Write your feedback..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              required
              className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none focus:border-purple-500"
            />

            {/* Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() =>
                    setRating(star)
                  }
                  className={
                    star <= rating
                      ? "cursor-pointer text-yellow-400"
                      : "cursor-pointer text-gray-600"
                  }
                />
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-sm font-medium text-white transition-all hover:scale-105"
              >
                Submit Feedback
              </button>
            </div>

          </div>
        </motion.form>

      </div>
    </section>
  );
}

export default Testimonials;