'use strict'
const express = require('express')
const api = express.Router()
const userRouter = require('./users')

api.use('/users', userRouter)
api.get('/', (req, res) => {
  res.send({ message: 'Home' })
})

module.exports = api
