const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const find = require('../db/controllers/find')
const findByPk = require('../db/controllers/findByPk')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')

/**
 * @function addUser
 * @description Controller for POST /api/users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addUser = async ({ body }, res, next) => {
  try {
    const user = await add(models.USER, body)
    res.status(201).json({ id: user.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getUsers
 * @description Controller for GET /api/users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getUsers = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const ntfcs = await find(
      models.USER,
      filters,
      ['password'],
      order,
      limit,
      offset,
    )
    res.status(200).json({ data: ntfcs, count: ntfcs.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneUser
 * @description Controller for GET /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneUser = async ({ params }, res, next) => {
  try {
    const user = await findByPk(models.USER, params.id)
    if (!user) throw new HttpError(404, 'User not found')
    res.status(200).json({ data: user, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateUser
 * @description Controller for PUT /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateUser = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.USER, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteUser
 * @description Controller for DELETE /api/users/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteUser = async ({ params }, res, next) => {
  try {
    await updateOne(models.USER, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
}