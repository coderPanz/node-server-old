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
          res.json(data);
          // 转换菜单数据为树形结构
          // function buildMenuTree(menus) {
          //   const menuMap = {};
          //   const rootNodes = [];

          //   // 将菜单项转换成以 _id 为 key 的对象
          //   menus.forEach((menu) => {
          //     menuMap[menu._id] = menu;
          //     menu.children = [];
          //   });

          //   // 构建菜单树
          //   menus.forEach((menu) => {
          //     if (menu.parentId) {
          //       // 当前菜单不是根节点，将其加入父节点的 children 属性中
          //       const parent = menuMap[menu.parentId];
          //       parent.children.push(menu);
          //     } else {
          //       // 当前菜单是根节点，将其加入 rootNodes 数组中
          //       rootNodes.push(menu);
          //     }
          //   });

          //   return rootNodes;
          // }
          // const menuTree = buildMenuTree(menuIdList)
        });
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
