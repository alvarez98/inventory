const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')

/**
 * @function validateItemExist
 * @description Check if item exist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateItemNotExist = (modelName, field, site) => async (
  req,
  res,
  next
) => {
  try {
    const filter = {}
    if (req[site][field]) {
      filter[field] = req[site][field]
      const item = await findOne(modelName, filter, [])
      if (item) throw new HttpError(400, `${field} already in use`)
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = validateItemNotExist
