import { Layers3 } from "lucide-react";
import ContentManager from "./ContentManager";

const defaultSkills = [
  {
    title: "Design to Interface",
    icon: "Layers3",
    description:
      "Turning page ideas into readable, responsive React interfaces with strong spacing, hierarchy, and interaction states.",
    items: "React, Tailwind CSS, JavaScript, Forms",
    order: 1,
  },
  {
    title: "Backend Workflows",
    icon: "Braces",
    description:
      "Building APIs, admin flows, authentication, message handling, and database-backed content management.",
    items: "Node.js, Express, MongoDB, JWT",
    order: 2,
  },
  {
    title: "Launch Ready",
    icon: "Rocket",
    description:
      "Preparing projects with clean code, validation, deployment settings, and a structure that is easier to maintain.",
    items: "Git, Vite, Vercel, ESLint",
    order: 3,
  },
];

function AdminSkills() {
  return (
    <ContentManager
      endpoint="/skills"
      eyebrow="Portfolio Skills"
      title="Manage the skill cards shown on your public portfolio."
      description="Add practical skill groups with chips such as React, Tailwind CSS, Node.js, and deployment tools."
      itemLabel="Skill"
      icon={Layers3}
      defaultItems={defaultSkills}
      fields={[
        {
          name: "title",
          label: "Skill Title",
          placeholder: "Design to Interface",
          required: true,
        },
        {
          name: "icon",
          label: "Icon",
          placeholder: "Layers3, Braces, Rocket",
          defaultValue: "Layers3",
        },
        {
          name: "description",
          label: "Description",
          placeholder: "Describe this skill group...",
          required: true,
          multiline: true,
        },
        {
          name: "items",
          label: "Skill Chips",
          placeholder: "React, Tailwind CSS, JavaScript, Forms",
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

export default AdminSkills;
