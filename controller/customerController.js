const { User, Role } = require("../models");

// get Customers
exports.getCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const customerRole = await Role.findOne({
      where: { role_name: "Customer" },
    });

    if (!customerRole) {
      return res.status(404).json({ message: "Role customer tidak ditemukan" });
    }

    const customers = await User.findAndCountAll({
      where: { id_role: customerRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedCustomers = customers.rows.map((customer) => ({
      id_user: customer.id,
      nama: customer.nama,
      role: {
        id_role: customer.Role.id,
        role_name: customer.Role.role_name,
      },
      no_telp: customer.no_telp,
      email: customer.email,
    }));

    res.status(200).json({
      data: formattedCustomers,
      totalItems: customers.count,
      totalPages: Math.ceil(customers.count / limit),
      currentPage: page,
      message: "Get all customer success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get detail of a customers
exports.getCustomerDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await User.findByPk(id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email"],
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const formattedCustomer = {
      id_user: customer.id,
      nama: customer.nama,
      role: {
        id_role: customer.Role.id,
        role_name: customer.Role.role_name,
      },
      no_telp: customer.no_telp,
      email: customer.email,
    };

    res.status(200).json({
      data: formattedCustomer,
      message: "Get customer detail success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create customer
exports.createCustomer = async (req, res) => {
  try {
    const { nama, id_role, no_telp, email, password } = req.body;

    const existingCustomer = await User.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const customer = await User.create({
      nama,
      id_role,
      no_telp,
      email,
      password,
    });

    const createdCustomer = await User.findByPk(customer.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "no_telp", "email", "password"],
    });

    const formattedCustomer = {
      data: {
        id_user: createdCustomer.id,
        nama: createdCustomer.nama,
        role: {
          id_role: createdCustomer.Role.id,
          role_name: createdCustomer.Role.role_name,
        },
        no_telp: createdCustomer.no_telp,
        email: createdCustomer.email,
        password: createdCustomer.password,
      },
      message: "Customer created successfully",
      status: "1",
    };

    res.status(201).json(formattedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, no_telp, email } = req.body;

    const customer = await User.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.nama = nama || customer.nama;
    customer.no_telp = no_telp || customer.no_telp;
    customer.email = email || customer.email;
    await customer.save();

    const updatedCustomer = await User.findByPk(customer.id, {
      attributes: ["id", "nama", "no_telp", "email"],
    });

    const formattedCustomer = {
      id_user: updatedCustomer.id,
      nama: updatedCustomer.nama,
      no_telp: updatedCustomer.no_telp,
      email: updatedCustomer.email,
    };

    res.status(200).json({
      data: formattedCustomer,
      message: "Customer updated successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete veterinarian
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await User.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.destroy();

    res.status(200).json({
      message: "Customer deleted successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
