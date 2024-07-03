const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// login user to get token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    }

    // Membuat payload tanpa nama
    const payload = {
      id: user.id,
      email: user.email,
    };

    // Menghasilkan token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
