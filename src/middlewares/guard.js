const HttpError = require('../classes/httpError')
const { headersSchm } = require('../schemes/auth')
const { verifyToken } = require('../utils/jwt')

const ROLES = {
  ADMIN: 'ADMIN',
  CASHIER: 'CASHIER'
}

const guard =
  (...allowedRoles) =>
    async (req, res, next) => {
      try {
        const { error } = headersSchm.validate(req.headers)
        if (error) {
          throw new HttpError(400, 'Header de autorización inválido', {
            field: ['headers', 'Authorization'],
            value: error.details[0].context.value
          })
        }
        const decoded = await verifyToken(req.headers.authorization.split(' ')[1])
        req.headers.decoded = decoded
        if (!allowedRoles.includes(decoded.role)) {
          throw new HttpError(
            401,
            'No se cuentan con los permisos necesarios para realizar la acción',
            {
              field: ['headers', 'Authorization'],
              value: req.headers.authorization
            }
          )
        }
        next()
      } catch (error) {
        next(error)
      }
    }

module.exports = {
  guard,
  ROLES
}
