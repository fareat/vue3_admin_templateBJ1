//书写品牌管理模块的接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
//品牌管理模块接口地址
enum API {
  //获取已有的品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
}
//获取已有品牌的接口方法
//page：获取第几页 ---默认为1
//limite：获取几个已有的品牌
export const reqHasTrademark = (page: number, limite: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limite}`,
  )

//添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (date: TradeMark) => {
  //有id则编辑
  if (date.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, date)
  } else {
    //无id则新增
    return request.post<any, any>(API.ADDTRADEMARK_URL, date)
  }
}
