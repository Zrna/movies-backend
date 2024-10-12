'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('reviews', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Name of the target table
        key: 'id', // Key in the target table that the foreign key references
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('reviews', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
