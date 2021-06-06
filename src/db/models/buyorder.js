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
    providerId: DataTypes.UUID,
    status: DataTypes.ENUM('CANCELED', 'PAID', 'DUE'),
    isActive: DataTypes.BOOLEAN
  })

  BuyOrder.associate = (models) => {
    BuyOrder.belongsTo(models.Provider, {
      as: 'provider',
      foreignKey: 'providerId'
    })
  }
  BuyOrder.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return BuyOrder
}
