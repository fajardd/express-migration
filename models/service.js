"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Service extends Model {
    static associate(models) {}
  }

  Service.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );

  return Service;
};
