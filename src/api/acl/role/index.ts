//角色管理模块的接口
import request from "@/utils/request";
//类型
import {RoleData, RoleResponseData,MenuResponseData} from './type'
//枚举地址
enum API{
    //获取全部职位接口
    ALLROLE_URL='/admin/acl/role/',
    //新增岗位
    ADDROLE_URL='/admin/acl/role/save',
    //更新已有的职位
    UPDATEROLE_URL='/admin/acl/role/update',
    //菜单权限分配
    ALLPERMISSTION_URL='/admin/acl/permission/toAssign/'


}
//获取全部角色
export const reqAllRoleList=(pageNo:number,limit:number,roleName:string)=>request.get<any,RoleResponseData>(API.ALLROLE_URL+`${pageNo}/${limit}?roleName=${roleName}`)
//添加职位|更新职位
export const reqAddOrUpdateRole=(data:RoleData)=>{
    if (data.id) {
        return request.put<any,any>(API.UPDATEROLE_URL,data)
    }else{
        return request.post<any,any>(API.ADDROLE_URL,data)
    }
}
//菜单的权限分配
export const reqAllMenuList=(roleId:number)=>request.get<any,MenuResponseData>(API.ALLPERMISSTION_URL+roleId)