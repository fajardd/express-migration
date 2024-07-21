const { User, Role } = require("../../../models");

// get dokter
exports.getVeterinarians = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const veterinarianRole = await Role.findOne({
      where: { role_name: "Veterinarian" },
    });

    if (!veterinarianRole) {
      return res
        .status(404)
        .json({ message: "Role veterinarian tidak ditemukan" });
    }

    const veterinarians = await User.findAndCountAll({
      where: { id_role: veterinarianRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedVeterinarians = veterinarians.rows.map((veterinarian) => ({
      id_user: veterinarian.id,
      nama: veterinarian.nama,
      role: {
        id_role: veterinarian.Role.id,
        role_name: veterinarian.Role.role_name,
      },
      no_telp: veterinarian.no_telp,
      email: veterinarian.email,
    }));

    res.status(200).json({
      data: formattedVeterinarians,
      totalItems: veterinarians.count,
      totalPages: Math.ceil(veterinarians.count / limit),
      currentPage: page,
      message: "Get all veterinarian success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get detail of a veterinarian
exports.getVeterinarianDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const veterinarian = await User.findByPk(id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email"],
    });

    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    const formattedVeterinarian = {
      id_user: veterinarian.id,
      nama: veterinarian.nama,
      role: {
        id_role: veterinarian.Role.id,
        role_name: veterinarian.Role.role_name,
      },
      no_telp: veterinarian.no_telp,
      email: veterinarian.email,
    };

    res.status(200).json({
      data: formattedVeterinarian,
      message: "Get veterinarian detail success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create veterinarian
exports.createVeterinarian = async (req, res) => {
  try {
    const { nama, id_role, no_telp, email, password } = req.body;

    const existingVeterinarian = await User.findOne({ where: { email } });
    if (existingVeterinarian) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const veterinarian = await User.create({
      nama,
      id_role,
      no_telp,
      email,
      password,
    });

    const createdVeterinarian = await User.findByPk(veterinarian.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email", "password"],
    });

    const formattedVeterinarian = {
      data: {
        id_user: createdVeterinarian.id,
        nama: createdVeterinarian.nama,
        role: {
          id_role: createdVeterinarian.Role.id,
          role_name: createdVeterinarian.Role.role_name,
        },
        no_telp: createdVeterinarian.no_telp,
        email: createdVeterinarian.email,
        password: createdVeterinarian.password,
      },
      message: "Veterinarian created successfully",
      status: "1",
    };

    res.status(201).json(formattedVeterinarian);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update veterinarian
exports.updateVeterinarian = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, no_telp, email } = req.body;

    const veterinarian = await User.findByPk(id);

    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    veterinarian.nama = nama || veterinarian.nama;
    veterinarian.no_telp = no_telp || veterinarian.no_telp;
    veterinarian.email = email || veterinarian.email;
    await veterinarian.save();

    const updatedVeterinarian = await User.findByPk(veterinarian.id, {
      attributes: ["id", "nama", "no_telp", "email"],
    });

    const formattedVeterinarian = {
      id_user: updatedVeterinarian.id,
      nama: updatedVeterinarian.nama,
      no_telp: updatedVeterinarian.no_telp,
      email: updatedVeterinarian.email,
    };

    res.status(200).json({
      data: formattedVeterinarian,
      message: "Veterinarian updated successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete veterinarian
exports.deleteVeterinarian = async (req, res) => {
  try {
    const { id } = req.params;

    const veterinarian = await User.findByPk(id);

    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    await veterinarian.destroy();

    res.status(200).json({
      message: "Veterinarian deleted successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
