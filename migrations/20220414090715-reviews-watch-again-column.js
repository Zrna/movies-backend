'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reviews', 'watchAgain', {
      after: 'url',
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('reviews', 'watchAgain');
  },
};
