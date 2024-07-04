const { User, Role } = require("../models");

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
