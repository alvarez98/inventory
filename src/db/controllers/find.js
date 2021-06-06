const Models = require('../models')

module.exports = (model, filters, order, limit, offset, include = []) =>
  Models[model].findAndCountAll({
    where: filters,
    order: [order],
    limit,
    offset,
    include
  })
