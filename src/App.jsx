import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Myskills"
import Services from "./components/Services";
import Projects from "./components/Projects"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"


function App() {
  return (
    <>
      <ScrollProgressBar />
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
  )
}

export default App