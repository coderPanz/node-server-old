// 导入模型对象
const roleModel = require("../models/role");

exports.list = (req, res) => {
  roleModel.find().then(data => {
    if(data !== null) {
      console.log('角色列表: ', data)
      res.status(200).json({
        data: data
      })
    } else {
      console.log('查询失败', data)
      res.status(404).json({
        msg: "查询失败!"
      })
    }
  }).catch(err => {
    console.log('查询异常!', err)
    res.status(500).json({
      msg: '查询异常!'
    })
  })
} // 获取角色列表

exports.create = (req, res) => {
  let roleDoc = req.body
  roleModel.create(roleDoc).then(data => {
    if(data !== null) {
      console.log('创建成功!')
      res.status(201).json({
        msg: "创建成功!",
        data: data
      })
    } else {
      console.log('创建失败!')
      res.status(500).json({
        msg: "创建失败!"
      })
    }
  }).catch(err => {
    console.log('创建异常!', err)
    // err不能返回到客户端, 所以不需要返回err给客户端
    res.status(500).json({
      msg: '创建异常!'
    })
  })
} // 创建角色

exports.update = (req, res) => {
  let id = req.params.id
  let roleDoc = req.body
  roleModel.findOneAndUpdate({ id: id }, roleDoc, { new: true }).then(data => {
    if(data !== null) {
      console.log('更新成功!')
      res.status(201).json({
        msg: "更新成功!",
        data: data
      })
    } else {
      console.log('更新失败!')
      res.status(400).json({
        msg: "更新失败!"
      })
    }
  }).catch(err => {
    console.log('更新异常!', err)
    res.status(500).json({
      msg: '更新异常!'
    })
  })
} // 更新指定id角色

exports.delete = (req, res) => {
  let id = req.params.id
  roleModel.findOneAndDelete({ id: id }).then(data => {
    if(data !== null) {
      console.log('删除成功!')
      // 若设置若res设置了status(204)就不能返回数据到客户端
      res.json({
        msg: "删除成功!"
      })
    } else {
      console.log('删除失败!')
      res.json({
        msg: "删除失败!"
      })
    }
  }).catch(err => {
    console.log('删除异常!', err)
    res.status(500).json({
      msg: '删除异常!'
    })
  })
} // 删除指定id角色

exports.one = (req, res) => {
  let id = req.params.id
  roleModel.findOne({ _id: id }).then(data => {
    if(data !== null) {
      console.log('查询成功!', data)
      res.status(200).json({
        msg: "查询成功!",
        data: data
      })
    } else {
      console.log('查询失败!')
      res.status(404).json({
        msg: "查询失败!"
      })
    }
  }).catch(err => {
    console.log('查询异常!', err)
    res.status(500).json({
      msg: '查询异常!'
    })
  })
} // 获取指定id角色

exports.updateRoles = (req, res) => {
  let id = req.params.id
  let roleDoc = req.body
  roleModel.findOneAndUpdate({ id: id }, roleDoc).then(data => {
    if(data !== null) {
      console.log('权限分配成功!')
      res.status(201).json({
        msg: "权限分配成功",
        data: data
      })
    } else {
      console.log('权限分配失败!')
      res.status(400).json({
        msg: "权限分配失败!"
      })
    }
  }).catch(err => {
    console.log('权限分配异常!', err)
    res.status(500).json({
      msg: "权限分配异常"
    })
  })
} // 给指定id角色分配角色
