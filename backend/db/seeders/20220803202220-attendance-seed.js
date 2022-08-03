'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Attendances', [
      {
        userId: 1,
        eventId: 1,
        status: 'member',
      },
      {
        userId: 2,
        eventId: 1,
        status: 'waitlist',
      },
      {
        userId: 3,
        eventId: 2,
        status: 'pending',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Attendances')
  }
};
