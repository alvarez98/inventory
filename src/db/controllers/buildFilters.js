const { Op } = require('sequelize')

const conditionals = {
  equal: Op.eq,
  less: Op.lte,
  greater: Op.gte
}

exports.buildBuyFilters = (data) => {
  if (data.quantity) { data.quantity = { [conditionals[data.quantity[1]]]: data.quantity[0] } }
  return data
}

exports.buildBuyOrderFilters = (data) => {
  if (data.totalBuy) { data.totalBuy = { [conditionals[data.totalBuy[1]]]: data.totalBuy[0] } }
  if (data.date) data.date = { [conditionals[data.date[1]]]: data.date[0] }
  if (data.status) data.status = { [Op.like]: data.status }
  return data
}

exports.buildCategoryFilters = (data) => {
  if (data.name) data.name = { [Op.like]: data.name }
  if (data.description) data.description = { [Op.like]: data.description }
  return data
}

exports.buildExpenseFilters = (data) => {
  if (data.name) data.name = { [Op.like]: data.name }
  if (data.description) data.description = { [Op.like]: data.description }
  return data
}

exports.buildCategoryFilters = (data) => {
  if (data.total) data.total = { [conditionals[data.total[1]]]: data.total[0] }
  if (data.date) data.date = { [conditionals[data.date[1]]]: data.date[0] }
  if (data.name) data.name = { [Op.like]: data.name }
  if (data.description) data.description = { [Op.like]: data.description }
  return data
}

exports.buildInventoryFilters = (data) => {
  if (data.quantity) { data.quantity = { [conditionals[data.quantity[1]]]: data.quantity[0] } }
  if (data.expiration) { data.expiration = { [conditionals[data.expiration[1]]]: data.expiration[0] } }
  if (data.status) data.status = { [Op.like]: data.status }
  return data
}

exports.buildProductFilters = (data) => {
  if (data.price) data.price = { [conditionals[data.price[1]]]: data.price[0] }
  if (data.cost) data.cost = { [conditionals[data.cost[1]]]: data.cost[0] }
  if (data.code) data.code = { [conditionals.equal]: data.code }
  if (data.description) data.description = { [Op.like]: data.description }
  if (data.status) data.status = { [Op.like]: data.status }
  return data
}

exports.buildProfileFilters = (data) => {
  if (data.birthday) { data.birthday = { [conditionals[data.birthday[1]]]: data.birthday[0] } }
  return data
}

exports.buildProviderFilters = (data) => {
  if (data.name) data.name = { [Op.like]: data.name }
  if (data.address) data.address = { [Op.like]: data.address }
  if (data.country) data.country = { [Op.like]: data.country }
  if (data.city) data.city = { [Op.like]: data.city }
  if (data.state) data.state = { [Op.like]: data.state }
  if (data.email) data.email = { [Op.like]: data.email }
  return data
}

exports.buildSaleOrderFilters = (data) => {
  if (data.date) data.date = { [conditionals[data.date[1]]]: data.date[0] }
  if (data.totalSaleOrder) {
    data.totalSaleOrder = {
      [conditionals[data.totalSaleOrder[1]]]: data.totalSaleOrder[0]
    }
  }
  if (data.status) data.status = { [Op.like]: data.status }
  return data
}

exports.buildSaleFilters = (data) => {
  if (data.quantity) { data.quantity = { [conditionals[data.quantity[1]]]: data.quantity[0] } }
  if (data.discount) { data.discount = { [conditionals[data.discount[1]]]: data.discount[0] } }
  if (data.total) data.total = { [conditionals[data.total[1]]]: data.total[0] }
  return data
}

exports.buildUserFilters = (data) => {
  if (data.email) data.email = { [Op.like]: data.email }
  if (data.firstname) data.firstname = { [Op.like]: data.firstname }
  if (data.lastname) data.lastname = { [Op.like]: data.lastname }
  return data
}
