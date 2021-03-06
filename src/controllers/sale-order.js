const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildSaleOrderFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const Models = require('../db/models/index')

/**
 * @function addSaleOrder
 * @description Controller for POST /api/sale_orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addSaleOrder = async ({ body, headers }, res, next) => {
  try {
    body.totalSale = 0
    body.sellerId = headers.decoded.id
    const saleOrder = await add(models.SALEORDER, body)
    res.status(201).json({ id: saleOrder.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getSaleOrders
 * @description Controller for GET /api/sale_orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getSaleOrders = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const saleOrders = await find(
      models.SALEORDER,
      buildSaleOrderFilters(filters),
      order,
      limit,
      offset,
      [
        {
          model: Models[models.USER],
          as: 'seller'
        }
      ]
    )
    res.status(200).json({
      data: saleOrders.rows,
      count: saleOrders.count,
      current: saleOrders.rows.length,
      offset
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneSaleOrder
 * @description Controller for GET /api/sale_orders/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneSaleOrder = async ({ params }, res, next) => {
  try {
    const saleOrder = await findOne(
      models.SALEORDER,
      { ...params, isActive: true },
      [
        {
          model: Models[models.USER],
          as: 'seller'
        }
      ]
    )
    if (!saleOrder) throw new HttpError(404, 'SaleOrder not found')
    res.status(200).json({ data: saleOrder, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateSaleOrder
 * @description Controller for PUT /api/sale_orders/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateSaleOrder = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.SALEORDER, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteSaleOrder
 * @description Controller for DELETE /api/sale_orders/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteSaleOrder = async ({ params }, res, next) => {
  try {
    await updateOne(models.SALEORDER, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addSaleOrder,
  getSaleOrders,
  getOneSaleOrder,
  updateSaleOrder,
  deleteSaleOrder
}
