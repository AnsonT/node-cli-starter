import setupCli from './cli'
import initSvc from './svc'

if (process.env.AS_BACKGROUND) {
  initSvc()
} else {
  setupCli()
}

if (module.hot) {
  module.hot.accept('./cli')
}
