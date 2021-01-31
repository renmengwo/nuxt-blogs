const jwt = require('jsonwebtoken')
const tokenKey = 'UT0ZO#wZ7!@50rtK' // 设定一个密钥，用来加密解密Token

const Token = {
  /*
  * Token 加密方法
  * @params data 需要加密在Token中的数据
  * @params time Token的过期时间， 单位s
  * @return {*} 返回一个Token
  * */
  encrypt (data, time) {
    return jwt.sign(data, tokenKey, { expiresIn: time })
  },
  /*
  * Token 解密方法
  * @params token 加密之后的token
  * @return {*} 返回对象
  * {{token：boolean（true表示token合法，false则为不合法），data：* （解密出来的数据或者错误信息）}}
  * */
  decrypt (token) {
    try {
      const data = jwt.verify(token, tokenKey)
      return {
        token: true,
        data
      }
    } catch (e) {
      return {
        token: false,
        data: e
      }
    }
  }

}

module.exports = Token
