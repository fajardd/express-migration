"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "image", {
      type: Sequelize.STRING,
      allowNull: true,
      after: "password",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "image");
  },
};
