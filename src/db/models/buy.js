'use strict'

module.exports = (sequelize, DataTypes) => {
  const Buy = sequelize.define('Buy', {
    productId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    buyOrderId: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  })

  Buy.associate = (models) => {}

  Buy.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Buy
}
