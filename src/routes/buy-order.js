const express = require('express')
const router = express.Router()

const {
  addBuyOrder,
  getBuyOrders,
  getOneBuyOrder,
  updateBuyOrder,
  deleteBuyOrder,
} = require('../controllers/buy-order')
const {
  addBuyOrderSchm,
  getOneBuyOrderSchm,
  getBuyOrdersSchm,
  updateBuyOrderSchm,
} = require('../schemes/buy-order')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addBuyOrderSchm, 'body'),
  validateItemNotExist(models.BUYORDER, 'email', 'body'),
  addBuyOrder
)
router.get('/', validate(getBuyOrdersSchm, 'query'), getBuyOrders)
router.get('/:id', validate(getOneBuyOrderSchm, 'params'), getOneBuyOrder)
router.delete(
  '/:id',
  validate(getOneBuyOrderSchm, 'params'),
  validateItemExist(models.BUYORDER, 'id', 'params'),
  deleteBuyOrder
)
router.put(
  '/:id',
  validate(getOneBuyOrderSchm, 'params'),
  validateItemExist(models.BUYORDER, 'id', 'params'),
  validate(updateBuyOrderSchm, 'body'),
  validateItemNotExist(models.BUYORDER, 'email', 'body'),
  updateBuyOrder
)

module.exports = router
