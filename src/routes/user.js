const express = require('express')
const router = express.Router()

const {
  addUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/user')
const {
  addUserSchm,
  getOneUserSchm,
  getUsersSchm,
  updateUserSchm,
} = require('../schemes/user')
const validate = require('../middlewares/validate')
const validateItemNotExist = require('../middlewares/validateItemNotExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post(
  '/',
  validate(addUserSchm, 'body'),
  validateItemNotExist(models.USER, 'email', 'body'),
  addUser
)
router.get('/', validate(getUsersSchm, 'query'), getUsers)
router.get('/:id', validate(getOneUserSchm, 'params'), getOneUser)
router.delete(
  '/:id',
  validate(getOneUserSchm, 'params'),
  validateItemExist(models.USER, 'id', 'params'),
  deleteUser
)
router.put(
  '/:id',
  validate(getOneUserSchm, 'params'),
  validateItemExist(models.USER, 'id', 'params'),
  validate(updateUserSchm, 'body'),
  validateItemNotExist(models.USER, 'email', 'body'),
  updateUser
)

module.exports = router
