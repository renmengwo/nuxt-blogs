const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const verifyMiddleware = require('../middleware/verify');
const ArticleModeRouter = require('../controllers/article');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.get('/getArticleList', ArticleModeRouter.getArticleList);
router.get('/queryUserArticle', verifyMiddleware.verifyToken, ArticleModeRouter.queryUserArticle);
router.get('/queryArticleDetails', ArticleModeRouter.getArticleInfo);
router.post('/addArticle', verifyMiddleware.verifyToken, ArticleModeRouter.addArticle);
router.post('/updateArticle', verifyMiddleware.verifyToken, ArticleModeRouter.updateArticle);
router.post('/setDisabledArticle', verifyMiddleware.verifyToken, ArticleModeRouter.setDisabledArticle);

module.exports = router;
