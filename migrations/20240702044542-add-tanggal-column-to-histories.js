"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Histories", "tanggal", {
      type: Sequelize.DATE,
      allowNull: true,
      after: "id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Histories", "tanggal");
  },
};
