import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Myskills";
import Services from "./components/services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/chatbot";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProjects from "./pages/admin/Projects";
import Messages from "./pages/admin/Messages";
import AdminTestimonials from "./pages/admin/Testimonials";
import Settings from "./pages/admin/Settings";

function HomePage({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}

function App() {
  // ✅ FIX 1: proper initial theme loading (no flicker)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    // fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // ✅ FIX 2: single source of truth for DOM + storage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <ScrollProgressBar />

      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route
          path="/"
          element={
            <HomePage darkMode={darkMode} setDarkMode={setDarkMode} />
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<Messages />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;