'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName='Membership'
    return queryInterface.bulkInsert(options, [
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
    await queryInterface.bulkDelete(options)
  }
};
