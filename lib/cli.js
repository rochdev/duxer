const commander = require('commander')

commander
  .command('test', 'run unit tests')
  .command('server', 'run the application')
  .command('dev', 'run the application in development mode')
  .command('build', 'build the application')
  .parse(process.argv)
