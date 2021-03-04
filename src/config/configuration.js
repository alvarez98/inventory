const fs = require('fs')
const { parse } = require('dotenv')

class Configuration {
  envConfig = {}
  constructor() {
    if (Configuration.instance) return Configuration.instance
    const { NODE_ENV } = process.env
    let envFileVersion = '.env'
    if (NODE_ENV === 'production') envFileVersion += '.production'
    else if (NODE_ENV === 'test') envFileVersion += '.test'

    const envFilePath = `${__dirname}/../../${envFileVersion}`
    const existsPath = fs.existsSync(envFilePath)
    if (!existsPath) {
      console.error(`${envFileVersion} file not exists`)
      process.exit(0)
    }
    const file = fs.readFileSync(envFilePath)
    this.envConfig = parse(file)
    Configuration.instance = this
  }

  get(key) {
    return this.envConfig[key]
  }
}

const instance = new Configuration()
Object.freeze(instance)

module.exports = instance
