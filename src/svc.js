import pm2 from 'pm2'
import http from 'http'

const processName = `Hello World`

export default function init () {
  console.log('init')
  http.createServer((req, res) => {
    res.write('Hello world! 2')
    res.end()
  }).listen(8080)
}

export function start () {
  console.log('start')
  pm2.connect((err) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start({
      name: processName,
      script: __filename,
      env: {
        'AS_BACKGROUND': 1
      }
    }, (err, apps) => {
      pm2.disconnect()
      if (err) throw err
    })
  })
}

export function stop () {
  console.log('stop')
  pm2.connect((err) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.delete(processName, (err) => {
      if (err) throw err
      console.log('stopped')
      process.exit(0)
    })
  })
}

export function status () {
  console.log('status')
  pm2.connect((err) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.describe(processName, (err, desc) => {
      if (err) throw err
      console.log(desc)
      process.exit(0)
    })
  })
}

export function log () {
  pm2.connect((err) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
  })
}
