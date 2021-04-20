const express = require('express')
const router = express.Router()

const {
  addProvider,
  getProviders,
  getOneProvider,
  updateProvider,
  deleteProvider,
} = require('../controllers/provider')
const {
  addProviderSchm,
  getOneProviderSchm,
  getProvidersSchm,
  updateProviderSchm,
} = require('../schemes/provider')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addProviderSchm, 'body'),
  validateItemNotExist(models.PROVIDER, 'email', 'body'),
  addProvider
)
router.get('/', validate(getProvidersSchm, 'query'), getProviders)
router.get('/:id', validate(getOneProviderSchm, 'params'), getOneProvider)
router.delete(
  '/:id',
  validate(getOneProviderSchm, 'params'),
  validateItemExist(models.PROVIDER, 'id', 'params'),
  deleteProvider
)
router.put(
  '/:id',
  validate(getOneProviderSchm, 'params'),
  validateItemExist(models.PROVIDER, 'id', 'params'),
  validate(updateProviderSchm, 'body'),
  validateItemNotExist(models.PROVIDER, 'email', 'body'),
  updateProvider
)

module.exports = router
