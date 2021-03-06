const express = require('express');
const router = new express.Router();
const UserModelRouter = require('../controllers/user');
router.post('/addUser', UserModelRouter.addUser);
router.post('/login', UserModelRouter.login);
router.post('/getUserInfo', UserModelRouter.getUserInfo);

module.exports = router;
