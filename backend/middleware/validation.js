// Validate project data
exports.validateProject = (req, res, next) => {
  const { title, description, techStack } =
    req.body;

  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push("Title must be at least 3 characters");
  }

  if (
    !description ||
    description.trim().length < 10
  ) {
    errors.push(
      "Description must be at least 10 characters"
    );
  }

  if (!techStack || techStack.trim().length === 0) {
    errors.push("Tech stack is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

exports.validateService = (req, res, next) => {
  const { title, desc } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push("Service title must be at least 3 characters");
  }

  if (!desc || desc.trim().length < 10) {
    errors.push("Service description must be at least 10 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

exports.validateSkill = (req, res, next) => {
  const { title, description } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push("Skill title must be at least 3 characters");
  }

  if (!description || description.trim().length < 10) {
    errors.push("Skill description must be at least 10 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Validate message data
exports.validateMessage = (req, res, next) => {
  const { name, email, message } = req.body;

  const errors = [];
  const trimmedMessage = message?.trim();

  if (!name || name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (name && name.trim().length > 80) {
    errors.push("Name must be less than 80 characters");
  }

  if (!email || !isValidEmail(email)) {
    errors.push("Valid email is required");
  }

  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  if (trimmedMessage && trimmedMessage.length > 1000) {
    errors.push("Message must be less than 1000 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Validate testimonial data
exports.validateTestimonial = (
  req,
  res,
  next
) => {
  const { name, message, role } = req.body;

  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push("Name is required");
  }

  if (
    !message ||
    message.trim().length < 10
  ) {
    errors.push(
      "Testimonial must be at least 10 characters"
    );
  }

  if (!role || role.trim().length === 0) {
    errors.push("Role is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Validation failed",
      errors,
    });
  }

  next();
};

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
