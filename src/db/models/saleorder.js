'use strict'
module.exports = (sequelize, DataTypes) => {
  const SaleOrder = sequelize.define('SaleOrder', {
    date: DataTypes.DATE,
    totalSale: DataTypes.FLOAT,
    status: DataTypes.ENUM('CANCELED', 'PAID', 'DUE'),
    tax: DataTypes.FLOAT,
    sellerId: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  })
  SaleOrder.associate = (models) => {}

  SaleOrder.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return SaleOrder
}
