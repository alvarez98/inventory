'use strict'
const express = require('express')
const api = express.Router()

api.use('/profiles', require('./profile'))
api.use('/expenses', require('./expense'))
api.use('/users', require('./user'))
api.use('/buy-orders', require('./buy-order'))
api.use('/buys', require('./buy'))
api.use('/categories', require('./category'))
api.use('/inventories', require('./inventory'))
api.use('/products', require('./product'))
api.use('/providers', require('./provider'))
api.use('/sale-orders', require('./sale-order'))
api.use('/sales', require('./sale'))
api.get('/', (req, res) => {
  res.send({ message: 'Home' })
})

module.exports = api
