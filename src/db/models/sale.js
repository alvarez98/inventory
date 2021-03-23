'use strict'
module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    saleOrderId: DataTypes.STRING,
    productId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    status: DataTypes.ENUM,
    isActive: DataTypes.BOOLEAN,
  })
  Sale.associate = (models) => {}

  Sale.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Sale
}
