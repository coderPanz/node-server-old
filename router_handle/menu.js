// 导入模型对象
const menuModel = require("../models/menu");

exports.list = (req, res) => {
  menuModel.find().then(data => {
    if(data !== null) {
      console.log('菜单列表: ', data)
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
} // 获取菜单列表

exports.create = (req, res) => {
  let menuDoc = req.body
  menuModel.create(menuDoc).then(data => {
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
} // 创建菜单

exports.update = (req, res) => {
  let id = req.params.id
  let menuDoc = req.body
  menuModel.findOneAndUpdate({ id: id }, menuDoc, { new: true }).then(data => {
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
} // 更新指定id菜单

exports.delete = (req, res) => {
  let id = req.params.id
  menuModel.findOneAndDelete({ id: id }).then(data => {
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
  menuModel.findOne({ id: id }).then(data => {
    if(data !== null) {
      console.log('查询成功!', data)
      res.status(200).json({
        msg: "查询成功!",
        data: data,
        status: 200
      })
    } else {
      console.log('查询失败!')
      res.status(404).json({
        msg: "查询失败!",
        status: 404
      })
    }
  }).catch(err => {
    console.log('查询异常!', err)
    res.status(500).json({
      msg: '查询异常!'
    })
  })
} // 获取指定id角色


