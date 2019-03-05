import convict from 'convict'

const configSchema = {
}

function initConfig () {
  const config = convict(configSchema)
  return config
}

const config = initConfig()

export default config
