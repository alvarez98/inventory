'use strict'
const express = require('express')
const api = express.Router()
const userRouter = require('./user')
const profileRouter = require('./profile')
const expenseRouter = require('./expense')

api.use('/profiles', profileRouter)
api.use('/expenses', expenseRouter)
api.use('/users', userRouter)
api.get('/', (req, res) => {
  res.send({ message: 'Home' })
})

module.exports = api
