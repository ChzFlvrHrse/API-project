'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName='Images'
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        imageableType: "Polaroid",
        url: 'http://www.tennisnow.com/Files/Doha-Season-Launch-3(up).aspx'
      },
      {
        eventId: 1,
        imageableType: "Polaroid",
        url: ''
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
