import setupCli from './cli'
import svc from './svc'

if (process.env.AS_BACKGROUND) {
  console.log('Starting Hello World Service')
  svc()
} else {
  setupCli()
}

if (module.hot) {
  module.hot.accept('./cli')
}
