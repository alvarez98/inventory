'use strict'
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  })

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId'
    })
  }

  Inventory.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Inventory
}
