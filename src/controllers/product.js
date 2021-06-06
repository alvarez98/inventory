const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildProductFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const Models = require('../db/models/index')
const db = require('../db/models/index')

/**
 * @function addProduct
 * @description Controller for POST /api/products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addProduct = async ({ body }, res, next) => {
  const t = await db.sequelize.transaction()
  try {
    const product = await add(models.PRODUCT, body, { transaction: t })
    await add(models.INVENTORY, {
      productId: product.id,
      quantity: 0
    }, { transaction: t })
    await t.commit()
    res.status(201).json({ id: product.id, message: 'Created' })
  } catch (error) {
    await t.rollback()
    next(error)
  }
}

/**
 * @function getProducts
 * @description Controller for GET /api/products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getProducts = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const products = await find(
      models.PRODUCT,
      buildProductFilters(filters),
      order,
      limit,
      offset,
      [
        {
          model: Models[models.PROVIDER],
          as: 'provider'
        },
        {
          model: Models[models.CATEGORY],
          as: 'category'
        }
      ]
    )
    res.status(200).json({
      data: products.rows,
      count: products.count,
      current: products.rows.length,
      offset
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneProduct
 * @description Controller for GET /api/products/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneProduct = async ({ params }, res, next) => {
  try {
    const product = await findOne(models.PRODUCT, { ...params, isActive: true }, [
      {
        model: Models[models.PROVIDER],
        as: 'provider'
      },
      {
        model: Models[models.CATEGORY],
        as: 'category'
      }
    ])
    if (!product) throw new HttpError(404, 'Product not found')
    res.status(200).json({ data: product, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateProduct
 * @description Controller for PUT /api/products/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateProduct = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.PRODUCT, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteProduct
 * @description Controller for DELETE /api/products/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteProduct = async ({ params }, res, next) => {
  const t = await db.sequelize.transaction()
  try {
    await updateOne(models.PRODUCT, params.id, { isActive: false })
    await t.commit()
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    await t.rollback()
    next(error)
  }
}

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
}
