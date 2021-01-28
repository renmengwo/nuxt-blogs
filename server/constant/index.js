const obj = {
  // 默认请求成功
  DEFAULT_SUCCESS: {
    status: 1,
    msg: '查询成功'
  },
  // 默认请求失败
  DEFAULT_ERROR: {
    status: -1,
    msg: '系统错误'
  },
  // 定义错误返回-缺少必要的参数
  LACK: {
    status: -1,
    msg: '缺少必要的参数'
  }
}
module.exports = obj
