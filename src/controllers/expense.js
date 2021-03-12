const HttpError = require('../classes/httpError')
const add = require('../db/controllers/add')
const find = require('../db/controllers/find')
const findOne = require('../db/controllers/findOne')
const updateOne = require('../db/controllers/updateOne')
const models = require('../db/keys')
const Models = require('../db/models')
const generateID = require('../utils/generateID')

/**
 * @function addUser
 * @description Controller for POST /api/expenses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */
const addExpense = async ({ body }, res, next) => {
  try {
    body.id = generateID()
    const expense = await add(models.EXPENSE, body)
    res.status(201).json({ id: expense.id, message: 'Created' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getExpenses
 * @description Controller for GET /api/expenses
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express middleware function
 */

const getExpenses = async ({ query }, res, next) => {
  try {
    const { limit = 20, order = ['id', 'ASC'], offset = 0, ...filters } = query
    filters.isActive = true
    const expenses = await find(models.EXPENSE, filters, order, limit, offset)
    res.status(200).json({ data: expenses, count: expenses.length, offset })
  } catch (error) {
    next(error)
  }
}

/**
 * @function getOneExpense
 * @description Controller for GET /api/expenses/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const getOneExpense = async ({ params }, res, next) => {
  try {
    const expense = await findOne(models.EXPENSE, params)
    if (!expense) throw new HttpError(404, 'Expense not found')
    res.status(200).json({ data: expense, message: 'Success' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function updateExpense
 * @description Controller for PUT /api/expenses/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const updateExpense = async ({ params, body }, res, next) => {
  try {
    await updateOne(models.EXPENSE, params.id, body)
    res.status(200).json({ id: params.id, message: 'Updated' })
  } catch (error) {
    next(error)
  }
}

/**
 * @function deleteExpense
 * @description Controller for DELETE /api/expenses/:id
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

const deleteExpense = async ({ params }, res, next) => {
  try {
    await updateOne(models.EXPENSE, params.id, { isActive: false })
    res.status(200).json({ id: params.id, message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addExpense,
  getExpenses,
  getOneExpense,
  updateExpense,
  deleteExpense,
}
