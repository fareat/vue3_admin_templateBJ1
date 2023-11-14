//y用户管理接口模块
import request from "@/utils/request";
//引入接口类型
import type { UserResponseData } from "./type";

//枚举地址
enum API{
    ALLUSER_URL='/admin/acl/user/'
}

//用户列表接口
export const reqUserInfo=(page:number,limit:number)=>request.get<any,UserResponseData>(API.ALLUSER_URL+`${page}/${limit}`)