const { User, Role } = require("../models");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedUser = {
      id_user: user.id,
      nama: user.nama,
      role: {
        id_role: user.Role.id,
        role_name: user.Role.role_name,
      },
      no_telp: user.no_telp,
      email: user.email,
    };

    res.status(200).json({
      data: formattedUser,
      message: "Get profile success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
