const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path as needed
require("dotenv").config(); // Ensure this is at the top of your file

const authenticateToken = async (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting Bearer token

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById(decodedToken.id); // Ensure your User model and field names are correct

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user to the request object
    req.user = user;
    console.log("User:", user);

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(403).json({ error: "Forbidden" });
  }
};

module.exports = {
  authenticateToken,
};
