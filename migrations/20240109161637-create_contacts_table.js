'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {

// The 'up' function is responsible for defining the changes to be applied when migrating up
  up: async (queryInterface, Sequelize) => {
    
    // To Create the 'Contacts' table with specific columns and data types
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      linkedId: {
        type: Sequelize.INTEGER,
      },
      linkPrecedence: {
        type: Sequelize.ENUM('primary', 'secondary'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },

  // The 'down' function is responsible for defining the changes to be applied when rolling back
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Contacts');
  },
};