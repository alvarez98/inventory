const HttpError = require('../classes/httpError')
const findOneWithScope = require('../db/controllers/findOneWithScope')
const models = require('../db/keys')
const { compare } = require('../utils/bcrypt')
const { generateToken } = require('../utils/jwt')
const { Configuration, Keys } = require('../config')

const auth = async ({ body }, res, next) => {
  try {
    const { email, password } = body
    let user = await findOneWithScope(models.USER, { email, isActive: true }, 'withPassword')
    const match = await compare(password, user.dataValues.password)
    if (!match) throw new HttpError(401, 'Contraseña incorrecta', {
      field: ['body', 'password'],
      value: body.password
    })
    const access_token = generateToken(user.dataValues, Configuration.get(Keys.JWT_EXP_ACCESS_TKN))
    const refresh_token = generateToken(user.dataValues, Configuration.get(Keys.JWT_EXP_REFRESH_TKN))
    res.status(200).send({
      access_token,
      refresh_token,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  auth,
}
