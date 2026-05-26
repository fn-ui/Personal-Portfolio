function Settings() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      
      <h1 className="mb-2 text-3xl font-bold text-slate-800">
        Settings
      </h1>

      <p className="mb-8 text-slate-500">
        Manage your portfolio settings.
      </p>

      <div className="space-y-6">

        {/* NAME */}
        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Faith Njeri"
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* TITLE */}
        <div>
          <label className="mb-2 block font-medium">
            Professional Title
          </label>

          <input
            type="text"
            placeholder="Frontend Developer"
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* GITHUB */}
        <div>
          <label className="mb-2 block font-medium">
            GitHub Link
          </label>

          <input
            type="text"
            placeholder="https://github.com/username"
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* LINKEDIN */}
        <div>
          <label className="mb-2 block font-medium">
            LinkedIn Link
          </label>

          <input
            type="text"
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          className="rounded-2xl bg-blue-600 px-7 py-4 font-medium text-white transition hover:bg-blue-700"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}

export default Settings;