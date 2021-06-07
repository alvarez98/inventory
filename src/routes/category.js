const express = require('express')
const router = express.Router()

const {
  addCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category')
const {
  addCategorySchm,
  getOneCategorySchm,
  getCategoriesSchm,
  updateCategorySchm
} = require('../schemes/category')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addCategorySchm, 'body'),
  validateItemNotExist(models.CATEGORY, 'body', 'name', 'El nombre de la categoría ya ha sido registrado'),
  addCategory
)
router.get('/', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getCategoriesSchm, 'query'), getCategories)
router.get('/:id', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getOneCategorySchm, 'params'), getOneCategory)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneCategorySchm, 'params'),
  validateItemExist(models.CATEGORY, 'id', 'params', 'No se encontró la categoría'),
  deleteCategory
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneCategorySchm, 'params'),
  validateItemExist(models.CATEGORY, 'params', 'id', 'No se encontró la categoría'),
  validate(updateCategorySchm, 'body'),
  validateItemNotExist(models.CATEGORY, 'body', 'name', 'El nombre de la categoría ya ha sido registrado'),
  updateCategory
)

module.exports = router
