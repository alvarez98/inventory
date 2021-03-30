const express = require('express')
const router = express.Router()

const {
  addCategory,
  getCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category')
const {
  addCategorySchm,
  getOneCategorySchm,
  getCategoriesSchm,
  updateCategorySchm,
} = require('../schemes/category')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addCategorySchm, 'body'),
  validateItemNotExist(models.CATEGORY, 'email', 'body'),
  addCategory
)
router.get('/', validate(getCategoriesSchm, 'query'), getCategories)
router.get('/:id', validate(getOneCategorySchm, 'params'), getOneCategory)
router.delete(
  '/:id',
  validate(getOneCategorySchm, 'params'),
  validateItemExist(models.CATEGORY, 'id', 'params'),
  deleteCategory
)
router.put(
  '/:id',
  validate(getOneCategorySchm, 'params'),
  validateItemExist(models.CATEGORY, 'id', 'params'),
  validate(updateCategorySchm, 'body'),
  validateItemNotExist(models.CATEGORY, 'email', 'body'),
  updateCategory
)

module.exports = router
