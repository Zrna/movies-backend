'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('movies', 'rating', {
      after: 'review',
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('movies', 'rating');
  },
};
