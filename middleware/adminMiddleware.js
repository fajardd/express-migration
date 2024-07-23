const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      include: [{ model: Role, attributes: ["name"] }],
    });

    if (!user || user.Role.name !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have the required role." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
