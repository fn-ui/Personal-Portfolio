import { Link } from "react-router-dom";
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Portfolio Websites",
  "Frontend Development",
  "Admin Experiences",
  "Mobile-First Polish",
];

function Footer() {
  return (
    <footer className="bg-[linear-gradient(180deg,#241423_0%,#180d18_100%)] px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 rounded-[1.75rem] border border-white/10 bg-[#fff8ef] p-6 text-[#241423] shadow-2xl shadow-black/20 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#c65f4a]">
                Available for selected projects
              </p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Ready to shape your next web experience?
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#c65f4a] px-5 py-3 font-semibold text-white hover:bg-[#ad503e]"
            >
              Start a Project
              <FaArrowRight />
            </a>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold">Faith Njeri</h2>
            <p className="mt-4 max-w-sm leading-7 text-[#d7c7ba]">
              Full-stack developer creating warm, polished, and manageable web
              experiences with React, Tailwind CSS, Node.js, and MongoDB.
            </p>
            <div className="mt-5 flex gap-3">
              <Social href="https://github.com/fn-ui" label="GitHub" icon={FaGithub} />
              <Social href="https://linkedin.com" label="LinkedIn" icon={FaLinkedin} />
              <Social href="mailto:fn0740839@gmail.com" label="Email" icon={FaEnvelope} />
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Navigation</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/resume.pdf" className="footer-link">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Services</h3>
            <ul className="mt-4 space-y-3 text-[#d7c7ba]">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact</h3>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="text-[#9f8d82]">Email</p>
                <a href="mailto:fn0740839@gmail.com" className="footer-link">
                  fn0740839@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[#9f8d82]">Phone</p>
                <a href="tel:+254796880912" className="footer-link">
                  +254 796 880 912
                </a>
              </div>
              <Link to="/admin/login" className="footer-link inline-block">
                Admin Login
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-[#9f8d82]">
          © {new Date().getFullYear()} Faith Njeri. Built with React and Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[#d7c7ba] transition hover:border-[#f4a391] hover:text-[#f4a391]"
    >
      <Icon />
    </a>
  );
}

export default Footer;
