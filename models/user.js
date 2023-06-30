const mongoose = require('mongoose')
const roleModel = require('../models/role')
// 定义用户模型数据结构 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // 角色
  roles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: roleModel
  },
  // 是否可用
  status: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// 将 schemam 发布为 Model 模型
const userModel = mongoose.model('user', userSchema)

// 导出模型
module.exports = userModel