'use strict'
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    saleOrderId: DataTypes.UUID,
    productId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    isActive: DataTypes.BOOLEAN
  })
  Sale.associate = (models) => {
    Sale.belongsTo(models.SaleOrder, {
      as: 'sale_order',
      foreignKey: 'saleOrderId'
    })
    Sale.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    })
  }

  Sale.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Sale
}
