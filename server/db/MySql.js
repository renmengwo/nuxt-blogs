const { Sequelize } = require('sequelize')
const MYSQL_CONFIG = require('../config/db')

const sequelize = new Sequelize(
  MYSQL_CONFIG.MYSQL.database,
  MYSQL_CONFIG.MYSQL.username,
  MYSQL_CONFIG.MYSQL.password, {
    host: MYSQL_CONFIG.MYSQL.host,
    dialect: 'mysql', // 数据库类型
    logging: MYSQL_CONFIG.DEBUG ? console.log : false, // 是否打印日志
    // 配置数据库连接池
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    timezone: '+08:00' // 时区设置
  }
)

module.exports = sequelize
