const { User, Role } = require("../../../models");

// Mendapatkan daftar semua pengguna dan peran mereka
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedUsers = users.rows.map((user) => ({
      id_user: user.id,
      nama: user.nama,
      role: {
        id_role: user.Role.id,
        role_name: user.Role.role_name,
      },
      username: user.username,
      email: user.email,
    }));

    res.status(200).json({
      data: formattedUsers,
      totalItems: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: page,
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
      attributes: ["id", "nama", "username", "email", "password"],
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
      password: user.password,
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
    const { nama, id_role, username, email, password } = req.body;

    const existingUser = await User.findOne({ where: { username, email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username and email already in use" });
    }

    const user = await User.create({
      nama,
      id_role,
      username,
      email,
      password,
    });

    const createdUser = await User.findByPk(user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email", "password"],
    });

    const formattedUser = {
      data: {
        id_user: createdUser.id,
        nama: createdUser.nama,
        role: {
          id_role: createdUser.Role.id,
          role_name: createdUser.Role.role_name,
        },
        username: createdUser.username,
        email: createdUser.email,
        password: createdUser.password,
      },
      message: "User created successfully",
      status: "1",
    };

    res.status(201).json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui pengguna berdasarkan ID
exports.updateUser = async (req, res) => {
  try {
    const { nama, id_role, username, email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username !== customer.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already in use" });
      }
    }

    if (email !== customer.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    user.nama = nama;
    user.id_role = id_role;
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email", "password"],
    });

    const formattedUser = {
      data: {
        id_user: updatedUser.id,
        nama: updatedUser.nama,
        role: {
          id_role: updatedUser.Role.id,
          role_name: updatedUser.Role.role_name,
        },
        username: updatedUser.username,
        email: updatedUser.email,
        password: updatedUser.password,
      },
      message: "User updated successfully",
      status: "1",
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
    res.status(200).json({ message: "User deleted successfully", status: "1" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
