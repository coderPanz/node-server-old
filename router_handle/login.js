const md5 = require("md5");
const generateToken = require("../utils/generateToken/generateToken");
const userModel = require("../models/user");
exports.login = async (req, res) => {
  try {

    // 取出用户信息并向数据库查询
    let { name, password } = req.body;
    password = md5(password);
    const data = await userModel.findOne({ name, password });

    if (!data) return res.status(404).json("查询失败!");

    // 若查询成功后剔除或加密重要信息后, 生成token并返回给客户端
    const user = { ...req.body, password: md5(password) };
    const tokenStr = generateToken(user);
    res.status(200).json({ 
      id: data._id,
      name: name,
      token: tokenStr
     });
  } catch (error) {
    console.log(error);
  }
  
};
