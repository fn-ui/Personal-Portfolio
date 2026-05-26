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

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProjects from "./pages/admin/Projects";



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
        <Route path="/" element={<HomePage />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;