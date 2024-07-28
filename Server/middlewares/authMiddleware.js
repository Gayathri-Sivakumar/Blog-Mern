const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    // req.isAdmin = user.role === "admin";
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ error: "Forbidden" });
  }
};

// const isAdmin = (req, res, next) => {
//   if (!req.isAdmin) {
//     return res.status(403).json({ error: "Access denied. Admins only." });
//   }
//   next();
// };

module.exports = {
  authenticateToken,
  // isAdmin,
};
