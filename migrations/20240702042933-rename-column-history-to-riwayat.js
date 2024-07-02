"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Histories", "history", "riwayat");
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Histories", "riwayat", "history");
  },
};
