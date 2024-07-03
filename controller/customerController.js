const { User, Role } = require("../models");

// get Customers
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
