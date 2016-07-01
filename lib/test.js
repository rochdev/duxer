const path = require('path')
const spawn = require('child_process').spawn
const presets = require('./utils/presets')

var istanbul = require.resolve('istanbul/lib/cli')
var mocha = require.resolve('mocha/bin/_mocha')

spawn('babel-node', [
  '--presets', presets('es2015', 'react', 'stage-0').join(','),
  istanbul, 'cover',
  mocha,
  '--',
  '--recursive',
  '--require', path.normalize(path.join(__dirname, '..', 'setup'))
], {stdio: 'inherit'})
