const express = require('express')
const router = new express.Router()
const ArticleModeRouter = require('../controllers/article')
router.get('/getArticleList', ArticleModeRouter.getArticleList)

module.exports = router
