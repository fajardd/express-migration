"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Histories", "pelayanan", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "tanggal",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Histories", "pelayanan");
  },
};
