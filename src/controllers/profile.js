const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const { buildProfileFilters } = require('../db/controllers/buildFilters')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const Models = require('../db/models')
const models = require('../db/keys')

/**
 * @function addUser
 * @description Controller for POST /api/profiles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addProfile = async ({ body }, res, next) => {
  try {
    const profile = await add(models.PROFILE, body)
    res.status(201).json({ id: profile.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getProfiles
 * @description Controller for GET /api/profiles
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getProfiles = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const profiles = await find(
      models.PROFILE,
      buildProfileFilters(filters),
      order,
      limit,
      offset,
      [
        {
          model: Models[models.USER],
          as: 'user'
        }
      ]
    )
    res.status(200).json({
      data: profiles.rows,
      count: profiles.count,
      current: profiles.rows.length,
      offset
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneProfile
 * @description Controller for GET /api/profiles/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneProfile = async ({ params }, res, next) => {
  try {
    const profile = await findOne(models.PROFILE, { ...params, isActive: true }, [
      {
        model: Models[models.USER],
        as: 'user'
      }
    ])
    if (!profile) throw new HttpError(404, 'Profile not found')
    res.status(200).json({ data: profile, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateProfile
 * @description Controller for PUT /api/profiles/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateProfile = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.PROFILE, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteProfile
 * @description Controller for DELETE /api/profiles/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteProfile = async ({ params }, res, next) => {
  try {
    await updateOne(models.PROFILE, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addProfile,
  getProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile
}
