//书写属性相关的API文件夹
import request from '@/utils/request'
//数据类型定义
import type { CategoryResponseData } from './type'

//属性管理模块接口地址
enum API {
  //获取一级分类标题地址
  C1_URL = '/admin/product/getCategory1',
  //获取二级分类标题地址
  C2_URL = '/admin/product/getCategory2/',
  //获取三级分类标题地址
  C3_URL = '/admin/product/getCategory3/',
}

//获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
//获取一级分类的接口方法
export const reqC2 = (category1Id: number) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id)
//获取一级分类的接口方法
export const reqC3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id)
