const express = require('express')
const router = express.Router()

const {
  addUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../controllers/users')
const {
  addUserSchm,
  getOneUserSchm,
  getUsersSchm,
  updateUserSchm,
} = require('../schemes/user')
const validate = require('../middlewares/validate')
const validateEmailExist = require('../middlewares/validateEmailExist')
const validateItemExist = require('../middlewares/validateItemExist')
const models = require('../db/keys')

router.post('/', validate(addUserSchm, 'body'), validateEmailExist, addUser)
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
  validateEmailExist,
  updateUser
)

module.exports = router
