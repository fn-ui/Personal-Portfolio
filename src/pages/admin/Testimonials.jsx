import { useEffect, useState } from "react";
import API from "../../api/axios";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  // EDITING STATE
  const [editingId, setEditingId] = useState(null);

  // FETCH TESTIMONIALS
  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonials");

      setTestimonials(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ADD / UPDATE TESTIMONIAL
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // UPDATE
      if (editingId) {
        await API.put(
          `/testimonials/${editingId}`,
          {
            name,
            role,
            message,
          }
        );

        alert("Testimonial updated");
      } else {
        // CREATE
        await API.post("/testimonials", {
          name,
          role,
          message,
        });

        alert("Testimonial added");
      }

      // RESET FORM
      setName("");
      setRole("");
      setMessage("");
      setEditingId(null);

      fetchTestimonials();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this testimonial?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/testimonials/${id}`);

      setTestimonials(
        testimonials.filter(
          (item) => item._id !== id
        )
      );

      alert("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setEditingId(item._id);

    setName(item.name);
    setRole(item.role);
    setMessage(item.message);

    // SCROLL TO TOP
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Testimonials
        </h1>

        <p className="mt-2 text-slate-500">
          Add and manage testimonials.
        </p>
      </div>

      {/* FORM */}
      <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          {editingId
            ? "Edit Testimonial"
            : "Add Testimonial"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NAME */}
          <input
            type="text"
            placeholder="Client name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* ROLE */}
          <input
            type="text"
            placeholder="Client role/company"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* MESSAGE */}
          <textarea
            rows="5"
            placeholder="Client testimonial"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-blue-600 px-7 py-4 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Testimonial"
              : "Save Testimonial"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="grid gap-6">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {item.role}
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-600">
                Testimonial
              </span>
            </div>

            {/* MESSAGE */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="leading-7 text-slate-700">
                “{item.message}”
              </p>
            </div>

            {/* DATE */}
            <div className="mt-5">
              <p className="text-sm text-slate-400">
                Added on{" "}
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  handleEdit(item)
                }
                className="rounded-xl bg-green-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(item._id)
                }
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;