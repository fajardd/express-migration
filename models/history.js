"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, { foreignKey: "id_user" });
    }
  }
  History.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      tanggal: DataTypes.DATE,
      pelayanan: DataTypes.STRING,
      keterangan: DataTypes.STRING,
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
      modelName: "History",
    }
  );
  return History;
};
