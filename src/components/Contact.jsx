import { useState } from "react";
import { motion } from "framer-motion";
import { FaCommentDots, FaEnvelope, FaPaperPlane, FaUser } from "react-icons/fa";

import API from "../api/axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const sendMessage = async (event) => {
    event.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (payload.message.length < 10) {
      setNotice({
        type: "error",
        text: "Please add a little more detail so I can understand the project.",
      });
      return;
    }

    try {
      setLoading(true);
      setNotice(null);
      await API.post("/messages", payload);
      setForm({ name: "", email: "", message: "" });
      setNotice({
        type: "success",
        text: "Message sent. I will get back to you as soon as possible.",
      });
    } catch (error) {
      console.error("Contact form failed:", error);
      setNotice({
        type: "error",
        text: error?.response?.data?.errors?.[0] || "Message could not be sent right now.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-shell bg-[#fffaf3] px-6 py-24 text-[#241423] dark:bg-slate-950 dark:text-white"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-[1.75rem] border border-[#eadccf] bg-[#241423] p-7 text-white shadow-xl shadow-[#7a2e53]/10 dark:border-slate-800 dark:bg-[#1f1020]"
        >
          <p className="section-eyebrow">Contact</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Let's talk about what you want to build.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#eadccf]">
            Send a project idea, collaboration request, or role opportunity. I
            respond with clear next steps and practical timelines.
          </p>

          <div className="mt-8 space-y-4">
            <ContactItem icon={FaEnvelope} label="Email" value="fn0740839@gmail.com" />
            <ContactItem icon={FaCommentDots} label="Response time" value="Within 24 hours" />
          </div>
        </motion.div>

        <motion.form
          onSubmit={sendMessage}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true }}
          className="rounded-[1.75rem] border border-[#eadccf] bg-white p-6 shadow-xl shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950 md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full Name" icon={FaUser}>
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                className="field-input"
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" icon={FaEnvelope}>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                className="field-input"
                placeholder="you@example.com"
              />
            </Field>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-[#5f4d55] dark:text-slate-300">
              Message
            </label>
            <textarea
              rows="6"
              required
              maxLength={1000}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full rounded-xl border border-[#eadccf] bg-[#fffaf3] p-4 outline-none transition focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-[#c65f4a]/20"
              placeholder="Tell me about your project, goals, timeline, or the role you are hiring for."
            />
          </div>

          {notice && (
            <p
              className={`mt-5 rounded-xl px-4 py-3 text-sm font-medium ${
                notice.type === "success"
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
              }`}
            >
              {notice.text}
            </p>
          )}

          <button
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#c65f4a] px-6 py-4 font-semibold text-white shadow-xl shadow-[#c65f4a]/20 transition hover:bg-[#ad503e] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#f2a38d]">
        <Icon />
      </div>
      <div>
        <p className="text-sm text-[#d7c7ba]">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#5f4d55] dark:text-slate-300">
        {label}
      </span>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b4a095] dark:text-slate-500" />
        {children}
      </div>
    </label>
  );
}

export default Contact;
