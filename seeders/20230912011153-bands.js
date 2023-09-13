'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bands', [{
    band_id: 1,
    name: "The Tribunal",
    genre: "Comic",
    available_start_time: "2022-01-01T19:00:00",
    end_time: "2022-01-01T20:30:00"
   },
   {
    band_id: 2,
    name: "Get Money",
    genre: "ROCK",
    available_start_time: "2022-02-01T19:00:00",
    end_time: "2022-01-01T20:30:00"
   },
   {
    band_id: 3,
    name: "The ETERNALs",
    genre: "Comic",
    available_start_time: "2022-03-01T19:00:00",
    end_time: "2022-01-01T20:30:00"
   }
  ] )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bands', null, {})
  }
};
