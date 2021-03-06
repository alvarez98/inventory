const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildBuyOrderFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const Models = require('../db/models/index')
const models = require('../db/keys')
const db = require('../db/models/index')

/**
 * @function addBuyOrder
 * @description Controller for POST /api/buy-orders
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addBuyOrder = async ({ body, headers }, res, next) => {
  try {
    body.totalBuy = 0
    body.buyerId = headers.decoded.id
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
          model: Models[models.USER],
          as: 'buyer',
        },
      ]
    )
    res.status(200).json({
      data: buyOrder.rows,
      count: buyOrder.count,
      current: buyOrder.rows.length,
      offset,
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
          model: Models[models.USER],
          as: 'buyer',
        },
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
  const t = await db.sequelize.transaction()
  try {
    await updateOne(
      models.BUYORDER,
      params.id,
      { isActive: false },
      { transaction: t }
    )
    const buys = await find(
      models.BUY,
      { buyOrderId: params.id },
      'id',
      null,
      0,
      [],
      { transaction: t }
    )
    for (let { dataValues: buy } of buys.rows) {
      const { dataValues: inventory } = await findOne(
        models.INVENTORY,
        {
          productId: buy.productId,
          isActive: true,
        },
        [],
        { transaction: t }
      )
      buy.isActive = false
      inventory.quantity -= buy.quantity
      await buy.save({ transaction: t })
      await inventory.save({ transaction: t })
    }
    await t.commit()
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    await t.rollback()
    next(error)
  }
}

module.exports = {
  addBuyOrder,
  getBuyOrders,
  getOneBuyOrder,
  updateBuyOrder,
  deleteBuyOrder,
}
