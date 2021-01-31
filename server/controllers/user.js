const UserModel = require('../model/user')
const Constant = require('../constant/index')
const Common = require('../common/index')
function addUser (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('添加成功'))
  const { username, password } = req.body
  const tasks = {
    checkParams: (callback) => {
      Common.checkParams(req.body, ['username', 'password'], callback)
    },
    query:['checkParams', (results, callback) => {
      UserModel.create({
        username,
        password,
        role: 2,
        status: 1
      }).then(result => {
        callback(null)
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error.parent.sqlMessage))
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function login (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('登录成功'))
  const { username, password } = req.body
  const tasks = {
    checkParams: (callback) => {
      Common.checkParams(req.body, ['username', 'password'], callback)
    },
    query:['checkParams', (results, callback) => {
      UserModel.findOne({
        where: {
          username,
          password
        }
      }).then(result => {
        if (result) {
          console.log(result)
          callback(null)
        } else {
          callback(Constant.LOGIN_ERROR())
        }
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error.parent.sqlMessage))
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

function getUserInfo () {

}

const exoprtObj = {
  addUser,
  login,
  getUserInfo
}

module.exports = exoprtObj
