const Models = require('../models')

module.exports = (model, filters, excludes, order, limit, offset) =>
  Models[model].findAll({
    where: filters,
    attributes: {
      exclude: [...excludes, 'isActive'],
    },
    order: [order],
    limit,
    offset,
  })
