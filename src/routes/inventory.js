const express = require('express')
const router = express.Router()

const {
  getInventories,
  getOneInventory,
  updateInventory,
  deleteInventory
} = require('../controllers/inventory')
const {
  getOneInventorySchm,
  getInventoriesSchm,
  updateInventorySchm
} = require('../schemes/inventory')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.get('/', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getInventoriesSchm, 'query'), getInventories)
router.get('/:id', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getOneInventorySchm, 'params'), getOneInventory)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneInventorySchm, 'params'),
  validateItemExist(models.INVENTORY, 'id', 'params'),
  deleteInventory
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneInventorySchm, 'params'),
  validateItemExist(models.INVENTORY, 'id', 'params'),
  validate(updateInventorySchm, 'body'),
  validateItemNotExist(models.INVENTORY, 'email', 'body'),
  updateInventory
)

module.exports = router
