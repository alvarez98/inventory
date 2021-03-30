const express = require('express')
const router = express.Router()

const {
  addSaleOrder,
  getSaleOrders,
  getOneSaleOrder,
  updateSaleOrder,
  deleteSaleOrder,
} = require('../controllers/sale-order')
const {
  addSaleOrderSchm,
  getOneSaleOrderSchm,
  getSaleOrdersSchm,
  updateSaleOrderSchm,
} = require('../schemes/sale-order')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addSaleOrderSchm, 'body'),
  validateItemNotExist(models.SALEORDER, 'email', 'body'),
  addSaleOrder
)
router.get('/', validate(getSaleOrdersSchm, 'query'), getSaleOrders)
router.get('/:id', validate(getOneSaleOrderSchm, 'params'), getOneSaleOrder)
router.delete(
  '/:id',
  validate(getOneSaleOrderSchm, 'params'),
  validateItemExist(models.SALEORDER, 'id', 'params'),
  deleteSaleOrder
)
router.put(
  '/:id',
  validate(getOneSaleOrderSchm, 'params'),
  validateItemExist(models.SALEORDER, 'id', 'params'),
  validate(updateSaleOrderSchm, 'body'),
  validateItemNotExist(models.SALEORDER, 'email', 'body'),
  updateSaleOrder
)

module.exports = router
