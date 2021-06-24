'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('movies', 'url', {
      after: 'rating',
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('movies', 'url');
  },
};
