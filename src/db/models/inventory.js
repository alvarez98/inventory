'use strict'
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    productId: DataTypes.STRING,
    buyId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    expiration: DataTypes.DATE,
    status: DataTypes.ENUM(),
    isActive: DataTypes.BOOLEAN,
  })

  Inventory.associate = (models) => {}

  Inventory.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Inventory
}
