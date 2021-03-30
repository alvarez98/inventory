const express = require('express')
const router = express.Router()

const {
  addBuy,
  getBuys,
  getOneBuy,
  updateBuy,
  deleteBuy,
} = require('../controllers/buy-order')
const {
  addBuySchm,
  getOneBuySchm,
  getBuysSchm,
  updateBuySchm,
} = require('../schemes/buy-order')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addBuySchm, 'body'),
  validateItemNotExist(models.BUYORDER, 'email', 'body'),
  addBuy
)
router.get('/', validate(getBuysSchm, 'query'), getBuys)
router.get('/:id', validate(getOneBuySchm, 'params'), getOneBuy)
router.delete(
  '/:id',
  validate(getOneBuySchm, 'params'),
  validateItemExist(models.BUYORDER, 'id', 'params'),
  deleteBuy
)
router.put(
  '/:id',
  validate(getOneBuySchm, 'params'),
  validateItemExist(models.BUYORDER, 'id', 'params'),
  validate(updateBuySchm, 'body'),
  validateItemNotExist(models.BUYORDER, 'email', 'body'),
  updateBuy
)

module.exports = router
