'use strict'

const { v4 } = require('uuid')
const { encrypt } = require('../../utils/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const encryptedPass = await encrypt('admin_34632')

    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: v4(),
          email: 'admin@mail.com',
          password: encryptedPass,
          firstname: 'Admin',
          lastname: 'User',
          role: 'ADMIN',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
