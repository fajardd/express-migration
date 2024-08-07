const { Schedule, User } = require("../../../models");
const moment = require("moment");

exports.getAllSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: {
        model: User,
        attributes: ["id", "nama"],
        through: { attributes: [] },
      },
      attributes: ["id", "tanggal", "day"],
    });

    const formattedSchedules = schedules.map((schedule) => ({
      id_schedule: schedule.id,
      tanggal: moment(schedule.tanggal).format("DD-MM-YYYY"),
      day: schedule.day,
      users: schedule.Users.map((user) => ({
        id_user: user.id,
        nama: user.nama,
      })),
    }));

    const dayOrder = [
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
      "Minggu",
    ];

    formattedSchedules.sort((a, b) => {
      return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    });

    res.status(200).json({
      data: formattedSchedules,
      message: "Get all schedule success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan pengguna berdasarkan ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "tanggal", "day"],
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Check if schedule.Users is defined and not empty
    const users = schedule.Users || [];
    const formattedSchedule = {
      id_schedule: schedule.id,
      tanggal: moment(schedule.tanggal, "YYYY-MM-DD").format("DD-MM-YYYY"),
      day: schedule.day,
      users: users.map((user) => ({
        id_user: user.id,
        nama: user.nama,
      })),
    };

    res.status(200).json({
      data: formattedSchedule,
      message: "Get schedule by ID success",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const { tanggal, day, id_user } = req.body;
    const formatTanggal = moment(tanggal, "DD-MM-YYYY").toDate();

    // Buat schedule baru
    const schedule = await Schedule.create({ tanggal: formatTanggal, day });

    // Tambahkan users ke schedule
    if (Array.isArray(id_user)) {
      if (id_user.length > 0) {
        const users = await User.findAll({
          where: {
            id: id_user,
          },
        });
        await schedule.addUsers(users);
      }
    } else {
      // Handle single user id
      const user = await User.findByPk(id_user);
      if (user) {
        await schedule.addUser(user);
      }
    }

    // Temukan schedule yang baru dibuat beserta pengguna yang terkait
    const createdSchedule = await Schedule.findByPk(schedule.id, {
      include: {
        model: User,
        attributes: ["id", "nama"],
      },
      attributes: ["id", "day", "tanggal"],
    });

    const formattedSchedule = {
      id_schedule: createdSchedule.id,
      day: createdSchedule.day,
      tanggal: moment(createdSchedule.tanggal).format("DD-MM-YYYY"),
      users: createdSchedule.Users.map((user) => user.id),
    };

    res.status(201).json({
      data: formattedSchedule,
      message: "Schedule created successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { tanggal, id_user } = req.body;

    // Temukan schedule berdasarkan ID
    const schedule = await Schedule.findByPk(id, {
      include: {
        model: User,
        attributes: ["id", "nama"],
        through: { attributes: [] },
      },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Perbarui atribut schedule
    schedule.tanggal = tanggal || schedule.tanggal;
    await schedule.save();

    // Jika id_user diberikan, perbarui pengguna terkait
    if (Array.isArray(id_user)) {
      const users = await User.findAll({
        where: {
          id: id_user,
        },
      });
      await schedule.setUsers(users); // Set users, replacing old ones
    }

    // Temukan schedule yang baru diperbarui beserta pengguna yang terkait
    const updatedSchedule = await Schedule.findByPk(schedule.id, {
      include: {
        model: User,
        attributes: ["id", "nama"],
        through: { attributes: [] },
      },
      attributes: ["id", "tanggal"],
    });

    const formattedSchedule = {
      id_schedule: updatedSchedule.id,
      tanggal: updatedSchedule.tanggal,
      users: updatedSchedule.Users.map((user) => user.id),
    };

    res.status(200).json({
      data: formattedSchedule,
      message: "Schedule updated successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Temukan jadwal berdasarkan ID
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    // Hapus jadwal
    await schedule.destroy();

    res.status(200).json({
      message: "Schedule deleted successfully",
      status: "1",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
