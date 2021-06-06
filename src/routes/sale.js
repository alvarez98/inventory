const express = require('express')
const router = express.Router()

const {
  addSale,
  getSales,
  getOneSale,
  updateSale,
  deleteSale
} = require('../controllers/sale')
const {
  addSaleSchm,
  getOneSaleSchm,
  getSalesSchm,
  updateSaleSchm
} = require('../schemes/sale')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addSaleSchm, 'body'),
  validateItemNotExist(models.SALE, 'email', 'body'),
  addSale
)
router.get('/', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getSalesSchm, 'query'), getSales)
router.get('/:id', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getOneSaleSchm, 'params'), getOneSale)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneSaleSchm, 'params'),
  validateItemExist(models.SALE, 'id', 'params'),
  deleteSale
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneSaleSchm, 'params'),
  validateItemExist(models.SALE, 'id', 'params'),
  validate(updateSaleSchm, 'body'),
  validateItemNotExist(models.SALE, 'email', 'body'),
  updateSale
)

module.exports = router
