const Models = require('../models')

module.exports = (model, pk) => Models[model].findByPk(pk)