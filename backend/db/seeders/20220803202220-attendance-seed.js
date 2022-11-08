'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName='Attendances'
    return queryInterface.bulkInsert(options, [
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
    options.tableName='Attendances'
    await queryInterface.bulkDelete(options)
  }
};
