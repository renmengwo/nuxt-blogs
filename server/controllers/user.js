const UserModel = require('../model/user');
const Constant = require('../constant/index');
const Common = require('../common/index');
const Token = require('../../assets/utils/Token');
const TOKEN_EXPIRE_SECOND = 3600; // 设置token的过期时间，单位为s
function addUser (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('添加成功'));
  const { username, password } = req.body;
  const tasks = {
    checkParams: (callback) => {
      Common.checkParams(req.body, ['username', 'password'], callback);
    },
    query: ['checkParams', (results, callback) => {
      UserModel.create({
        username,
        password,
        role: 2,
        status: 1
      }).then((result) => {
        callback(null);
      }).catch((error) => {
        callback(Constant.DEFAULT_ERROR(error.parent.sqlMessage));
      });
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

function login (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('登录成功'));
  const { username, password } = req.body;
  const tasks = {
    checkParams: (callback) => {
      Common.checkParams(req.body, ['username', 'password'], callback);
    },
    query: ['checkParams', (results, callback) => {
      UserModel.findOne({
        where: {
          username,
          password
        }
      }).then((result) => {
        if (result) {
          const adminInFo = {
            id: result.id,
            role: result.role
          };
          const token = Token.encrypt(adminInFo, TOKEN_EXPIRE_SECOND);
          resObj.value = {
            // userId: result.id,
            username: result.username,
            token
          };
          callback(null);
        } else {
          callback(Constant.LOGIN_ERROR());
        }
      }).catch((error) => {
        callback(Constant.DEFAULT_ERROR(error.parent.sqlMessage));
      });
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

function getUserInfo (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('查询成功'));
  const authorization = req.headers.cookie.split('=')[1]
  const { data } = Token.decrypt(authorization);
  const tasks = {
    checkParams: (callback) => {
      Common.checkParams(data, ['id'], callback);
    },
    query: ['checkParams', (results, callback) => {
      UserModel.findByPk(data.id).then((result) => {
        if (result) {
          resObj.value = {
            username: result.username,
            userId: result.id,
            role: result.role,
            status: result.status
          };
          callback(null);
        }
      }).catch((error) => {
        callback(Constant.DEFAULT_ERROR(error));
      });
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

const exoprtObj = {
  addUser,
  login,
  getUserInfo
};

module.exports = exoprtObj;
