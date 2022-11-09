'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memberships', [
      {
        memberId: 1,
        groupId: 1,
        status: 'co-host',
      },
      {
        memberId: 2,
        groupId: 1,
        status: 'member',
      },
      {
        memberId: 3,
        groupId: 2,
        status: 'pending',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Memberships')
  }
};
