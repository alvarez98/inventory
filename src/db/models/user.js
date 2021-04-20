'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    role: DataTypes.ENUM('ADMIN', 'CASHIER'),
    isActive: DataTypes.BOOLEAN,
  })
  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())

    delete values.password
    delete values.isActive
    return values
  }
  return User
}
