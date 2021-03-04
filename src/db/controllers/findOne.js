const Models = require('../models')

module.exports = (model, filters) => Models[model].findOne({ where: filters })
