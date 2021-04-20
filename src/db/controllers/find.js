const Models = require('../models')

module.exports = (model, filters, order, limit, offset, include = []) => {
  const attributes = {}
  if (include.length > 0) attributes.include = include
  return Models[model].findAndCountAll({
    where: filters,
    attributes,
    order: [order],
    limit,
    offset,
  })
}
