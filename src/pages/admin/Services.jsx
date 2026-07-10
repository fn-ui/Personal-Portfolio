import { LayoutDashboard } from "lucide-react";
import ContentManager from "./ContentManager";

const defaultServices = [
  {
    title: "Portfolio & Brand Websites",
    icon: "Palette",
    desc: "Elegant public websites that communicate clearly and make a strong first impression.",
    detail: "Clear story, polished pages, and confident presentation.",
    order: 1,
  },
  {
    title: "Frontend Development",
    icon: "Code2",
    desc: "Responsive React interfaces with polished spacing, forms, navigation, and interaction states.",
    detail: "Readable components, clean states, and smooth user flows.",
    order: 2,
  },
  {
    title: "Admin Experiences",
    icon: "LayoutDashboard",
    desc: "Dashboards and content workflows for managing projects, messages, testimonials, and updates.",
    detail: "Practical tools for managing content behind the scenes.",
    order: 3,
  },
  {
    title: "Mobile-First Polish",
    icon: "Smartphone",
    desc: "Layouts that stay readable, stable, and easy to use across phone, tablet, and desktop.",
    detail: "Responsive details checked before the page goes live.",
    order: 4,
  },
];

function AdminServices() {
  return (
    <ContentManager
      endpoint="/services"
      eyebrow="Portfolio Services"
      title="Manage the services shown on your public portfolio."
      description="Create, edit, reorder, and refine the service cards visitors see on the public homepage."
      itemLabel="Service"
      icon={LayoutDashboard}
      defaultItems={defaultServices}
      fields={[
        {
          name: "title",
          label: "Service Title",
          placeholder: "Portfolio & Brand Websites",
          required: true,
        },
        {
          name: "icon",
          label: "Icon",
          placeholder: "Palette, Code2, LayoutDashboard, Smartphone",
          defaultValue: "Palette",
        },
        {
          name: "desc",
          label: "Description",
          placeholder: "Describe what this service helps with...",
          required: true,
          multiline: true,
        },
        {
          name: "detail",
          label: "Supporting Detail",
          placeholder: "Short supporting note shown inside the card",
          multiline: true,
          rows: 3,
        },
        {
          name: "order",
          label: "Display Order",
          type: "number",
          defaultValue: "0",
        },
      ]}
    />
  );
}

export default AdminServices;
