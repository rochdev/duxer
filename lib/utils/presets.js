const preset = require('./preset')

module.exports = function presets (names) {
  names = Array.prototype.slice.call(arguments)
  return names.map(preset)
}
