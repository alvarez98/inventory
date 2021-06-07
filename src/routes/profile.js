const express = require('express')
const router = express.Router()

const {
  addProfile,
  getProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/profile')
const {
  addProfileSchm,
  getOneProfileSchm,
  getProfilesSchm,
  updateProfileSchm,
} = require('../schemes/profile')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(addProfileSchm, 'body'),
  validateItemExist(
    models.USER,
    'body',
    'user_id',
    'No se encontró el usuario',
    'id'
  ),
  validateItemNotExist(
    models.PROFILE,
    'body',
    'user_id',
    'El usuario ya cuenta con un perfil'
  ),
  validateItemNotExist(
    models.PROFILE,
    'body',
    'dni',
    'El DNI ya ha sido registrado'
  ),
  addProfile
)
router.get(
  '/',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getProfilesSchm, 'query'),
  getProfiles
)
router.get(
  '/:id',
  guard(ROLES.ADMIN, ROLES.CASHIER),
  validate(getOneProfileSchm, 'params'),
  getOneProfile
)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneProfileSchm, 'params'),
  validateItemExist(models.PROFILE, 'params', 'id', 'No se encontró el perfil'),
  deleteProfile
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneProfileSchm, 'params'),
  validateItemExist(models.PROFILE, 'params', 'id', 'No se encontró el perfil'),
  validate(updateProfileSchm, 'body'),
  updateProfile
)

module.exports = router
