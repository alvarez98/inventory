'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      gender: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['MALE', 'FEMALE'],
        defaultValue: 'FEMALE'
      },
      dni: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profiles')
  }
}
