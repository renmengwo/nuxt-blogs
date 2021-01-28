const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const port = process.env.PORT || 3334
const indexRouter = require('./server/router/index')
// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
app.use('/', indexRouter)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build()
}

// Listen the server
app.listen(port)
console.log('服务器运行于 localhost:' + port)
