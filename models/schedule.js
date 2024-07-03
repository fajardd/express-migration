"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsToMany(models.User, {
        through: "ScheduleUsers",
        foreignKey: "scheduleId",
      });
    }
  }

  Schedule.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      day: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
