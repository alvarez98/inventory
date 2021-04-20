const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')

/**
 * @function validateItemExist
 * @description Check if item exist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateItemExist = (modelName, field, site) => async (req, res, next) => {
  try {
    const filter = {}
    if (Array.isArray(field)) 
      filter[field[1]] = req[site][field[0]]
    else filter[field] = req[site][field]
    const item = await findOne(modelName, filter, [])
    if (!item) throw new HttpError(400, `${modelName} not exist`)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validateItemExist
