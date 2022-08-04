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
        state: "NY",
        numMembers: 10
      },
      {
        organizerId: 2,
        name: "Afternoon Golf by the Beach",
        about: "Play a round of Golf perhaps by the beach.",
        type: "In Person",
        private: true,
        city: "New Jersey",
        state: "NJ",
        numMembers: 4
      },
      {
        organizerId: 3,
        name: "Night time basketball game",
        about: "Play a game of basketball",
        type: "In person",
        private: true,
        city: "St.Louis",
        state: "MO",
        numMembers: 8
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups')
  }
};
