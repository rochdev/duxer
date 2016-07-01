const WebpackHotMiddleware = require('webpack-hot-middleware')
const applyExpressMiddleware = require('../lib/apply-express-middleware')
const _debug = require('debug')

const debug = _debug('app:server:webpack-hmr')

module.exports = function (compiler, opts) {
  debug('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = WebpackHotMiddleware(compiler, opts)
  return function koaWebpackHMR (ctx, next) {
    applyExpressMiddleware(middleware, ctx.req, ctx.res).then(hasNext => {
      if (hasNext && next) {
        return next()
      }
    })
  }
}
