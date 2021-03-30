const express = require('express')
const router = express.Router()

const {
  addProduct,
  getProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product')
const {
  addProductSchm,
  getOneProductSchm,
  getProductsSchm,
  updateProductSchm,
} = require('../schemes/product')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addProductSchm, 'body'),
  validateItemNotExist(models.PRODUCT, 'email', 'body'),
  addProduct
)
router.get('/', validate(getProductsSchm, 'query'), getProducts)
router.get('/:id', validate(getOneProductSchm, 'params'), getOneProduct)
router.delete(
  '/:id',
  validate(getOneProductSchm, 'params'),
  validateItemExist(models.PRODUCT, 'id', 'params'),
  deleteProduct
)
router.put(
  '/:id',
  validate(getOneProductSchm, 'params'),
  validateItemExist(models.PRODUCT, 'id', 'params'),
  validate(updateProductSchm, 'body'),
  validateItemNotExist(models.PRODUCT, 'email', 'body'),
  updateProduct
)

module.exports = router
