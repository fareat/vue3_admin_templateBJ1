import type { RouteRecordRaw } from "node_modules/vue-router/dist/vue-router"
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes:RouteRecordRaw[]
}
