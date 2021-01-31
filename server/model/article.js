const { DataTypes } = require('sequelize')
const db = require('../db/MySql')
const CateModel = require('./cate')

const Article = db.define('Article', {
  id: {
    type:DataTypes.INTEGER,
    allowNull :false,
    autoIncrement: true,
    primaryKey : true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cate: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  author: {
    type:DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  tableName: 'article'
})

module.exports = Article
Article.belongsTo(CateModel, {
  foreignKey: 'cate',
  constraints: false
})
