'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    providerId: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    price: DataTypes.FLOAT,
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    status: DataTypes.ENUM(),
    image: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  })

  Product.associate = (models) => {}

  Product.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Product
}
