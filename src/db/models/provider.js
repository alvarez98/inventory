'use strict'
module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    email: DataTypes.STRING,
    notes: DataTypes.STRING,
    contactName: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  })
  Provider.associate = (models) => {}

  Provider.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Provider
}
