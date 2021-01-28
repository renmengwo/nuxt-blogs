const express = require('express')
const router = new express.Router()
const CateRouter = require('./cate')

router.use('/cate', CateRouter)

module.exports = router
