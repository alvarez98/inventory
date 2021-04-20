'use strict'

module.exports = (sequelize, DataTypes) => {
  const BuyOrder = sequelize.define('BuyOrder', {
    date: DataTypes.DATE,
    totalBuy: DataTypes.FLOAT,
    providerId: DataTypes.STRING,
    status: DataTypes.ENUM('CANCELED', 'PAID', 'DUE'),
    isActive: DataTypes.BOOLEAN,
  })

  BuyOrder.associate = (models) => {}

  BuyOrder.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return BuyOrder
}
