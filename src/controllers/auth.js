const HttpError = require('../classes/httpError')
const findOneWithScope = require('../db/controllers/findOneWithScope')
const models = require('../db/keys')
const { compare } = require('../utils/bcrypt')
const { generateToken, verifyToken } = require('../utils/jwt')
const { Configuration, Keys } = require('../config')

const auth = async ({ body }, res, next) => {
  try {
    const { email, password } = body
    const user = await findOneWithScope(models.USER, { email, isActive: true }, 'withPassword')
    const match = await compare(password, user.dataValues.password)
    if (!match) {
      throw new HttpError(401, 'Contraseña incorrecta', {
        field: ['body', 'password'],
        value: body.password
      })
    }
    const accessToken = generateToken(user.dataValues, Configuration.get(Keys.JWT_EXP_ACCESS_TKN))
    const refresToken = generateToken(user.dataValues, Configuration.get(Keys.JWT_EXP_REFRESH_TKN))
    res.status(200).send({
      access_token: accessToken,
      refresh_token: refresToken
    })
  } catch (error) {
    next(error)
  }
}

const refresh = async ({ body }, res, next) => {
  try {
    const data = await verifyToken(body.refresh_token)
    delete data.iat 
    delete data.exp
    const accessToken = generateToken(data, Configuration.get(Keys.JWT_EXP_ACCESS_TKN))
    res.status(200).send({
      access_token: accessToken
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  auth,
  refresh
}