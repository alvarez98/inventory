const { Configuration, Keys } = require('../../config')

module.exports = {
  development: {
    username: Configuration.get(Keys.DB_USER),
    password: Configuration.get(Keys.DB_PASSWORD),
    database: Configuration.get(Keys.DB_NAME),
    host: Configuration.get(Keys.DB_HOST),
    dialect: 'postgres',
    port: Configuration.get(Keys.DB_PORT)
  },
  test: {
    username: Configuration.get(Keys.DB_USER),
    password: Configuration.get(Keys.DB_PASSWORD),
    database: Configuration.get(Keys.DB_NAME),
    host: Configuration.get(Keys.DB_HOST),
    dialect: 'postgres',
    port: Configuration.get(Keys.DB_PORT),
    logging: false
  },
  production: {
    username: Configuration.get(Keys.DB_USER),
    password: Configuration.get(Keys.DB_PASSWORD),
    database: Configuration.get(Keys.DB_NAME),
    host: Configuration.get(Keys.DB_HOST),
    dialect: 'postgres',
    port: Configuration.get(Keys.DB_PORT)
  }
}
