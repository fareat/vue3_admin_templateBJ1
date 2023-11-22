import request from "@/utils/request";
//返回的数据的TS类型
import type {PermisstionResponseData} from './type'
//枚举地址
enum API{
    //获取全部菜单与按钮的标识数据
    ALLPERMISSTION_URL='/admin/acl/permission'
}
//获取菜单数据
export const reqAllPermisstion=()=>request.get<any,PermisstionResponseData>(API.ALLPERMISSTION_URL)