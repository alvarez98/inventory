const express = require('express')
const router = express.Router()

const {
  addProvider,
  getProviders,
  getOneProvider,
  updateProvider,
  deleteProvider
} = require('../controllers/provider')
const {
  addProviderSchm,
  getOneProviderSchm,
  getProvidersSchm,
  updateProviderSchm
} = require('../schemes/provider')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addProviderSchm, 'body'),
  validateItemNotExist(models.PROVIDER, 'body', 'email'),
  addProvider
)
router.get('/', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getProvidersSchm, 'query'), getProviders)
router.get('/:id', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getOneProviderSchm, 'params'), getOneProvider)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneProviderSchm, 'params'),
  validateItemExist(models.PROVIDER, 'id', 'params'),
  deleteProvider
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneProviderSchm, 'params'),
  validateItemExist(models.PROVIDER, 'id', 'params'),
  validate(updateProviderSchm, 'body'),
  validateItemNotExist(models.PROVIDER, 'email', 'body'),
  updateProvider
)

module.exports = router
