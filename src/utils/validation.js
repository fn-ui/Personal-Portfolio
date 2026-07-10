// Frontend validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateProject = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!data.techStack || data.techStack.trim().length === 0) {
    errors.techStack = "Tech stack is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateMessage = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!validateEmail(data.email)) {
    errors.email = "Valid email is required";
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = "Message must be at least 5 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateTestimonial = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name is required";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Testimonial must be at least 10 characters";
  }

  if (!data.role || data.role.trim().length === 0) {
    errors.role = "Role is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
