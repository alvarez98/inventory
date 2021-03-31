const Joi = require('joi')

const addBuySchm = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().required(),
  buyOrderId: Joi.string().uuid().required(),
})

const updateBuySchm = Joi.object({
  productId: Joi.string().uuid(),
  quantity: Joi.number().integer(),
  buyOrderId: Joi.string().uuid(),
})

const getOneBuySchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getBuysSchm = Joi.object({
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
      Joi.string().valid('id', 'quantity', 'productId', 'buyOrderId').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addBuySchm,
  updateBuySchm,
  getOneBuySchm,
  getBuysSchm,
}
