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
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addExpenseSchm, 'body'),
  addExpense
)
router.get(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getExpensesSchm, 'query'),
  getExpenses
)
router.get(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneExpenseSchm, 'params'),
  getOneExpense
)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneExpenseSchm, 'params'),
  validateItemExist(models.EXPENSE, 'id', 'params'),
  deleteExpense
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneExpenseSchm, 'params'),
  validateItemExist(models.EXPENSE, 'id', 'params'),
  validate(updateExpenseSchm, 'body'),
  updateExpense
)

module.exports = router
