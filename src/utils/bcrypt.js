const bcrypt = require('bcrypt')
const { Configuration, Keys } = require('../config')

module.exports = {
  encrypt: async (data) => {
    const salt = bcrypt.genSaltSync(parseInt(Configuration.get(Keys.BCRYPT_HASH_ROUND)))
    return bcrypt.hash(data, salt)
  },
  compare: (plaintText, hash) => bcrypt.compare(plaintText, hash)
}
