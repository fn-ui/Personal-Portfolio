import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  Loader2,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";

import API from "../../api/axios";

function ContentManager({
  endpoint,
  eyebrow,
  title,
  description,
  itemLabel,
  icon: PageIcon,
  fields,
  defaultItems = [],
}) {
  const emptyForm = useMemo(
    () =>
      fields.reduce((form, field) => {
        form[field.name] = field.defaultValue || "";
        return form;
      }, {}),
    [fields]
  );

  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await API.get(`${endpoint}?all=true`);
      setItems(res.data?.data || res.data || []);
    } catch (error) {
      if (error.response?.status === 503 || error.code === "ECONNABORTED") {
        setItems([]);
        toast.error("Database is unavailable, so saved content cannot load yet.");
      } else {
        toast.error(`Failed to load ${itemLabel.toLowerCase()}s`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [endpoint]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const payload = fields.reduce((next, field) => {
        next[field.name] =
          field.type === "number" ? Number(form[field.name] || 0) : form[field.name];
        return next;
      }, {});

      if (editingId) {
        await API.put(`${endpoint}/${editingId}`, payload);
        toast.success(`${itemLabel} updated`);
      } else {
        await API.post(endpoint, payload);
        toast.success(`${itemLabel} added`);
      }

      resetForm();
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || `Could not save ${itemLabel.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    const nextForm = fields.reduce((next, field) => {
      const value = item[field.name];
      next[field.name] = Array.isArray(value) ? value.join(", ") : value ?? "";
      return next;
    }, {});

    setForm(nextForm);
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`${endpoint}/${id}`);
      toast.success(`${itemLabel} deleted`);
      fetchItems();
    } catch (error) {
      toast.error(error.response?.data?.message || `Could not delete ${itemLabel.toLowerCase()}`);
    }
  };

  const handleImportDefaults = async () => {
    if (!defaultItems.length) return;

    try {
      setLoading(true);
      await Promise.all(defaultItems.map((item) => API.post(endpoint, item)));
      toast.success(`Default ${itemLabel.toLowerCase()}s imported`);
      fetchItems();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          `Could not import default ${itemLabel.toLowerCase()}s`
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;

    return fields.some((field) => String(item[field.name] || "").toLowerCase().includes(query));
  });

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-[#eadccf] bg-[#5b233f] p-7 text-white shadow-xl shadow-[#7a2e53]/15">
        <Sparkles className="absolute -right-8 -top-8 h-44 w-44 text-white/10" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex rounded-md bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f4a391]">
              {eyebrow}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-white/78">{description}</p>
          </div>
          <div className="grid min-w-36 place-items-center rounded-xl bg-white/12 p-5 text-center backdrop-blur">
            <PageIcon className="mb-3 h-7 w-7 text-[#f4a391]" />
            <p className="text-4xl font-extrabold">{items.length}</p>
            <p className="text-sm text-white/72">Saved</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#eadccf] bg-white p-6 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#fbe3dc] text-[#c65f4a]">
            <PageIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#241423] dark:text-white">
              {editingId ? `Edit ${itemLabel}` : `Add ${itemLabel}`}
            </h2>
            <p className="text-sm text-[#6d5b53] dark:text-slate-400">
              Changes appear on the public portfolio when the database is connected.
            </p>
          </div>
          </div>
          <span className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-bold text-[#7a2e53] dark:bg-slate-900 dark:text-[#f4a391]">
            Public content
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name} className={field.multiline ? "lg:col-span-2" : ""}>
              <label className="mb-2 block text-sm font-bold text-[#5f4d55] dark:text-slate-300">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  rows={field.rows || 4}
                  value={form[field.name]}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  className="w-full rounded-xl border border-[#eadccf] bg-[#fffaf3] px-4 py-3 outline-none transition focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={(event) => updateField(field.name, event.target.value)}
                  className="w-full rounded-xl border border-[#eadccf] bg-[#fffaf3] px-4 py-3 outline-none transition focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  placeholder={field.placeholder}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-3 lg:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#c65f4a] px-5 py-3 font-bold text-white shadow-lg shadow-[#c65f4a]/20 transition hover:bg-[#ad503e] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              {editingId ? `Update ${itemLabel}` : `Add ${itemLabel}`}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-[#eadccf] px-5 py-3 font-bold text-[#5f4d55] transition hover:bg-[#fff8ef] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-[#eadccf] bg-white p-5 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7c6a61]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={`Search ${itemLabel.toLowerCase()}s...`}
            className="w-full rounded-xl border border-[#eadccf] bg-[#fffaf3] py-3 pl-12 pr-4 outline-none focus:border-[#c65f4a] focus:ring-4 focus:ring-[#f3c8bb]/40 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {filteredItems.map((item) => (
          <article
            key={item._id}
            className="rounded-2xl border border-[#eadccf] bg-white p-5 shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#241423] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-[#6d5b53] dark:text-slate-400">
                  {item.desc || item.description}
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#c65f4a]" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {fields.slice(2).map((field) => (
                <span
                  key={field.name}
                  className="rounded-full bg-[#fff1e8] px-3 py-1 text-xs font-bold text-[#7a2e53] dark:bg-slate-900 dark:text-[#f4a391]"
                >
                  {field.label}: {Array.isArray(item[field.name]) ? item[field.name].join(", ") : item[field.name] || "None"}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleEdit(item)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#eadccf] px-4 py-3 font-bold text-[#5f4d55] transition hover:bg-[#fff8ef] dark:border-slate-700 dark:text-slate-200"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>

      {!loading && filteredItems.length === 0 && (
        <div className="rounded-2xl border border-[#eadccf] bg-white p-10 text-center shadow-sm shadow-[#7a2e53]/5 dark:border-slate-800 dark:bg-slate-950">
          <p className="text-lg font-bold text-[#241423] dark:text-white">
            No {itemLabel.toLowerCase()}s found.
          </p>
          <p className="mt-2 text-[#6d5b53] dark:text-slate-400">
            The public portfolio is currently using its built-in fallback
            content. Import those defaults to manage them here.
          </p>
          {defaultItems.length > 0 && (
            <button
              type="button"
              onClick={handleImportDefaults}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#c65f4a] px-5 py-3 font-bold text-white shadow-lg shadow-[#c65f4a]/20 transition hover:bg-[#ad503e] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              Import public defaults
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ContentManager;
