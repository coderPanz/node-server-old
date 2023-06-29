const menuModel = require("../models/menu");
const roleModel = require("../models/role");
// 获取角色菜单树, 在服务器操作返回前端数据即可, 而不是在前端进行频繁的循环查询
exports.menuTree = (req, res) => {
  let id = req.params.id;
  roleModel
    .findOne({ id: id })
    .then((data) => {
      if (data !== null) {
        // 获取角色信息中的menus
        const menuIdList = data.menus;
        console.log(menuIdList);
        menuModel.find({ _id: { $in: menuIdList } }).then((data) => {
          res.json(data)
        })
      } else {
        console.log("查询失败!");
        res.status(404).json({
          msg: "查询失败!",
        });
      }
    })
    .catch((err) => {
      console.log("查询异常!");
      res.status(500);
    });
};
