const { Service } = require("../../../models");

// Mendapatkan daftar semua service
exports.getAllServices = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const services = await Service.findAndCountAll({
      attributes: ["id", "title", "description"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedServices = services.rows.map((service) => ({
      id_service: service.id,
      title: service.title,
      description: service.description,
    }));
    res.status(200).json({
      data: formattedServices,
      totalItems: services.count,
      totalPages: Math.ceil(services.count / limit),
      currentPage: page,
      message: "Get all services success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id, {
      attributes: ["id", "title", "description"],
    });

    if (!service) {
      return res.status(200).json({ message: "Service not found" });
    }

    const formattedService = {
      id_service: service.id,
      title: service.title,
      description: service.description,
    };

    res.status(200).json({
      data: formattedService,
      message: "Get service by id success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Membuat service baru
exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const services = await Service.create({ title, description });

    const createdService = await Service.findByPk(services.id, {
      attributes: ["id", "title", "description"],
    });

    const formattedService = {
      data: {
        id_service: createdService.id,
        title: createdService.title,
        description: createdService.description,
      },
      message: "Service created successfully",
      status: "1",
    };
    res.status(201).json(formattedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Memperbarui service berdasarkan ID
exports.updateService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const services = await Service.findByPk(req.params.id);

    if (!services) {
      return res.status(404).json({ message: "Services not found" });
    }

    services.title = title;
    services.description = description;
    await services.save();

    const updatedService = await Service.findByPk(services.id, {
      attributes: ["id", "title", "description"],
    });

    const formattedService = {
      data: {
        id_service: updatedService.id,
        title: updatedService.title,
        description: updatedService.description,
      },
      message: "Service updated successfully",
      status: "1",
    };

    res.json(formattedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Menghapus service berdasarkan ID
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res
      .status(200)
      .json({ message: "Service deleted successfully", status: "1" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
