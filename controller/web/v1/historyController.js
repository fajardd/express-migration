const { History, User } = require("../../../models");
const moment = require("moment");

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
      attributes: ["id", "tanggal", "pelayanan", "keterangan"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const formattedHistories = histories.rows.map((history) => {
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
        user: {
          id_user: history.User.id,
          nama: history.User.nama,
        },
      };
    });

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
    const { tanggal, pelayanan, keterangan, id_user } = req.body;
    const formatTanggal = moment(tanggal, "DD-MM-YYYY").toDate();
    if (!formatTanggal || isNaN(formatTanggal.getTime())) {
      throw new Error("Invalid date format");
    }
    const history = await History.create({
      tanggal: formatTanggal,
      pelayanan,
      keterangan,
      id_user,
    });
    const createdHistory = await History.findByPk(history.id, {
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "pelayanan", "keterangan"],
    });

    const formattedHistories = {
      data: {
        id_history: createdHistory.id,
        tanggal: moment(createdHistory.tanggal).format("DD-MM-YYYY"),
        pelayanan: createdHistory.pelayanan,
        keterangan: createdHistory.keterangan,
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
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
    const id_user = req.params.id_user;
    const histories = await History.findAndCountAll({
      where: { id_user: id_user },
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "pelayanan", "keterangan"],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    if (histories.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this user" });
    }

    const formattedHistories = histories.rows.map((history) => ({
      id_history: history.id,
      tanggal: moment(history.tanggal).format("DD-MM-YYYY"),
      pelayanan: history.pelayanan,
      keterangan: history.keterangan,
      user: {
        id_user: history.User.id,
        nama: history.User.nama,
      },
    }));

    res.status(200).json({
      data: formattedHistories,
      totalItems: histories.count,
      totalPages: Math.ceil(histories.count / limit),
      currentPage: page,
      message: "Get history by user ID success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete history
exports.deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await History.findByPk(id);

    if (!history) {
      return res.status(404).json({ message: "History not found" });
    }

    await history.destroy();

    res.status(200).json({
      message: "History deleted successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
