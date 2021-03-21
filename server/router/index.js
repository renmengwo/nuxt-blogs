const express = require('express');
const router = new express.Router();
const CateRouter = require('./cate');
const ArticleRouter = require('./article');
const UserRouter = require('./user');
router.use('/user', UserRouter);
router.use('/cate', CateRouter);
router.use('/article', ArticleRouter);

module.exports = router;
