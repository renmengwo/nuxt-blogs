const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const ArticleModeRouter = require('../controllers/article');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.get('/getArticleList', ArticleModeRouter.getArticleList);
router.get('/queryUserArticle', ArticleModeRouter.queryUserArticle);
router.get('/queryArticleDetails', ArticleModeRouter.getArticleInfo);
router.post('/addArticle', ArticleModeRouter.addArticle);

module.exports = router;
