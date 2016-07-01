const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');
const config = require('../../config');

const paths = config.utils_paths;
const app = new Koa();
const root = paths.dist();

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

// This rewrites all routes requests to the root /index.html file
app.use((ctx) => send(ctx, '/index.htm', {root: root}));

// Start the server
app.listen(config.server_port, () => {
  const _debug = require('debug');

  const debug = _debug('app:bin:server');
  const port = config.server_port;
  const host = config.server_host;

  debug(`Server is now running at http://${host}:${port}.`);
  debug(`Server accessible via localhost:${port} if you are using the project defaults.`);
});
