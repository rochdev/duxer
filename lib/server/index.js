const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const config = require('../../config');

const paths = config.utils_paths;
const app = new Koa();
const root = paths.dist();

if (config.env === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('../../build/webpack.config');
  const webpackDevMiddleware = require('./middleware/webpack-dev');
  const webpackHMRMiddleware = require('./middleware/webpack-hmr');

  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')));
} else {
  // Serving ~/dist by default.
  app.use(serve(root));
}

// This rewrites all routes requests to the root /index.html file
app.use((ctx) => send(ctx, '/index.htm', {root: root}));

// Export the server
if (config.env === 'production') {
  const koaBunyanLogger = require('koa-bunyan-logger');

  // Logging
  const bunyan = koaBunyanLogger.bunyan;
  const log = bunyan.createLogger({
    name: 'koa',
    level: 'info',
    serializers: bunyan.stdSerializers
  });

  app.use(koaBunyanLogger(log));
  app.use(koaBunyanLogger.timeContext());
  app.use(koaBunyanLogger.requestIdContext());
  app.use(koaBunyanLogger.requestLogger());

  // Serving ~/dist by default.
  app.use(serve(root));

  // Event handling
  app.on('error', () => {});
  process.on('exit', (code) => log.info({code}, 'stopped'));
  process.on('SIGINT', () => process.exit());
  process.on('SIGTERM', () => process.exit());

  app.listen(config.server_port, () => log.info('started'));
} else {
  app.listen(config.server_port, () => {
    const _debug = require('debug');

    const debug = _debug('app:bin:server');
    const port = config.server_port;
    const host = config.server_host;

    debug(`Server is now running at http://${host}:${port}.`);
    debug(`Server accessible via localhost:${port} if you are using the project defaults.`);
  });
}
