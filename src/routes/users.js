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

router.post('/', validate(addUserSchm, 'body'), addUser)
router.get('/', validate(getUsersSchm, 'query'), getUsers)
router.get('/:id', validate(getOneUserSchm, 'params'), getOneUser)
router.delete('/:id', validate(getOneUserSchm, 'params'), deleteUser)
router.put(
  '/:id',
  validate(getOneUserSchm, 'params'),
  validate(updateUserSchm, 'body'),
  updateUser
)

module.exports = router
