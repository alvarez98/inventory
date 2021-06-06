const HttpError = require('../classes/httpError')
const { v4: uuidv4 } = require('uuid')
const { buildSaleFilters } = require('../db/controllers/buildFilters')
const bulkAdd = require('../db/controllers/bulkAdd')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const Models = require('../db/models/index')
const models = require('../db/keys')
const db = require('../db/models/index')
/**
 * @function addSale
 * @description Controller for POST /api/sales
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addSale = async ({ body, params }, res, next) => {
  const transaction = await db.sequelize.transaction()
  try {
    const warnings = [], allowedSales = []
    const saleOrder = await findOne(
      models.SALEORDER,
      { id: params.saleOrderId, isActive: true },
      [],
      { transaction }
    )
    // Sale logic
    for (const sale of body.items) {
      sale.id = uuidv4()
      sale.saleOrderId = params.saleOrderId
      // Inventory logic
      const inventory = await findOne(
        models.INVENTORY,
        { productId: sale.productId, isActive: true },
        [],
        { transaction }
      )
      const product = await findOne(
        models.PRODUCT,
        { id: sale.productId, isActive: true },
        [],
        { transaction }
      )
      if (inventory.quantity < sale.quantity) {
        warnings.push(
          `No hay el suficiente stock del producto ${product.name} para la cantidad que se solicita`
        )
        continue
      }
      // SaleOrder
      sale.total = product.price * sale.quantity
      saleOrder.totalSale += sale.total
      inventory.quantity -= sale.quantity
      await inventory.save({ transaction })
      allowedSales.push(sale)
      if (inventory.quantity <= product.min) {
        warnings.push(
          `Se ha alcanzado la cantidad límite establecida para el producto ${product.name}`
        )
      }
    }
    await saleOrder.save({ transaction })
    await bulkAdd(models.SALE, allowedSales, { transaction })
    await transaction.commit()
    const message = allowedSales.length > 0 ? 'Se agregaron las compras correctamente' : 'No se pudieron guardar las ventas'
    res.status(200).json({ message, warnings })
  } catch (error) {
    await transaction.rollback()
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
    const sales = await find(
      models.SALE,
      buildSaleFilters(filters),
      order,
      limit,
      offset,
      [
        {
          model: Models[models.SALEORDER],
          as: 'sale_order',
        },
        {
          model: Models[models.PRODUCT],
          as: 'product',
        },
      ]
    )
    res.status(200).json({
      data: sales.rows,
      count: sales.count,
      current: sales.rows.length,
      offset,
    })
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
    const sale = await findOne(models.SALE, { ...params, isActive: true }, [
      {
        model: Models[models.SALEORDER],
        as: 'sale_order',
      },
      {
        model: Models[models.PRODUCT],
        as: 'product',
      },
    ])
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
