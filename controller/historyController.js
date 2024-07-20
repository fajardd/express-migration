const { History, User } = require("../models");

// Mendapatkan daftar semua history
exports.getAllHistory = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const histories = await History.findAndCountAll({
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "riwayat"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedHistories = histories.rows.map((history) => ({
      id_history: history.id,
      tanggal: history.tanggal,
      riwayat: history.riwayat,
      nama: {
        id_user: history.User.id,
        nama: history.User.nama,
      },
    }));

    res.status(200).json({
      data: formattedHistories,
      totalItems: histories.count,
      totalPages: Math.ceil(histories.count / limit),
      currentPage: page,
      message: "Get all histories success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// membuat history riwayat baru
exports.createHistory = async (req, res) => {
  try {
    const { tanggal, riwayat, id_user } = req.body;
    const history = await History.create({ tanggal, riwayat, id_user });
    const createdHistory = await History.findByPk(history.id, {
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "riwayat"],
    });

    const formattedHistories = {
      data: {
        id_history: createdHistory.id,
        tanggal: createdHistory.tanggal,
        user: {
          id_user: createdHistory.User.id,
          nama: createdHistory.User.nama,
        },
      },
      message: "History created successfully",
      status: "1",
    };
    res.status(201).json(formattedHistories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getHistoryByIdUser = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const histories = await History.findAll({
      where: { id_user: id_user },
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "riwayat"],
    });

    if (histories.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this user" });
    }

    const formattedHistories = histories.map((history) => ({
      id_history: history.id,
      tanggal: history.tanggal,
      riwayat: history.riwayat,
      user: {
        id_user: history.User.id,
        nama: history.User.nama,
      },
    }));

    res.status(200).json({
      data: formattedHistories,
      message: "Get history by user ID success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
