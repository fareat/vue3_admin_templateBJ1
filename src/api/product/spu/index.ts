//spu管理模块接口
import request from '@/utils/request'
//ts类型
import { SkuData,HasSpuResponseData,AllTradeMark,SpuHasImg,SaleAttrResponseData,HasSaleAttrResponseData, SpuData } from './type'

enum API {
  //获取已有的SPU数据
  HASSPU_URL = '/admin/product/',
  //获取全部品牌的数据
  ALLTRADEMARK_URL='/admin/product/baseTrademark/getTrademarkList',
  //获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL='/admin/product/spuImageList/',
  //获取某一个SPU下的已有的销售属性接口地址
  SPUHASSALEATTR_URL='/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性【颜色，版本，尺码】
  ALLSALEATTR_URL='/admin/product/baseSaleAttrList',
  //追加一个SPU
  ADDSPU_URL='/admin/product/saveSpuInfo',
  //更新一个已有的SPU
  UPDATESPU_URL='/admin/product/updateSpuInfo',
  //追加一个新增的SKU地址
  ADDSKU_URL='/admin/product/saveSkuInfo'
}
//获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )
//获取全部的SPU的品牌的数据
export const reqAllTradeMark=()=>request.get<any,AllTradeMark>(API.ALLTRADEMARK_URL)
//获取某个已有的spu下的商品图片
export const reqSpuImagelist=(spuId:number)=>request.get<any,SpuHasImg>(API.IMAGE_URL+spuId)
//获取某一个SPU下的已有的销售属性接口地址
export const reqSpuHasSaleAttr=(spuId:number)=>request.get<any,SaleAttrResponseData>(API.SPUHASSALEATTR_URL+spuId)
//获取整个项目全部的销售属性【颜色，版本，尺码】
export const reqAllSaleAttr=()=>request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
//追加一个SPU
//更新一个已有的SPU
export const reqAddOrUpdateSpu=(data:SpuData)=>{
  if(data.id){
    //有id更新
    return request.post<any,any>(API.UPDATESPU_URL,data)
  }else{
    //无id增加 
    return request.post<any,any>(API.ADDSPU_URL,data)
  }
}


//添加一个SKU的请求方法
export const reqAddSku=(data:SkuData)=>request.post<any,any>(API.ADDSKU_URL,data)