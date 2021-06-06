const Models = require('../models')

module.exports = (model, filter = {}) => Models[model].destroy({ where: filter })
