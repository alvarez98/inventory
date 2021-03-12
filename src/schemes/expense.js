const Joi = require('joi')

const addExpenseSchm = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  date: Joi.date().required(),
  total: Joi.number().required(),
})

const updateExpenseSchm = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  date: Joi.date(),
  total: Joi.number(),
})

const getOneExpenseSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getExpensesSchm = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  date: Joi.string(),
  total: Joi.number(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('id', 'name', 'description', 'date', 'total').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addExpenseSchm,
  updateExpenseSchm,
  getOneExpenseSchm,
  getExpensesSchm,
}
