const { User, Role } = require("../models");

// Mendapatkan daftar semua pengguna dan peran mereka
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama"],
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      nama: user.nama,
      role: {
        id: user.Role.id,
        role_name: user.Role.role_name,
      },
    }));

    res.status(200).json({
      data: formattedUsers,
      message: "Get all users success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedUser = {
      id: user.id,
      nama: user.nama,
      role: {
        id: user.Role.id,
        role_name: user.Role.role_name,
      },
    };

    res.status(200).json({
      data: formattedUser,
      message: "Get user by ID success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat pengguna baru
exports.createUser = async (req, res) => {
  try {
    const { nama, roleId } = req.body;
    const user = await User.create({ nama, roleId });

    const createdUser = await User.findByPk(user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama"],
    });

    const formattedUser = {
      data: {
        id: createdUser.id,
        nama: createdUser.nama,
        Role: {
          id: createdUser.Role.id,
          role_name: createdUser.Role.role_name,
        },
      },
      message: "User created successfully",
    };

    res.status(201).json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui pengguna berdasarkan ID
exports.updateUser = async (req, res) => {
  try {
    const { nama, roleId } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.nama = nama;
    user.roleId = roleId;
    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama"],
    });

    const formattedUser = {
      data: {
        id: updatedUser.id,
        nama: updatedUser.nama,
        Role: {
          id: updatedUser.Role.id,
          role_name: updatedUser.Role.role_name,
        },
      },
      message: "User updated successfully",
    };

    res.json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus pengguna berdasarkan ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
