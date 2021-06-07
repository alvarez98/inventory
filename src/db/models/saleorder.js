'use strict'
module.exports = (sequelize, DataTypes) => {
  const SaleOrder = sequelize.define('SaleOrder', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    totalSale: DataTypes.FLOAT,
    sellerId: DataTypes.UUID,
    status: DataTypes.ENUM('CANCELED', 'PAID', 'DUE'),
    isActive: DataTypes.BOOLEAN
  })
  SaleOrder.associate = (models) => {
    SaleOrder.belongsTo(models.User, {
      as: 'seller',
      foreignKey: 'sellerId'
    })
  }

  SaleOrder.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return SaleOrder
}
