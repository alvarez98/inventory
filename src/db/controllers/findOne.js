const Models = require('../models')

module.exports = (model, filters, excludes) =>
  Models[model].findOne({
    where: filters,
    attributes: {
      exclude: [...excludes, 'isActive'],
    },
  })
