const Joi = require('joi')

const addProductSchm = Joi.object({
  name: Joi.string().required(),
  providerId: Joi.string().uuid().required(),
  categoryId: Joi.string().uuid().required(),
  code: Joi.number().integer().required(),
  description: Joi.string(),
  cost: Joi.number().strict().required(),
  min: Joi.number().integer().strict().less(Joi.ref('max')).required(),
  max: Joi.number().integer().strict().required(),
  price: Joi.number().strict().greater(Joi.ref('cost')).required(),
  status: Joi.string().valid('DISCONTINUED', 'ACTIVE').required(),
  image: Joi.string().uri().required()
})

const updateProductSchm = Joi.object({
  name: Joi.string(),
  providerId: Joi.string().uuid(),
  categoryId: Joi.string().uuid(),
  code: Joi.number().integer(),
  description: Joi.string(),
  cost: Joi.number().strict(),
  min: Joi.number().integer().strict().less(Joi.ref('max')),
  max: Joi.number().integer().strict(),
  price: Joi.number().strict().greater(Joi.ref('cost')),
  status: Joi.string().valid('DISCONTINUED', 'ACTIVE'),
  image: Joi.string().uri()
})

const getOneProductSchm = Joi.object({
  id: Joi.string().uuid().required()
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
  status: Joi.string().valid('DISCONTINUED', 'ACTIVE'),
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
          'status'
        )
        .required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2)
})

module.exports = {
  addProductSchm,
  updateProductSchm,
  getOneProductSchm,
  getProductsSchm
}
