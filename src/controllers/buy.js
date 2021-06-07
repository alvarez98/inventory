const HttpError = require('../classes/httpError')
const bulkAdd = require('../db/controllers/bulkAdd')
const { buildBuyFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const Models = require('../db/models/index')
const db = require('../db/models/index')
const { v4: uuidv4 } = require('uuid')

/**
 * @function addBuy
 * @description Controller for POST /api/buys
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addBuy = async ({ body, params }, res, next) => {
  const t = await db.sequelize.transaction()
  try {
    const warnings = []
    const buyOrder = await findOne(
      models.BUYORDER,
      { id: params.buyOrderId, isActive: true },
      [],
      { transaction: t }
    )
    // Buy/BuyOrder logic
    for (const buy of body.items) {
      buy.id = uuidv4()
      buy.buyOrderId = params.buyOrderId
      const product = await findOne(
        models.PRODUCT,
        { id: buy.productId, isActive: true },
        [],
        { transaction: t }
      )
      buy.total = product.cost * buy.quantity
      buyOrder.totalBuy += buy.total

      // Inventory logic
      const inventory = await findOne(
        models.INVENTORY,
        { productId: buy.productId, isActive: true },
        [],
        { transaction: t }
      )
      inventory.quantity += buy.quantity
      await inventory.save({ transaction: t })
      if (inventory.quantity >= product.max) {
        warnings.push(
          `Se alcanzó el máximo establecido para el producto: ${product.name}`
        )
      }
    }
    await buyOrder.save({ transaction: t })
    await bulkAdd(models.BUY, body.items, { transaction: t })
    await t.commit()
    res
      .status(201)
      .json({ message: 'Las compras se agregaron correctamente', warnings })
  } catch (error) {
    await t.rollback()
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
    const buys = await find(
      models.BUY,
      buildBuyFilters(filters),
      order,
      limit,
      offset,
      [
        {
          model: Models[models.PRODUCT],
          as: 'product'
        },
        {
          model: Models[models.BUYORDER],
          as: 'buy_order'
        }
      ]
    )
    res.status(200).json({
      data: buys.rows,
      count: buys.count,
      current: buys.rows.length,
      offset
    })
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
    const buy = await findOne(models.BUY, { ...params, isActive: true }, [
      {
        model: Models[models.PRODUCT],
        as: 'product'
      },
      {
        model: Models[models.BUYORDER],
        as: 'buy_order'
      }
    ])
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
  const t = await db.sequelize.transaction()
  try {
    await updateOne(models.BUY, params.id, body, { transaction: t })
    await t.commit()
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    await t.rollback()
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
  const t = await db.sequelize.transaction()
  try {
    await updateOne(
      models.BUY,
      params.id,
      { isActive: false },
      { transaction: t }
    )
    await t.commit()
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    await t.rollback()
    next(error)
  }
}

module.exports = {
  addBuy,
  getBuys,
  getOneBuy,
  updateBuy,
  deleteBuy
}