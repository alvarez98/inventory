const Joi = require('joi')

const addProviderSchm = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': 'Invalid phone number.' })
    .required(),
  email: Joi.string().email().required(),
  notes: Joi.string().required(),
  contactName: Joi.string().required()
})

const updateProviderSchm = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': 'Invalid phone number.' }),
  email: Joi.string().email(),
  notes: Joi.string(),
  contactName: Joi.string()
})

const getOneProviderSchm = Joi.object({
  id: Joi.string().uuid().required()
})

const getProvidersSchm = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  country: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  email: Joi.string().email(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string()
        .valid('name', 'address', 'country', 'city', 'state')
        .required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2)
})

module.exports = {
  addProviderSchm,
  updateProviderSchm,
  getOneProviderSchm,
  getProvidersSchm
}
