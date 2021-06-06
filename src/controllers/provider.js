const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildProviderFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')

/**
 * @function addProvider
 * @description Controller for POST /api/providers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addProvider = async ({ body }, res, next) => {
  try {
    const provider = await add(models.PROVIDER, body)
    res.status(201).json({ id: provider.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getProviders
 * @description Controller for GET /api/providers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getProviders = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const providers = await find(
      models.PROVIDER,
      buildProviderFilters(filters),
      order,
      limit,
      offset
    )
    res.status(200).json({
      data: providers.rows,
      count: providers.count,
      current: providers.rows.length,
      offset
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneProvider
 * @description Controller for GET /api/providers/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneProvider = async ({ params }, res, next) => {
  try {
    const provider = await findOne(models.PROVIDER, { ...params, isActive: true })
    if (!provider) throw new HttpError(404, 'Provider not found')
    res.status(200).json({ data: provider, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateProvider
 * @description Controller for PUT /api/providers/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateProvider = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.PROVIDER, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteProvider
 * @description Controller for DELETE /api/providers/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteProvider = async ({ params }, res, next) => {
  try {
    await updateOne(models.PROVIDER, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addProvider,
  getProviders,
  getOneProvider,
  updateProvider,
  deleteProvider
}
