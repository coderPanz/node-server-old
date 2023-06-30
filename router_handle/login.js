const md5 = require("md5");
const generateToken = require("../utils/generateToken/generateToken");
const loginModel = require("../models/login");

exports.login = (req, res) => {
  // 取出用户信息并向数据库查询, 若查询成功则生成token并返回给客户端
  let { name, password } = req.body;
  password = md5(password);
  console.log("数据库连接成功!");
  loginModel.findOne({ name: name, password: password }).then((data) => {
    if (data != null) {
      console.log("查询成功, 完成登录! 返回token");
      const user = { ...req.body, password: md5(password) };
      const tokenStr = generateToken(user);
      res.json({
          id: data.id,
          name: name,
          msg: "登陆成功",
          token: tokenStr
        });
    } else {
      console.log("查询失败", data);
      console.log("用户信息有误,登陆失败!");
    }
  }).catch((err) => {
    console.log("查询发生异常: ", err);
  });
};
