const Joi = require('joi')

const addCategorySchm = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
})

const updateCategorySchm = Joi.object({
  name: Joi.string(),
  description: Joi.string()
})

const getOneCategorySchm = Joi.object({
  id: Joi.string().uuid().required()
})

const getCategoriesSchm = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string()
        .valid('id', 'name')
        .required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2)
})

module.exports = {
  addCategorySchm,
  updateCategorySchm,
  getOneCategorySchm,
  getCategoriesSchm
}
