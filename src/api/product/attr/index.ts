//书写属性相关的API文件夹
import request from '@/utils/request'
//数据类型定义
import type { CategoryResponseData, AttrResponseData, Attr } from './type'

//属性管理模块接口地址
enum API {
  //获取一级分类标题地址
  C1_URL = '/admin/product/getCategory1',
  //获取二级分类标题地址
  C2_URL = '/admin/product/getCategory2/',
  //获取三级分类标题地址
  C3_URL = '/admin/product/getCategory3/',
  //商品基础信息接口
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或者修改已有的属性方法
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除数据
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

//获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//获取一级分类的接口方法
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
//获取一级分类的接口方法
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
//获取商品基础信息
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`,
  )

//新增或者是修改已有的属性接口
export const reqAddOrUpadteAttr = (data: Attr) =>
  request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

//删除某一个属性的业务
export const reqRemoveAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
