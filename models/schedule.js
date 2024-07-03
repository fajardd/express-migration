"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Schedule extends Model {
    static associate(models) {
      Schedule.belongsTo(models.User, { foreignKey: "id_user" });
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
      id_user: {
        type: DataTypes.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );

  return Schedule;
};
