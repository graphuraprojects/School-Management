// middleware/adminAuth.js
module.exports = function (req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    // user is admin — continue
    next();
  } catch (err) {
    console.error("adminAuth error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
