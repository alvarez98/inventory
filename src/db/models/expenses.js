'use strict'

module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    total: DataTypes.FLOAT,
    date: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
  })
  Expense.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.isActive
    return values
  }

  return Expense
}
