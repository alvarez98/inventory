'use strict'

module.exports = (sequelize, DataTypes) => {
  const Buy = sequelize.define('Buy', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    productId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    buyOrderId: DataTypes.UUID,
    isActive: DataTypes.BOOLEAN
  })

  Buy.associate = (models) => {
    Buy.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    })
    Buy.belongsTo(models.BuyOrder, {
      as: 'buy_order',
      foreignKey: 'buyOrderId'
    })
  }

  Buy.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }
  return Buy
}
