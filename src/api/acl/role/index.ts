//角色管理模块的接口
import request from '@/utils/request'
//类型
import { RoleData, RoleResponseData, MenuResponseData } from './type'
//枚举地址
enum API {
  //获取全部职位接口
  ALLROLE_URL = '/admin/acl/role/',
  //新增岗位
  ADDROLE_URL = '/admin/acl/role/save',
  //更新已有的职位
  UPDATEROLE_URL = '/admin/acl/role/update',
  //菜单权限分配
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  //给相应的职位分配权限
  SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
  //删除已有的职位
  REMOVEROLE_URL = '/admin/acl/role/remove/',
}
//获取全部角色
export const reqAllRoleList = (
  pageNo: number,
  limit: number,
  roleName: string,
) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${pageNo}/${limit}?roleName=${roleName}`,
  )
//添加职位|更新职位
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data)
  }
}
//菜单的权限分配
export const reqAllMenuList = (roleId: number) =>
  request.get<any, MenuResponseData>(API.ALLPERMISSTION_URL + roleId)
//给相应的职位分配权限
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post(
    API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )
//删除职位
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId)
