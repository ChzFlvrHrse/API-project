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
        previewImage: "https://www.soda.com/wp-content/uploads/2016/12/tennis_live_stream-600x361.jpg"
      },
      {
        groupId: 1,
        venueId: null,
        name: "Tennis Singles",
        description: "First Singles Tennis Match!",
        type: "In person",
        capacity: 4,
        price: 39.00,
        startDate: "2021-11-20 20:00:00",
        endDate: "2021-11-20 22:00:00",
        numAttending: 4,
        previewImage: "https://media.istockphoto.com/photos/tennis-players-playing-a-match-on-the-court-picture-id817164728?k=20&m=817164728&s=170667a&w=0&h=fr8QeXfxrdKGLzgFl3QTX9li2QFzbcjTHOW8NsAeDgo="
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events')
  }
};
