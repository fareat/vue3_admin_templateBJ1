//y用户管理接口模块
import request from '@/utils/request'
//引入接口类型
import type {
  User,
  UserResponseData,
  AllRoleResponseData,
  SetRoleData,
} from './type'

//枚举地址
enum API {
  //获取用户数据
  ALLUSER_URL = '/admin/acl/user/',
  //新增用户
  ADDUSER_URL = '/admin/acl/user/save',
  //修改用户
  UPDATEUSER_URL = '/admin/acl/user/update',
  //获取全部职位，当前账号拥有的职位接口
  ALLROLEURL = '/admin/acl/user/toAssign/',
  //给已有的角色分配职位
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //删除某一个账号
  DELETEUSER_URL = '/admin/acl/user/remove/',
  //批量删除的接口
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove',
}

//用户列表接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`,
  )
//修改|更新
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //有id则修改
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    //无id则新增
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
//获取全部职位，当前账号拥有的职位接口
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId)
//分配职务
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data)
//删除某一个账号
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId)
//批量删除的接口
export const reqSelectUser = (idList: number[]) =>
  request.delete(API.DELETEALLUSER_URL, { data: idList })
