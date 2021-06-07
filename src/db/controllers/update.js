const Models = require('../models')

module.exports = (model, filters, data, options = {}) =>
  Models[model].update(data, { where: filters, ...options })
