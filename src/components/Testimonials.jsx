import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Quote } from "lucide-react";

import API from "../api/axios";
import johnImg from "../assets/testimonials/john.png";
import graceImg from "../assets/testimonials/grace.png";
import brianImg from "../assets/testimonials/brian.png";

const defaultFeedbacks = [
  {
    name: "John Mwangi",
    role: "Frontend Developer",
    image: johnImg,
    feedback:
      "Faith created a clean, responsive interface with smooth interactions and strong attention to detail.",
    rating: 5,
  },
  {
    name: "Grace Wanjiru",
    role: "UI/UX Designer",
    image: graceImg,
    feedback:
      "Professional work, clear communication, and a polished result across desktop and mobile screens.",
    rating: 5,
  },
  {
    name: "Brian Otieno",
    role: "Project Collaborator",
    image: brianImg,
    feedback:
      "Reliable delivery and impressive frontend development skills. The final product felt modern and easy to use.",
    rating: 5,
  },
];

function Testimonials() {
  const [feedbacks, setFeedbacks] = useState(defaultFeedbacks);
  const [form, setForm] = useState({ name: "", role: "", message: "", rating: 5 });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get("/testimonials");
        const items = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : [];
        const approvedTestimonials = items.filter((item) => item.status === "approved");

        if (approvedTestimonials.length > 0) setFeedbacks(approvedTestimonials);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTestimonials();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await API.post("/testimonials", {
        ...form,
        name: form.name.trim(),
        role: form.role.trim(),
        message: form.message.trim(),
        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}`,
      });

      setForm({ name: "", role: "", message: "", rating: 5 });
      setNotice("Thank you. Your feedback was submitted for review.");
    } catch (error) {
      console.log(error);
      setNotice("Feedback could not be submitted right now.");
    }
  };

  return (
    <section
      id="testimonials"
      className="section-shell bg-[#fff8ef] px-6 py-24 text-[#241423] dark:bg-slate-900 dark:text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="section-eyebrow">Client Words</p>
            <h2 className="section-title mt-3">
              Kind feedback from people I have worked with.
            </h2>
          </div>
          <p className="max-w-md text-[#6d5b53] dark:text-slate-400">
            The goal is always the same: calm collaboration, thoughtful
            execution, and a final product that feels considered.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {feedbacks.map((item, index) => (
            <motion.article
              key={`${item.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="surface-card flex min-h-[310px] flex-col justify-between p-6"
            >
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className={
                          starIndex < (item.rating || 5)
                            ? "text-[#d7a23a]"
                            : "text-[#eadccf]"
                        }
                      />
                    ))}
                  </div>
                  <Quote className="h-7 w-7 text-[#c65f4a]/30" />
                </div>

                <p className="leading-8 text-[#6d5b53] dark:text-slate-300">{item.message || item.feedback}</p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-[#f1e4d8] pt-5 dark:border-slate-800">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7a2e53] font-bold text-white">
                    {item.name
                      ?.split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-[#8b776d] dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mx-auto mt-14 max-w-4xl rounded-[1.75rem] border border-[#eadccf] bg-white/90 p-6 shadow-xl shadow-[#7a2e53]/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:p-8"
        >
          <div className="mb-6">
            <p className="section-eyebrow">Leave Feedback</p>
            <h3 className="mt-2 text-2xl font-bold text-[#241423] dark:text-white">Share your experience</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input value={form.name} onChange={(value) => updateField("name", value)} placeholder="Your name" />
            <Input value={form.role} onChange={(value) => updateField("role", value)} placeholder="Your role" />
          </div>

          <textarea
            required
            rows="5"
            placeholder="Write your feedback..."
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            className="mt-5 w-full rounded-xl border border-[#eadccf] bg-[#fffaf3] p-4 outline-none focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-[#c65f4a]/20"
          />

          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  aria-label={`${star} star rating`}
                  onClick={() => updateField("rating", star)}
                  className="text-2xl"
                >
                  <FaStar className={star <= form.rating ? "text-[#d7a23a]" : "text-[#eadccf]"} />
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#7a2e53] px-6 py-3 font-semibold text-white hover:bg-[#642442]"
            >
              Submit Feedback
            </button>
          </div>

          {notice && (
            <p className="mt-5 rounded-xl bg-[#fff1e8] px-4 py-3 text-sm text-[#7a2e53] dark:bg-[#c65f4a]/10 dark:text-[#f4a391]">
              {notice}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      required
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-xl border border-[#eadccf] bg-[#fffaf3] p-4 outline-none focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-[#c65f4a]/20"
    />
  );
}

export default Testimonials;
