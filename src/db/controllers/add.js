const Models = require('../models')

module.exports = (model, data, options = {}) => Models[model].create(data, options)
