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
const { addBuy } = require('../controllers/buy')
const { addBuySchm, addBuyParamSchm } = require('../schemes/buy')
const validate = require('../middlewares/validate')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN),
  validate(addBuyOrderSchm, 'body'),
  validateItemExist(
    models.PROVIDER,
    'body',
    'providerId',
    'No se encontró el proveedor',
    'id'
  ),
  addBuyOrder
)
router.post(
  '/:buyOrderId/buys',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addBuyParamSchm, 'params'),
  validateItemExist(
    models.BUYORDER,
    'params',
    'buyOrderId',
    'No se encontró la orden de compra',
    'id'
  ),
  validate(addBuySchm, 'body'),
  validateItemExist(
    models.PRODUCT,
    'body',
    'items',
    'EL producto no ha sido registrado',
    'id',
    'productId'
  ),
  addBuy
)
router.get(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getBuyOrdersSchm, 'query'),
  getBuyOrders
)
router.get(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneBuyOrderSchm, 'params'),
  getOneBuyOrder
)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneBuyOrderSchm, 'params'),
  validateItemExist(
    models.BUYORDER,
    'params',
    'id',
    'No se encontró la orden de compra'
  ),
  deleteBuyOrder
)
router.put(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneBuyOrderSchm, 'params'),
  validateItemExist(
    models.BUYORDER,
    'params',
    'id',
    'No se encontró la orden de compra'
  ),
  validate(updateBuyOrderSchm, 'body'),
  validateItemExist(
    models.PROVIDER,
    'body',
    'providerId',
    'No se reconoce el proveedor',
    'id'
  ),
  updateBuyOrder
)

module.exports = router
