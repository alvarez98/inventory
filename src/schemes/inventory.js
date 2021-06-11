const Joi = require('joi')

const getOneInventorySchm = Joi.object({
  id: Joi.string().uuid().required()
})

const getInventoriesSchm = Joi.object({
  quantity: Joi.array()
    .items(
      Joi.number().integer().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('productId', 'quantity').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2)
})

module.exports = {
  getOneInventorySchm,
  getInventoriesSchm
}
