/************************导入模块************************/

const express = require('express')
const router = express.Router()

// 导入验证规则对象
const { formCheckObj } = require('../models/validate')
// 安装 @escook/express-joi 中间件，来实现自动对表单数据进行验证的功能
// 导入表单验证中间件
const expressJoi = require('@escook/express-joi')
const validataUser = expressJoi(formCheckObj)

/************************用户登录路由分发************************/
const loginAdmin = require('../router_handle/login')
router.post('/login', validataUser, loginAdmin.login)
/************************系统管理路由分发************************/

/**********一、用户登录路由分发**********/
const usersAdmin = require('../router_handle/user')
router
  .post('/user/list', usersAdmin.list) // 获取用户列表
  .post('/user', usersAdmin.create) // 创建用户
  .patch('/user/:id', usersAdmin.update) // 更新指定id用户
  .delete('/user/:id', usersAdmin.delete) // 删除指定id用户
  .get('/user/:id', usersAdmin.one) // 获取指定id用户
  .patch('/user/:id/roles', usersAdmin.updateRoles) // 给指定id用户分配角色

/**********二、角色管理路由分发**********/
const rolesAdmin = require('../router_handle/role')
router
  .get('/role', rolesAdmin.list) // 获取角色列表
  .post('/role', rolesAdmin.create) // 创建角色
  .patch('/role/:id', rolesAdmin.update) // 更新指定id角色
  .delete('/role/:id', rolesAdmin.delete) // 删除指定id角色
  .get('/role/:id', rolesAdmin.one) // 获取指定id角色
  .patch('/role/:id/menu', rolesAdmin.updateRoles) // 给指定id角色分配权限

/**********三、权限管理路由分发(菜单权限)**********/
const menusAdmin = require('../router_handle/menu')
router
  .get('/menu', menusAdmin.list) // 获取权限列表
  .post('/menu', menusAdmin.create) // 创建权限
  .patch('/menu/:id', menusAdmin.update) // 更新指定id菜单
  .delete('/menu/:id', menusAdmin.delete) // 删除指定id菜单
  .get('/menu/:id', menusAdmin.one) // 查询某个菜单


/************************高级查询************************/
// 获取角色菜单树
const menuTreeAdmin = require('../router_handle/menuTree')
router
.get('/role/:id/menu', menuTreeAdmin.menuTree)
// .post('/menuTree', menuTreeAdmin.create)

/************************导出路由************************/
module.exports = router