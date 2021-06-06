'use strict'
const HttpError = require('../../classes/httpError')

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    providerId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    price: DataTypes.FLOAT,
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    cost: DataTypes.FLOAT,
    min: {
      type: DataTypes.INTEGER,
      validate: {
        isLessThanMax (value) {
          if (value >= this.max) throw new HttpError(400, 'El mínimo de productos debe ser menor que el máximo')
        }
      }
    },
    max: DataTypes.INTEGER,
    status: DataTypes.ENUM('DISCONTINUED', 'ACTIVE'),
    image: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  })

  Product.associate = (models) => {
    Product.belongsTo(models.Provider, {
      as: 'provider',
      foreignKey: 'providerId'
    })
    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId'
    })
  }

  Product.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Product
}
