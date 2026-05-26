import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "../../firebase";

function AdminProjects() {

  // FORM STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [liveDemo, setLiveDemo] = useState("");

  // IMAGE STATE
  const [image, setImage] = useState(null);

  // PROJECTS STATE
  const [projects, setProjects] = useState([]);

  // EDITING STATE
  const [editingId, setEditingId] = useState(null);

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(
        collection(db, "projects")
      );

      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjects(projectsData);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  // LOAD PROJECTS
  useEffect(() => {
    fetchProjects();
  }, []);

  // ADD / UPDATE PROJECT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = "";

      // UPLOAD IMAGE IF EXISTS
      if (image) {

        const imageRef = ref(
          storage,
          `projects/${Date.now()}-${image.name}`
        );

        await uploadBytes(imageRef, image);

        imageUrl = await getDownloadURL(imageRef);
      }

      // UPDATE PROJECT
      if (editingId) {

        const projectRef = doc(
          db,
          "projects",
          editingId
        );

        const updatedData = {
          title,
          description,
          techStack,
          github,
          liveDemo,
        };

        // ONLY UPDATE IMAGE IF NEW IMAGE EXISTS
        if (imageUrl) {
          updatedData.imageUrl = imageUrl;
        }

        await updateDoc(projectRef, updatedData);

        alert("Project updated successfully");

        setEditingId(null);

      } else {

        // ADD NEW PROJECT
        await addDoc(collection(db, "projects"), {
          title,
          description,
          techStack,
          github,
          liveDemo,
          imageUrl,
          createdAt: new Date(),
        });

        alert("Project added successfully");
      }

      // CLEAR FORM
      setTitle("");
      setDescription("");
      setTechStack("");
      setGithub("");
      setLiveDemo("");
      setImage(null);

      // REFRESH PROJECTS
      await fetchProjects();

    } catch (error) {
      console.log(error);
      alert("Operation failed");

    } finally {
      setLoading(false);
    }
  };

  // DELETE PROJECT
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(doc(db, "projects", id));

      alert("Project deleted successfully");

      await fetchProjects();

    } catch (error) {
      console.log(error);
    }
  };

  // EDIT PROJECT
  const handleEdit = (project) => {

    setEditingId(project.id);

    setTitle(project.title);
    setDescription(project.description);
    setTechStack(project.techStack || "");
    setGithub(project.github);
    setLiveDemo(project.liveDemo || "");

    // SCROLL TO FORM
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>

      {/* PAGE HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Projects Manager
        </h1>

        <p className="mt-2 text-slate-500">
          Add, edit and manage portfolio projects.
        </p>

      </div>

      {/* FORM SECTION */}
      <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">

          {editingId
            ? "Edit Project"
            : "Add New Project"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}
          <input
            type="text"
            placeholder="Project title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* DESCRIPTION */}
          <textarea
            rows="5"
            placeholder="Project description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* TECH STACK */}
          <input
            type="text"
            placeholder="React, Tailwind, Firebase"
            value={techStack}
            onChange={(e) =>
              setTechStack(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* GITHUB */}
          <input
            type="text"
            placeholder="Github repository link"
            value={github}
            onChange={(e) =>
              setGithub(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          {/* LIVE DEMO */}
          <input
            type="text"
            placeholder="Live demo link"
            value={liveDemo}
            onChange={(e) =>
              setLiveDemo(e.target.value)
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
          />

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            accept="image/*"
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
              ? "Update Project"
              : "Save Project"}

          </button>

        </form>

      </div>

      {/* PROJECTS SECTION */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Existing Projects
        </h2>

        {/* EMPTY STATE */}
        {projects.length === 0 && !loading && (

          <p className="text-slate-500">
            No projects added yet.
          </p>

        )}

        {/* LOADING */}
        {loading && (

          <p className="text-slate-500">
            Loading projects...
          </p>

        )}

        {/* PROJECT LIST */}
        <div className="grid gap-6">

          {projects.map((project) => (

            <div
              key={project.id}
              className="rounded-2xl border border-slate-200 p-5"
            >

              {/* IMAGE */}
              {project.imageUrl && (

                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="mb-4 h-52 w-full rounded-2xl object-cover"
                />

              )}

              {/* TITLE */}
              <h3 className="text-xl font-bold text-slate-800">
                {project.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-slate-600">
                {project.description}
              </p>

              {/* TECH STACK */}
              <div className="mt-4">

                <span className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
                  {project.techStack}
                </span>

              </div>

              {/* LINKS */}
              <div className="mt-5 flex flex-wrap gap-4">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>

                {project.liveDemo && (

                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Live Demo
                  </a>

                )}

              </div>

              {/* ACTION BUTTONS */}
              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => handleEdit(project)}
                  className="rounded-xl bg-green-500 px-5 py-2 text-white hover:bg-green-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(project.id)
                  }
                  className="rounded-xl bg-red-500 px-5 py-2 text-white hover:bg-red-600"
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