const Models = require('../models')

module.exports = (model, id, data) => Models[model].update(data, { where: { id }})