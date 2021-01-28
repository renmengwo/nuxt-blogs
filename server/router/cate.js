const express = require('express')
const router = new express.Router()
const CateModelRouter = require('../controllers/cate')
router.get('/getCateList', CateModelRouter.getCateList)

module.exports = router
