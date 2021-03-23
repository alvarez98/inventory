const Joi = require('joi')

const addSaleSchm = Joi.object({
  saleOrderId: Joi.string().uuid().required(),
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().required(),
  total: Joi.number().required(),
  discount: Joi.number().max(100).required(),
  status: Joi.string().enum().required(),
})

const updateSaleSchm = Joi.object({
  saleOrderId: Joi.string().uuid(),
  productId: Joi.string().uuid(),
  quantity: Joi.number().integer(),
  total: Joi.number(),
  discount: Joi.number().max(100),
  status: Joi.string().enum(),
})

const getOneSaleSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getSalesSchm = Joi.object({
  quantity: Joi.number().integer(),
  total: Joi.array()
    .items(
      Joi.number().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  discount: Joi.array()
    .items(
      Joi.number().max(100).required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  status: Joi.string().enum(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('quantity', 'total', 'discount', 'status').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addSaleSchm,
  updateSaleSchm,
  getOneSaleSchm,
  getSalesSchm,
}
