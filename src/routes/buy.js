const express = require('express')
const router = express.Router()

const {
  addBuy,
  getBuys,
  getOneBuy,
  updateBuy,
  deleteBuy,
} = require('../controllers/buy')
const {
  addBuySchm,
  getOneBuySchm,
  getBuysSchm,
  updateBuySchm,
} = require('../schemes/buy')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addBuySchm, 'body'),
  validateItemNotExist(models.BUY, 'email', 'body'),
  addBuy
)
router.get('/', validate(getBuysSchm, 'query'), getBuys)
router.get('/:id', validate(getOneBuySchm, 'params'), getOneBuy)
router.delete(
  '/:id',
  validate(getOneBuySchm, 'params'),
  validateItemExist(models.BUY, 'id', 'params'),
  deleteBuy
)
router.put(
  '/:id',
  validate(getOneBuySchm, 'params'),
  validateItemExist(models.BUY, 'id', 'params'),
  validate(updateBuySchm, 'body'),
  validateItemNotExist(models.BUY, 'email', 'body'),
  updateBuy
)

module.exports = router
