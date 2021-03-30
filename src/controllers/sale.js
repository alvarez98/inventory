const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const generateID = require('../utils/generateID')

/**
 * @function addSale
 * @description Controller for POST /api/sales
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addSale = async ({ body }, res, next) => {
  try {
    body.id = generateID()
    const sale = await add(models.SALE, body)
    res.status(201).json({ id: sale.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getSales
 * @description Controller for GET /api/sales
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getSales = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const sales = await find(models.SALE, filters, order, limit, offset)
    res.status(200).json({ data: sales, count: sales.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneSale
 * @description Controller for GET /api/sales/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneSale = async ({ params }, res, next) => {
  try {
    const sale = await findOne(models.SALE, params)
    if (!sale) throw new HttpError(404, 'Sale not found')
    res.status(200).json({ data: sale, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateSale
 * @description Controller for PUT /api/sales/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateSale = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.SALE, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteSale
 * @description Controller for DELETE /api/sales/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteSale = async ({ params }, res, next) => {
  try {
    await updateOne(models.SALE, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addSale,
  getSales,
  getOneSale,
  updateSale,
  deleteSale,
}
