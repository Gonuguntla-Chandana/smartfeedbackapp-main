const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not admin" });
    }
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
