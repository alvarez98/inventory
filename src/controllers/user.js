const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildUserFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const { encrypt } = require('../utils/bcrypt')

/**
 * @function addUser
 * @description Controller for POST /api/users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addUser = async ({ body }, res, next) => {
  try {
    body.password = await encrypt(body.password)
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
    const users = await find(
      models.USER,
      buildUserFilters(filters),
      order,
      limit,
      offset
    )
    res.status(200).json({
      data: users.rows,
      count: users.count,
      current: users.rows.length,
      offset
    })
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
    const user = await findOne(models.USER, { ...params, isActive: true })
    if (!user) throw new HttpError(400, 'User not found')
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
    if (body.password) body.password = await encrypt(body.password)
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
  deleteUser
}
