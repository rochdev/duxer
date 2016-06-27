const commander = require('commander');

commander
  .command('test', 'run unit tests')
  .command('server', 'run the application')
  .command('build', 'build the application')
  .parse(process.argv);
