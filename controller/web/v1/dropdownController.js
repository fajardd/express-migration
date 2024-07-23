const { User, Role, Service } = require("../../../models");

// get dokter
exports.getDokterList = async (req, res) => {
  try {
    const veterinarianRole = await Role.findOne({
      where: { role_name: "Dokter" },
    });

    if (!veterinarianRole) {
      return res.status(404).json({ message: "Role Dokter tidak ditemukan" });
    }

    const veterinarians = await User.findAll({
      where: { id_role: veterinarianRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email"],
    });

    const formattedVeterinarians = veterinarians.map((veterinarian) => ({
      id_user: veterinarian.id,
      nama_dokter: veterinarian.nama,
      //   role: {
      //     id_role: veterinarian.Role.id,
      //     role_name: veterinarian.Role.role_name,
      //   },
      //   username: veterinarian.username,
      //   email: veterinarian.email,
    }));

    res.status(200).json({
      data: formattedVeterinarians,
      message: "Get dropdown dokter success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get service
exports.getServiceList = async (req, res) => {
  try {
    const services = await Service.findAll({
      attributes: ["id", "title"],
    });

    const formattedServices = services.map((service) => ({
      id_service: service.id,
      nama_service: service.title,
    }));
    res.status(200).json({
      data: formattedServices,
      message: "Get dropdown service success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
