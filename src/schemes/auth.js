const Joi = require('joi')

const authSchm = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

const headersSchm = Joi.object({
  authorization: Joi.string()
    .regex(new RegExp(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/m))
    .required(),
})
  .unknown()
  .required()

module.exports = {
  authSchm,
  headersSchm,
}
