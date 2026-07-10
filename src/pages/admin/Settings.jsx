import { useState } from "react";

import {
  User,
  Lock,
  Save,
  Mail,
  Globe,
} from "lucide-react";

import toast from "react-hot-toast";

function Settings() {

  const [name, setName] = useState("Faith Njeri");
  const [email, setEmail] = useState("admin@example.com");
  const [portfolioName, setPortfolioName] = useState("Faith Portfolio");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleProfileSave = () => {
    toast.success("Profile updated successfully");
  };

  const handlePasswordChange = () => {

    if (!currentPassword || !newPassword) {
      return toast.error("Fill all password fields");
    }

    toast.success("Password updated successfully");

    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-4xl font-bold text-[#241423] dark:text-white mb-2">
          Settings
        </h1>

        <p className="text-[#7c6a61] dark:text-[#7c6a61] text-lg">
          Manage your admin profile and portfolio settings.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* PROFILE CARD */}
        <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 shadow-sm border border-[#eadccf] dark:border-slate-700">

          <div className="flex flex-col items-center text-center">

            {/* AVATAR */}
            <div className="w-28 h-28 rounded-full bg-[#fbe3dc] text-[#c65f4a] flex items-center justify-center text-4xl font-bold mb-5">
              F
            </div>

            <h2 className="text-2xl font-bold text-[#241423] dark:text-white mb-2">
              Faith Njeri
            </h2>

            <p className="text-[#7c6a61] dark:text-[#7c6a61] mb-6">
              Portfolio Administrator
            </p>

            <button className="bg-[#c65f4a] hover:bg-[#ad503e] text-white px-6 py-3 rounded-2xl transition-all">
              Upload Photo
            </button>

          </div>

        </div>

        {/* SETTINGS FORMS */}
        <div className="xl:col-span-2 space-y-8">

          {/* PROFILE SETTINGS */}
          <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 shadow-sm border border-[#eadccf] dark:border-slate-700">

            <div className="flex items-center gap-3 mb-8">

              <div className="bg-[#fbe3dc] text-[#c65f4a] p-3 rounded-2xl">
                <User size={22} />
              </div>

              <h2 className="text-2xl font-bold text-[#241423] dark:text-white">
                Profile Information
              </h2>

            </div>

            <div className="space-y-6">

              {/* NAME */}
              <div>
                <label className="block text-[#6d5b53] dark:text-slate-300 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#eadccf] dark:border-slate-700 dark:bg-slate-950 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#f3c8bb]/60"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[#6d5b53] dark:text-slate-300 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c6a61]"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#eadccf] dark:border-slate-700 dark:bg-slate-950 dark:text-white rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-[#f3c8bb]/60"
                  />

                </div>
              </div>

              {/* PORTFOLIO NAME */}
              <div>
                <label className="block text-[#6d5b53] dark:text-slate-300 mb-2">
                  Portfolio Name
                </label>

                <div className="relative">

                  <Globe
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7c6a61]"
                  />

                  <input
                    type="text"
                    value={portfolioName}
                    onChange={(e) => setPortfolioName(e.target.value)}
                    className="w-full border border-[#eadccf] dark:border-slate-700 dark:bg-slate-950 dark:text-white rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-[#f3c8bb]/60"
                  />

                </div>
              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={handleProfileSave}
                className="flex items-center gap-2 bg-[#c65f4a] hover:bg-[#ad503e] text-white px-8 py-4 rounded-2xl transition-all"
              >
                <Save size={20} />
                Save Changes
              </button>

            </div>

          </div>

          {/* PASSWORD SETTINGS */}
          <div className="bg-white dark:bg-slate-950 rounded-3xl p-8 shadow-sm border border-[#eadccf] dark:border-slate-700">

            <div className="flex items-center gap-3 mb-8">

              <div className="bg-red-100 text-red-600 p-3 rounded-2xl">
                <Lock size={22} />
              </div>

              <h2 className="text-2xl font-bold text-[#241423] dark:text-white">
                Change Password
              </h2>

            </div>

            <div className="space-y-6">

              {/* CURRENT PASSWORD */}
              <div>
                <label className="block text-[#6d5b53] dark:text-slate-300 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-[#eadccf] dark:border-slate-700 dark:bg-slate-950 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#f3c8bb]/60"
                />
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-[#6d5b53] dark:text-slate-300 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-[#eadccf] dark:border-slate-700 dark:bg-slate-950 dark:text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#f3c8bb]/60"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handlePasswordChange}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl transition-all"
              >
                <Lock size={20} />
                Update Password
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;

