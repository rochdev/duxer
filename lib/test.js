const path = require('path')
const spawn = require('child_process').spawn
const config = require('../config')

var istanbul = require.resolve('istanbul/lib/cli')
var mocha = require.resolve('mocha/bin/_mocha')

spawn('babel-node', [
  '--presets', config.presets().join(','),
  istanbul, 'cover',
  mocha,
  '--',
  'src/*/*.js',
  'test/**/*.spec.js',
  '--recursive',
  '--require', path.normalize(path.join(__dirname, '..', 'setup'))
], {stdio: 'inherit'})
