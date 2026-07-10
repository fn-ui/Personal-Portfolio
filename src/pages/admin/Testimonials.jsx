import { useEffect, useState } from "react";
import API from "../../api/axios";

import toast from "react-hot-toast";

import {
  MessageSquareQuote,
  Trash2,
  Search,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

function Testimonials() {

  // =========================
  // STATES
  // =========================
  const [testimonials, setTestimonials] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [testimonialToDelete, setTestimonialToDelete] =
    useState(null);

  // =========================
  // FILTERED TESTIMONIALS
  // =========================
  const filteredTestimonials =
    testimonials.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        item.role
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  // =========================
  // FETCH TESTIMONIALS
  // =========================
  const fetchTestimonials = async () => {

    try {

      const res = await API.get(
        "/testimonials"
      );

      setTestimonials(res.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch testimonials"
      );
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // =========================
  // OPEN DELETE MODAL
  // =========================
  const openDeleteModal = (id) => {

    setTestimonialToDelete(id);

    setShowDeleteModal(true);
  };

  // =========================
  // DELETE TESTIMONIAL
  // =========================
  const handleDelete = async () => {

    try {

      await API.delete(
        `/testimonials/${testimonialToDelete}`
      );

      setTestimonials(
        testimonials.filter(
          (item) =>
            item._id !==
            testimonialToDelete
        )
      );

      toast.success(
        "Testimonial deleted successfully"
      );

      setShowDeleteModal(false);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete testimonial"
      );
    }
  };

  // =========================
  // APPROVE TESTIMONIAL
  // =========================
  const handleApprove = async (id) => {

    try {

      await API.put(
        `/testimonials/${id}/approve`
      );

      toast.success(
        "Testimonial approved"
      );

      fetchTestimonials();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to approve testimonial"
      );
    }
  };

  return (

    <div className="space-y-8">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <div className="relative overflow-hidden rounded-2xl border border-[#eadccf] bg-[#5b233f] p-7 text-white shadow-xl shadow-[#7a2e53]/15">
        <Sparkles className="absolute -right-8 -top-8 h-44 w-44 text-white/10" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

        <div>

          <p className="inline-flex rounded-md bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f4a391]">
            Social Proof
          </p>

          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Testimonials
          </h1>

          <p className="mt-3 max-w-2xl text-white/78">
            Approve and manage client testimonials.
          </p>

        </div>

        <div className="grid min-w-32 place-items-center rounded-xl bg-white/12 p-5 text-center backdrop-blur">
          <MessageSquareQuote size={28} />
          <p className="mt-3 text-3xl font-extrabold">{testimonials.length}</p>
          <p className="text-sm text-white/70">Saved</p>
        </div>

        </div>
      </div>

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}
      <div className="relative max-w-md rounded-2xl border border-[#eadccf] bg-white p-4 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c6a61]"
        />

        <input
          type="text"
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            border border-[#eadccf] dark:border-slate-800
            bg-[#fffaf3] dark:bg-slate-900 dark:text-white
            rounded-xl
            pl-12 pr-5 py-4
            outline-none
            focus:ring-2 focus:ring-[#f3c8bb]/40 focus:border-[#c65f4a]
          "
        />

      </div>

      {/* ========================= */}
      {/* TESTIMONIALS LIST */}
      {/* ========================= */}
      <div className="grid gap-6">

        {filteredTestimonials.map((item) => (

          <motion.div
            key={item._id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              bg-white dark:bg-slate-950
              rounded-2xl
              border border-[#eadccf] dark:border-slate-800
              p-6 shadow-sm shadow-[#7a2e53]/5
              hover:shadow-xl hover:shadow-[#7a2e53]/10 hover:-translate-y-1
              transition-all duration-300
            "
          >

            {/* TOP */}
            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-[#241423] dark:text-white">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-[#7c6a61] dark:text-slate-400">
                  {item.role}
                </p>

              </div>

              {/* STATUS */}
              <span
                className={`
                  rounded-full
                  px-4 py-2
                  text-sm font-medium

                  ${
                    item.status ===
                    "approved"
                      ? "bg-[#fbe3dc] text-[#c65f4a]"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >

                {item.status ===
                "approved"
                  ? "Approved"
                  : "Pending"}

              </span>

            </div>

            {/* MESSAGE */}
            <div className="mt-6 rounded-xl bg-[#fff8ef] p-5 dark:bg-slate-900">

              <p className="leading-7 text-[#5f4d55] dark:text-slate-300">
                “{item.message}”
              </p>

            </div>

            {/* DATE */}
            <div className="mt-5">

              <p className="text-sm text-[#7c6a61]">

                Submitted on{" "}

                {new Date(
                  item.createdAt
                ).toLocaleString()}

              </p>

            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-wrap gap-3">

              {/* APPROVE */}
              {item.status !==
                "approved" && (

                <button
                  onClick={() =>
                    handleApprove(
                      item._id
                    )
                  }
                  className="
                    flex items-center gap-2
                    rounded-xl
                    bg-[#c65f4a] hover:bg-[#ad503e]
                    px-5 py-3
                    text-sm font-medium text-white
                    transition-all
                  "
                >

                  <CheckCircle2 size={16} />
                  Approve

                </button>

              )}

              {/* DELETE */}
              <button
                onClick={() =>
                  openDeleteModal(
                    item._id
                  )
                }
                className="
                  flex items-center gap-2
                  rounded-2xl
                  bg-red-500 hover:bg-red-600
                  px-5 py-3
                  text-sm font-medium text-white
                  transition-all
                "
              >

                <Trash2 size={16} />
                Delete

              </button>

            </div>

          </motion.div>

        ))}

      </div>

      {/* ========================= */}
      {/* DELETE MODAL */}
      {/* ========================= */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

          <div className="w-full max-w-md rounded-2xl border border-[#eadccf] bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-950">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-extrabold text-[#241423] dark:text-white">
                Delete Testimonial
              </h2>

              <button
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
              >

                <X className="text-[#7c6a61]" />

              </button>

            </div>

            <p className="text-[#7c6a61] dark:text-[#7c6a61] mb-8">
              Are you sure you want to permanently delete this testimonial?
            </p>

            <div className="flex gap-4">

              <button
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
                className="
                  flex-1
                  bg-[#fbe3dc] hover:bg-[#eadccf]
                  py-4 rounded-2xl
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="
                  flex-1
                  bg-red-500 hover:bg-red-600
                  text-white
                  py-4 rounded-2xl
                  transition-all
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Testimonials;

