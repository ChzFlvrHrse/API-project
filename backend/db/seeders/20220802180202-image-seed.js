'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        groupId: 1,
        imageableType: "Polaroid",
        url: 'image url'
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
