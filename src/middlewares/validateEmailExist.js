const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')
const models = require('../db/keys')
/**
 * @function validate
 * @description Middleware for 404 errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateEmailExist = async ({ body }, res, next) => {
  try {
    if (body.email) {
      const emailExist = await findOne(models.USER, { email: body.email }, [])
      if (emailExist) throw new HttpError(400, 'Email already in use')
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validateEmailExist
