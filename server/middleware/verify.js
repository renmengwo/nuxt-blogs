/* const Token = require('../../assets/utils/Token'); */
const Constant = require('../constant/index');
function verifyToken (req, res, next) {
  if (req.headers.cookie) {
    next()
  } else {
    res.json(Constant.TOKEN_ERROR())
  }
}

const exportObj = {
  verifyToken
}

module.exports = exportObj
