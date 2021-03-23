const express = require('express');
const router = new express.Router();
const bodyParser = require('body-parser');
const UserModelRouter = require('../controllers/user');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.post('/login', UserModelRouter.login);
router.post('/addUser', UserModelRouter.addUser);
router.post('/getUserInfo', UserModelRouter.getUserInfo);

module.exports = router;
