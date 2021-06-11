const Joi = require('joi')

const authSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const headersSchm = Joi.object({
  authorization: Joi.string()
    .regex(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/m)
    .required(),
})
  .unknown()
  .required()

const refreshSchm = Joi.object({
  refresh_token: Joi.string()
    .regex(/^[\w-]+\.[\w-]+\.[\w-]+$/m)
    .required(),
}).required()

module.exports = {
  authSchm,
  headersSchm,
  refreshSchm,
}
