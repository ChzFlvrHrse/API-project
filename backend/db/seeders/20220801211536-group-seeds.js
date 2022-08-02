'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Groups', [
      {
        organizerId: 1,
        name: "Evening Tennis on the Water",
        about: "Enjoy rounds of tennis with a tight-nit group of people on the water facing the Brooklyn Bridge. Singles or doubles.",
        type: "In Person",
        private: true,
        city: "New York",
        state: "NY"
      },
      {
        organizerId: 2,
        name: "Afternoon Golf by the Beach",
        about: "Play a round of Golf perhaps by the beach.",
        type: "In Person",
        private: true,
        city: "New Jersey",
        state: "NJ"
      },
      {
        organizerId: 3,
        name: "Nighttime basketball game",
        about: "Play a game of basketball",
        type: "In person",
        private: true,
        city: "St.Louis",
        state: "MO"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups')
  }
};
