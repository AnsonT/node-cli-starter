import http from 'http'
import { Service } from 'node-mac'
import isRoot from 'is-root'

export default function init () {
  console.log('Started Hello World')
  const server = http.createServer((req, res) => {
    res.write('Hello World!')
    res.end()
  })
  server.listen(8080)
}

function initService () {
  return new Service({
    name: 'Hello World',
    description: 'Example node.js web server',
    env: [{
      name: 'AS_BACKGROUND',
      value: '1'
    }],
    script: __filename,
    wait: 2,
    grow: 0.5,
    maxRetries: 3
  })
}

function checkRoot () {
  if (!isRoot()) {
    console.log('Must run with sudo')
    process.exit(77)
  }
}

export function install () {
  checkRoot()
  const svc = initService()
  svc.install(() => {
    console.log('service installed')
    svc.start(() => {
      console.log('service started')
    })
  })
}

export function uninstall () {
  checkRoot()
  const svc = initService()
  svc.uninstall(() => {
    console.log('service uninstalled')
  })
}

export function start () {
  checkRoot()
  const svc = initService()
  svc.start(() => {
    console.log('service start')
  })
}
export function stop () {
  checkRoot()
  const svc = initService()
  svc.stop(() => {
    console.log('service stopped')
  })
}

export function restart () {
  checkRoot()
  const svc = initService()
  svc.restart(() => {
    console.log('service restarted')
  })
}
