'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Venues', [
      {
        groupId: 1,
        address: '123 Disney Lane',
        city: 'New York',
        state: 'NY',
        lat: 37.7645358,
        lng: -122.4730327
      },
      {
        groupId: 2,
        address: '7233 Legacy Dr',
        city: 'Nashville',
        state: 'TN',
        lat: 44.6789490,
        lng: 34.7879790
      },
      {
        groupId: 3,
        address: '6004 Blue Hole Lane',
        city: 'Antioch',
        state: 'TN',
        lat: 78.988080,
        lng: -162.4730327
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Venues')
  }
};
