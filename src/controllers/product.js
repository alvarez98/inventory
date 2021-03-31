const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildProductFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const generateID = require('../utils/generateID')

/**
 * @function addProduct
 * @description Controller for POST /api/products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addProduct = async ({ body }, res, next) => {
  try {
    body.id = generateID()
    const product = await add(models.PRODUCT, body)
    res.status(201).json({ id: product.id, message: 'Created' })
  } catch (error) {
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
      offset
    )
    res.status(200).json({
      data: products.rows,
      count: products.count,
      current: products.length,
      offset,
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
    const product = await findOne(models.PRODUCT, params)
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
  try {
    await updateOne(models.PRODUCT, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
}
