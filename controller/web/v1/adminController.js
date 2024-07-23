const { User, Role } = require("../../../models");

// get admin
exports.getAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const adminRole = await Role.findOne({
      where: { role_name: "Admin" },
    });

    if (!adminRole) {
      return res.status(404).json({ message: "Role admin tidak ditemukan" });
    }

    const admins = await User.findAndCountAll({
      where: { id_role: adminRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedAdmins = admins.rows.map((admin) => ({
      id_user: admin.id,
      nama: admin.nama,
      role: {
        id_role: admin.Role.id,
        role_name: admin.Role.role_name,
      },
      username: admin.username,
      email: admin.email,
    }));

    res.status(200).json({
      data: formattedAdmins,
      totalItems: admins.count,
      totalPages: Math.ceil(admins.count / limit),
      currentPage: page,
      message: "Get all admin success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get detail of a admin
exports.getAdminDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findByPk(id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email"],
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const formattedAdmin = {
      id_user: admin.id,
      nama: admin.nama,
      role: {
        id_role: admin.Role.id,
        role_name: admin.Role.role_name,
      },
      username: admin.username,
      email: admin.email,
    };

    res.status(200).json({
      data: formattedAdmin,
      message: "Get admin detail success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create admin
exports.createAdmin = async (req, res) => {
  try {
    const { nama, id_role, username, email, password } = req.body;

    const existingAdmin = await User.findOne({ where: { username, email } });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Username and email already in use" });
    }

    const admin = await User.create({
      nama,
      id_role,
      username,
      email,
      password,
    });

    const createdAdmin = await User.findByPk(admin.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email", "password"],
    });

    const formattedAdmin = {
      data: {
        id_user: createdAdmin.id,
        nama: createdAdmin.nama,
        role: {
          id_role: createdAdmin.Role.id,
          role_name: createdAdmin.Role.role_name,
        },
        username: createdAdmin.username,
        email: createdAdmin.email,
        password: createdAdmin.password,
      },
      message: "Admin created successfully",
      status: "1",
    };

    res.status(201).json(formattedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, username, email } = req.body;

    const admin = await User.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
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

    admin.nama = nama || admin.nama;
    admin.username = username || admin.username;
    admin.email = email || admin.email;
    await admin.save();

    const updatedAdmin = await User.findByPk(admin.id, {
      attributes: ["id", "nama", "username", "email"],
    });

    const formattedAdmin = {
      id_user: updatedAdmin.id,
      nama: updatedAdmin.nama,
      username: updatedAdmin.username,
      email: updatedAdmin.email,
    };

    res.status(200).json({
      data: formattedAdmin,
      message: "Admin updated successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    await admin.destroy();

    res.status(200).json({
      message: "Admin deleted successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
