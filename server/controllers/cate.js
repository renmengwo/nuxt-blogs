const CateModel = require('../model/cate');
const Constant = require('../constant/index');
const Common = require('../common/index');

// 获取分类下拉列表
function getCateList (req, res) {
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS('操作成功'));
  const tasks = {
    checkParams: (callback) => {
      callback(null);
    },
    query: ['checkParams', (result, callback) => {
      CateModel.findAll({
        where: {
          status: 1 // 默认查找所有启用的
        }
      }).then((result) => {
        if (result) {
          const list = [];

          result.forEach((item) => {
            const obj = {
              id: item.id,
              name: item.name,
              status: item.status
            };
            list.push(obj);
          });
          resObj.value = list;
          callback(null);
        }
      }).catch((error) => {
        console.log(error);
        callback(Constant.DEFAULT_ERROR(error.parent.sqlMessage));
      });
    }]
  };
  Common.autoFn(tasks, res, resObj);
}

const exportObj = {
  getCateList
};

module.exports = exportObj;
