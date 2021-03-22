const path = require('path');
const express = require('express');
const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const app = require('express')();
const port = process.env.PORT || 3000;
const indexRouter = require('./server/router/index');
// We instantiate Nuxt.js with the options
const config = require('./nuxt.config.js');
const nuxt = new Nuxt(config);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', indexRouter);
app.use(nuxt.render);

// Build only in dev mode
if (config.dev) {
  new Builder(nuxt).build();
}

// Listen the server
app.listen(port);
console.log('服务器运行于 localhost:' + port);
