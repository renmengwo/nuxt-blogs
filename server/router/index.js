const express = require('express')
const router = new express.Router()
const CateRouter = require('./cate')
const ArticleRouter = require('./article')
const UserRouter = require('./user')

router.use('/cate', CateRouter)
router.use('/article', ArticleRouter)
router.use('/user', UserRouter)

module.exports = router
