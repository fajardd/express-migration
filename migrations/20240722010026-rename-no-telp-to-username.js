"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "username", "username");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Users", "username", "username");
  },
};
