// Global error handler middleware
exports.errorHandler = (err, req, res, _next) => {
  console.error("❌ Error:", err);

  // Mongoose validation error
  if (
    err.name === "ValidationError"
  ) {
    const messages = Object.values(err.errors).map(
      (e) => e.message
    );
    return res.status(400).json({
      message: "Validation failed",
      errors: messages,
    });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    message:
      err.message ||
      "Something went wrong",
  });
};

// Async error wrapper
exports.asyncHandler =
  (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(
      next
    );
  };
