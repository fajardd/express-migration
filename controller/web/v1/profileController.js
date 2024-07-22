const { User, Role } = require("../../../models");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email"],
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
      username: user.username,
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

// update profile
exports.updateProfile = async (req, res) => {
  try {
    const { nama, username, email } = req.body;

    const existingCustomer = await User.findOne({ where: { username, email } });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    user.nama = nama;
    user.username = username;
    user.email = email;
    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      attributes: ["id", "nama", "username", "email"],
    });

    const formattedUser = {
      data: {
        id_profile: updatedUser.id,
        nama: updatedUser.nama,
        username: updatedUser.username,
        email: updatedUser.email,
      },
      message: "Profile updated successfully",
      status: "1",
    };

    res.json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
