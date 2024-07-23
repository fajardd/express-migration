const { User, Role } = require("../../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login user untuk mendapatkan token (khusus admin)
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, attributes: ["role_name"] }],
    });

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

    if (user.Role.role_name !== "Admin") {
      return res
        .status(403)
        .json({ message: "Access denied you are not admin!" });
    }

    // Membuat payload dengan role
    const payload = {
      id: user.id,
      email: user.email,
      role: user.Role.role_name,
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

    console.log("Input password:", password);
    console.log("Stored hashed password:", user.password);

    // Gunakan bcrypt.compare untuk membandingkan password yang dimasukkan dengan hash yang disimpan
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match status:", isMatch); // Log hasil perbandingan

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Wrong password." });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
