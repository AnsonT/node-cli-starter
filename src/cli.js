import program from 'commander'
import stringArgv from 'string-argv'
import { start, stop, status, log } from './svc'

function setupCli () {
  var argv = process.argv

  // For Neutrino Debugging:
  // neutrino start --options.env.COMMAND_LINE='--help'
  if (process.env.COMMAND_LINE) {
    argv = stringArgv(
      process.env.COMMAND_LINE,
      'node',
      __filename
    )
  }

  program
    .version('0.0.1', '-v, --version')

  program
    .command('start')
    .action(start)

  program
    .command('stop')
    .action(stop)

  program
    .command('status')
    .action(status)

  program
    .command('log')
    .action(log)

  program
    .command('*')
    .action(() => { program.help() })

  program
    .parse(argv)

  if (!process.argv.slice(2).length) {
    program.help()
  }
}

export default setupCli
