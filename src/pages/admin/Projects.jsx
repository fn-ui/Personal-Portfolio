import { useEffect, useState } from "react";
import API from "../../api/axios";

import {
  FolderKanban,
  Trash2,
  Pencil,
  Plus,
  ExternalLink,
  GitBranch,
  ImagePlus,
  Loader2,
  Search,
  X,
  Sparkles,
  LayoutGrid,
  Eye,
  TrendingUp,
} from "lucide-react";

import toast from "react-hot-toast";

function AdminProjects() {

  // =========================
  // FORM STATES
  // =========================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  // =========================
  // IMAGE STATES
  // =========================
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // =========================
  // DATA STATES
  // =========================
  const [projects, setProjects] = useState([]);

  // =========================
  // UI STATES
  // =========================
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // =========================
  // SEARCH
  // =========================
  const [search, setSearch] = useState("");

  // =========================
  // DELETE MODAL
  // =========================
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [projectToDelete, setProjectToDelete] =
    useState(null);

  // =========================
  // FETCH PROJECTS
  // =========================
  const fetchProjects = async () => {
    try {

      setLoading(true);

      const res = await API.get("api/projects");

      setProjects(res.data);

    } catch (error) {

      console.log(
        "FETCH ERROR:",
        error?.response?.data || error.message
      );

      toast.error("Failed to fetch projects");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================
  // IMAGE PREVIEW
  // =========================
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {

    setTitle("");
    setDescription("");
    setTechStack("");
    setGithub("");
    setLiveDemo("");
    setImage(null);
    setPreview("");
    setEditingId(null);
  };

  // =========================
  // SUBMIT PROJECT
  // =========================
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

      // UPDATE
      if (editingId) {

        await API.put(
          `/api/projects/${editingId}`,
          formData
        );

        toast.success(
          "Project updated successfully"
        );

      }

      // CREATE
      else {

        await API.post("/api/projects", formData);

        toast.success(
          "Project added successfully"
        );
      }

      resetForm();

      fetchProjects();

    } catch (error) {

      console.log(
        "SUBMIT ERROR:",
        error?.response?.data || error.message
      );

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // OPEN DELETE MODAL
  // =========================
  const openDeleteModal = (id) => {

    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  // =========================
  // DELETE PROJECT
  // =========================
  const handleDelete = async () => {

    try {

      await API.delete(
        `/api/projects/${projectToDelete}`
      );

      toast.success(
        "Project deleted successfully"
      );

      fetchProjects();

      setShowDeleteModal(false);
      setProjectToDelete(null);

    } catch (error) {

      console.log(
        "DELETE ERROR:",
        error?.response?.data || error.message
      );

      toast.error("Failed to delete project");
    }
  };

  // =========================
  // EDIT PROJECT
  // =========================
  const handleEdit = (project) => {

    setEditingId(project._id);

    setTitle(project.title);
    setDescription(project.description);
    setTechStack(project.techStack || "");
    setGithub(project.githubLink || "");
    setLiveDemo(project.liveDemo || "");

    setPreview(project.image || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    toast.success("Editing project");
  };

  // =========================
  // FILTERED PROJECTS
  // =========================
  const filteredProjects = projects.filter((project) => {
  const query = search.toLowerCase().trim();

  return (
    project.title?.toLowerCase().includes(query) ||
    project.techStack?.toLowerCase().includes(query) ||
    project.description?.toLowerCase().includes(query)
  );
});

  return (
    <div className="space-y-10">

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white">

        <div className="absolute top-0 right-0 opacity-10">
          <Sparkles size={220} />
        </div>

        <div className="relative z-10">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                  <FolderKanban size={28} />
                </div>

                <span className="bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur-md">
                  Portfolio Projects
                </span>

              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Project Manager
              </h1>

              <p className="text-blue-100 text-lg max-w-2xl">
                Create, manage, edit and showcase your portfolio projects beautifully.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 min-w-[160px]">

                <div className="flex items-center justify-between mb-4">

                  <LayoutGrid />

                  <span className="text-sm">
                    Total
                  </span>

                </div>

                <h2 className="text-4xl font-bold">
                  {projects.length}
                </h2>

                <p className="text-blue-100 mt-2">
                  Projects
                </p>

              </div>

              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 min-w-[160px]">

                <div className="flex items-center justify-between mb-4">

                  <TrendingUp />

                  <span className="text-sm">
                    Growth
                  </span>

                </div>

                <h2 className="text-4xl font-bold">
                  +12%
                </h2>

                <p className="text-blue-100 mt-2">
                  This Month
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-gray-800">

        <div className="relative">

          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by title or technology..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl pl-14 pr-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />

        </div>

      </div>

      {/* FORM */}
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800">

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-4 rounded-3xl">
            <FolderKanban size={28} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {editingId
                ? "Edit Project"
                : "Create New Project"}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              Add modern portfolio projects.
            </p>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* TITLE */}
          <div>

            <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Project Title
            </label>

            <input
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              required
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Describe your project..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white min-h-[160px]"
              required
            />

          </div>

          {/* TECH STACK */}
          <div>

            <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tech Stack
            </label>

            <input
              type="text"
              placeholder="React, Node.js, MongoDB..."
              value={techStack}
              onChange={(e) =>
                setTechStack(e.target.value)
              }
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              required
            />

          </div>

          {/* LINKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                GitHub Link
              </label>

              <input
                type="text"
                placeholder="https://github.com/..."
                value={github}
                onChange={(e) =>
                  setGithub(e.target.value)
                }
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                required
              />

            </div>

            <div>

              <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Live Demo
              </label>

              <input
                type="text"
                placeholder="https://demo.com"
                value={liveDemo}
                onChange={(e) =>
                  setLiveDemo(e.target.value)
                }
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />

            </div>

          </div>

          {/* IMAGE */}
          <div>

            <label className="block mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Project Image
            </label>

            <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition-all bg-gray-50 dark:bg-gray-800">

              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-5 rounded-full mb-5">
                <ImagePlus size={34} />
              </div>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Upload Project Image
              </h3>

              <p className="text-gray-500 dark:text-gray-400">
                PNG, JPG, JPEG supported
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

            {/* PREVIEW */}
            {preview && (

              <div className="relative mt-6">

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-[400px] object-cover rounded-[2rem] border border-gray-200 dark:border-gray-700"
                />

                <button
                  type="button"
                  onClick={() => {
                    setPreview("");
                    setImage(null);
                  }}
                  className="absolute top-5 right-5 bg-white dark:bg-gray-900 text-red-500 p-3 rounded-full shadow-lg"
                >
                  <X size={20} />
                </button>

              </div>

            )}

          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-2">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 font-semibold"
            >

              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Plus size={20} />
                  {editingId
                    ? "Update Project"
                    : "Add Project"}
                </>
              )}

            </button>

            {editingId && (

              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all dark:text-white"
              >
                Cancel Editing
              </button>

            )}

          </div>

        </form>

      </div>

      {/* PROJECTS */}
      <div>

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Existing Projects
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Showcase your best portfolio work.
            </p>

          </div>

        </div>

        {/* LOADING */}
        {loading && (

          <div className="text-center py-16">

            <Loader2
              size={45}
              className="animate-spin mx-auto text-blue-600"
            />

          </div>

        )}

        {/* EMPTY */}
        {filteredProjects.length === 0 &&
          !loading && (

            <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-14 text-center border border-gray-100 dark:border-gray-800 shadow-sm">

              <div className="flex justify-center mb-6">

                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-6 rounded-full">
                  <FolderKanban size={45} />
                </div>

              </div>

              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                No Projects Found
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                Add your first portfolio project.
              </p>

            </div>

          )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredProjects.map((project) => (

            <div
              key={project._id}
              className="group bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >

              {/* IMAGE */}
              {project.image && (

                <div className="relative overflow-hidden">

                  <img
                    src={
                      project.image?.startsWith("http")
                        ? project.image
                        : `http://localhost:5000/${project.image.replace(/^\/+/, "")}`
                    }
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                  />

                  <div className="absolute top-5 right-5 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm">
                    Portfolio
                  </div>

                </div>

              )}

              {/* CONTENT */}
              <div className="p-6">

                <div className="flex items-start justify-between mb-4">

                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {project.title}
                  </h2>

                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-3 rounded-2xl">
                    <FolderKanban size={20} />
                  </div>

                </div>

                <p className="text-gray-500 dark:text-gray-400 mb-5 line-clamp-3">
                  {project.description}
                </p>

                {/* STACK */}
                <div className="flex flex-wrap gap-2 mb-6">

                  {project.techStack
                    ?.split(",")
                    .map((tech, index) => (

                      <span
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {tech.trim()}
                      </span>

                    ))}

                </div>

                {/* LINKS */}
                <div className="flex gap-3 mb-4">

                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-3 rounded-2xl transition-all"
                  >
                    <GitBranch size={18} />
                    GitHub
                  </a>

                  {project.liveDemo && (

                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition-all"
                    >
                      <ExternalLink size={18} />
                      Demo
                    </a>

                  )}

                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleEdit(project)
                    }
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-2xl transition-all dark:text-white"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      openDeleteModal(project._id)
                    }
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl transition-all"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">

          <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-8 w-full max-w-md shadow-2xl animate-fadeIn border border-gray-100 dark:border-gray-800">

            <div className="flex justify-center mb-6">

              <div className="bg-red-100 dark:bg-red-900/30 text-red-600 p-6 rounded-full">
                <Trash2 size={40} />
              </div>

            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-3">
              Delete Project?
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
              This action cannot be undone.
            </p>

            <div className="flex gap-4">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProjectToDelete(null);
                }}
                className="flex-1 bg-gray-200 dark:bg-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 py-4 rounded-2xl transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition-all"
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

export default AdminProjects;