const Koa = require('koa')
const serve = require('koa-static')
const send = require('koa-send')
const config = require('../../config')

const paths = config.utils_paths
const app = new Koa()
const root = paths.dist()

// Serving ~/dist by default.
app.use(serve(root))

// This rewrites all routes requests to the root /index.html file
app.use((ctx) => send(ctx, '/index.htm', {root: root}))

// Logging
const koaBunyanLogger = require('koa-bunyan-logger')
const bunyan = koaBunyanLogger.bunyan
const log = bunyan.createLogger({
  name: 'koa',
  level: 'info',
  serializers: bunyan.stdSerializers
})

app.use(koaBunyanLogger(log))
app.use(koaBunyanLogger.timeContext())
app.use(koaBunyanLogger.requestIdContext())
app.use(koaBunyanLogger.requestLogger())

// Serving ~/dist by default.
app.use(serve(root))

// Event handling
app.on('error', () => {
})
process.on('exit', (code) => log.info({code}, 'stopped'))
process.on('SIGINT', () => process.exit())
process.on('SIGTERM', () => process.exit())

// Start the server
app.listen(config.server_port, () => log.info('started'))
