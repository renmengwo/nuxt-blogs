const obj = {
  // 默认请求成功
  DEFAULT_SUCCESS (msg) {
    return {
      status: 1,
      msg
    };
  },
  // 默认请求失败
  DEFAULT_ERROR (msg) {
    return {
      status: -1,
      msg
    };
  },
  // 定义错误返回-缺少必要的参数
  LACK (msg) {
    return {
      status: -1,
      msg
    };
  },
  LOGIN_ERROR () {
    return {
      status: -1,
      msg: '用户名或者密码不对'
    };
  }
};
module.exports = obj;
