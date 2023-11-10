//服务器全部接口返回的类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//spu的数据类型
export interface SpuData {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number|string
  spuSaleAttrList: null|SpuImg[]
  spuImageList: null|SpuImg[]
}
//数组元素都是已有spu数据类型
export type Records = SpuData[]

//定义获取已有的spu接口返回的数据TS类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
//所有品牌数据的TS类型
export interface Trademark{
  id:number,
  tmName:string,
  logoUrl:string
}
//品牌接口返回的数据类型
export interface AllTradeMark extends ResponseData{
  data:Trademark[]
}
//商品图片的TS类型
export interface SpuImg{
  id?:number,
  createTime?:string,
  updateTime?:string,
  spuId?:number,
  imgName:string,
  imgUrl:string,
  name:string,
  url:string
}
//已有的spu的照片墙数据类型
export interface SpuHasImg extends ResponseData{
  data:SpuImg[]
}
//已有的销售属性值对象的TS类型
export interface SaleAttrValue{
  id?:number,
  createTime?:null,
  updateTime?:null,
  spuId?:number,
  baseSaleAttrId:number|string,
  saleAttrValueName:string,
  saleAttrName?:string,
  isChecked?:null
}
//存储已有的销售属性值数组类型
export type spuSaleAttrValueList=SaleAttrValue[]  

//销售属性对象的TS类型
export interface SaleAttr{
  id?:number,
  createTime?:null,
  updateTime?:null,
  spuId?:number,
  baseSaleAttrId:number|string,
  saleAttrName:string,
  spuSaleAttrValueList:spuSaleAttrValueList,
  flag?:boolean,
  saleAttrValue?:string
}

//spu已有的销售属性接口返回的数据ts类型
export interface SaleAttrResponseData extends ResponseData{
  data:SaleAttr[]
}

//已有的全部SPU的返回数据TS类型
export interface HasSaleAttr{
  id:number,
  name:string
}
export interface HasSaleAttrResponseData extends ResponseData{
  data:HasSaleAttr[]
}

//sku添加的属性类型
export interface SkuData{
  category3Id:string|number,
  spuId:string|number,
  tmId:string|number,
  skuName:string,
  price:string|number,
  weight:string|number,
  skuDesc:string,
  skuAttrValueList?:[
    {
      attrId:string|number,
      valueId:string|number
    }
  ],
  skuSaleAttrValueLiat?:[
    {
      saleAttrId:string|number,
      saleAttrValueId:string|number
    }
  ],
  skuDefaultImg:string

}

//获取SKU数据接口口的TS类型
export interface SkuInfoData extends ResponseData{
  data:SkuData[]
}