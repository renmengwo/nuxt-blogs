const { Op } = require('sequelize');
const ArticleModel = require('../model/article');
const Constant = require('../constant/index');
const Common = require('../common/index');
const CateModel = require('../model/cate');
const UserModel = require('../model/user');
const Token = require('../../assets/utils/Token');

// 获取文章列表公共方法
function PublicQueryList(whereCondition, pageNumber, pageSize, list, resObj) {
  const QueryList = {
    query:['checkParams', (result, callback) => {
      ArticleModel.findAndCountAll({
        where: whereCondition,
        order: [['created_at', 'DESC']], // 按照创建时间的正序查询
        offset: (parseInt(pageNumber) - 1) * parseInt(pageSize) || 0, // 分页，从第几条开始查询
        limit: parseInt(pageSize) || 20 // 一次查询多少条，默认20条
      }).then((res) => {
        const cataIds = res.rows.map(item => item.cate);
        const userIds = res.rows.map(item => item.userId);
        res.rows.forEach((item) => {
          const obj = {
            id: item.id,
            title: item.title,
            status: item.status,
            createAt: item.createAt,
            content: item.content,
            cate: item.cate,
            createdAt: item.createdAt,
            userId: item.userId
            //  cateName: item.Cate.name
          };
          list.push(obj);
        });
        resObj.value = {
          count: res.count
        };
        callback(null, { cataIds, userIds });
      }).catch((error) => {
        callback(Constant.DEFAULT_ERROR(error));
      });
    }],
    GetCateName: ['query', (results, callback) => {
      const { cataIds } = results.query;
      CateModel.findAll({
        where: {
          id: {
            [Op.or]: cataIds
          }
        }
      }).then((res) => {
        list.forEach(artitem => {
          res.forEach(cateitem => {
            if (artitem.cate === cateitem.id) {
              artitem.cateName = cateitem.name
            }
          })
        });
        callback(null);
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }],
    GetUserName: ['query', (results, callback) => {
      const { userIds } = results.query;
      UserModel.findAll({
        where: {
          id: {
            [Op.or]: userIds
          }
        }
      }).then((res) => {
        list.forEach(artitem => {
          res.forEach(useritem => {
            if (artitem.userId === useritem.id) {
              artitem.userName = useritem.username
            }
          })
        });
        resObj.value.list = list;
        callback(null);
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }]
  }
  return QueryList
}

// 获取文章列表
function getArticleList (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('操作成功'));
  const { title, pageNumber, pageSize, cate } = req.query;
  const list = [];
  const whereCondition = {
    status:1
  };
  if (title) {
    whereCondition.title = {
      [Op.like] : `%${title}%`
    }
  }
  if (cate) {
    whereCondition.cate = cate
  }
  let tasks = {
    checkParams: (callback) => {
      callback(null);
    }
    /* query: ['checkParams', (result, callback) => {
      ArticleModel.findAndCountAll({
        where: whereCondition,
        order: [['created_at', 'DESC']], // 按照创建时间的正序查询
        offset: (parseInt(pageNumber) - 1) * parseInt(pageSize) || 0, // 分页，从第几条开始查询
        limit: parseInt(pageSize) || 20 // 一次查询多少条，默认20条
        /!* include: [{ // 关联cate表进行联表查询
          model: CateModel
        }] *!/
      }).then((res) => {
        const cataIds = res.rows.map(item => item.cate);
        const userIds = res.rows.map(item => item.userId);
        res.rows.forEach((item) => {
          const obj = {
            id: item.id,
            title: item.title,
            status: item.status,
            createAt: item.createAt,
            content: item.content,
            cate: item.cate,
            createdAt: item.createdAt,
            userId: item.userId
            //  cateName: item.Cate.name
          };
          list.push(obj);
        });
        resObj.value = {
          count: res.count
        };
        callback(null, { cataIds, userIds });
      }).catch((error) => {
        callback(Constant.DEFAULT_ERROR(error));
      });
    }],
    GetCateName: ['query', (results, callback) => {
      const { cataIds } = results.query;
      CateModel.findAll({
        where: {
          id: {
            [Op.or]: cataIds
          }
        }
      }).then((res) => {
        list.forEach(artitem => {
          res.forEach(cateitem => {
            if (artitem.cate === cateitem.id) {
              artitem.cateName = cateitem.name
            }
          })
        });
        callback(null);
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }],
    GetUserName: ['query', (results, callback) => {
      const { userIds } = results.query;
      UserModel.findAll({
        where: {
          id: {
            [Op.or]: userIds
          }
        }
      }).then((res) => {
        list.forEach(artitem => {
          res.forEach(useritem => {
            if (artitem.userId === useritem.id) {
              artitem.userName = useritem.username
            }
          })
        });
        resObj.value.list = list;
        callback(null);
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }] */
  };
  const resuleQuery = PublicQueryList(whereCondition, pageNumber, pageSize, list, resObj)
  tasks = Object.assign(tasks, resuleQuery);
  Common.autoFn(tasks, res, resObj);
}

// 添加文章
function addArticle (req, res) {

}

// 更新文章
function updateArticle (req, res) {

}

// 获取文章详情
function getArticleInfo (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('操作成功'));
  const { id } = req.query;
  const tasks = {
    checkParams: (callback) => {
      Common.checkParams(req.query, ['id'], callback);
    },
    query: ['checkParams', (result, callback) => {
      ArticleModel.findByPk(id).then(res => {
        if (res) {
          resObj.value = {
            id: res.id,
            title: res.title,
            content: res.content,
            userId: res.userId,
            cateId: res.cate,
            createdAt: res.createdAt,
            updatedAt: res.updatedAt
          }
        }
        const body = {
          userId: res.userId,
          cateId: res.cate
        }
        callback(null, body);
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }],
    getAritcleUser: ['query', (results, callback) => {
      const { userId } = results.query;
      UserModel.findByPk(userId).then(res => {
        if (res) {
          resObj.value.username = res.username
          callback(null);
        }
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }],
    getAritcleCate: ['query', (results, callback) => {
      const { cateId } = results.query;
      CateModel.findByPk(cateId).then(res => {
        if (res) {
          resObj.value.catename = res.name
          callback(null);
        }
      }).catch(error => {
        callback(Constant.DEFAULT_ERROR(error));
      })
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

// 查询用户文章列表
function queryUserArticle (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('操作成功'));
  const authorization = req.headers.cookie.split('=')[1];
  const { data } = Token.decrypt(authorization)
  const { pageNumber, pageSize } = req.query;
  const list = [];
  const whereCondition = {
    status:1,
    user_id: data.id
  };
  let tasks = {
    checkParams: (callback) => {
      Common.checkParams(data, ['id'], callback);
    }
  };
  const resuleQuery = PublicQueryList(whereCondition, pageNumber, pageSize, list, resObj)
  tasks = Object.assign(tasks, resuleQuery);
  Common.autoFn(tasks, res, resObj);
}

const exportObj = {
  getArticleList,
  addArticle,
  getArticleInfo,
  queryUserArticle,
  updateArticle
};

module.exports = exportObj;
