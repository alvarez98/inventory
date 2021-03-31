const Joi = require('joi')

const MINIMUM_AGE = 15
const date = new Date()
date.setFullYear(date.getFullYear() - MINIMUM_AGE)

const addProfileSchm = Joi.object({
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
  dni: Joi.string().min(18).required(),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required(),
  birthday: Joi.date()
    .max(date)
    .message(`Age must be over ${MINIMUM_AGE}`)
    .required(),
  address: Joi.string().min(10).required(),
  user_id: Joi.string().uuid().required(),
})

const updateProfileSchm = Joi.object({
  gender: Joi.string().valid('MALE', 'FEMALE'),
  dni: Joi.string().min(18),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1),
  birthday: Joi.date().max(date).message(`Age must be over ${MINIMUM_AGE}`),
  address: Joi.string().min(10),
})

const getOneProfileSchm = Joi.object({
  id: Joi.string().uuid().required(),
})

const getProfilesSchm = Joi.object({
  gender: Joi.string().valid('MALE', 'FEMALE'),
  birthday: Joi.array()
    .items(
      Joi.date().required(),
      Joi.string().valid('equal', 'less', 'greater').required()
    )
    .length(2),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  order: Joi.array()
    .items(
      Joi.string().valid('id', 'email', 'firstname', 'lastname').required(),
      Joi.string().valid('ASC', 'DESC').required()
    )
    .length(2),
})

module.exports = {
  addProfileSchm,
  updateProfileSchm,
  getOneProfileSchm,
  getProfilesSchm,
}
