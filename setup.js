var path = require('path');

process.env.NODE_PATH = path.join(process.cwd(), 'src');
require('module').Module._initPaths();

function noop () {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.md'] = noop;
require.extensions['.png'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;

try {
  require(path.join(process.cwd(), 'test', 'setup'));
} catch (e) {
  // continue without custom setup
}
