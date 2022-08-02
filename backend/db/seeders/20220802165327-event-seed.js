'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: null,
        name: "Tennis Group First Meet and Greet",
        description: "First meet and greet event for the evening tennis on the water group! Join us online for happy times!",
        type: "Online",
        capacity: 10,
        price: 18.50,
        startDate: "2021-11-19 20:00:00",
        endDate: "2021-11-19 22:00:00",
        numAttending: 8,
        previewImage: "image url"
      },
      {
        groupId: 1,
        venueId: 1,
        name: "Tennis Singles",
        description: "First Singles Tennis Match!",
        type: "In person",
        capacity: 4,
        price: 39.00,
        startDate: "2021-11-20 20:00:00",
        endDate: "2021-11-20 22:00:00",
        numAttending: 4,
        previewImage: "image url"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events")
  }
};
