'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('movies', 'watchAgain', {
      after: 'url',
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('movies', 'watchAgain');
  },
};
