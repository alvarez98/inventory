const express = require('express')
const router = express.Router()

const validate = require('../middlewares/validate')
const { authSchm } = require('../schemes/auth')
const { auth } = require('../controllers/auth')
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

module.exports = router
