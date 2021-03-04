const Models = require('../models')

module.exports = (model, data) => Models[model].create(data)