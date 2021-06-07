const HttpError = require('../classes/httpError')
const findOne = require('../db/controllers/findOne')

/**
 * @function validateItemExist
 * @description Check if item exist
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateItemExist =
  (model, reqProperty, attribute, errorMessage, key = attribute, arrayKey = null) =>
    async (req, res, next) => {
      try {
        const valueToValidate = req[reqProperty][attribute]
        if (valueToValidate) {
        // Values array
          if (Array.isArray(valueToValidate)) {
            for (const item of valueToValidate) {
              const isExist = await findOne(model, {
                [key]: item[arrayKey],
                isActive: true
              })
              if (!isExist) {
                throw new HttpError(400, errorMessage, {
                  field: [reqProperty, attribute],
                  value: valueToValidate
                })
              }
            }
          // Unique value
          } else {
            console.log('ok')
            const isExist = await findOne(model, {
              [key]: valueToValidate,
              isActive: true
            })
            if (!isExist) {
              throw new HttpError(400, errorMessage, {
                field: [reqProperty, attribute],
                value: valueToValidate
              })
            }
          }
        }
        next()
      } catch (error) {
        next(error)
      }
    }

module.exports = validateItemExist
