const Joi = require('joi')

const addBuyOrderSchm = Joi.object({
  providerId: Joi.string().uuid().required(),
  totalBuy: Joi.number().required(),
  date: Joi.date().required(),
  status: Joi.string().valid().required(),
})

const updateBuyOrderSchm = Joi.object({
  providerId: Joi.string().uuid(),
  totalBuy: Joi.number(),
  date: Joi.date(),
  status: Joi.string().valid(),
})

const getOneBuyOrderSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getBuyOrdersSchm = Joi.object({
  totalBuy: Joi.array()
  .items(
    Joi.number().required(),
    Joi.string().valid('equal', 'less', 'greater').required()
  )
  .length(2),
  date: Joi.array()
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
      Joi.string()
        .valid('id', 'providerId', 'totalBuy', 'date', 'status')
        .required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addBuyOrderSchm,
  updateBuyOrderSchm,
  getOneBuyOrderSchm,
  getBuyOrdersSchm,
}
