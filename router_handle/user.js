// 导入模型对象
const userModel = require("../models/user");

// 更新修改后的文档对象
// userModel.updateMany({}, { $set: { name: "coderPanz" }}).then(() => {
//   console.log('文档更新成功');
// })
// .catch((error) => {
//   console.error('文档更新失败:', error);
// });

exports.list = (req, res) => {
  // 需求: 需要设计前端的分页操作
  // 第一次打开网页默认在第一页的话offset此时为0, 我们需要只需要返回前十条数据
  // 但是需要返回数据总个数
  const { offset, size } = req.body;
  if (offset === 0) {
    userModel
      .find()
      .then((data) => {
        if (data !== null) {
          console.log("用户列表: ", data);
          // 统计返回值的个数, 以便前端做分页展示
          const count = data.length;
          // 返回指定数据
          if (size < count) {
            const result = data.splice(0, size);
            res.status(200).json({
              data: result,
              count: count,
            })
          } else {
            res.status(200).json({
              data: data,
              count: count,
            })
          }
        } else {
          console.log("查询失败", data);
          res.status(404).json({
            msg: "查询失败!",
          });
        }
      })
      .catch((err) => {
        console.log("查询异常!", err);
        res.status(500).json({
          msg: "查询异常!",
        });
      });
  } else {
    userModel
      .find()
      .then((data) => {
        if (data !== null) {
          console.log("用户列表: ", data);
          // 统计返回值的个数, 以便前端做分页展示
          const count = data.length;
          // 返回指定数据
          if(offset < count) {
            const result = data.splice(0, offset);
            res.status(200).json({
              data: result,
              count: count,
            });
          } else {
            res.status(200).json({
              data: data,
              count: count,
            });
          }
        } else {
          console.log("查询失败", data);
          res.status(404).json({
            msg: "查询失败!",
          });
        }
      })
      .catch((err) => {
        console.log("查询异常!", err);
        res.status(500).json({
          msg: "查询异常!",
        });
      });
  }
}; // 获取用户列表

exports.create = (req, res) => {
  let userDoc = req.body;
  userModel
    .create(userDoc)
    .then((data) => {
      if (data !== null) {
        console.log("创建成功!");
        res.status(201).json({
          msg: "创建成功!",
          data: data,
        });
      } else {
        console.log("创建失败!");
        res.status(500).json({
          msg: "创建失败!",
        });
      }
    })
    .catch((err) => {
      console.log("创建异常!", err);
      // err不能返回到客户端, 所以不需要返回err给客户端
      res.status(500).json({
        msg: "创建异常!",
      });
    });
}; // 创建用户

exports.update = (req, res) => {
  let id = req.params.id;
  let userDoc = req.body;
  userModel
    .findOneAndUpdate({ id: id }, userDoc, { new: true })
    .then((data) => {
      if (data !== null) {
        console.log("更新成功!");
        res.status(201).json({
          msg: "更新成功!",
          data: data,
        });
      } else {
        console.log("更新失败!");
        res.status(400).json({
          msg: "更新失败!",
        });
      }
    })
    .catch((err) => {
      console.log("更新异常!", err);
      res.status(500).json({
        msg: "更新异常!",
      });
    });
}; // 更新指定id用户

exports.delete = (req, res) => {
  let id = req.params.id;
  userModel
    .findOneAndDelete({ id: id })
    .then((data) => {
      if (data !== null) {
        console.log("删除成功!");
        // 若设置若res设置了status(204)就不能返回数据到客户端
        res.json({
          msg: "删除成功!",
        });
      } else {
        console.log("删除失败!");
        res.json({
          msg: "删除失败!",
        });
      }
    })
    .catch((err) => {
      console.log("删除异常!", err);
      res.status(500).json({
        msg: "删除异常!",
      });
    });
}; // 删除指定id角色

exports.one = (req, res) => {
  let queryDoc = req.body;
  userModel
    .find(queryDoc)
    .then((data) => {
      if (data !== null) {
        console.log("查询成功!", data);
        const count = data.length;
        res.status(200).json({
          msg: "查询成功!",
          data: data,
          count: count,
        });
      } else {
        console.log("查询失败!");
        res.status(404).json({
          msg: "查询失败!",
        });
      }
    })
    .catch((err) => {
      console.log("查询异常!", err);
      res.status(500).json({
        msg: "查询异常!",
      });
    });
}; // 获取指定条件用户用户

exports.updateRoles = (req, res) => {
  let id = req.params.id;
  let roles = req.body;
  console.log(roles);
  userModel
    .findOneAndUpdate({ id: id }, roles)
    .then((data) => {
      if (data !== null) {
        console.log("角色分配成功!");
        res.status(201).json({
          msg: "角色分配成功",
          data: data,
        });
      } else {
        console.log("角色分配失败!");
        res.status(400).json({
          msg: "角色分配失败!",
        });
      }
    })
    .catch((err) => {
      console.log("角色分配发生异常!", err);
      res.status(500).json({
        msg: "角色分配成功",
      });
    });
}; // 给指定id用户分配角色
