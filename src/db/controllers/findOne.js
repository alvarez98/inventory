const Models = require('../models')

module.exports = (model, filters, include = []) => {
  const options = {
    where: filters,
  }
  if (include.length > 0) options.include = include
  return Models[model].findOne(options)
}
