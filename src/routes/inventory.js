const express = require('express')
const router = express.Router()

const {
  addInventory,
  getInventories,
  getOneInventory,
  updateInventory,
  deleteInventory,
} = require('../controllers/inventory')
const {
  addInventorySchm,
  getOneInventorySchm,
  getInventoriesSchm,
  updateInventorySchm,
} = require('../schemes/inventory')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addInventorySchm, 'body'),
  validateItemNotExist(models.INVENTORY, 'email', 'body'),
  addInventory
)
router.get('/', validate(getInventoriesSchm, 'query'), getInventories)
router.get('/:id', validate(getOneInventorySchm, 'params'), getOneInventory)
router.delete(
  '/:id',
  validate(getOneInventorySchm, 'params'),
  validateItemExist(models.INVENTORY, 'id', 'params'),
  deleteInventory
)
router.put(
  '/:id',
  validate(getOneInventorySchm, 'params'),
  validateItemExist(models.INVENTORY, 'id', 'params'),
  validate(updateInventorySchm, 'body'),
  validateItemNotExist(models.INVENTORY, 'email', 'body'),
  updateInventory
)

module.exports = router
