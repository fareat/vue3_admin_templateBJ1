//分类相关的ts类型----按照接口的返回类型来写ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

//相应的分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

//商品的属性ts类型

//属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}

//存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

//存储每一个对象的数组ts类型
export type AttrList = Attr[]

/* export interface Attr1{
  code:number
  message:string
  data:[]
  ok:boolean
}
 */

//暴露接口返回数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
