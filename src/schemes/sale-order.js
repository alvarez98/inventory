const Joi = require('joi')

const addSaleOrderSchm = Joi.object({
  date: Joi.date().required(),
  totalSaleOrder: Joi.number().required(),
  tax: Joi.number().required(),
  sellerId: Joi.string().uuid().required(),
  status: Joi.string().enum().required(),
})

const updateSaleOrderSchm = Joi.object({
  date: Joi.date(),
  totalSaleOrder: Joi.number(),
  tax: Joi.number(),
  sellerId: Joi.string().uuid(),
  status: Joi.string().enum(),
})

const getOneSaleOrderSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getSaleOrdersSchm = Joi.object({
  date: Joi.array()
    .items(
      Joi.date().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  totalSaleOrder: Joi.array()
    .items(
      Joi.number().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  status: Joi.string().valid(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('date', 'totalSale', 'status').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addSaleOrderSchm,
  updateSaleOrderSchm,
  getOneSaleOrderSchm,
  getSaleOrdersSchm,
}
