const express = require('express')
const router = express.Router()

const {
  addUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser
} = require('../controllers/user')
const {
  addUserSchm,
  getOneUserSchm,
  getUsersSchm,
  updateUserSchm
} = require('../schemes/user')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')
const { guard, ROLES } = require('../middlewares/guard')

router.post(
  '/',
  guard(ROLES.ADMIN),
  validate(addUserSchm, 'body'),
  validateItemNotExist(models.USER, 'body', 'email', 'El email ya ha sido registrado con otra cuenta'),
  addUser
)
router.get('/', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getUsersSchm, 'query'), getUsers)
router.get('/:id', guard(ROLES.ADMIN, ROLES.CASHIER), validate(getOneUserSchm, 'params'), getOneUser)
router.delete(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneUserSchm, 'params'),
  validateItemExist(models.USER, 'params', 'id', 'No se encontró el usuario'),
  deleteUser
)
router.put(
  '/:id',
  guard(ROLES.ADMIN),
  validate(getOneUserSchm, 'params'),
  validateItemExist(models.USER, 'params', 'id', 'No se encontró el usuario'),
  validate(updateUserSchm, 'body'),
  validateItemNotExist(models.USER, 'body', 'email', 'El email ya ha sido usado'),
  updateUser
)

module.exports = router
