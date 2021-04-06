const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildInventoryFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const generateID = require('../utils/generateID')

/**
 * @function addInventory
 * @description Controller for POST /api/inventories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addInventory = async ({ body }, res, next) => {
  try {
    body.id = generateID()
    const inventory = await add(models.INVENTORY, body)
    res.status(201).json({ id: inventory.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getInventories
 * @description Controller for GET /api/inventories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getInventories = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const inventories = await find(
      models.INVENTORY,
      buildInventoryFilters(filters),
      order,
      limit,
      offset
    )
    res
      .status(200)
      .json({
        data: inventories.rows,
        count: inventories.count,
        current: inventories.rows.length,
        offset,
      })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneInventory
 * @description Controller for GET /api/inventories/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneInventory = async ({ params }, res, next) => {
  try {
    const inventory = await findOne(models.INVENTORY, { ...params, isActive: true })
    if (!inventory) throw new HttpError(404, 'Inventory not found')
    res.status(200).json({ data: inventory, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateInventory
 * @description Controller for PUT /api/inventories/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateInventory = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.INVENTORY, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteInventory
 * @description Controller for DELETE /api/inventories/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteInventory = async ({ params }, res, next) => {
  try {
    await updateOne(models.INVENTORY, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addInventory,
  getInventories,
  getOneInventory,
  updateInventory,
  deleteInventory,
}
