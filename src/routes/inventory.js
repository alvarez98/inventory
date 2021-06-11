const express = require('express')
const router = express.Router()

const {
  getInventories,
  getOneInventory
} = require('../controllers/inventory')
const {
  getOneInventorySchm,
  getInventoriesSchm
} = require('../schemes/inventory')
const validate = require('../middlewares/validate')
const { guard, ROLES } = require('../middlewares/guard')

router.get(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getInventoriesSchm, 'query'),
  getInventories
)
router.get(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneInventorySchm, 'params'),
  getOneInventory
)

module.exports = router
