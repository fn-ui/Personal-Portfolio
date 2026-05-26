import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminProjects() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.log("FETCH ERROR:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("techStack", techStack);
      formData.append("githubLink", github);
      formData.append("liveDemo", liveDemo);

      if (image) {
        formData.append("image", image);
      }

      if (editingId) {
        await API.put(`/projects/${editingId}`, formData);
        alert("Project updated successfully");
        setEditingId(null);
      } else {
        await API.post("/projects", formData);
        alert("Project added successfully");
      }

      // RESET FORM
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithub("");
      setLiveDemo("");
      setImage(null);

      await fetchProjects();
    } catch (error) {
      console.log("SUBMIT ERROR:", error?.response?.data || error.message);

      // 🔥 IMPORTANT FIX: show real backend error instead of generic message
      alert(
        error?.response?.data?.message ||
          "Operation failed (check backend)"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${id}`);
      alert("Project deleted successfully");
      await fetchProjects();
    } catch (error) {
      console.log("DELETE ERROR:", error?.response?.data || error.message);
    }
  };

  // EDIT
  const handleEdit = (project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setDescription(project.description);
    setTechStack(project.techStack || "");
    setGithub(project.githubLink);
    setLiveDemo(project.liveDemo || "");
    setImage(null);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Projects Manager
        </h1>
        <p className="mt-2 text-slate-500">
          Add, edit and manage portfolio projects.
        </p>
      </div>

      {/* FORM */}
      <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <textarea
            rows="5"
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="React, Tailwind, MongoDB"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="Github link"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="w-full rounded-2xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="Live demo"
            value={liveDemo}
            onChange={(e) => setLiveDemo(e.target.value)}
            className="w-full rounded-2xl border p-4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded-2xl border p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-blue-600 px-7 py-4 text-white"
          >
            {loading
              ? "Saving..."
              : editingId
              ? "Update Project"
              : "Save Project"}
          </button>
        </form>
      </div>

      {/* PROJECT LIST */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-semibold">Existing Projects</h2>

        {projects.length === 0 && !loading && (
          <p>No projects added yet.</p>
        )}

        {loading && <p>Loading projects...</p>}

        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project._id} className="border p-5 rounded-2xl">
              {project.image && (
                <img
                  src={project.image}
                  className="h-52 w-full object-cover rounded-2xl mb-4"
                />
              )}

              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2">{project.description}</p>

              <div className="mt-4">
                <span className="bg-slate-100 px-4 py-2 rounded-xl">
                  {project.techStack}
                </span>
              </div>

              <div className="mt-5 flex gap-4">
                <a href={project.githubLink} target="_blank">
                  GitHub
                </a>

                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank">
                    Live
                  </a>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-green-500 text-white px-4 py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProjects;