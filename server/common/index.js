const async = require('async');
const constant = require('../constant/index');

/*
* 克隆方法，克隆一个对象
* @params obj
* @returns {any}
* */
const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/*
* 校验参数全局方法
* @params params   请求的参数
* @params checkArr 需要验证的参数
* @returns callback 回调
* */
const checkParams = (params, checkArr, callback) => {
  let flag = true;
  checkArr.forEach((item) => {
    if (!params[item]) { flag = false; }
  });
  if (flag) {
    callback(null);
  } else {
    callback(constant.LACK('参数不正确'));
  }
};

/*
* 返回同一方法，返回JSON格式数据
* @params tasks 当前controllers 执行tasks
* @params res 当前controllers responese
* @params resobj 当前controllers 返回json对象
* */
const autoFn = (tasks, res, resobj) => {
  async.auto(tasks, (err) => {
    if (err) {
      res.json({
        status: err.status || constant.DEFAULT_ERROR().status,
        msg: err.msg || JSON.stringify(err)
      });
    } else {
      res.json(resobj);
    }
  });
};

const exportobj = {
  clone,
  checkParams,
  autoFn
};

module.exports = exportobj;
