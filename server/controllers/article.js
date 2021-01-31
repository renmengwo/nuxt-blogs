const ArticleModel = require('../model/article')
const Constant = require('../constant/index')
const Common = require('../common/index')
const CateModel = require('../model/cate')
// 获取文章列表
function getArticleList (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('操作成功'))
  const { title, pageNumber, pageSize } = req.query
  const whereCondition = {}
  if (title) { whereCondition.title = title }
  const tasks = {
    checkParams: (callback) => {
      callback(null)
    },
    query:['checkParams', (result, callback) => {
      ArticleModel.findAndCountAll({
        where: whereCondition,
        order: [['created_at', 'DESC']], // 按照创建时间的正序查询
        offset: (parseInt(pageNumber) - 1) * parseInt(pageSize) || 0, // 分页，从第几条开始查询
        limit: parseInt(pageSize) || 20, // 一次查询多少条，默认20条
        include: [{ // 关联cate表进行联表查询
          model: CateModel
        }]
      }).then(res => {
        const list = []
        res.rows.forEach((item) => {
          const obj = {
            id: item.id,
            title: item.title,
            status: item.status,
            createAt: item.createAt,
            content: item.content,
            cate: item.cate,
            cateName: item.Cate.name
          }
          list.push(obj)
        })
        resObj.data = {
          list,
          count: res.count
        }
        callback(null)
      }).catch((error) => {
        callback(Constant.DEFAULT_ERROR(error.parent.sqlMessage))
      })
    }]
  }
  Common.autoFn(tasks, res, resObj)
}

// 添加文章
function addArticle (req, res) {

}

// 更新文章
function updateArticle (req, res) {

}

// 获取文章详情
function getArticleInfo (req, res) {

}

const exportObj = {
  getArticleList,
  addArticle,
  getArticleInfo,
  updateArticle
}

module.exports = exportObj
