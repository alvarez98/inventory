const Models = require('../models')

module.exports = (model, id, data, options = {}) =>
  Models[model].update(data, { where: { id } }, options)
