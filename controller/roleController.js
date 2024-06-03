const { Role } = require("../models");

// Mendapatkan daftar semua role
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ["id", "role_name"],
    });

    const formattedRoles = roles.map((role) => ({
      id_role: role.id,
      role_name: role.role_name,
    }));
    res.status(200).json({
      data: formattedRoles,
      message: "Get all roles success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Mendapatkan role berdasarkan id
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      attributes: ["id", "role_name"],
    });

    if (!role) {
      return res.status(200).json({ message: "Role not found" });
    }

    const formattedRole = {
      id_role: role.id,
      role_name: role.role_name,
    };

    res.status(200).json({
      data: formattedRole,
      message: "Get role by id success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat role baru
exports.createRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    const role = await Role.create({ role_name });

    const createdRole = await Role.findByPk(role.id, {
      attributes: ["id", "role_name"],
    });

    const formattedRole = {
      data: {
        id_role: createdRole.id,
        name_role: createdRole.role_name,
      },
      message: "Role created successfully",
      status: "1",
    };
    res.status(201).json(formattedRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
