// Formatting utilities
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

export const truncate = (str, length = 50) => {
  if (!str) return "";
  return str.length > length
    ? str.substring(0, length) + "..."
    : str;
};

export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const formatStatus = (status) => {
  const statusMap = {
    New: { label: "New", color: "bg-blue-100 text-blue-800" },
    Replied: {
      label: "Replied",
      color: "bg-green-100 text-green-800",
    },
    Closed: {
      label: "Closed",
      color: "bg-gray-100 text-gray-800",
    },
  };

  return statusMap[status] || statusMap.New;
};
