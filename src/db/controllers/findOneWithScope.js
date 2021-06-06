const Models = require('../models')

module.exports = (model, filters, scope = '', include = [], options = {}) =>
  Models[model].scope(scope).findOne({ where: filters, include }, options)
