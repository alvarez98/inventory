const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')
const { authSchm, refreshSchm } = require('../schemes/auth')
const { auth, refresh } = require('../controllers/auth')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/signin',
  validate(authSchm, 'body'),
  validateItemExist(
    models.USER,
    'body',
    'email',
    'El correo no está registrado'
  ),
  auth
)
router.post(
  '/refresh',
  validate(refreshSchm, 'body'),
  refresh
)
module.exports = router
