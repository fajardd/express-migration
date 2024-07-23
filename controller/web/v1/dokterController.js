const { User, Role } = require("../../../models");
const multer = require("multer");
const path = require("path");

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Middleware to handle image upload
exports.uploadImage = upload.single("image");

// Get all veterinarians
exports.getVeterinarians = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const veterinarianRole = await Role.findOne({
      where: { role_name: "Dokter" },
    });

    if (!veterinarianRole) {
      return res.status(404).json({ message: "Role Dokter tidak ditemukan" });
    }

    const veterinarians = await User.findAndCountAll({
      where: { id_role: veterinarianRole.id },
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email", "image"],
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
      username: veterinarian.username,
      email: veterinarian.email,
      image: veterinarian.image,
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

// Get detail of a specific veterinarian
exports.getVeterinarianDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const veterinarian = await User.findByPk(id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email", "image"],
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
      username: veterinarian.username,
      email: veterinarian.email,
      image: veterinarian.image,
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

// Create a new veterinarian
exports.createVeterinarian = [
  exports.uploadImage,
  async (req, res) => {
    try {
      const { nama, id_role, username, email, password } = req.body;
      const image = req.file ? req.file.filename : null;

      const existingVeterinarian = await User.findOne({
        where: { username, email },
      });
      if (existingVeterinarian) {
        return res
          .status(400)
          .json({ message: "Username and email already in use" });
      }

      const veterinarian = await User.create({
        nama,
        id_role,
        username,
        email,
        password,
        image,
      });

      const createdVeterinarian = await User.findByPk(veterinarian.id, {
        include: {
          model: Role,
          attributes: ["id", "role_name"],
        },
        attributes: ["id", "nama", "username", "email", "image"],
      });

      const formattedVeterinarian = {
        data: {
          id_user: createdVeterinarian.id,
          nama: createdVeterinarian.nama,
          role: {
            id_role: createdVeterinarian.Role.id,
            role_name: createdVeterinarian.Role.role_name,
          },
          username: createdVeterinarian.username,
          email: createdVeterinarian.email,
          image: createdVeterinarian.image,
        },
        message: "Veterinarian created successfully",
        status: "1",
      };

      res.status(201).json(formattedVeterinarian);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Update veterinarian details
exports.updateVeterinarian = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, username, email } = req.body;

    const veterinarian = await User.findByPk(id);

    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    if (username !== veterinarian.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already in use" });
      }
    }

    if (email !== veterinarian.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    veterinarian.nama = nama || veterinarian.nama;
    veterinarian.username = username || veterinarian.username;
    veterinarian.email = email || veterinarian.email;
    await veterinarian.save();

    const updatedVeterinarian = await User.findByPk(veterinarian.id, {
      attributes: ["id", "nama", "username", "email", "image"],
    });

    const formattedVeterinarian = {
      id_user: updatedVeterinarian.id,
      nama: updatedVeterinarian.nama,
      username: updatedVeterinarian.username,
      email: updatedVeterinarian.email,
      image: updatedVeterinarian.image,
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

// Delete a veterinarian
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
