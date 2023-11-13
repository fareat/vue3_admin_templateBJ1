//sku接口模块管理
import request from "@/utils/request";
import type { SkuResponseData,SkuInfoData  } from "./type";
//枚举地址
enum API{
    //获取已有商品的数据-SKU
    SKU_URL='/admin/product/list/',
    //上架
    SALE_URL='/admin/product/onSale/',
    //下架
    CANCELSALE_URL='/admin/product/cancelSale/',
    //查看商品API接口
    SKUINFO_URL='/admin/product/getSkuInfo/',
    //删除商品
    DELETE_URL='/admin/product/deleteSku/'
    
}
//获取SKU的接口
export const reqSKuList=(page:number,limit:number)=>request.get<any,SkuResponseData>(API.SKU_URL+`${page}/${limit}`)
//已有商品上架的请求
export const reqSaleSku=(skuId:number)=>request.get<any,any>(API.SALE_URL+skuId)
//下架的请求
export const reqCancelSale=(skuId:number)=>request.get<any,any>(API.CANCELSALE_URL+skuId)
//商品详情接口
export const reqSkuInfo=(skuId:number)=>request.get<any,SkuInfoData>(API.SKUINFO_URL+skuId)
//删除接口
export const reqRemoveSku=(supId:number)=>request.delete<any,any>(API.DELETE_URL+supId)

