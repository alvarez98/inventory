const express = require('express')
const router = express.Router()

const {
  getBuys,
  getOneBuy,
  updateBuy,
  deleteBuy,
} = require('../controllers/buy')
const { getOneBuySchm, getBuysSchm, updateBuySchm } = require('../schemes/buy')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.get(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getBuysSchm, 'query'),
  getBuys
)
router.get(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneBuySchm, 'params'),
  getOneBuy
)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneBuySchm, 'params'),
  validateItemExist(models.BUY, 'id', 'params'),
  deleteBuy
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneBuySchm, 'params'),
  validateItemExist(models.BUY, 'id', 'params'),
  validate(updateBuySchm, 'body'),
  validateItemNotExist(models.BUY, 'email', 'body'),
  updateBuy
)

module.exports = router
