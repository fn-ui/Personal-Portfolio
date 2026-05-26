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

function HomePage() {
  return (
    <>
      <Navbar />

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
  return (
    <BrowserRouter>

      <ScrollProgressBar />

      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* DEFAULT ADMIN PAGE */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* DASHBOARD */}
          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          {/* PROJECTS */}
          <Route
            path="projects"
            element={<AdminProjects />}
          />

          {/* MESSAGES */}
          <Route
            path="messages"
            element={<Messages />}
          />

          {/* TESTIMONIALS */}
          <Route
            path="testimonials"
            element={<AdminTestimonials />}
          />

          {/* SETTINGS */}
          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;