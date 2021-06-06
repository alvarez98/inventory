const express = require('express')
const router = express.Router()

const {
  addSaleOrder,
  getSaleOrders,
  getOneSaleOrder,
  updateSaleOrder,
  deleteSaleOrder,
} = require('../controllers/sale-order')
const { addSale } = require('../controllers/sale')
const {
  addSaleOrderSchm,
  getOneSaleOrderSchm,
  getSaleOrdersSchm,
  updateSaleOrderSchm,
} = require('../schemes/sale-order')
const { addSaleSchm, addSaleParamSchm } = require('../schemes/sale')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addSaleOrderSchm, 'body'),
  validateItemNotExist(models.SALEORDER, 'body', 'email'),
  addSaleOrder
)
router.post(
  '/:saleOrderId/sales',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addSaleParamSchm, 'params'),
  validateItemExist(
    models.SALEORDER,
    'params',
    'saleOrderId',
    'No se encontró la orden de venta',
    'id'
  ),
  validate(addSaleSchm, 'body'),
  validateItemExist(
    models.PRODUCT,
    'body',
    'items',
    'EL producto no ha sido registrado',
    'id',
    'productId'
  ),
  addSale
)
router.get(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getSaleOrdersSchm, 'query'),
  getSaleOrders
)
router.get(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneSaleOrderSchm, 'params'),
  getOneSaleOrder
)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneSaleOrderSchm, 'params'),
  validateItemExist(models.SALEORDER, 'id', 'params'),
  deleteSaleOrder
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneSaleOrderSchm, 'params'),
  validateItemExist(models.SALEORDER, 'id', 'params'),
  validate(updateSaleOrderSchm, 'body'),
  validateItemNotExist(models.SALEORDER, 'email', 'body'),
  updateSaleOrder
)

module.exports = router
