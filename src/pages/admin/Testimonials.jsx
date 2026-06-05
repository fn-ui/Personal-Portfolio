import { useEffect, useState } from "react";
import API from "../../api/axios";

import toast from "react-hot-toast";

import {
  MessageSquareQuote,
  Trash2,
  Search,
  X,
  CheckCircle2,
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
        "/api/testimonials"
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

    <div>

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Testimonials
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400 text-lg">
            Approve and manage client testimonials.
          </p>

        </div>

        <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">
          <MessageSquareQuote size={28} />
        </div>

      </div>

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}
      <div className="mb-8 relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
            border border-gray-200 dark:border-gray-700
            dark:bg-gray-800 dark:text-white
            rounded-2xl
            pl-12 pr-5 py-4
            outline-none
            focus:ring-2 focus:ring-purple-500
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
              bg-white dark:bg-gray-800
              rounded-3xl
              border border-gray-100 dark:border-gray-700
              p-6 shadow-sm
              hover:shadow-xl hover:scale-[1.01]
              transition-all duration-300
            "
          >

            {/* TOP */}
            <div className="flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                      ? "bg-green-100 text-green-600"
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
            <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-900 p-5">

              <p className="leading-7 text-gray-700 dark:text-gray-300">
                “{item.message}”
              </p>

            </div>

            {/* DATE */}
            <div className="mt-5">

              <p className="text-sm text-gray-400">

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
                    rounded-2xl
                    bg-purple-600 hover:bg-purple-700
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

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Delete Testimonial
              </h2>

              <button
                onClick={() =>
                  setShowDeleteModal(
                    false
                  )
                }
              >

                <X className="text-gray-500" />

              </button>

            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-8">
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
                  bg-gray-200 hover:bg-gray-300
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