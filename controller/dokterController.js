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
