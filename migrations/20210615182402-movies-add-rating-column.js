'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Movies', 'rating', {
      after: 'review',
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('Movies', 'rating');
  },
};
