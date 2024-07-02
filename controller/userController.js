const { User, Role } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Mendapatkan daftar semua pengguna dan peran mereka
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email"],
    });

    const formattedUsers = users.map((user) => ({
      id_user: user.id,
      nama: user.nama,
      role: {
        id_role: user.Role.id,
        role_name: user.Role.role_name,
      },
      no_telp: user.no_telp,
      email: user.email,
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
      attributes: ["id", "nama", "no_telp", "email", "password"],
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
    const { nama, id_role, no_telp, email, password } = req.body;
    const user = await User.create({ nama, id_role, no_telp, email, password });

    const createdUser = await User.findByPk(user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email", "password"],
    });

    const formattedUser = {
      data: {
        id_user: createdUser.id,
        nama: createdUser.nama,
        role: {
          id_role: createdUser.Role.id,
          role_name: createdUser.Role.role_name,
        },
        no_telp: createdUser.no_telp,
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
    const { nama, id_role, no_telp, email, password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.nama = nama;
    user.id_role = id_role;
    user.no_telp = no_telp;
    user.email = email;
    user.password = password;
    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email", "password"],
    });

    const formattedUser = {
      data: {
        id_user: updatedUser.id,
        nama: updatedUser.nama,
        role: {
          id_role: updatedUser.Role.id,
          role_name: updatedUser.Role.role_name,
        },
        no_telp: updatedUser.no_telp,
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

// get admin
exports.getAdmins = async (req, res) => {
  try {
    // Cari role dokter
    const adminRole = await Role.findOne({
      where: { role_name: "Admin" },
    });

    if (!adminRole) {
      return res.status(404).json({ message: "Role admin tidak ditemukan" });
    }

    // Cari pengguna dengan role dokter
    const admins = await User.findAll({
      where: { id_role: adminRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp"],
    });

    const formattedAdmins = admins.map((admin) => ({
      id_user: admin.id,
      nama: admin.nama,
      role: {
        id_role: admin.Role.id,
        role_name: admin.Role.role_name,
      },
      no_telp: admin.no_telp,
    }));

    res.status(200).json({
      data: formattedAdmins,
      message: "Get all admin success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get dokter
exports.getVeterinarians = async (req, res) => {
  try {
    // Cari role dokter
    const veterinarianRole = await Role.findOne({
      where: { role_name: "Veterinarian" },
    });

    if (!veterinarianRole) {
      return res
        .status(404)
        .json({ message: "Role veterinarian tidak ditemukan" });
    }

    // Cari pengguna dengan role dokter
    const veterinarians = await User.findAll({
      where: { id_role: veterinarianRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp"],
    });

    const formattedVeterinarians = veterinarians.map((veterinarian) => ({
      id_user: veterinarian.id,
      nama: veterinarian.nama,
      role: {
        id_role: veterinarian.Role.id,
        role_name: veterinarian.Role.role_name,
      },
      no_telp: veterinarian.no_telp,
    }));

    res.status(200).json({
      data: formattedVeterinarians,
      message: "Get all veterinarian success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get dokter
exports.getCustomers = async (req, res) => {
  try {
    // Cari role dokter
    const customerRole = await Role.findOne({
      where: { role_name: "Customer" },
    });

    if (!customerRole) {
      return res.status(404).json({ message: "Role customer tidak ditemukan" });
    }

    // Cari pengguna dengan role dokter
    const customers = await User.findAll({
      where: { id_role: customerRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp"],
    });

    const formattedCustomers = customers.map((customer) => ({
      id_user: customer.id,
      nama: customer.nama,
      role: {
        id_role: customer.Role.id,
        role_name: customer.Role.role_name,
      },
      no_telp: customer.no_telp,
    }));

    res.status(200).json({
      data: formattedCustomers,
      message: "Get all customer success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
