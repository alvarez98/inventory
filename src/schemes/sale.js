const Joi = require('joi')

const addSaleSchm = Joi.object({
  items: Joi.array().items(
    Joi.object({
      productId: Joi.string().uuid().required(),
      quantity: Joi.number().integer().strict().required()
    })
  )
})

const updateSaleSchm = Joi.object({
  quantity: Joi.number().integer()
})

const getOneSaleSchm = Joi.object({
  id: Joi.string().uuid().required()
})

const addSaleParamSchm = Joi.object({
  saleOrderId: Joi.string().uuid().required()
})

const getSalesSchm = Joi.object({
  quantity: Joi.array()
    .items(
      Joi.number().integer().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  total: Joi.array()
    .items(
      Joi.number().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('quantity', 'total').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2)
})

module.exports = {
  addSaleSchm,
  addSaleParamSchm,
  updateSaleSchm,
  getOneSaleSchm,
  getSalesSchm
}
