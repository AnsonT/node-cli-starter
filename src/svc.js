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
    script: __filename
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
  console.log('installing Hello World')
  svc.install(() => {
    console.log('installed')
    svc.start(() => {
      console.log('started')
    })
  })
}

export function uninstall () {
  checkRoot()
  const svc = initService()
  svc.uninstall()
}
