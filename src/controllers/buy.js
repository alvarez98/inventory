const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const generateID = require('../utils/generateID')

/**
 * @function addBuy
 * @description Controller for POST /api/buys
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addBuy = async ({ body }, res, next) => {
  try {
    body.id = generateID()
    const buy = await add(models.BUY, body)
    res.status(201).json({ id: buy.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getBuys
 * @description Controller for GET /api/buys
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getBuys = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const buys = await find(models.BUY, filters, order, limit, offset)
    res.status(200).json({ data: buys, count: buys.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneBuy
 * @description Controller for GET /api/buys/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneBuy = async ({ params }, res, next) => {
  try {
    const buy = await findOne(models.BUY, params)
    if (!buy) throw new HttpError(404, 'Buy not found')
    res.status(200).json({ data: buy, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateBuy
 * @description Controller for PUT /api/buys/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateBuy = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.BUY, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteBuy
 * @description Controller for DELETE /api/buys/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteBuy = async ({ params }, res, next) => {
  try {
    await updateOne(models.BUY, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addBuy,
  getBuys,
  getOneBuy,
  updateBuy,
  deleteBuy,
}
