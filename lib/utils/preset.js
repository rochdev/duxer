const path = require('path')

module.exports = function preset (name) {
  return path.join(require.resolve('babel-preset-' + name))
}
