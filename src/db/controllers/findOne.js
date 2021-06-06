const Models = require('../models')

module.exports = (model, filters, include = [], options = {}) =>
  Models[model].findOne({ where: filters, include }, options)
