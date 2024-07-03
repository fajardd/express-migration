const { User, Role } = require("../models");

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
