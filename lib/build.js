const fs = require('fs-extra')
const _debug = require('debug')
const webpackCompiler = require('../build/webpack-compiler')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const debug = _debug('app:bin:compile')
const paths = config.utils_paths

debug('Run compiler')
webpackCompiler(webpackConfig)
  .then(stats => {
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
    debug('Copy static assets to dist folder.')
    fs.copySync(paths.client('static'), paths.dist())
  })
  .catch((e) => {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  })
