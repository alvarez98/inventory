const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildCategoryFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const generateID = require('../utils/generateID')

/**
 * @function addCategory
 * @description Controller for POST /api/categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addCategory = async ({ body }, res, next) => {
  try {
    body.id = generateID()
    const category = await add(models.CATEGORY, body)
    res.status(201).json({ id: category.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getCategories
 * @description Controller for GET /api/categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getCategories = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const categories = await find(
      models.CATEGORY,
      buildCategoryFilters(filters),
      order,
      limit,
      offset
    )
    res
      .status(200)
      .json({
        data: categories.rows,
        count: categories.count,
        current: categories.length,
        offset,
      })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneCategory
 * @description Controller for GET /api/categories/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneCategory = async ({ params }, res, next) => {
  try {
    const category = await findOne(models.CATEGORY, params)
    if (!category) throw new HttpError(404, 'Category not found')
    res.status(200).json({ data: category, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateCategory
 * @description Controller for PUT /api/categories/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateCategory = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.CATEGORY, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteCategory
 * @description Controller for DELETE /api/categories/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteCategory = async ({ params }, res, next) => {
  try {
    await updateOne(models.CATEGORY, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
}
