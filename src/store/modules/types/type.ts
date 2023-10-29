import type { RouteRecordRaw } from 'node_modules/vue-router/dist/vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: string | number
  c2Id: CategoryObj[]
  c3Arr: string | number
  c3Id: CategoryObj[]
}
