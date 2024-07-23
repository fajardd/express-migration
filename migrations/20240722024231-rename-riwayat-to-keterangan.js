"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Histories", "riwayat", "keterangan");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Histories", "keterangan", "riwayat");
  },
};
