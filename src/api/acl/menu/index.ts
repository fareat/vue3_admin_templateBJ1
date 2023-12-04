import request from '@/utils/request'
//返回的数据的TS类型
import type { PermisstionResponseData, MenuParams } from './type'
//枚举地址
enum API {
  //获取全部菜单与按钮的标识数据
  ALLPERMISSTION_URL = '/admin/acl/permission',
  ADDMENU_URL = '/admin/acl/permission/save', // 给某一个菜单添加一个子菜单
  UPDATE_URL = '/admin/acl/permission/update', // 编辑某一个菜单
  //删除已有的菜单
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}
//获取菜单数据
export const reqAllPermisstion = () =>
  request.get<any, PermisstionResponseData>(API.ALLPERMISSTION_URL)
//添加||更新菜单的方法
export const reqAddOrUpadteMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}
//删除已有的菜单
export const reqRemoveMenu = (Id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + Id)
