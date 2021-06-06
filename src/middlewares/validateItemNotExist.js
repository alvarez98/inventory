const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')

/**
 * @function validateItemExist
 * @description Check if item exist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateItemNotExist =
  (modelName, reqProperty, attribute, errorMessage) =>
    async (req, res, next) => {
      try {
        const value = req[reqProperty][attribute]
        if (value) {
          const item = await findOne(modelName, { [attribute]: value, isActive: true })
          if (item) {
            throw new HttpError(400, errorMessage, {
              field: [reqProperty, attribute],
              value
            })
          }
        }
        next()
      } catch (error) {
        next(error)
      }
    }

module.exports = validateItemNotExist
