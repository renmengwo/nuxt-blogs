const { DataTypes } = require('sequelize');
const db = require('../db/MySql');

const Article = db.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.STRING,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: 'article'
});

module.exports = Article;
/*
Article.belongsTo(CateModel, {
  foreignKey: 'cate',
  constraints: false
});
*/
