const express = require('express')
const router = express.Router()

const {
  addExpense,
  getExpenses,
  getOneExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense')
const {
  addExpenseSchm,
  getOneExpenseSchm,
  getExpensesSchm,
  updateExpenseSchm,
} = require('../schemes/expense')
const validate = require('../middlewares/validate')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addExpenseSchm, 'body'),
  addExpense
)
router.get('/', validate(getExpensesSchm, 'query'), getExpenses)
router.get('/:id', validate(getOneExpenseSchm, 'params'), getOneExpense)
router.delete(
  '/:id',
  validate(getOneExpenseSchm, 'params'),
  validateItemExist(models.EXPENSE, 'id', 'params'),
  deleteExpense
)
router.put(
  '/:id',
  validate(getOneExpenseSchm, 'params'),
  validateItemExist(models.EXPENSE, 'id', 'params'),
  validate(updateExpenseSchm, 'body'),
  updateExpense
)

module.exports = router
