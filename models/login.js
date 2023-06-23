/**********创建模型对象的文件**********/

// 导入mongoose
const mongoose = require("mongoose");

// 创建文档的数据结构
const loginSchema = new mongoose.Schema({
  // id保存用户登录的_id
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 创建模型对象, 可以通过模型对象进行文档的增删改查
let loginModel = mongoose.model("login", loginSchema);

// 导出对象
module.exports = loginModel;
