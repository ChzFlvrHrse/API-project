'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        groupId: 1,
        imageableType: "Polaroid",
        url: 'http://www.tennisnow.com/Files/Doha-Season-Launch-3(up).aspx'
      },
      {
        eventId: 1,
        imageableType: "Polaroid",
        url: "image url"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images')
  }
};
