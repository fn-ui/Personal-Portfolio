const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const token =
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user?.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }
  next();
};
