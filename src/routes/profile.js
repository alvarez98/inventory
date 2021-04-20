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

router.post(
  '/',
  validate(addProfileSchm, 'body'),
  validateItemExist(models.USER, ['user_id', 'id'], 'body'),
  validateItemNotExist(models.PROFILE, 'dni', 'body'),
  addProfile
)
router.get('/', validate(getProfilesSchm, 'query'), getProfiles)
router.get('/:id', validate(getOneProfileSchm, 'params'), getOneProfile)
router.delete(
  '/:id',
  validate(getOneProfileSchm, 'params'),
  validateItemExist(models.PROFILE, 'id', 'params'),
  deleteProfile
)
router.put(
  '/:id',
  validate(getOneProfileSchm, 'params'),
  validateItemExist(models.PROFILE, 'id', 'params'),
  validate(updateProfileSchm, 'body'),
  updateProfile
)

module.exports = router
