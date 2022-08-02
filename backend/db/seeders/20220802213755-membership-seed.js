'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Memberships", [
      {
        status: 'co-host'
      },
      {
        status: 'member'
      },
      {
        status: 'pending'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Memberships")
  }
};
