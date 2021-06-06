const express = require('express')
const router = express.Router()

const {
  addProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product')
const {
  addProductSchm,
  getOneProductSchm,
  getProductsSchm,
  updateProductSchm
} = require('../schemes/product')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addProductSchm, 'body'),
  validateItemExist(models.PROVIDER, 'body', 'providerId', 'No se reconoce el proveedor', 'id'),
  validateItemExist(models.CATEGORY, 'body', 'categoryId', 'No se reconoce la categoría', 'id'),
  addProduct
)
router.get('/', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getProductsSchm, 'query'), getProducts)
router.get('/:id', validate(getOneProductSchm, 'params'), getOneProduct)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneProductSchm, 'params'),
  validateItemExist(models.PRODUCT, 'id', 'params'),
  deleteProduct
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneProductSchm, 'params'),
  validateItemExist(models.PRODUCT, 'id', 'params'),
  validate(updateProductSchm, 'body'),
  validateItemNotExist(models.PRODUCT, 'email', 'body'),
  updateProduct
)

module.exports = router
