import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Code2,
  LayoutDashboard,
  Palette,
  Smartphone,
} from "lucide-react";
import API from "../api/axios";

const iconMap = {
  Palette,
  Code2,
  LayoutDashboard,
  Smartphone,
};

const fallbackServices = [
  {
    icon: "Palette",
    title: "Portfolio & Brand Websites",
    desc: "Elegant public websites that communicate clearly and make a strong first impression.",
    detail: "Clear story, polished pages, and confident presentation.",
  },
  {
    icon: "Code2",
    title: "Frontend Development",
    desc: "Responsive React interfaces with polished spacing, forms, navigation, and interaction states.",
    detail: "Readable components, clean states, and smooth user flows.",
  },
  {
    icon: "LayoutDashboard",
    title: "Admin Experiences",
    desc: "Dashboards and content workflows for managing projects, messages, testimonials, and updates.",
    detail: "Practical tools for managing content behind the scenes.",
  },
  {
    icon: "Smartphone",
    title: "Mobile-First Polish",
    desc: "Layouts that stay readable, stable, and easy to use across phone, tablet, and desktop.",
    detail: "Responsive details checked before the page goes live.",
  },
];

const supportPoints = [
  "Clean handoff",
  "Responsive layouts",
  "Maintainable structure",
];

function Services() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get("/services");
        const nextServices = res.data?.data || res.data || [];

        if (nextServices.length) {
          setServices(nextServices);
        }
      } catch {
        setServices(fallbackServices);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="section-shell bg-[#fff8ef] px-6 py-24 text-[#241423] dark:bg-slate-900 dark:text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="inline-flex rounded-md bg-[#fbe3dc] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#c65f4a]">
              Services
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-normal text-[#241423] dark:text-white md:text-5xl">
              Focused support for people who need a polished web presence.
            </h2>
          </div>
          <div className="rounded-xl border border-[#eadccf] bg-[#fffaf3]/80 p-5 shadow-sm shadow-[#7a2e53]/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
            <p className="text-base leading-7 text-[#6d5b53] dark:text-slate-400">
              From public pages to behind-the-scenes admin tools, I build the
              pieces that help a digital product feel complete.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Palette;

            return (
              <motion.article
                key={service._id || service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-2xl border border-[#eadccf] bg-white p-6 shadow-sm shadow-[#7a2e53]/5 transition hover:-translate-y-1 hover:border-[#ddbcae] hover:shadow-2xl hover:shadow-[#7a2e53]/12 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c65f4a] via-[#f0b29d] to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="mb-7 flex items-center justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#fbe3dc] text-[#c65f4a]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#c65f4a]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold leading-snug text-[#241423] dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-4 leading-7 text-[#6d5b53] dark:text-slate-400">
                  {service.desc}
                </p>
                <p className="mt-4 rounded-lg bg-[#fff8ef] px-4 py-3 text-sm font-semibold leading-6 text-[#7c6a61] dark:bg-slate-900 dark:text-slate-300">
                  {service.detail}
                </p>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-[#7a2e53] transition hover:text-[#c65f4a] dark:text-[#f4a391]"
                >
                  Discuss this
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 rounded-2xl border border-[#eadccf] bg-[#fffaf3]/80 p-4 shadow-sm shadow-[#7a2e53]/5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 sm:grid-cols-3">
          {supportPoints.map((point) => (
            <div
              key={point}
              className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#5f4d55] dark:bg-slate-900 dark:text-slate-200"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[#c65f4a]" />
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
