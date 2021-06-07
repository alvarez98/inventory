'use strict'

module.exports = (sequelize, DataTypes) => {
  const BuyOrder = sequelize.define('BuyOrder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    date: DataTypes.DATE,
    totalBuy: DataTypes.FLOAT,
    buyerId: DataTypes.UUID,
    status: DataTypes.ENUM('CANCELED', 'PAID', 'DUE'),
    isActive: DataTypes.BOOLEAN
  })

  BuyOrder.associate = (models) => {
    BuyOrder.belongsTo(models.User, {
      as: 'buyer',
      foreignKey: 'buyerId'
    })
  }
  BuyOrder.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return BuyOrder
}
