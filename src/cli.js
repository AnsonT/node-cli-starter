import program from 'commander'
import stringArgv from 'string-argv'
import { install, uninstall, restart, start, stop } from './svc'

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
    .command('install')
    .action(install)

  program
    .command('restart')
    .action(restart)

  program
    .command('start')
    .action(start)

  program
    .command('stop')
    .action(stop)

  program
    .command('uninstall')
    .action(uninstall)

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
