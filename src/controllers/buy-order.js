const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildBuyOrderFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const Models = require('../db/models/index')
const models = require('../db/keys')

/**
 * @function addBuyOrder
 * @description Controller for POST /api/buy-orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addBuyOrder = async ({ body }, res, next) => {
  try {
    body.totalBuy = 0.0
    const buyOrder = await add(models.BUYORDER, body)
    res.status(201).json({ id: buyOrder.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getBuyOrders
 * @description Controller for GET /api/buy-orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getBuyOrders = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const buyOrder = await find(
      models.BUYORDER,
      buildBuyOrderFilters(filters),
      order,
      limit,
      offset,
      [
        {
          model: Models[models.PROVIDER],
          as: 'provider'
        }
      ]
    )
    res.status(200).json({
      data: buyOrder.rows,
      count: buyOrder.count,
      current: buyOrder.rows.length,
      offset
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneBuyOrder
 * @description Controller for GET /api/buy-orders/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneBuyOrder = async ({ params }, res, next) => {
  try {
    const buyOrder = await findOne(
      models.BUYORDER,
      { ...params, isActive: true },
      [
        {
          model: Models[models.PROVIDER],
          as: 'provider'
        }
      ]
    )
    if (!buyOrder) throw new HttpError(404, 'BuyOrder not found')
    res.status(200).json({ data: buyOrder, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateBuyOrder
 * @description Controller for PUT /api/buy-orders/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateBuyOrder = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.BUYORDER, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteBuyOrder
 * @description Controller for DELETE /api/buy-orders/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteBuyOrder = async ({ params }, res, next) => {
  try {
    await updateOne(models.BUYORDER, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addBuyOrder,
  getBuyOrders,
  getOneBuyOrder,
  updateBuyOrder,
  deleteBuyOrder
}
