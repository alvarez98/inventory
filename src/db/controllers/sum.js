const Models = require('../models')

module.exports = (model, field, condition, options = {}) => Models[model].sum(field, condition, options)
