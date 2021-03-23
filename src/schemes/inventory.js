const Joi = require('joi')

const addInventorySchm = Joi.object({
  productId: Joi.string().uuid().required(),
  buyId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().required(),
  expiration: Joi.date().required(),
  status: Joi.string().valid().required(),
})

const updateInventorySchm = Joi.object({
  productId: Joi.string().uuid(),
  buyId: Joi.string().uuid(),
  quantity: Joi.number().integer(),
  expiration: Joi.date(),
  status: Joi.string().valid(),
})

const getOneInventorySchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getInventoriesSchm = Joi.object({
  productId: Joi.string().uuid(),
  buyId: Joi.string().uuid(),
  quantity: Joi.number().integer(),
  expiration: Joi.array()
  .items(
    Joi.date().required(),
    Joi.string().valid('equal', 'less', 'greater').required()
  )
  .length(2),
  status: Joi.string().valid(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('productId', 'buyId', 'quantity', 'expiration', 'status').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addInventorySchm,
  updateInventorySchm,
  getOneInventorySchm,
  getInventoriesSchm,
}
