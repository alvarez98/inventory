const Models = require('../models')

module.exports = (model, data, options = {}) => Models[model].bulkCreate(data, options)
