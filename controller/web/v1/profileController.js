const { User, Role, History } = require("../../../models");
const moment = require("moment");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Role,
        attributes: ["id", "role_name"],
      },
      attributes: ["id", "nama", "username", "email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedUser = {
      id_user: user.id,
      nama: user.nama,
      role: {
        id_role: user.Role.id,
        role_name: user.Role.role_name,
      },
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      data: formattedUser,
      message: "Get profile success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET HISTORY PROFILE
exports.getHistoryProfile = async (req, res) => {
  try {
    const histories = await History.findAll({
      where: { id_user: req.user.id },
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "pelayanan", "keterangan"],
    });

    if (histories.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this user" });
    }

    const formattedHistories = histories.map((history) => {
      let formattedDate;
      if (history.tanggal) {
        formattedDate = moment(history.tanggal).format("DD-MM-YYYY");
        if (formattedDate === "Invalid date") {
          formattedDate = null;
        }
      } else {
        formattedDate = null;
      }

      return {
        id_history: history.id,
        tanggal: formattedDate,
        pelayanan: history.pelayanan,
        keterangan: history.keterangan,
        // user: {
        //   id_user: history.User.id,
        //   nama: history.User.nama,
        // },
      };
    });

    res.status(200).json({
      data: formattedHistories,
      message: "Get history by user ID success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update profile
exports.updateProfile = async (req, res) => {
  try {
    const { nama, username, email } = req.body;

    const existingCustomer = await User.findOne({ where: { username, email } });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Username or email already in use" });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    user.nama = nama;
    user.username = username;
    user.email = email;
    await user.save();

    const updatedUser = await User.findByPk(user.id, {
      attributes: ["id", "nama", "username", "email"],
    });

    const formattedUser = {
      data: {
        id_profile: updatedUser.id,
        nama: updatedUser.nama,
        username: updatedUser.username,
        email: updatedUser.email,
      },
      message: "Profile updated successfully",
      status: "1",
    };

    res.json(formattedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
