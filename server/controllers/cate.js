const CateModel = require('../model/cate')

function getCateList (req, res) {
  const { status } = req.query
  CateModel.findAll({
    where: {
      status: status || '' // 默认查找所有的
    }
  }).then((result) => {
    res.json(result)
  }).catch((error) => {
    res.json(error)
  })
}
const exportObj = {
  getCateList
}

module.exports = exportObj
