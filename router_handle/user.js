// 导入模型对象
const userModel = require("../models/user");

exports.list = (req, res) => {
  userModel
    .find()
    .then((data) => {
      if (data !== null) {
        console.log("用户列表: ", data);
        res.status(200).json({
          data: data,
        });
      } else {
        console.log("查询失败");
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
}; // 删除指定id用户

exports.one = (req, res) => {
  let id = req.params.id;
  userModel
    .findOne({ id: id })
    .then((data) => {
      if (data !== null) {
        console.log("查询成功!", data);
        res.status(200).json({
          msg: "查询成功!",
          data: data,
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
}; // 根据id查询单个用户

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

exports.paginationQuery = async (req, res) => {
  let { size, offset, id, name, status, createdAt } = req.body;

  // 我先进行一层判断, 如果有值的话就做为查询的条件, 没有值的话就不需要作为查询条件
  const query = {};
  if (id) query.id = id;
  if (name) query.name = name;
  if (status) query.status = status;
  if (createdAt) {
    // 获取创建时间的范围
    const startDate = createdAt[0];
    const endDate = createdAt[1];
    query.createdAt = { $gte: startDate, $lte: endDate };
  }


  const data = await userModel.find(query).skip(offset).limit(size);
  // 查询符合条件的文档总数
  const totalCount = await userModel.countDocuments();
  res.json({
    data: data,
    totalCount: totalCount,
  });
}; // 分页查询
