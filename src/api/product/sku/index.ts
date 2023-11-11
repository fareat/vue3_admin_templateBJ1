//sku接口模块管理
import request from "@/utils/request";
import type { SkuResponseData } from "./type";
//枚举地址
enum API{
    //获取已有商品的数据-SKU
    SKU_URL='/admin/product/list/'
}
//获取SKU的接口
export const reqSKuList=(page:number,limit:number)=>request.get<any,SkuResponseData>(API.SKU_URL+`${page}/${limit}`)