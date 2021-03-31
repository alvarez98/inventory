const Joi = require('joi')

const addProductSchm = Joi.object({
  providerId: Joi.string().uuid().required(),
  categoryId: Joi.string().uuid().required(),
  price: Joi.number().required(),
  code: Joi.number().integer().required(),
  description: Joi.string(),
  expiration: Joi.date().required(),
  cost: Joi.number().required(),
  status: Joi.string().valid().required(),
  image: Joi.string().uri().required(),
})

const updateProductSchm = Joi.object({
  providerId: Joi.string().uuid(),
  categoryId: Joi.string().uuid(),
  price: Joi.number(),
  code: Joi.number().integer(),
  description: Joi.string(),
  expiration: Joi.date(),
  cost: Joi.number(),
  status: Joi.string().valid(),
  image: Joi.string().uri(),
})

const getOneProductSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getProductsSchm = Joi.object({
  price: Joi.array()
    .items(
      Joi.number().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  code: Joi.number().integer(),
  description: Joi.string(),
  cost: Joi.array()
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
      Joi.string()
        .valid(
          'name',
          'providerId',
          'categoryId',
          'price',
          'cost',
          'status',
          'expiration'
        )
        .required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addProductSchm,
  updateProductSchm,
  getOneProductSchm,
  getProductsSchm,
}
